module Pages.Dashboard exposing (Model, Msg, Params, page)

import Api exposing (Data(..), HttpError(..))
import Api.Homework.Assignment exposing (changeAssignmentTitle, createAssignment, getAssignmentByID, getAssignments, removeAssignment)
import Api.Homework.Course exposing (MinimalCourse, getActiveCourses, searchCourses)
import Array
import Components.LineChart
import Components.Sidebar
import Date
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input exposing (focusedOnLoad)
import Element.Keyed as Keyed
import Material.Icons exposing (assignment)
import Material.Icons.Types exposing (Coloring(..))
import Maybe.Extra
import Models exposing (Assignment, Course, User)
import Shared
import Spa.Document exposing (Document)
import Spa.Generated.Route as Route
import Spa.Page as Page exposing (Page)
import Spa.Url exposing (Url)
import Styling.Colors exposing (..)
import Task
import Time
import Utils.Darken exposing (darken)
import Utils.OnEnter exposing (onEnter, onEnterEsc)
import Utils.Route


type alias Params =
    ()


type alias Model =
    { url : Url Params
    , user : Maybe User
    , courseData : Api.Data (List Course)
    , device : Shared.Device

    -- create assignment form
    , createAssignmentData : Api.Data Assignment
    , searchCoursesText : String
    , searchCoursesData : Api.Data (List MinimalCourse)
    , selectedCourse : Maybe MinimalCourse
    , titleTfText : String
    , dateTfText : String
    , selectedDate : Maybe Date.Date
    , today : Date.Date
    , selectedDateTime : Time.Posix
    , addDaysDifference : Int
    , errors : List String
    , maybeAssignmentHovered : Maybe String
    , assignmentData : Api.Data (List Assignment)
    , maybeAssignmentModalActivated : Maybe String
    , assignmentModalData : Api.Data Assignment
    , editAssignmentTitleTfText : String
    , assignmentTitleFocused : Bool
    }


type Msg
    = GotCourseData (Api.Data (List Course))
      -- create assignment form
    | SearchCourses String
    | GotSearchCoursesData (Api.Data (List MinimalCourse))
    | CAFSelectCourse MinimalCourse
    | CAFChangeTitle String
    | CAFChangeDate String
    | CreateAssignment
    | GotCreateAssignmentData (Api.Data Assignment)
    | ReceiveTime Time.Posix
    | Add1Day
    | RemoveAssignment String
    | GotRemoveAssignmentData (Api.Data Assignment)
    | GotAssignmentData (Api.Data (List Assignment))
    | ViewAssignmentModal String
    | CloseModal
    | GotAssignmentModalData (Api.Data Assignment)
    | ChangeAssignmentTitle String
    | ChangeAssignmentTitleTfText String
    | FocusAssignmentTitle String
    | UnfocusAssignmentTitle
    | GotChangeAssignmentTitle (Api.Data Assignment)


page : Page Params Model Msg
page =
    Page.application
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        , load = load
        , save = save
        }


initCommands : List (Cmd Msg)
initCommands =
    [ getActiveCourses { onResponse = GotCourseData }
    , Time.now |> Task.perform ReceiveTime
    , getAssignments 7 { onResponse = GotAssignmentData }
    ]


