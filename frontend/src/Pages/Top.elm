module Pages.Top exposing (Model, Msg, Params, page)

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Models exposing (User)
import Shared
import Spa.Document exposing (Document)
import Spa.Generated.Route exposing (Route)
import Spa.Page as Page exposing (Page)
import Spa.Url exposing (Url)
import Styling.Colors exposing (blueColor, darkGreyColor)
import Utils.Route exposing (navigate)


type alias Params =
    ()


type alias Model =
    { url : Url Params
    , user : Maybe User
    }


type alias Msg =
    Never


page : Page Params Model Msg
page =
    Page.application
        { view = view
        , update = update
        , init = init
        , subscriptions = subscriptions
        , load = load
        , save = save
        }


init : Shared.Model -> Url Params -> ( Model, Cmd Msg )
init shared url =
    ( { user = shared.user
      , url = url
      }
    , if not shared.overrideLoggedInRedirect then
        case shared.user of
            Just _ ->
                navigate url.key Spa.Generated.Route.Dashboard

            Nothing ->
                Cmd.none

      else
        Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


load : Shared.Model -> Model -> ( Model, Cmd Msg )
load shared model =
    ( model
    , if not shared.overrideLoggedInRedirect then
        case shared.user of
            Just _ ->
                navigate model.url.key Spa.Generated.Route.Dashboard

            Nothing ->
                Cmd.none

      else
        Cmd.none
    )


save : Model -> Shared.Model -> Shared.Model
save model shared =
    shared



-- VIEW


view : Model -> Document Msg
view _ =
    { title = "dwb?"
    , body =
        [ column [ width fill, height fill ]
            [ -- heading
              el
                [ Font.family
                    [ Font.typeface "Noto Serif"
                    , Font.serif
                    ]
                , height (fill |> minimum 1000)
                , width fill
                ]
                (column [ centerX, centerY, spacing 10 ]
                    [ el [ centerX, Font.size 80 ] (text "Homework Organizer")
                    , paragraph [ centerX, width fill, Font.center, paddingXY 10 0 ]
                        [ el [] (text "not to be confused with: ")
                        , link []
                            { url = "https://schule.3nt3.de"
                            , label = el [ Font.underline ] <| text "schule.3nt3.de"
                            }
                        ]
                    , el
                        [ centerX
                        , Font.size 30
                        , Font.family [ Font.typeface "Source Sans Pro" ]
                        , Font.bold
                        , Background.color blueColor
                        , Font.color (rgb 1 1 1)
                        , padding 5
                        , Border.rounded 5
                        ]
                        (text "Beta v0.8.5")
                    ]
                )

            -- about
            , el
                [ Font.family
                    [ Font.typeface "Noto Serif"
                    , Font.serif
                    ]
                , width fill
                , Background.color darkGreyColor
                , Font.color (rgb 1 1 1)
                , height fill
                ]
                (column [ padding 100, spacing 10 ]
                    [ el [ Font.size 60 ]
                        (text "About")
                    , el
                        []
                        (paragraph [ Font.size 24 ]
                            [ text "This is a tool created to help you organize homework assignments collaboratively with your classmates."
                            ]
                        )
                    ]
                )
            ]
        ]
    }
