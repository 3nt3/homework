module Pages.Dashboard.Admin exposing (Model, Msg, Params, page)

import Api exposing (Data(..))
import Api.Homework.Assignment exposing (getContributorsAdmin)
import Components.PieChart
import Components.Sidebar
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Html exposing (h1)
import Maybe.Extra exposing (isNothing)
import Models exposing (Privilege(..), User)
import Shared
import Spa.Document exposing (Document)
import Spa.Page as Page exposing (Page)
import Spa.Url exposing (Url)
import Styling.Colors exposing (..)


type alias Params =
    ()


type alias Model =
    { url : Url Params
    , user : Maybe User
    , device : Shared.Device
    , contributorInfo : Api.Data (List ( String, Int ))
    }


type Msg
    = GotContributorInfo (Api.Data (List ( String, Int )))


page : Page Params Model Msg
page =
    Page.application
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        , save = save
        , load = load
        }


init : Shared.Model -> Url Params -> ( Model, Cmd Msg )
init shared url =
    ( { url = url
      , user = shared.user
      , device = shared.device
      , contributorInfo = Loading
      }
    , getContributorsAdmin GotContributorInfo
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotContributorInfo data ->
            ( { model | contributorInfo = data }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


save : Model -> Shared.Model -> Shared.Model
save model shared =
    shared


load : Shared.Model -> Model -> ( Model, Cmd msg )
load shared model =
    ( { model | device = shared.device, user = shared.user }, Cmd.none )


view : Model -> Document Msg
view model =
    { title = "admin dashboard"
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
                  Components.Sidebar.viewSidebar { user = model.user, device = model.device, active = Just "admin" }

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
                    (case model.user of
                        Just user ->
                            if user.privilege == Admin then
                                [ column []
                                    [ el [ Font.size 40, Font.bold, alignTop ] (text "admin dashboard")
                                    , el [] (text "you are obviously very cool because in your row the permission field is 1, not 0")
                                    ]
                                , (case model.device.class of
                                    Shared.Phone ->
                                        column

                                    _ ->
                                        row
                                  )
                                    [ width fill ]
                                    [ viewContributorChart model
                                    , case model.device.class of
                                        Shared.Desktop ->
                                            el [ width <| fillPortion 1 ] none

                                        _ ->
                                            none
                                    ]
                                ]

                            else
                                [ el [] <| text "permission denied" ]

                        _ ->
                            [ el [] <| text "permission denied" ]
                    )
                ]
            )
        ]
    }


viewContributorChart : Model -> Element Msg
viewContributorChart model =
    column
        [ width <| fillPortion 1
        , Background.color lighterGreyColor
        , Border.rounded 20
        , padding 20
        , height (shrink |> Element.minimum 400)
        ]
        [ el [ Font.size 30, Font.bold ] <| text "Contributors (total)"
        , case model.contributorInfo of
            Success contributorInfo ->
                -- not sure if this will look good on lower dpi screens
                el [ padding 20, width fill, height (fill |> Element.maximum 400) ] <| html <| Components.PieChart.mainn contributorInfo

            Loading ->
                el [ centerX, centerY, Font.bold, Font.italic ] <| text "Loading..."

            Failure e ->
                el [ centerX, centerY, Font.bold, Font.color redColor, Font.size 30 ] <| text <| "Error: " ++ Api.errorToString e

            _ ->
                none
        ]