init : Shared.Model -> Url Params -> ( Model, Cmd Msg )
init shared url =
    ( { url = url
      , user = shared.user
      , courseData = NotAsked
      , searchCoursesData = NotAsked
      , device = shared.device
      , createAssignmentData = NotAsked
      , searchCoursesText = ""
      , selectedCourse = Nothing
      , titleTfText = ""
      , dateTfText = ""
      , selectedDate = Nothing
      , today = Date.fromCalendarDate 2019 Time.Jan 1
      , selectedDateTime = Time.millisToPosix 0
      , addDaysDifference = 0
      , errors = []
      , maybeAssignmentHovered = Nothing
      , assignmentData = NotAsked
      , maybeAssignmentModalActivated = Nothing
      , assignmentModalData = NotAsked
      , editAssignmentTitleTfText = ""
      , assignmentTitleFocused = False
      }
    , Cmd.batch initCommands
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotCourseData data ->
            case data of
                Failure e ->
                    case e of
                        Api.BadStatus s _ ->
                            if s == 401 || s == 403 then
                                ( model, Utils.Route.navigate model.url.key Route.Login )

                            else
                                ( { model | courseData = data }, Cmd.none )

                        _ ->
                            ( { model | courseData = data }, Cmd.none )

                _ ->
                    ( { model | courseData = data }, Cmd.none )

        GotSearchCoursesData data ->
            ( { model | searchCoursesData = data }, Cmd.none )

        -- create assignment form
        SearchCourses text ->
            let
                errorMsg =
                    "no course selected"
            in
            if String.isEmpty (String.trim text) then
                ( { model
                    | searchCoursesText = text
                    , searchCoursesData = NotAsked
                    , selectedCourse = Nothing
                    , errors =
                        if List.member errorMsg model.errors then
                            model.errors

                        else
                            List.append model.errors [ errorMsg ]
                  }
                , Cmd.none
                )

            else if model.selectedCourse == Nothing then
                ( { model
                    | searchCoursesText = text
                    , selectedCourse = Nothing
                    , errors =
                        if List.member errorMsg model.errors then
                            model.errors

                        else
                            List.append model.errors [ errorMsg ]
                  }
                , searchCourses text { onResponse = GotSearchCoursesData }
                )

            else
                ( { model | searchCoursesText = text, selectedCourse = Nothing, errors = List.filter (\error -> error /= errorMsg) model.errors }, searchCourses text { onResponse = GotSearchCoursesData } )

        CAFSelectCourse course ->
            ( { model
                | searchCoursesText =
                    course.name
                , searchCoursesData = NotAsked
                , selectedCourse = Just course
                , errors = List.filter (\error -> error /= "no course selected") model.errors
              }
            , Cmd.none
            )

        CAFChangeTitle text ->
            let
                errorMsg =
                    "missing title"
            in
            if String.isEmpty (String.trim text) then
                if List.member errorMsg model.errors then
                    ( { model
                        | titleTfText = text
                      }
                    , Cmd.none
                    )

                else
                    ( { model
                        | titleTfText = text
                        , errors = List.append model.errors [ errorMsg ]
                      }
                    , Cmd.none
                    )

            else
                ( { model
                    | titleTfText = text
                    , errors = List.filter (\error -> error /= errorMsg) model.errors
                  }
                , Cmd.none
                )

        CAFChangeDate text ->
            let
                errorMsg =
                    "invalid date"

                errorMsg2 =
                    "due date is in the past!"

                epochStartOffset =
                    719162
            in
            case dateStringToDate text of
                Just date ->
                    ( { model
                        | dateTfText = text
                        , selectedDate = Just date
                        , selectedDateTime = Time.millisToPosix (floor (toFloat (Date.toRataDie date) - epochStartOffset) * (1000 * 60 * 60 * 24) - (1000 * 60 * 60 * 24))
                        , addDaysDifference = Date.toRataDie date - epochStartOffset - (Date.toRataDie model.today - epochStartOffset)
                        , errors =
                            List.append (List.filter (\error -> error /= errorMsg && error /= errorMsg2) model.errors)
                                (if Date.toRataDie date - epochStartOffset - (Date.toRataDie model.today - epochStartOffset) < 0 then
                                    [ errorMsg2 ]

                                 else
                                    []
                                )
                      }
                    , Cmd.none
                    )

                Nothing ->
                    if List.member errorMsg model.errors then
                        ( { model
                            | dateTfText = text
                            , selectedDate = Nothing
                            , selectedDateTime = Time.millisToPosix (floor (toFloat (Date.toRataDie model.today) - epochStartOffset) * (1000 * 60 * 60 * 24) - (1000 * 60 * 60 * 24))
                            , errors = List.filter (\error -> error /= errorMsg2) model.errors
                            , addDaysDifference = 0
                          }
                        , Cmd.none
                        )

                    else
                        ( { model
                            | dateTfText = text
                            , selectedDate = Nothing
                            , errors = List.append (List.filter (\error -> error /= errorMsg2) model.errors) [ errorMsg ]
                            , selectedDateTime = Time.millisToPosix (floor (toFloat (Date.toRataDie model.today) - epochStartOffset) * (1000 * 60 * 60 * 24) - (1000 * 60 * 60 * 24))
                            , addDaysDifference = 0
                          }
                        , Cmd.none
                        )

        ReceiveTime time ->
            ( { model | today = Date.fromPosix Time.utc time, selectedDateTime = time }, Cmd.none )

        CreateAssignment ->
            case model.selectedCourse of
                Just course ->
                    case model.selectedDate of
                        Just dueDate ->
                            ( { model
                                | dateTfText = ""
                                , searchCoursesText = ""
                                , searchCoursesData = NotAsked
                                , selectedCourse = Nothing
                                , selectedDate = Nothing
                                , errors = []
                              }
                            , createAssignment { courseId = course.id, title = model.titleTfText, dueDate = dueDate, fromMoodle = course.fromMoodle } { onResponse = GotCreateAssignmentData }
                            )

                        _ ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        GotCreateAssignmentData data ->
            ( { model | createAssignmentData = data }
            , Cmd.batch
                [ getActiveCourses { onResponse = GotCourseData }
                , getAssignments 7 { onResponse = GotAssignmentData }
                ]
            )

        Add1Day ->
            let
                date =
                    Date.fromPosix Time.utc
                        (Time.millisToPosix
                            (floor
                                (toFloat
                                    (Time.posixToMillis
                                        model.selectedDateTime
                                        + (1000 * 60 * 60 * 24)
                                    )
                                )
                            )
                        )

                -- days between the birth of jesus and 1970-01-01
                epochStartOffset =
                    719162
            in
            ( { model
                | selectedDate = Just date
                , selectedDateTime = Time.millisToPosix (floor (toFloat (Date.toRataDie (Date.fromPosix Time.utc model.selectedDateTime)) - epochStartOffset) * (1000 * 60 * 60 * 24))
                , dateTfText = toGermanDateString date
                , addDaysDifference = Date.toRataDie date - epochStartOffset - (Date.toRataDie model.today - epochStartOffset)
                , errors = List.filter (\error -> error /= "invalid date") model.errors
              }
            , Cmd.none
            )

        RemoveAssignment id ->
            ( model, removeAssignment id { onResponse = GotRemoveAssignmentData } )

        GotRemoveAssignmentData data ->
            case data of
                Success assignment ->
                    case model.courseData of
                        Success courseData ->
                            ( { model
                                | courseData =
                                    Success
                                        (List.map
                                            (\c ->
                                                { c | assignments = List.filter (\a -> not (a.id == assignment.id)) c.assignments }
                                            )
                                            courseData
                                        )
                                , maybeAssignmentModalActivated = Nothing
                              }
                            , Cmd.none
                            )

                        _ ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        GotAssignmentData data ->
            ( { model | assignmentData = data }, Cmd.none )

        ViewAssignmentModal id ->
            ( { model | maybeAssignmentModalActivated = Just id }, getAssignmentByID id GotAssignmentModalData )

        GotAssignmentModalData data ->
            ( { model | assignmentModalData = data }, Cmd.none )

        CloseModal ->
            ( { model | maybeAssignmentModalActivated = Nothing }, Cmd.none )

        ChangeAssignmentTitle assignmentId ->
            case model.courseData of
                Success courseData ->
                    ( { model
                        | courseData =
                            Success
                                (List.map
                                    (\c ->
                                        { c
                                            | assignments =
                                                List.map
                                                    (\a ->
                                                        if a.id == assignmentId then
                                                            { a | title = model.editAssignmentTitleTfText }

                                                        else
                                                            a
                                                    )
                                                    c.assignments
                                        }
                                    )
                                    courseData
                                )
                      }
                    , changeAssignmentTitle assignmentId model.editAssignmentTitleTfText GotChangeAssignmentTitle
                    )

                _ ->
                    ( model, Cmd.none )

        ChangeAssignmentTitleTfText text ->
            ( { model | editAssignmentTitleTfText = text }, Cmd.none )

        FocusAssignmentTitle title ->
            ( { model | assignmentTitleFocused = True, editAssignmentTitleTfText = title }, Cmd.none )

        UnfocusAssignmentTitle ->
            ( { model
                | assignmentTitleFocused = False
              }
            , Cmd.none
            )

        GotChangeAssignmentTitle assignmentData ->
            ( { model
                | assignmentTitleFocused = False
                , assignmentModalData = assignmentData
              }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


load : Shared.Model -> Model -> ( Model, Cmd msg )
load shared model =
    ( { model | device = shared.device, user = shared.user }, Cmd.none )


save : Model -> Shared.Model -> Shared.Model
save _ shared =
    shared


borderRadius : Int
borderRadius =
    20


view : Model -> Document Msg
view model =
    { title = "dashboard"
    , body =
        [ el
            [ width fill
            , height fill
            , Font.family
                [ Font.typeface "Source Sans Pro"
                , Font.sansSerif
                ]
            , Font.color (rgb 1 1 1)
            , padding 30
            , Background.color darkGreyColor
            , inFront (viewAssignmentModal model)
            ]
            ((case model.device.class of
                Shared.Desktop ->
                    wrappedRow

                _ ->
                    column
             )
                [ spacing 30
                , height fill
                , width fill
                ]
                [ -- sidebar
                  Components.Sidebar.viewSidebar { user = model.user, device = model.device, active = Just "dashboard" }

                -- content
                , column
                    [ width
                        (case model.device.class of
                            Shared.Phone ->
                                fill

                            _ ->
                                fillPortion 4
                        )
                    , height fill
                    , Background.color darkGreyColor
                    , spacing 30
                    ]
                    [ viewOustandingAssignments model
                    , (case model.device.class of
                        Shared.Desktop ->
                            row

                        _ ->
                            column
                      )
                        [ width fill, height fill, spacing 30 ]
                        [ viewCreateAssignmentForm model
                        , el
                            [ width (fillPortion 1)
                            , Background.color lighterGreyColor
                            , height fill
                            , Border.rounded borderRadius
                            ]
                            (viewWeekAssignmentVisualization model)
                        ]
                    ]
                ]
            )
        ]
    }



-- outstanding? assignments


dueDateAfterDate : Date.Date -> Date.Date -> Bool
dueDateAfterDate dueDate date =
    Date.toRataDie dueDate > Date.toRataDie date


otherOutstandingAssignments : Date.Date -> List Course -> List Course
otherOutstandingAssignments today courses =
    let
        validAssignments =
            List.filter
                (\assignment ->
                    dueDateAfterDate assignment.dueDate (Date.add Date.Days 2 today)
                )
                (List.concat (List.map (\course -> course.assignments) courses))

        validCourseIds =
            List.map (\assignment -> assignment.courseId) validAssignments
    in
    List.map
        (\course ->
            { course | assignments = List.filter (\a -> a.courseId == course.id) validAssignments }
        )
        (List.filter (\course -> List.member course.id validCourseIds) courses)


viewOustandingAssignments : Model -> Element Msg
viewOustandingAssignments model =
    column
        [ width fill
        , spacing 30
        , Background.color lighterGreyColor
        , padding 30
        , Border.rounded borderRadius
        , height fill
        ]
        [ (case model.device.class of
            Shared.Desktop ->
                row

            _ ->
                column
          )
            [ width fill
            , height (shrink |> minimum 400)
            , spacing 30
            ]
            (case model.user of
                Just user ->
                    if user.moodleUrl /= "" then
                        [ viewAssignmentsDayColumn model.courseData "today" redColor model.today
                        , viewAssignmentsDayColumn model.courseData "tomorrow" yellowColor (Date.add Date.Days 1 model.today)
                        , viewAssignmentsDayColumn model.courseData "the day after tomorrow" greenColor (Date.add Date.Days 2 model.today)
                        ]

                    else
                        [ column [ width fill, spacing 20 ]
                            [ paragraph [ centerX, centerY, Font.bold, Font.size 30, Font.center ] [ text "you actually need to link your moodle account in order to use this service lol :)" ]
                            , link
                                [ centerX
                                , Background.color greenColor
                                , paddingXY 40 20
                                , Border.rounded 10
                                , mouseOver
                                    [ Background.color (rgba 0 0 0 0)
                                    , Border.color greenColor
                                    ]
                                , Border.solid
                                , Border.width 3
                                , Border.color greenColor
                                ]
                                { label = el [ centerX, centerY, Font.bold ] (text "do that"), url = Route.toString Route.Dashboard__Moodle }
                            ]
                        ]

                Nothing ->
                    [ none ]
            )
        , case model.courseData of
            Success courses ->
                if List.length (otherOutstandingAssignments model.today courses) > 0 then
                    viewOtherAssignments model.courseData model.today

                else
                    none

            _ ->
                none
        ]



-- BIG OOF FUNCTIONS


filterCoursesByWhetherAssignmentsAreDueOnDate : List Course -> Date.Date -> List Course
filterCoursesByWhetherAssignmentsAreDueOnDate courses date =
    let
        validCourses =
            List.map (\idAssignmentTuple -> Tuple.first idAssignmentTuple)
                (List.filter
                    (\_ ->
                        not
                            (List.isEmpty
                                (List.filter (\assignment -> assignment.dueDate == date)
                                    (List.concat (List.map (\course -> course.assignments) courses))
                                )
                            )
                    )
                    (List.map (\course -> ( course.id, course.assignments )) courses)
                )
    in
    List.filter (\course -> List.member course.id validCourses) courses


viewAssignmentsDayColumn : Api.Data (List Course) -> String -> Color -> Date.Date -> Element Msg
viewAssignmentsDayColumn courseData title color date =
    column
        [ Background.color color
        , height (fill |> minimum 200)
        , Border.rounded borderRadius
        , padding 20
        , width (fillPortion 1)
        , spacing 10
        ]
        (case courseData of
            Success allCourses ->
                let
                    courses =
                        filterCoursesByWhetherAssignmentsAreDueOnDate allCourses date

                    assignments =
                        List.map (\c -> c.assignments) courses |> List.foldl (++) [] |> List.filter (\a -> a.dueDate == date)
                in
                if List.isEmpty courses then
                    [ el [ Font.bold ] (text (title ++ "{" ++ String.fromInt (List.length assignments) ++ "}"))
                    , el [ centerX, centerY, Font.size 30, Font.bold ] (text "*nothing 🎉*")
                    ]

                else
                    [ el [ Font.bold ] (text (title ++ "{" ++ String.fromInt (List.length assignments) ++ "}"))
                    , Keyed.column [ width fill, spacing 5 ] (List.map (courseGroupToKeyValue color (Just date) False) courses)
                    ]

            Failure e ->
                [ text (Api.errorToString e) ]

            Loading ->
                [ el [ centerX, centerY, Font.size 30, Font.bold ] (text "Loading...") ]

            NotAsked ->
                [ el [ centerX, centerY, Font.size 30, Font.bold ] (text "Loading...") ]
        )


viewOtherAssignments : Api.Data (List Course) -> Date.Date -> Element Msg
viewOtherAssignments apiData date =
    column
        [ width fill
        , Border.rounded borderRadius
        , spacing 10
        , padding 20
        , Background.color greyBlueColor
        ]
        (case apiData of
            Success data ->
                let
                    courses =
                        otherOutstandingAssignments date data

                    assignments =
                        List.map (\c -> c.assignments) courses |> List.foldr (++) []
                in
                if List.isEmpty courses then
                    [ el [ Font.bold ] (text ("other" ++ "{" ++ String.fromInt (List.length assignments) ++ "}")) ]

                else
                    [ el [ Font.bold ] (text ("other" ++ "{" ++ String.fromInt (List.length assignments) ++ "}"))
                    , Keyed.column [ width fill, spacing 5 ] (List.map (courseGroupToKeyValue greyBlueColor Nothing True) courses)
                    ]

            Loading ->
                [ el [ centerX, centerY, Font.size 30, Font.bold ] (text "Loading...") ]

            _ ->
                [ none ]
        )


courseGroupToKeyValue : Color -> Maybe Date.Date -> Bool -> Course -> ( String, Element Msg )
courseGroupToKeyValue color date displayDate course =
    ( String.fromInt course.id, viewAssignmentCourseGroup course color date displayDate )


viewAssignmentCourseGroup : Course -> Color -> Maybe Date.Date -> Bool -> Element Msg
viewAssignmentCourseGroup course color maybeDate displayDate =
    let
        assignments =
            case maybeDate of
                Just date ->
                    List.filter (\assignment -> assignment.dueDate == date) course.assignments

                Nothing ->
                    course.assignments
    in
    if not (List.isEmpty assignments) then
        column
            [ Background.color (darken color 0.05)
            , padding 10
            , spacing 10
            , Border.rounded 10
            , width fill
            ]
            [ el [ Font.bold ]
                (paragraph []
                    [ text
                        course.name
                    ]
                )
            , Keyed.column [ spacing 5, width fill ] (List.map (\a -> assignmentToKeyValue color displayDate a) assignments)
            ]

    else
        none


assignmentToKeyValue : Color -> Bool -> Assignment -> ( String, Element Msg )
assignmentToKeyValue color displayDate assignment =
    ( assignment.id, viewAssignment assignment color displayDate )


viewAssignment : Assignment -> Color -> Bool -> Element Msg
viewAssignment assignment color displayDate =
    column
        [ Background.color (darken color 0.1)
        , padding 10
        , Border.rounded 10
        , width fill
        , pointer
        , Events.onClick (ViewAssignmentModal assignment.id)
        ]
        [ el
            []
            (paragraph []
                [ text
                    ((if displayDate then
                        toGermanDateString assignment.dueDate ++ ": "

                      else
                        ""
                     )
                        ++ assignment.title
                    )
                ]
            )
        , el
            [ alignRight, Font.italic ]
            (text assignment.user.username)
        ]



-- create assignment form


inputColor : Color
inputColor =
    darken lighterGreyColor -0.05


inputTextColor : Color
inputTextColor =
    rgb 1 1 1


inputStyle : List (Attribute Msg)
inputStyle =
    [ Background.color inputColor
    , Border.width 0
    , Border.rounded 10
    , Font.color inputTextColor
    , alignTop
    , height (px 50)
    ]


viewCreateAssignmentFormErrors : List String -> Element Msg
viewCreateAssignmentFormErrors errors =
    if List.isEmpty errors then
        text ""

    else
        column
            [ Background.color redColor
            , width fill
            , Border.rounded 10
            , padding 10
            , spacing 5
            ]
            [ el [ Font.bold, Font.size 30, Font.color (darken redColor 0.8) ] (text "Errors")
            , column []
                (List.map
                    viewCreateAssignmentFormError
                    errors
                )
            ]


viewCreateAssignmentFormError : String -> Element msg
viewCreateAssignmentFormError error =
    el [ Font.bold, Font.color (darken redColor 0.8) ] (text error)


viewCreateAssignmentFormStatus : Api.Data Assignment -> Element msg
viewCreateAssignmentFormStatus data =
    case data of
        Success _ ->
            column
                [ Background.color greenColor
                , width fill
                , Border.rounded 10
                , paddingXY 10 20
                , spacing 5
                ]
                [ el [ Font.bold, Font.size 20, Font.color (darken greenColor 0.8) ] (text "Success 🎉") ]

        Failure _ ->
            column
                [ Background.color redColor
                , width fill
                , Border.rounded 10
                , paddingXY 10 30
                , spacing 5
                ]
                [ el [ Font.bold, Font.size 30, Font.color (darken redColor 0.8) ] (text "Error. Try again?") ]

        _ ->
            none


viewCreateAssignmentForm : Model -> Element Msg
viewCreateAssignmentForm model =
    column
        [ Background.color lighterGreyColor
        , height fill
        , width (fillPortion 1)
        , Border.rounded borderRadius
        , padding 20
        , Font.color darkGreyColor
        , spacing 10
        ]
        [ el [ Font.bold, Font.size 30, Font.color inputTextColor ]
            (text "Create Assignment")
        , viewCreateAssignmentFormErrors model.errors
        , viewCreateAssignmentFormStatus model.createAssignmentData
        , (case model.device.class of
            Shared.Phone ->
                column

            _ ->
                row
          )
            [ width fill, spacing 10 ]
            [ column [ width fill ]
                [ Input.text
                    [ Background.color inputColor
                    , Border.width 0
                    , if model.searchCoursesData == NotAsked then
                        Border.rounded 10

                      else
                        Border.roundEach
                            { topLeft = 10
                            , topRight = 10
                            , bottomLeft = 0
                            , bottomRight = 0
                            }
                    , Font.color (rgb 1 1 1)
                    , height (px 50)
                    ]
                    { label = Input.labelAbove [ Font.color (rgb 1 1 1) ] (text "search courses (required)")
                    , placeholder = Just (Input.placeholder [] (text "Emily Oliver: History"))
                    , onChange = SearchCourses
                    , text = model.searchCoursesText
                    }
                , viewSearchDropdown model.searchCoursesData
                ]
            , Input.text
                (List.append
                    inputStyle
                    [ alignTop ]
                )
                { label = Input.labelAbove [ Font.color (rgb 1 1 1) ] (text "title (required)")
                , placeholder = Just (Input.placeholder [] (text "sb. page 105, 1-3a"))
                , onChange = CAFChangeTitle
                , text = model.titleTfText
                }
            ]
        , row
            [ width fill ]
            [ Input.text
                (List.append
                    inputStyle
                    [ Border.roundEach { topLeft = 10, topRight = 0, bottomLeft = 10, bottomRight = 0 }

                    -- FIXME: error handling?
                    , onEnter CreateAssignment
                    ]
                )
                { label =
                    Input.labelAbove [ Font.color (rgb 1 1 1) ]
                        (text
                            (case model.selectedDate of
                                Just _ ->
                                    "due date (required) -- selected date " ++ String.fromInt model.addDaysDifference ++ " days from now."

                                Nothing ->
                                    "due date (required)"
                            )
                        )
                , placeholder = Just (Input.placeholder [] (text (toGermanDateString model.today)))
                , onChange = CAFChangeDate
                , text = model.dateTfText
                }
            , el
                (List.append inputStyle
                    [ width (px 50)
                    , height (px 50)
                    , alignBottom
                    , Border.roundEach { topLeft = 0, topRight = 10, bottomLeft = 0, bottomRight = 10 }
                    , Border.widthEach { left = 2, right = 0, bottom = 0, top = 0 }
                    , Border.dotted
                    , Border.color inputTextColor
                    , mouseOver
                        [ Background.color (darken inputColor -0.05)
                        ]
                    , Events.onClick Add1Day
                    , pointer
                    ]
                )
                (el [ centerX, centerY, Font.size 30, Font.bold ] (text "+1"))
            ]
        , if not (List.isEmpty model.errors) || (String.isEmpty model.titleTfText || String.isEmpty model.searchCoursesText || String.isEmpty model.dateTfText) then
            Input.button
                [ width fill
                , height (px 50)
                , Background.color (darken inputColor -0.1)
                , Font.color (rgb 1 1 1)
                , Font.bold
                , Border.rounded 10
                , padding 10
                ]
                { label = el [ centerX, centerY ] (text "Submit")
                , onPress = Nothing
                }

          else
            Input.button
                [ width fill
                , height (px 50)
                , Background.color blueColor
                , Font.color (rgb 1 1 1)
                , Font.bold
                , Border.rounded 10
                , padding 10
                ]
                { label = el [ centerX, centerY ] (text "Submit")
                , onPress = Just CreateAssignment
                }
        ]


viewSearchDropdown : Api.Data (List MinimalCourse) -> Element Msg
viewSearchDropdown data =
    case data of
        Success courses ->
            let
                shortedCourses =
                    Array.toList (Array.slice 0 10 (Array.fromList courses))

                maybeLast =
                    List.head (List.reverse shortedCourses)
            in
            case maybeLast of
                Just last ->
                    Keyed.column [ width fill, height fill, scrollbarY ]
                        (List.map
                            (courseToKeyValue last)
                            shortedCourses
                        )

                Nothing ->
                    none

        Loading ->
            text "Loading..."

        Failure e ->
            text (Api.errorToString e)

        _ ->
            none


courseToKeyValue : MinimalCourse -> MinimalCourse -> ( String, Element Msg )
courseToKeyValue last course =
    ( String.fromInt course.id, viewSearchDropdownElement course (course.id == last.id) )


viewSearchDropdownElement : MinimalCourse -> Bool -> Element Msg
viewSearchDropdownElement course isLast =
    row
        [ Background.color inputColor
        , width fill
        , height (shrink |> minimum 50)
        , padding 15
        , if isLast then
            Border.roundEach { topLeft = 0, bottomLeft = 10, bottomRight = 10, topRight = 0 }

          else
            Border.rounded 0
        , mouseOver
            [ Background.color (darken inputColor -0.05)
            ]
        , Events.onClick (CAFSelectCourse course)
        , spacing 10
        ]
        [ if course.fromMoodle then
            el [ Background.color (rgb255 249 128 18), Font.bold, Font.color (rgb 1 1 1), Border.rounded 5, padding 5 ]
                (text "moodle")

          else
            none
        , el
            [ Font.bold, Font.color inputTextColor, width fill ]
            (paragraph [ width fill ]
                [ text
                    course.name
                ]
            )
        ]


dateStringToDate : String -> Maybe Date.Date
dateStringToDate input =
    let
        splitArray =
            Array.fromList (String.split "." input)

        maybeDay =
            Array.get 0 splitArray |> Maybe.map String.toInt |> Maybe.Extra.join

        maybeMonth =
            Array.get 1 splitArray |> Maybe.map String.toInt |> Maybe.Extra.join |> Maybe.map intToMonth |> Maybe.Extra.join

        maybeYear =
            Array.get 2 splitArray |> Maybe.map String.toInt |> Maybe.Extra.join
    in
    Maybe.map3 dayMonthYearToDate maybeDay maybeMonth maybeYear |> Maybe.Extra.join


intToMonth : Int -> Maybe Time.Month
intToMonth month =
    case month of
        1 ->
            Just Time.Jan

        2 ->
            Just Time.Feb

        3 ->
            Just Time.Mar

        4 ->
            Just Time.Apr

        5 ->
            Just Time.May

        6 ->
            Just Time.Jun

        7 ->
            Just Time.Jul

        8 ->
            Just Time.Aug

        9 ->
            Just Time.Sep

        10 ->
            Just Time.Oct

        11 ->
            Just Time.Nov

        12 ->
            Just Time.Dec

        _ ->
            Nothing


dayMonthYearToDate : Int -> Time.Month -> Int -> Maybe Date.Date
dayMonthYearToDate day month year =
    Just (Date.fromCalendarDate year month day)


toGermanDateString : Date.Date -> String
toGermanDateString date =
    Date.format "d.M.y" date


viewWeekAssignmentVisualization : Model -> Element msg
viewWeekAssignmentVisualization model =
    case model.assignmentData of
        Success assignments ->
            html
                (Components.LineChart.mainn assignments model.today)

        Failure error ->
            el [] (text (Api.errorToString error))

        _ ->
            el [] (text "Loading...")


{-| I am not really happy with how this turned out (3000 messages 4 model items that are basically only used once etc.)
-}
viewAssignmentModal : Model -> Element Msg
viewAssignmentModal model =
    case model.maybeAssignmentModalActivated of
        Just _ ->
            case model.courseData of
                Success courses ->
                    case model.user of
                        Just user ->
                            el
                                [ Background.color (rgba 1 1 1 0.1)
                                , width fill
                                , height fill
                                , padding 200
                                ]
                                (column
                                    [ centerX
                                    , width (shrink |> minimum 800)
                                    , Background.color (rgb 1 1 1)
                                    , height shrink
                                    , Font.color (rgb 0 0 0)
                                    , padding 40
                                    , spacing 20
                                    , Border.rounded 10
                                    , Font.family [ Font.typeface "Hack" ]
                                    ]
                                    (case model.assignmentModalData of
                                        Success assignment ->
                                            [ row [ width fill ]
                                                [ el
                                                    [ width fill
                                                    , if user.id == assignment.user.id then
                                                        Events.onClick <| FocusAssignmentTitle assignment.id

                                                      else
                                                        pointer
                                                    , pointer
                                                    ]
                                                    (if model.assignmentTitleFocused then
                                                        Input.text
                                                            [ Font.bold
                                                            , Font.size 24
                                                            , padding 0
                                                            , focusedOnLoad
                                                            , onEnterEsc (ChangeAssignmentTitle assignment.id) UnfocusAssignmentTitle
                                                            ]
                                                            { onChange = ChangeAssignmentTitleTfText
                                                            , text = model.editAssignmentTitleTfText
                                                            , placeholder = Nothing
                                                            , label = Input.labelHidden "edit assignment title"
                                                            }

                                                     else
                                                        el [ Font.bold, Font.size 24 ] (text assignment.title)
                                                    )
                                                , el
                                                    [ Events.onClick CloseModal
                                                    , Font.color redColor
                                                    , Font.center
                                                    , pointer
                                                    , Font.size 24
                                                    ]
                                                    (text "[x]")
                                                ]
                                            , el [] (text ("Course: " ++ Maybe.withDefault "undefined" (getCourseNameById courses assignment.courseId)))
                                            , row [ width fill ]
                                                [ if user.id == assignment.user.id then
                                                    viewButton "[delete]" redColor (RemoveAssignment assignment.id)

                                                  else
                                                    none
                                                ]
                                            ]

                                        Loading ->
                                            [ text "Loading..." ]

                                        NotAsked ->
                                            [ none ]

                                        Failure err ->
                                            [ text <| Api.errorToString err ]
                                    )
                                )

                        Nothing ->
                            none

                _ ->
                    none

        Nothing ->
            none


viewButton : String -> Color -> Msg -> Element Msg
viewButton text_ color msg =
    el [ Font.color color, Events.onClick msg, pointer ]
        (text text_)


getCourseNameById : List Course -> Int -> Maybe String
getCourseNameById courses id =
    List.filter (\c -> c.id == id) courses
        |> List.head
        |> Maybe.map (\c -> c.name)
