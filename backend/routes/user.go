package routes

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"git.teich.3nt3.de/3nt3/homework/db"
	"git.teich.3nt3.de/3nt3/homework/logging"
	"git.teich.3nt3.de/3nt3/homework/structs"
	"github.com/gorilla/mux"
)

func NewUser(w http.ResponseWriter, r *http.Request) {

	var userData map[string]string
	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		logging.WarningLogger.Printf("error decoding request: %v\n", err)
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"invalid request"}}, 400)
		return
	}

	username, ok := userData["username"]
	if !ok {
		logging.WarningLogger.Printf("error decoding request: field 'username' does not exist\n")
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"invalid request"}}, 400)
		return
	}

	email, ok := userData["email"]
	if !ok {
		logging.WarningLogger.Printf("error decoding request: field 'email' does not exist\n")
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"invalid request"}}, 400)
		return
	}

	password, ok := userData["username"]
	if !ok {
		logging.WarningLogger.Printf("error decoding request: field 'password' does not exist\n")
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"invalid request"}}, 400)
		return
	}

	user, err := db.NewUser(username, email, password)
	if err != nil {
		var responseCode int
		if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
			if strings.Contains(err.Error(), "email") {
				_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"email already in use"}}, http.StatusBadRequest)
				return
			}
			if strings.Contains(err.Error(), "username") {
				_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"username already in use"}}, http.StatusBadRequest)
				return
			}
		}
		logging.ErrorLogger.Printf("error creating new user: %v\n", err)
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"internal server error"}}, responseCode)
		return
	}

	session, err := db.NewSession(user)
	if err != nil {
		logging.ErrorLogger.Printf("error creating new session: %v\n", err)
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"internal server error"}}, 500)
		return
	}

	sessionCookie := http.Cookie{
		Name:     "hw_cookie_v2",
		Value:    session.UID.String(),
		MaxAge:   structs.MaxSessionAge * 24 * 60 * 60,
		Path:     "/",
		SameSite: http.SameSiteNoneMode,
		Secure:   true,
	}

	http.SetCookie(w, &sessionCookie)

	_ = returnApiResponse(w, apiResponse{Content: user.GetClean(), Errors: []string{}}, 200)
}

func GetUserById(w http.ResponseWriter, r *http.Request) {

	id, ok := mux.Vars(r)["id"]
	if !ok {
		logging.WarningLogger.Printf("no id specified\n")
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"invalid request"}}, 400)
		return
	}

	user, err := db.GetUserById(id, false)
	if err != nil {
		logging.ErrorLogger.Printf("error fetching user from db: %v\n", err)
		if err != sql.ErrNoRows {
			_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"internal server error"}}, 500)
		} else {
			_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"user does not exist"}}, 404)
		}
		return
	}

	_ = returnApiResponse(w, apiResponse{Content: user.GetClean(), Errors: []string{}}, 200)
}

func Login(w http.ResponseWriter, r *http.Request) {

	var userData map[string]string

	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		logging.WarningLogger.Printf("error decoding request: %v\n", err)
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"invalid request"}}, 400)
		return
	}

	username, ok := userData["username"]
	if !ok {
		logging.WarningLogger.Printf("error decoding request: field 'username' does not exist\n")
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"invalid request"}}, 400)
		return
	}

	password, ok := userData["username"]
	if !ok {
		logging.WarningLogger.Printf("error decoding request: field 'password' does not exist\n")
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"invalid request"}}, 400)
		return
	}

	user, authenticated, err := db.Authenticate(username, password)
	if err != nil {
		logging.ErrorLogger.Printf("error authenticating: %v\n", err)
		return
	}

	if !authenticated {
		logging.InfoLogger.Printf("authentication failed, wrong password")
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"wrong password"}}, 401)
		return
	}

	session, err := db.NewSession(user)
	if err != nil {
		logging.ErrorLogger.Printf("error creating new session: %v\n", err)
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"internal server error"}}, 500)
		return
	}

	sessionCookie := http.Cookie{
		Name:     "hw_cookie_v2",
		Value:    session.UID.String(),
		MaxAge:   structs.MaxSessionAge * 24 * 60 * 60,
		Path:     "/",
		SameSite: http.SameSiteNoneMode,
		Secure:   true,
	}

	http.SetCookie(w, &sessionCookie)
	_ = returnApiResponse(w, apiResponse{Content: user.GetClean(), Errors: []string{}}, 200)
}

func GetUser(w http.ResponseWriter, r *http.Request) {

	user, authenticated, err := getUserBySession(r, true)
	if err != nil && err != sql.ErrNoRows {
		logging.ErrorLogger.Printf("error getting user by session: %v\n", err)
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"internal server error"},
		}, 500)
		return
	}

	if !authenticated {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"invalid session"},
		}, 401)
		return
	}

	_ = returnApiResponse(w, apiResponse{Content: user.GetClean(), Errors: []string{}}, 200)
}

func UsernameTaken(w http.ResponseWriter, r *http.Request) {

	username, ok := mux.Vars(r)["username"]
	if !ok {
		_ = returnApiResponse(w, apiResponse{
			Errors: []string{"no username provided"},
		}, 400)
		return
	}

	taken, err := db.UsernameTaken(username)
	if err != nil {
		_ = returnApiResponse(w, apiResponse{
			Errors: []string{"internal server error"},
		}, 500)
	}

	_ = returnApiResponse(w, apiResponse{Content: taken, Errors: []string{}}, 200)
}

func EmailTaken(w http.ResponseWriter, r *http.Request) {

	email, ok := mux.Vars(r)["email"]
	if !ok {
		_ = returnApiResponse(w, apiResponse{
			Errors: []string{"no username provided"},
		}, 400)
		return
	}

	taken, err := db.EmailTaken(email)
	if err != nil {
		_ = returnApiResponse(w, apiResponse{
			Errors: []string{"internal server error"},
		}, 500)
	}

	_ = returnApiResponse(w, apiResponse{Content: taken, Errors: []string{}}, 200)
}

// OnlineUsers returns a list of online users.
// If ?count is provided, it will just return the number of online users.
// An online user is defined as a user who issued a request less than 5 minutes ago
//
// FIXME: authentication? not sure if this should be admin only.
func OnlineUsers(w http.ResponseWriter, r *http.Request) {
	// filter requests
	var relevantRequests []Request

	for _, req := range Requests {
		if time.Since(req.Time).Minutes() < 5 {
			relevantRequests = append(relevantRequests, req)
		}
	}

	// get users
	var users []structs.User
	for _, req := range relevantRequests {
		rUser, rAuthenticated, err := getUserBySession(req.Request, false)
		if err != nil {
			logging.WarningLogger.Printf("error getting user by saved request session: %v\n", err)
			continue
		}

		if !rAuthenticated {
			continue
		}

		users = append(users, rUser)
	}

	// filter duplicates
	keys := make(map[string]bool)
	var filteredUsers []structs.CleanUser

	for _, rUser := range users {
		if _, value := keys[rUser.ID.String()]; !value {
			keys[rUser.ID.String()] = true

			// append cleaned user
			filteredUsers = append(filteredUsers, rUser.GetClean())
		}
	}

	if _, ok := r.URL.Query()["count"]; ok {
		_ = returnApiResponse(w, apiResponse{Content: len(filteredUsers)}, 200)
	} else {
		_ = returnApiResponse(w, apiResponse{Content: filteredUsers}, 200)
	}
}
