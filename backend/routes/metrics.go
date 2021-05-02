package routes

import (
	"fmt"
	"net/http"
	"time"
)

func Metrics(w http.ResponseWriter, r *http.Request) {
	var keys = make(map[string]int)

	keys["requests_per_minute"] = len(getRequestsAfter(time.Now().Add(time.Minute * -1)))
	keys["online_users"] = len(getOnlineUsers())

	for key, value := range keys {
		fmt.Fprintf(w, "%s %d\n", key, value)
	}
}
