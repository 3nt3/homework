module Api.Api exposing (apiAddress)

{-| alway add Debug.log or Debug.todo so you can't build production code with the local api address
-}

{--
productionApiAddress : String
productionApiAddress =
    "https://api.hausis.3nt3.de"
--}
{--}


localApiAddress : String
localApiAddress =
    "http://localhost:8005"
--}


apiAddress : String
apiAddress =
    {--}
    let
        _ =
            Debug.log "apiAddress" "fix api address back to actual endpoint"
    in
    --}
    localApiAddress
