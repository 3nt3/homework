package routes

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"git.teich.3nt3.de/3nt3/homework/db"
	"git.teich.3nt3.de/3nt3/homework/logging"
	"git.teich.3nt3.de/3nt3/homework/structs"
	"github.com/gorilla/mux"
)

func CreateAssignment(w http.ResponseWriter, r *http.Request) {
	user, authenticated, err := getUserBySession(r, false)

	if err != nil {
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

	var assignment structs.Assignment
	err = json.NewDecoder(r.Body).Decode(&assignment)
	if err != nil {
		logging.WarningLogger.Printf("error decoding: %v\n", err)
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"bad request"},
		}, http.StatusBadRequest)
		return
	}

	assignment.User = user

	assignment, err = db.CreateAssignment(assignment)
	if err != nil {
		logging.ErrorLogger.Printf("error creating assignment: %v\n", err)
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"internal server error"},
		}, http.StatusInternalServerError)
		return
	}

	_ = returnApiResponse(w, apiResponse{
		Content: assignment.GetClean(),
		Errors:  []string{},
	}, http.StatusOK)
}

func DeleteAssignment(w http.ResponseWriter, r *http.Request) {

	id := r.URL.Query().Get("id")
	if id == "" {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"bad request"},
		}, http.StatusBadRequest)
		return
	}

	user, authenticated, err := getUserBySession(r, false)

	if err != nil {
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

	assignment, err := db.GetAssignmentByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"not found"},
			}, http.StatusNotFound)
			return
		}

		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"internal server error"},
		}, http.StatusInternalServerError)
		return
	}

	if assignment.User.ID != user.ID {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"you are not the creator of this assignment"},
		}, http.StatusForbidden)
		return
	}

	err = db.DeleteAssignment(assignment.UID.String())
	if err != nil {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"internal server error"},
		}, http.StatusInternalServerError)
		return
	}

	_ = returnApiResponse(w, apiResponse{
		Content: assignment.GetClean(),
		Errors:  []string{},
	}, http.StatusOK)
}

func GetAssignments(w http.ResponseWriter, r *http.Request) {

	user, authenticated, err := getUserBySession(r, false)
	if err != nil {
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

	var days int
	daysString := r.URL.Query().Get("days")
	if daysString == "" {
		days = -1
	} else {
		days, err = strconv.Atoi(daysString)
		if err != nil {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"?days is not a valid integer"},
			}, 400)
			return
		}
	}

	assignments, err := db.GetAssignments(user, days)
	if err != nil && err != sql.ErrNoRows {
		logging.ErrorLogger.Printf("error getting assignments session: %v\n", err)
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"internal server error"},
		}, 500)
		return
	}

	if assignments == nil {
		assignments = make([]structs.Assignment, 0)
	}

	var cleanAssignments []structs.CleanAssignment = make([]structs.CleanAssignment, 0)
	for _, a := range assignments {
		cleanAssignments = append(cleanAssignments, a.GetClean())
	}

	_ = returnApiResponse(w, apiResponse{
		Content: cleanAssignments,
	}, 200)
}

func GetAssignment(w http.ResponseWriter, r *http.Request) {
	_, authenticated, err := getUserBySession(r, false)
	if err != nil {
		if err == sql.ErrNoRows {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"not authenticated"},
			}, 401)
			return
		}
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

	id, ok := mux.Vars(r)["id"]
	if id == "" || !ok {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"no id provided"},
		}, 404)
		return
	}

	assignment, err := db.GetAssignmentByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"assignment not found"},
			}, 404)
			return
		}

		logging.ErrorLogger.Printf("error getting assignment: %v\n", err)
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"internal server error"},
		}, 500)
		return
	}

	_ = returnApiResponse(w, apiResponse{
		Content: assignment.GetClean(),
	}, 200)
}

