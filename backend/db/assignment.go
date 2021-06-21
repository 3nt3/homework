package db

import (
	"database/sql"
	"strconv"
	"time"

	"git.teich.3nt3.de/3nt3/homework/structs"
	"github.com/lib/pq"
	"github.com/segmentio/ksuid"
)

func CreateAssignment(assignment structs.Assignment) (structs.Assignment, error) {
	id := ksuid.New()
	_, err := database.Exec("INSERT INTO assignments (id, content, course_id, due_date, creator_id, created_at, from_moodle, done_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", id.String(), assignment.Title, assignment.Course, assignment.DueDate.Time(), assignment.User.ID, assignment.Created.Time(), assignment.FromMoodle, pq.Array(make([]string, 0)))

	newAssignment := assignment
	newAssignment.UID = id

	return newAssignment, err
}

func GetAssignmentByID(id string) (structs.Assignment, error) {
	row := database.QueryRow("SELECT * FROM assignments WHERE id = $1", id)

	var a structs.Assignment
	if row.Err() != nil {
		return a, row.Err()
	}

	var creatorID string
	var dueDateT time.Time

	err := row.Scan(&a.UID, &a.Title, &a.Course, &dueDateT, &creatorID, &a.Created, &a.FromMoodle, pq.Array(&a.DoneBy))
	if err != nil {
		return a, err
	}

	creator, err := GetUserById(creatorID, false)
	a.User = creator
	a.DueDate = structs.UnixTime(dueDateT)

	return a, err
}

func DeleteAssignment(id string) error {
	_, err := database.Exec("DELETE FROM assignments WHERE id = $1", id)
	return err
}

func GetAssignmentsByCourse(courseID int) ([]structs.Assignment, error) {
	rows, err := database.Query("SELECT * FROM assignments WHERE course_id = $1", courseID)

	if err != nil {
		return nil, err
	}

	var assignments []structs.Assignment
	for rows.Next() {
		var a structs.Assignment

		var creatorID string
		var dueDateT time.Time

		err := rows.Scan(&a.UID, &a.Title, &a.Course, &dueDateT, &creatorID, &a.Created, &a.FromMoodle, pq.Array(&a.DoneBy))
		if err != nil {
			return nil, err
		}

		a.DueDate = structs.UnixTime(dueDateT)

		creator, err := GetUserById(creatorID, false)
		a.User = creator
		if err != nil {
			return nil, err
		}

		assignments = append(assignments, a)
	}

	return assignments, nil
}

// GetAssignments returns all assignments that were created by user in the given time frame specified by maxDays.
// If maxDays is -1, time is ignored and all assignments are returned

// FIXME: is this intended behavior? shouldn't all assignments from the specific course be returned?
func GetAssignments(user structs.User, maxDays int) ([]structs.Assignment, error) {
	var rows *sql.Rows
	var err error
	if maxDays == -1 {
		rows, err = database.Query("SELECT * FROM assignments WHERE creator_id = $1", user.ID.String())
	} else {
		rows, err = database.Query("SELECT * FROM assignments WHERE creator_id = $1 AND assignments.due_date >= NOW() - ($2 || ' days')::INTERVAL", user.ID.String(), strconv.Itoa(maxDays))
	}

	if err != nil {
		return nil, err
	}

	var assignments []structs.Assignment
	for rows.Next() {
		var a structs.Assignment

		var creatorID string
		var dueDateT time.Time
		err := rows.Scan(&a.UID, &a.Title, &a.Course, &dueDateT, &creatorID, &a.Created, &a.FromMoodle, pq.Array(&a.DoneBy))
		if err != nil {
			return nil, err
		}

		creator, err := GetUserById(creatorID, false)
		a.User = creator
		a.DueDate = structs.UnixTime(dueDateT)
		if err != nil {
			return nil, err
		}

		assignments = append(assignments, a)
	}
	defer rows.Close()

	return assignments, nil
}

// UpdateAssignment replaces the assignment with the specified id with the specified one
func UpdateAssignment(id string, assignment structs.Assignment) error {
	_, err := database.Exec("UPDATE assignments SET content = $1 WHERE id = $2;", assignment.Title, id)

	return err
}

func GetAllAssignments() ([]structs.Assignment, error) {
	rows, err := database.Query("SELECT * FROM assignments")
	if err != nil {
		return nil, err
	}

	var assignments []structs.Assignment
	for rows.Next() {
		var a structs.Assignment

		var creatorID string
		var dueDateT time.Time
		err := rows.Scan(&a.UID, &a.Title, &a.Course, &dueDateT, &creatorID, &a.Created, &a.FromMoodle, pq.Array(&a.DoneBy))
		if err != nil {
			return nil, err
		}

		creator, err := GetUserById(creatorID, false)
		a.User = creator
		a.DueDate = structs.UnixTime(dueDateT)
		if err != nil {
			return nil, err
		}

		assignments = append(assignments, a)
	}
	defer rows.Close()

	return assignments, nil
}

func AssignmentDone(id string, user_id string, done bool) (err error) {
	a, err := GetAssignmentByID(id)
	if err != nil {
		return err
	}

	var already_marked bool
	for _, u := range a.DoneBy {
		if u == user_id {
			already_marked = true
			break
		}
	}

	var stmt string
	if done {
		if already_marked {
			return nil
		}

		// append user_id to done_by array if done == true
		stmt = "UPDATE assignments SET done_by = array_append(done_by, $1) WHERE id = $2;"
	} else {
		// if not in done_by, do nothing
		if !already_marked {
			return nil
		}

		// remove user_id from done_by array if done == false
		stmt = "UPDATE assignments SET done_by = array_remove(done_by, $1) WHERE id = $2;"
	}
	_, err = database.Exec(stmt, user_id, id)
	if err != nil {
		return
	}

	return
}
