module Components.PieChart exposing (mainn)

import Array exposing (Array)
import Color exposing (Color, darkBlue)
import Element
import Path
import Shape exposing (defaultPieConfig)
import Styling.Colors exposing (..)
import TypedSvg exposing (g, style, svg, text_)
import TypedSvg.Attributes exposing (dy, fill, stroke, textAnchor, transform, viewBox)
import TypedSvg.Core exposing (Svg, text)
import TypedSvg.Types exposing (AnchorAlignment(..), Paint(..), Transform(..), em)


w : Float
w =
    500


h : Float
h =
    200


radius : Float
radius =
    min w h / 2


colors : Array Color
colors =
    Array.fromList
        [ greyBlueColor
        , greyBlueColor2
        , fliederColor
        , flieder2Color
        , yellowColor
        , yellowColor2
        , greenColor
        , greenColor2
        , redColor
        , redColor2
        , darkBlueColor
        , darkBlueColor2
        , greyBlueColor2
        , fliederColor
        , flieder2Color
        , yellowColor
        , yellowColor2
        , greenColor
        , greenColor2
        , redColor
        , redColor2
        , darkBlueColor
        , darkBlueColor2
        , greyBlueColor2
        , fliederColor
        , flieder2Color
        , yellowColor
        , yellowColor2
        , greenColor
        , greenColor2
        , redColor
        , redColor2
        , darkBlueColor
        , darkBlueColor2
        , greyBlueColor2
        , fliederColor
        , flieder2Color
        , yellowColor
        , yellowColor2
        , greenColor
        , greenColor2
        , redColor
        , redColor2
        , darkBlueColor
        , darkBlueColor2
        ]
        |> Array.map (\c -> Element.toRgb c |> Color.fromRgba)


pieSlice : Int -> Shape.Arc -> Svg msg
pieSlice index datum =
    Path.element (Shape.arc datum) [ fill <| Paint <| Maybe.withDefault Color.white <| Array.get index colors, stroke <| Paint Color.white ]


pieLabel : Shape.Arc -> ( String, Float ) -> Svg msg
pieLabel slice ( label, value ) =
    let
        ( x, y ) =
            Shape.centroid { slice | innerRadius = radius - 40, outerRadius = radius - 40 }
    in
    text_
        [ transform [ Translate x y ]
        , dy (em 0.1)
        , textAnchor AnchorMiddle
        ]
        [ text (label ++ " (" ++ (String.fromInt <| round value) ++ ")") ]


view : List ( String, Int ) -> Svg msg
view model =
    let
        pieData =
            model |> List.map Tuple.second |> List.map toFloat |> Shape.pie { defaultPieConfig | outerRadius = radius }
    in
    svg [ viewBox 0 0 w h ]
        [ style []
            [ text """.domain {display:none}
        .tick line {display: none}
        .tick text {fill: #7f8c8d}
        text {fill: #ffffff; font-size: 8pt}
        """ ]
        , g [ transform [ Translate (w / 2) (h / 2) ] ]
            [ g [] <| List.indexedMap pieSlice pieData
            , g [] <| List.map2 pieLabel pieData <| List.map (\x -> ( Tuple.first x, Tuple.second x |> toFloat )) model
            ]
        ]


mainn : List ( String, Int ) -> Svg msg
mainn users =
    view <| List.filter (\x -> Tuple.second x > 0) users
