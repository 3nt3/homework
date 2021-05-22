module Pages.Top exposing (Model, Msg, Params, page)

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Spa.Document exposing (Document)
import Spa.Page as Page exposing (Page)
import Spa.Url exposing (Url)
import Styling.Colors exposing (blueColor, darkGreyColor)


type alias Params =
    ()


type alias Model =
    Url Params


type alias Msg =
    Never


page : Page Params Model Msg
page =
    Page.static
        { view = view
        }



-- VIEW


view : Url Params -> Document Msg
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
