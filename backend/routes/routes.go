package routes

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/3nt3/homework/db"
	"github.com/3nt3/homework/structs"
)

type apiResponse struct {
	Content interface{} `json:"content"`
	Errors  []string    `json:"errors"`
}

type Request struct {
	*http.Request
	Time time.Time
}

var Requests []Request

func returnApiResponse(w http.ResponseWriter, response apiResponse, status int) error {
	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/json")

	if response.Errors == nil {
		response.Errors = []string{}
	}

	err := json.NewEncoder(w).Encode(response)

	return err
}

func getUserBySession(r *http.Request, getCourses bool) (structs.User, bool, error) {
	cookie, err := r.Cookie("hw_cookie_v2")
	if err != nil {
		// return no error, because the error will (probably) only be `named cookie not present`, which can be ignored here,
		// rather than being checked every fucking time this helper is called. This prevents the client from just getting
		// "500 internal server error" if the cookie does not exist.
		return structs.User{}, false, nil
	}

	sessionId := cookie.Value

	return db.GetUserBySession(sessionId, getCourses)
}
