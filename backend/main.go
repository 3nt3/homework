package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/pelletier/go-toml"

	"git.teich.3nt3.de/3nt3/homework/db"
	"git.teich.3nt3.de/3nt3/homework/logging"
	"git.teich.3nt3.de/3nt3/homework/mail"
	"git.teich.3nt3.de/3nt3/homework/routes"
	"git.teich.3nt3.de/3nt3/homework/structs"
	"github.com/gorilla/mux"
)

func main() {
	logging.InitLoggers()

	// configuration
	bytes, err := ioutil.ReadFile("config.toml")
	if err != nil {
		logging.ErrorLogger.Printf("error reading config.toml: %s\n", err.Error())
		return
	}

	config, err := toml.Load(string(bytes))
	if err != nil {
		logging.ErrorLogger.Printf("error reading config.toml: %s\n", err.Error())
		return
	}

	mail.SMTPHost = config.Get("smtp.host").(string)
	mail.SMTPUser = config.Get("smtp.user").(string)
	mail.SMTPPassword = config.Get("smtp.password").(string)

	err = mail.WelcomeMail(structs.User{Email: "gott@3nt3.de"})
	if err != nil {
		logging.ErrorLogger.Printf("error sending mail: %s\n", err.Error())
		return
	}

	port := 8005

	err = db.InitDatabase(false)

	if err != nil {
		logging.ErrorLogger.Printf("error connecting to db: %v\n", err)
		return
	}

	InterruptHandler()

	r := mux.NewRouter()
	r.Methods("OPTIONS").HandlerFunc(handlePreflight)

	// /user routes
	r.HandleFunc("/user/register", routes.NewUser).Methods("POST")
	r.HandleFunc("/user", routes.GetUser).Methods("GET")
	r.HandleFunc("/user/login", routes.Login).Methods("POST")
	r.HandleFunc("/user/online-users", routes.OnlineUsers).Methods("GET")
	r.HandleFunc("/user/{id}", routes.GetUserById).Methods("GET")

	// misc
	r.HandleFunc("/username-taken/{username}", routes.UsernameTaken)
	r.HandleFunc("/email-taken/{email}", routes.EmailTaken)

	// /assignment routes
	r.HandleFunc("/assignment", routes.CreateAssignment).Methods("POST")
	r.HandleFunc("/assignment", routes.DeleteAssignment).Methods("DELETE")
	r.HandleFunc("/assignments", routes.GetAssignments).Methods("GET")

	// /courses routes
	r.HandleFunc("/courses/active", routes.GetActiveCourses)
	r.HandleFunc("/courses/search/{searchterm}", routes.SearchCourses)

	// /moodle routes
	r.HandleFunc("/moodle/authenticate", routes.MoodleAuthenticate).Methods("POST")
	r.HandleFunc("/moodle/get-school-info", routes.MoodleGetSchoolInfo).Methods("POST")
	// TODO: /moodle/get-courses

	r.HandleFunc("/metrics", routes.Metrics).Methods("GET")

	r.Use(loggingMiddleware)
	r.Use(corsMiddleware)

	logging.InfoLogger.Printf("started server on port %d", port)
	logging.ErrorLogger.Fatalln(http.ListenAndServe(fmt.Sprintf(":%d", port), r).Error())
}

func InterruptHandler() {
	c := make(chan os.Signal)

	signal.Notify(c, syscall.SIGINT)
	signal.Notify(c, syscall.SIGTERM)
	go func() {
		<-c
		logging.InfoLogger.Printf("closing db connection...")
		db.CloseConnection()
		logging.InfoLogger.Printf("done!")

		logging.InfoLogger.Printf("exiting...")
		os.Exit(0)
	}()
}

func loggingMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.RequestURI != "/metrics" {
			// for use behind reverse proxy which sets X-Real-IP to the remote address
			logging.InfoLogger.Printf("request to %s from %s", r.RequestURI, r.Header.Get("X-Real-IP"))
			routes.Requests = append(routes.Requests, routes.Request{Time: time.Now(), Request: r})
		}

		// do normal stuff
		h.ServeHTTP(w, r)
	})
}

func corsMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "OPTIONS" {
			handlePreflight(w, r)
		}

		// do normal stuff
		h.ServeHTTP(w, r)
	})
}

func handlePreflight(w http.ResponseWriter, r *http.Request) {
	// set cors headers
	// very secure lol
	w.Header().Add("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Add("Access-Control-Allow-Credentials", "true")
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type, x-requested-with, Origin")
	w.Header().Add("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
}
