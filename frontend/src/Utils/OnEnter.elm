module Utils.OnEnter exposing (onEnter, onEnterEsc)

import Element
import Html.Events
import Json.Decode as Decode


onEnter : msg -> Element.Attribute msg
onEnter msg =
    Element.htmlAttribute
        (Html.Events.on "keyup"
            (Decode.field "key" Decode.string
                |> Decode.andThen
                    (\key ->
                        let
                            _ =
                                Debug.log "key" key
                        in
                        if key == "Enter" then
                            Decode.succeed msg

                        else
                            Decode.fail "Not the enter key"
                    )
            )
        )


onEnterEsc : msg -> msg -> Element.Attribute msg
onEnterEsc a b =
    Element.htmlAttribute
        (Html.Events.on "keyup"
            (Decode.field "key" Decode.string
                |> Decode.andThen
                    (\key ->
                        let
                            _ =
                                Debug.log "key" key
                        in
                        if key == "Escape" then
                            Decode.succeed b

                        else if key == "Enter" then
                            Decode.succeed a

                        else
                            Decode.fail "Not the enter key"
                    )
            )
        )
