package structs

import (
	"strconv"
	"time"

	"github.com/segmentio/ksuid"
)

// max age in days
const MaxSessionAge int = 90

type User struct {
	ID           ksuid.KSUID `json:"id"`
	Username     string      `json:"username"`
	Email        string      `json:"email"`
	PasswordHash string
	Created      UnixTime `json:"created"`
	Privilege    int8     `json:"privilege"`
	Courses      []Course `json:"courses"`
	MoodleURL    string   `json:"moodle_url"`
	MoodleToken  string   `json:"moodle_token"`
	MoodleUserID int      `json:"moodle_user_id"`
}

type CleanUser struct {
	ID           ksuid.KSUID `json:"id"`
	Username     string      `json:"username"`
	Email        string      `json:"email"`
	Created      UnixTime    `json:"created"`
	Privilege    int8        `json:"privilege"`
	Courses      []Course    `json:"courses"`
	MoodleURL    string      `json:"moodle_url"`
	MoodleUserID int         `json:"moodle_user_id"`
}

func (u User) GetClean() CleanUser {
	return CleanUser{
		ID:           u.ID,
		Username:     u.Username,
		Email:        u.Email,
		Created:      u.Created,
		Privilege:    u.Privilege,
		Courses:      u.Courses,
		MoodleURL:    u.MoodleURL,
		MoodleUserID: u.MoodleUserID,
	}
}

func (a Assignment) GetClean() CleanAssignment {
	return CleanAssignment{
		UID:        a.UID,
		User:       a.User.GetClean(),
		Created:    a.Created,
		Title:      a.Title,
		DueDate:    a.DueDate,
		Course:     a.Course,
		FromMoodle: a.FromMoodle,
	}
}

type Session struct {
	UID     ksuid.KSUID `json:"uid"`
	UserID  ksuid.KSUID `json:"user_id"`
	Created UnixTime    `json:"created"`
}

type Assignment struct {
	UID        ksuid.KSUID `json:"id"`
	User       User        `json:"user"`
	Created    UnixTime    `json:"created"`
	Title      string      `json:"title"`
	DueDate    UnixTime    `json:"due_date"`
	Course     int         `json:"course"`
	FromMoodle bool        `json:"from_moodle"`
}

type CleanAssignment struct {
	UID        ksuid.KSUID `json:"id"`
	User       CleanUser   `json:"user"`
	Created    UnixTime    `json:"created"`
	Title      string      `json:"title"`
	DueDate    UnixTime    `json:"due_date"`
	Course     int         `json:"course"`
	FromMoodle bool        `json:"from_moodle"`
}

type Course struct {
	ID          interface{}  `json:"id"`
	Name        string       `json:"name"`
	Teacher     string       `json:"teacher"`
	FromMoodle  bool         `json:"from_moodle"`
	Assignments []Assignment `json:"assignments"`
	User        ksuid.KSUID  `json:"user"`
}

type CleanCourse struct {
	ID          interface{}       `json:"id"`
	Name        string            `json:"name"`
	Teacher     string            `json:"teacher"`
	FromMoodle  bool              `json:"from_moodle"`
	Assignments []CleanAssignment `json:"assignments"`
	User        ksuid.KSUID       `json:"user"`
}

func (c Course) GetClean() CleanCourse {
	cc := CleanCourse{
		ID:         c.ID,
		Name:       c.Name,
		Teacher:    c.Teacher,
		FromMoodle: c.FromMoodle,
		User:       c.User,
	}
	cc.Assignments = make([]CleanAssignment, 0)
	for i := 0; i < len(c.Assignments); i++ {
		cc.Assignments = append(cc.Assignments, c.Assignments[i].GetClean())
	}

	return cc
}

type CachedCourse struct {
	ID ksuid.KSUID `json:"id"`
	Course
	MoodleURL string      `json:"moodle_url"`
	UserID    ksuid.KSUID `json:"user_id"`
	CachedAt  UnixTime    `json:"cached_at"`
}

type UnixTime time.Time

// MarshalJSON is used to convert the timestamp to JSON
func (t UnixTime) MarshalJSON() ([]byte, error) {
	// uhm ... yeah
	return []byte(strconv.FormatInt(time.Time(t).UnixNano() / int64(time.Millisecond), 10)), nil
}

// UnmarshalJSON is used to convert the timestamp from JSON
func (t *UnixTime) UnmarshalJSON(s []byte) (err error) {
	r := string(s)
	q, err := strconv.ParseInt(r, 10, 64)
	if err != nil {
		return err
	}

	// kinda sketchy but I hope it works
	*(*UnixTime)(t) = UnixTime(time.Unix(q/1000, (q%1000)*int64(time.Nanosecond)))
	return nil
}


func (t UnixTime) Unix() int64 {
	return time.Time(t).Unix()
}

func (t UnixTime) Time() time.Time {
	return time.Time(t).UTC()
}

func (t UnixTime) After(possible time.Time) bool {
	return time.Time(t).After(possible)
}