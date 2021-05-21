module Components.PieChart exposing (mainn)

import TypedSvg exposing (style, svg)
import TypedSvg.Attributes exposing (viewBox)
import TypedSvg.Core exposing (Svg, text)
import TypedSvg.Types exposing (Transform(..))


w : Float
w =
    500


h : Float
h =
    200


view : List ( String, Int ) -> Svg msg
view model =
    svg [ viewBox 0 0 w h ]
        [ style [] [ text """.domain {display:none}
        .tick line {display: none}
        .tick text {fill: #7f8c8d}
        """ ] ]


mainn : List ( String, Int ) -> Svg msg
mainn users =
    view users
