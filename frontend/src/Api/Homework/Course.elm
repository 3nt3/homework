module Api.Homework.Course exposing (..)

import Api
import Api.Api exposing (apiAddress)
import Api.Homework.User exposing (userDecoder)
import Date
import Http
import Json.Decode as Json
import Json.Encode as Encode
import Models exposing (Assignment, Course, User)
import Time


type alias MinimalCourse =
    { id : Int
    , name : String
    , fromMoodle : Bool
    }


dateDecoder : Json.Decoder Date.Date
dateDecoder =
    Json.int
        |> Json.andThen
            (\int ->
                Json.succeed (Date.fromPosix Time.utc (Time.millisToPosix int))
            )


assignmentDecoder : Json.Decoder Assignment
assignmentDecoder =
    Json.map8 Assignment
        (Json.field "id" Json.string)
        (Json.field "course" Json.int)
        (Json.field "user" userDecoder)
        (Json.field "title" Json.string)
        (Json.field "due_date" dateDecoder)
        (Json.field "from_moodle" Json.bool)
        (Json.field "done_by" <| Json.list Json.string)
        (Json.field "done_by_users" <| Json.list userDecoder)



-- this is only true for the ?expandUsers option but for now it's ok I think


courseDecoder : Json.Decoder Course
courseDecoder =
    Json.map5 Course
        (Json.field "id" Json.int)
        (Json.field "name" Json.string)
        (Json.field "assignments" (Json.list assignmentDecoder))
        (Json.field "from_moodle" Json.bool)
        (Json.field "user" Json.string)


minimalCourseDecoder : Json.Decoder MinimalCourse
minimalCourseDecoder =
    Json.map3 MinimalCourse
        (Json.field "id" Json.int)
        (Json.field "name" Json.string)
        (Json.field "from_moodle" (Json.nullable Json.bool)
            |> Json.andThen
                (\maybeBool ->
                    case maybeBool of
                        Just bool ->
                            Json.succeed bool

                        Nothing ->
                            Json.succeed False
                )
        )


getActiveCourses : { onResponse : Api.Data (List Course) -> msg } -> Cmd msg
getActiveCourses options =
    Http.riskyRequest
        { body = Http.emptyBody
        , url = apiAddress ++ "/courses/active?expandUsers"
        , method = "GET"
        , expect = Api.expectJson options.onResponse (Json.list courseDecoder)
        , headers = []
        , timeout = Nothing
        , tracker = Nothing
        }


getMyCourses : { onResponse : Api.Data (List Course) -> msg } -> Cmd msg
getMyCourses options =
    Http.riskyRequest
        { body = Http.emptyBody
        , url = apiAddress ++ "/courses"
        , method = "GET"
        , expect = Api.expectJson options.onResponse (Json.list courseDecoder)
        , headers = []
        , timeout = Nothing
        , tracker = Nothing
        }


searchCourses : String -> { onResponse : Api.Data (List MinimalCourse) -> msg } -> Cmd msg
searchCourses searchterm options =
    Http.riskyRequest
        { body = Http.emptyBody
        , url = apiAddress ++ "/courses/search/" ++ searchterm
        , method = "GET"
        , expect = Api.expectJson options.onResponse (Json.list minimalCourseDecoder)
        , headers = []
        , timeout = Nothing
        , tracker = Nothing
        }


createCourse : String -> String -> { onResponse : Api.Data Course -> msg } -> Cmd msg
createCourse subject teacher options =
    Http.riskyRequest
        { body =
            Http.jsonBody
                (Encode.object
                    [ ( "subject", Encode.string subject )
                    , ( "teacher", Encode.string teacher )
                    ]
                )
        , url = apiAddress ++ "/courses"
        , method = "POST"
        , expect = Api.expectJson options.onResponse courseDecoder
        , headers = []
        , timeout = Nothing
        , tracker = Nothing
        }


enrollInCourse : Int -> { onResponse : Api.Data User -> msg } -> Cmd msg
enrollInCourse id options =
    Http.riskyRequest
        { body = Http.emptyBody
        , url = apiAddress ++ "/courses/" ++ String.fromInt id ++ "/enroll"
        , expect = Api.expectJson options.onResponse userDecoder
        , method = "POST"
        , headers = []
        , timeout = Nothing
        , tracker = Nothing
        }


getCourseStats : (Api.Data (List ( String, Int )) -> msg) -> Cmd msg
getCourseStats onResponse =
    Http.riskyRequest
        { body = Http.emptyBody
        , url = apiAddress ++ "/courses/stats"
        , expect = Api.expectJson onResponse (Json.keyValuePairs Json.int)
        , method = "GET"
        , headers = []
        , timeout = Nothing
        , tracker = Nothing
        }
