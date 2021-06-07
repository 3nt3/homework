module Api.Homework.UsernameTaken exposing (..)

import Api
import Api.Api exposing (apiAddress)
import Http
import Json.Decode as Json


usernameTaken : String -> { onResponse : Api.Data Bool -> msg } -> Cmd msg
usernameTaken username options =
    Http.get
        { url = apiAddress ++ "/username-taken/" ++ username
        , expect = Api.expectJson options.onResponse Json.bool
        }
