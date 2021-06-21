package routes

import (
	"database/sql"
	"net/http"
	"time"

	"git.teich.3nt3.de/3nt3/homework/db"
	"git.teich.3nt3.de/3nt3/homework/logging"
	"git.teich.3nt3.de/3nt3/homework/structs"
	"github.com/gorilla/mux"
)

func GetActiveCourses(w http.ResponseWriter, r *http.Request) {

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

	courses, err := db.GetMoodleUserCourses(user)
	if err != nil {
		if err.Error() == "no token or moodle url was provided" {
			logging.InfoLogger.Printf("no moodle access configured for user %s\n", user.ID.String())

			_ = returnApiResponse(w, apiResponse{
				Content: []string{},
				Errors:  []string{},
			}, 200)
			return
		}
		logging.ErrorLogger.Printf("error: %v\n", err)
	}

	var filteredCourses []structs.Course
	for _, c := range courses {
		var filteredAssignments []structs.Assignment
		for _, a := range c.Assignments {
			if time.Time(a.DueDate).Truncate(24*time.Hour).After(time.Now().Truncate(24*time.Hour)) || time.Time(a.DueDate).Truncate(24*time.Hour).Equal(time.Now().Truncate(24*time.Hour)) {
				filteredAssignments = append(filteredAssignments, a)
			}
		}

		if len(filteredAssignments) > 0 {
			c.Assignments = filteredAssignments
			filteredCourses = append(filteredCourses, c)
		}
	}

	var cleanCourses = make([]structs.CleanCourse, 0)
	for _, c := range filteredCourses {
		cleanCourses = append(cleanCourses, c.GetClean())
	}

	// TODO: find actual reason courses are doubled?
	// maybe because cache and new courses are merged? idk
	var idsSeen []interface{}
	var filteredFilteredCourses []structs.CleanCourse = make([]structs.CleanCourse, 0)
	for _, c := range cleanCourses {
		duplicate := false
		for _, id := range idsSeen {
			if c.ID == id {
				duplicate = true
				break
			}
		}

		if !duplicate {
			// logging.DebugLogger.Printf("not duplicate: %+v\n", c)
			filteredFilteredCourses = append(filteredFilteredCourses, c)
			idsSeen = append(idsSeen, c.ID)
		}
	}

	_ = returnApiResponse(w, apiResponse{
		Content: filteredFilteredCourses,
		Errors:  []string{},
	}, 200)
}

func SearchCourses(w http.ResponseWriter, r *http.Request) {
	user, authenticated, err := getUserBySession(r, false)
	if !authenticated {
		if err != nil {
			logging.ErrorLogger.Printf("error getting user by session: %v\n", err)
		}
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"invalid session"},
		}, 401)
		return
	}

	searchterm, ok := mux.Vars(r)["searchterm"]
	if !ok {
		_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"no searchterm provided"}}, http.StatusBadRequest)
		return
	}

	matchingCourses, err := db.SearchUserCourses(searchterm, user)
	if err != nil {
		if err == sql.ErrNoRows {
			_ = returnApiResponse(w, apiResponse{Content: []interface{}{}, Errors: []string{}}, http.StatusOK)
		} else {
			logging.ErrorLogger.Printf("an error occured searching courses: %v", err)
			_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"internal server error"}}, http.StatusInternalServerError)
		}
		return
	}

	cleanCourses := []structs.CleanCourse{}
	for _, c := range matchingCourses {
		cleanCourses = append(cleanCourses, c.GetClean())
	}

	_ = returnApiResponse(w, apiResponse{
		Content: cleanCourses,
		Errors:  []string{},
	}, 200)
}

// TODO
func GetAllCourses(w http.ResponseWriter, r *http.Request) {

}

func GetCourseStats(w http.ResponseWriter, r *http.Request) {
	user, authenticated, err := getUserBySession(r, false)
	if !authenticated {
		if err != nil {
			logging.ErrorLogger.Printf("error getting user by session: %v\n", err)
		}
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"not authenticated"},
		}, 401)
		return
	}

	courses, err := db.GetMoodleUserCourses(user)
	if err != nil {
		if err != sql.ErrNoRows {
			logging.ErrorLogger.Printf("error getting courses: %v\n", err)
			_ = returnApiResponse(w, apiResponse{Content: nil, Errors: []string{"internal server error"}}, 500)
			return
		}
	}

	// FIXME: use ids rather than names to avoid confusion
	var courseAssignments map[string]int = make(map[string]int)
	for _, c := range courses {
		// sometimes float64, sometimes int???
		id, ok := c.ID.(int)
		if !ok {
			id = int(c.ID.(float64))
		}
		assignments, err := db.GetAssignmentsByCourse(id)
		if err != nil {
			if err != sql.ErrNoRows {
				logging.WarningLogger.Printf("error getting assignments: %v\n", err)
				continue
			}
		}

		courseAssignments[c.Name] = len(assignments)
	}

	_ = returnApiResponse(w, apiResponse{Content: courseAssignments}, 200)
}
