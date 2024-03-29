module Api.Homework.User exposing (getUserFromSession, login, logout, register, userDecoder)

import Api
import Api.Api exposing (apiAddress)
import Http
import Json.Decode as Json
import Json.Encode as Encode
import Models exposing (Privilege(..), User)


type alias Credentials =
    { username : String
    , password : String
    , email : Maybe String
    }


intToPrivilege privilege =
    case privilege of
        1 ->
            Json.succeed Admin

        _ ->
            Json.succeed Normal


userDecoder : Json.Decoder User
userDecoder =
    Json.map5 User
        (Json.field "id" Json.string)
        (Json.field "username" Json.string)
        (Json.field "email" Json.string)
        (Json.field "privilege" (Json.andThen (\priv -> intToPrivilege priv) Json.int))
        (Json.field "moodle_url" Json.string)


credentialsEncoder : Credentials -> Encode.Value
credentialsEncoder credentials =
    case credentials.email of
        -- Login
        Nothing ->
            Encode.object
                [ ( "username", Encode.string credentials.username )
                , ( "password", Encode.string credentials.password )
                ]

        -- Register
        Just email ->
            Encode.object
                [ ( "username", Encode.string credentials.username )
                , ( "password", Encode.string credentials.password )
                , ( "email", Encode.string email )
                ]



{-
   getUserById : Int -> { onResponse : Api.Data User -> msg } -> Cmd msg
   getUserById id options =
       Http.riskyRequest
           { body = Http.emptyBody
           , url = apiAddress ++ "/user/" ++ String.fromInt id
           , method = "GET"
           , expect = Api.expectJson options.onResponse userDecoder
           , headers = []
           , timeout = Nothing
           , tracker = Nothing
           }
-}


getUserFromSession : { onResponse : Api.Data User -> msg } -> Cmd msg
getUserFromSession options =
    Http.riskyRequest
        { url = apiAddress ++ "/user"
        , method = "GET"
        , body = Http.emptyBody
        , expect = Api.expectJson options.onResponse userDecoder
        , headers = []
        , timeout = Nothing
        , tracker = Nothing
        }


register : Credentials -> { onResponse : Api.Data User -> msg } -> Cmd msg
register credentials options =
    Http.riskyRequest
        { url = apiAddress ++ "/user/register"
        , body = Http.jsonBody (credentialsEncoder credentials)
        , headers = []
        , method = "POST"
        , expect = Api.expectJson options.onResponse userDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


login : Credentials -> { onResponse : Api.Data User -> msg } -> Cmd msg
login credentials options =
    Http.riskyRequest
        { url = apiAddress ++ "/user/login"
        , body = Http.jsonBody (credentialsEncoder credentials)
        , headers = []
        , method = "POST"
        , expect = Api.expectJson options.onResponse userDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


logout : { onResponse : Result Http.Error () -> msg } -> Cmd msg
logout options =
    Http.riskyRequest
        { url = apiAddress ++ "/user/logout"
        , body = Http.emptyBody
        , headers = []
        , method = "POST"
        , expect = Http.expectWhatever options.onResponse
        , timeout = Nothing
        , tracker = Nothing
        }