// UpdateAssignment updates the assignment lol
func UpdateAssignment(w http.ResponseWriter, r *http.Request) {
	user, authenticated, err := getUserBySession(r, false)
	if err != nil {
		if err == sql.ErrNoRows {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"not authenticated"},
			}, 401)
			return
		}
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

	id, ok := mux.Vars(r)["id"]
	if id == "" || !ok {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"no id provided"},
		}, 404)
		return
	}

	assignment, err := db.GetAssignmentByID(id)
	if err != nil {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"no id provided"},
		}, 404)

		if err != sql.ErrNoRows {
			logging.WarningLogger.Printf("error getting assignment: %v\n", err)
		}
		return
	}

	if assignment.User.ID != user.ID {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"you are not the creator of this assignment"},
		}, http.StatusForbidden)
		return
	}

	type updateDataStruct struct {
		Title   *string           `json:"title"`
		DueDate *structs.UnixTime `json:"due_date"`
		// TODO: add other fields to be changed
	}

	var updateData updateDataStruct
	err = json.NewDecoder(r.Body).Decode(&updateData)
	if err != nil {
		_ = returnApiResponse(w, apiResponse{
			Errors: []string{"bad request"},
		}, 400)
		return
	}

	if updateData.Title != nil {
		assignment.Title = *updateData.Title
	}

	if updateData.DueDate != nil {
		assignment.DueDate = *updateData.DueDate
	}

	if err := db.UpdateAssignment(id, assignment); err != nil {
		logging.WarningLogger.Printf("error updating assignment: %v\n", err)
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"internal server error"},
		}, 500)
		return
	}

	_ = returnApiResponse(w, apiResponse{
		Content: assignment.GetClean(),
	}, 200)
}

func GetContributors(w http.ResponseWriter, r *http.Request) {
	user, authenticated, err := getUserBySession(r, true)
	if err != nil {
		if err == sql.ErrNoRows {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"not authenticated"},
			}, 401)
			return
		}
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

	// TODO: find actual reason courses are doubled?
	// maybe because cache and new courses are merged? idk
	var idsSeen []interface{}
	var filteredCourses []structs.Course
	for _, c := range user.Courses {
		duplicate := false
		for _, id := range idsSeen {
			if c.ID == id {
				duplicate = true
				break
			}
		}

		if !duplicate {
			// logging.DebugLogger.Printf("not duplicate: %+v\n", c)
			filteredCourses = append(filteredCourses, c)
			idsSeen = append(idsSeen, c.ID)
		}
	}

	var contributorThings map[string]int = make(map[string]int)

	for _, c := range filteredCourses {
		for _, a := range c.Assignments {
			if _, ok := contributorThings[a.User.Username]; !ok {
				contributorThings[a.User.Username] = 1
			} else {
				contributorThings[a.User.Username]++
			}
		}
	}

	_ = returnApiResponse(w, apiResponse{
		Content: contributorThings,
	}, 200)
}

func GetContributorsAdmin(w http.ResponseWriter, r *http.Request) {
	user, authenticated, err := getUserBySession(r, true)
	if err != nil {
		if err == sql.ErrNoRows {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"not authenticated"},
			}, 401)
			return
		}
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

	if user.Privilege < 1 {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"permission denied"},
		}, 403)
		return
	}

	var contributorThings map[string]int = make(map[string]int)

	allAssignments, err := db.GetAllAssignments()
	if err != nil {
		// ignore sql.ErrNoRows
		if err != sql.ErrNoRows {
			logging.WarningLogger.Printf("error getting all assignments from db: %v\n", err)
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"internal server error"},
			}, 500)
		}
	}

	for _, a := range allAssignments {
		if _, ok := contributorThings[a.User.Username]; !ok {
			contributorThings[a.User.Username] = 1
		} else {
			contributorThings[a.User.Username]++
		}
	}

	_ = returnApiResponse(w, apiResponse{
		Content: contributorThings,
	}, 200)
}
