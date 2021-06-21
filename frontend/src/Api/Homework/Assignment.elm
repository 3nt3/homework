module Api.Homework.Assignment exposing (changeAssignmentTitle, createAssignment, getAssignmentByID, getAssignments, getContributors, getContributorsAdmin, removeAssignment)

import Api
import Api.Api exposing (apiAddress)
import Api.Homework.Course exposing (assignmentDecoder)
import Date
import Http
import Json.Decode as Json
import Json.Encode as Encode
import Models exposing (Assignment)


updateTitleEncoder : String -> Encode.Value
updateTitleEncoder title =
    Encode.object
        [ ( "title", Encode.string title )
        ]


dateEncoder : Date.Date -> Int
dateEncoder date =
    dateToPosixTime date


epochStartOffset : Int
epochStartOffset =
    719162


dateToPosixTime : Date.Date -> Int
dateToPosixTime date =
    (Date.toRataDie date - epochStartOffset) * (1000 * 60 * 60 * 24) - (1000 * 60 * 60 * 24)


assignmentEncoder : { title : String, courseId : Int, dueDate : Date.Date, fromMoodle : Bool } -> Encode.Value
assignmentEncoder assignment =
    Encode.object
        [ ( "title", Encode.string assignment.title )
        , ( "course", Encode.int assignment.courseId )
        , ( "due_date", Encode.int (dateEncoder assignment.dueDate) )
        , ( "from_moodle", Encode.bool assignment.fromMoodle )
        ]


createAssignment : { title : String, courseId : Int, dueDate : Date.Date, fromMoodle : Bool } -> { onResponse : Api.Data Assignment -> msg } -> Cmd msg
createAssignment assignment options =
    Http.riskyRequest
        { method = "POST"
        , url = apiAddress ++ "/assignment"
        , headers = []
        , body = Http.jsonBody (assignmentEncoder assignment)
        , expect = Api.expectJson options.onResponse assignmentDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


removeAssignment : String -> { onResponse : Api.Data Assignment -> msg } -> Cmd msg
removeAssignment id options =
    Http.riskyRequest
        { method = "DELETE"
        , url = apiAddress ++ "/assignment?id=" ++ id
        , headers = []
        , body = Http.emptyBody
        , expect = Api.expectJson options.onResponse assignmentDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


getAssignments : Int -> (Api.Data (List Assignment) -> msg) -> Cmd msg
getAssignments maxDays onResponse =
    Http.riskyRequest
        { method = "GET"
        , url = apiAddress ++ "/assignments?days=" ++ String.fromInt maxDays
        , headers = []
        , body = Http.emptyBody
        , expect = Api.expectJson onResponse (Json.list assignmentDecoder)
        , timeout = Nothing
        , tracker = Nothing
        }


getAssignmentByID : String -> (Api.Data Assignment -> msg) -> Cmd msg
getAssignmentByID id onResponse =
    Http.riskyRequest
        { method = "GET"
        , url = apiAddress ++ "/assignment/" ++ id
        , headers = []
        , body = Http.emptyBody
        , expect = Api.expectJson onResponse assignmentDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


changeAssignmentTitle : String -> String -> (Api.Data Assignment -> msg) -> Cmd msg
changeAssignmentTitle id newTitle onResponse =
    Http.riskyRequest
        { method = "PUT"
        , url = apiAddress ++ "/assignment/" ++ id
        , headers = []
        , body = Http.jsonBody (updateTitleEncoder newTitle)
        , expect = Api.expectJson onResponse assignmentDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


getContributors : (Api.Data (List ( String, Int )) -> msg) -> Cmd msg
getContributors onResponse =
    Http.riskyRequest
        { method = "GET"
        , url = apiAddress ++ "/assignments/contributors"
        , headers = []
        , body = Http.emptyBody
        , expect = Api.expectJson onResponse contributorsDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


getContributorsAdmin : (Api.Data (List ( String, Int )) -> msg) -> Cmd msg
getContributorsAdmin onResponse =
    Http.riskyRequest
        { url = apiAddress ++ "/assignments/contributors/all"
        , body = Http.emptyBody
        , headers = []
        , method = "GET"
        , expect = Api.expectJson onResponse contributorsDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


contributorsDecoder : Json.Decoder (List ( String, Int ))
contributorsDecoder =
    Json.keyValuePairs Json.int
