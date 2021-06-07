package routes

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strings"

	"git.teich.3nt3.de/3nt3/homework/db"
	"git.teich.3nt3.de/3nt3/homework/logging"
)

func MoodleAuthenticate(w http.ResponseWriter, r *http.Request) {

	user, authenticated, err := getUserBySession(r, false)
	if err != nil {
		logging.WarningLogger.Printf("error getting user by session: %v\n", err)
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"error authenticating"},
		}, 500)
		return
	}

	if !authenticated {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"invalid credentials"},
		}, 401)
		return
	}

	// decode moodle credentials
	type moodleLoginData struct {
		Username string `json:"username"`
		Password string `json:"password"`
		URL      string `json:"url"`
	}

	var loginData moodleLoginData
	if err = json.NewDecoder(r.Body).Decode(&loginData); err != nil {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"bad body (not valid json)"},
		}, 400)
		return
	}

	// replace http:// with https://
	loginData.URL = strings.Replace(loginData.URL, "http://", "https://", 1)

	// make request to moodle
	values := url.Values{}
	values.Set("username", loginData.Username)
	values.Set("password", loginData.Password)
	resp, err := http.PostForm(loginData.URL+"/login/token.php?service=moodle_mobile_app", values)

	if err != nil {
		if resp != nil {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"error accessing moodle"},
			}, resp.StatusCode)
		} else {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"error accessing moodle"},
			}, 500)
		}
		logging.WarningLogger.Printf("error: %v", err)
		return
	}

	if resp != nil {
		if resp.StatusCode != 200 {
			_ = returnApiResponse(w, apiResponse{
				Content: nil,
				Errors:  []string{"error accessing moodle"},
			}, resp.StatusCode)
			return
		}
	}

	// decode response
	type moodleTokenResponse struct {
		Token string `json:"token"`
	}
	tokenResp := moodleTokenResponse{}

	err = json.NewDecoder(resp.Body).Decode(&tokenResp)
	if err != nil {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"error accessing moodle"},
		}, 500)
		logging.WarningLogger.Printf("error: %v", err)
		return
	}

	logging.DebugLogger.Printf("token: %v\n", tokenResp.Token)

	// get user id
	idResp, err := http.PostForm(loginData.URL+"/webservice/rest/server.php", url.Values{
		"wstoken":            {tokenResp.Token},
		"wsfunction":         {"core_user_get_users_by_field"},
		"field":              {"username"},
		"values[0]":          {loginData.Username},
		"moodlewsrestformat": {"json"},
	})
	if err != nil {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"error accessing moodle"},
		}, resp.StatusCode)
		logging.WarningLogger.Printf("error: %v", err)
		return
	}

	var responseData []map[string]interface{}

	// debugging
	err = json.NewDecoder(idResp.Body).Decode(&responseData)
	if err != nil {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"error accessing moodle"},
		}, 500)
		return
	}

	idInterface, ok := responseData[0]["id"]
	if !ok {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"error accessing moodle"},
		}, 500)
		logging.WarningLogger.Printf("error: no id returned. data: %+v", responseData)
		return
	}

	id := int(idInterface.(float64))

	updatedUser, err := db.UpdateMoodleData(user, loginData.URL, tokenResp.Token, id, false)
	if err != nil {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"internal server error"},
		}, 500)
		logging.InfoLogger.Printf("error updating user: %v\n", err)
		return
	}
	_ = returnApiResponse(w, apiResponse{Content: updatedUser.GetClean()}, 200)
}

func MoodleGetSchoolInfo(w http.ResponseWriter, r *http.Request) {

	type requestStruct struct {
		Url string `json:"url"`
	}

	var requestData requestStruct
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		logging.WarningLogger.Printf("invalid json: %v\n", err)
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"bad body"},
		}, http.StatusBadRequest)
		return
	}
	if _, err := url.Parse(requestData.Url); err != nil {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"invalid url"},
		}, http.StatusBadRequest)
		return
	}

	requestURL := requestData.Url + "/lib/ajax/service-nologin.php?args=[{\"index\":0,\"methodname\":\"tool_mobile_get_public_config\",\"args\":[]}]"

	resp, err := http.Get(requestURL)
	if err != nil {
		logging.WarningLogger.Printf("error accessing moodle: %v\n", err)
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"invalid url"},
		}, http.StatusBadRequest)
		return
	}

	if resp.StatusCode != 200 {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"invalid url"},
		}, http.StatusBadRequest)
		return
	}

	var moodleSiteData []map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&moodleSiteData); err != nil || len(moodleSiteData) == 0 {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"invalid url", "moodle returned bad data"},
		}, http.StatusBadRequest)
		return
	}

	relevantData, ok := moodleSiteData[0]["data"]
	if !ok {
		_ = returnApiResponse(w, apiResponse{
			Content: nil,
			Errors:  []string{"invalid url", "moodle returned bad data"},
		}, http.StatusBadRequest)
		return
	}

	_ = returnApiResponse(w, apiResponse{Content: relevantData}, 200)
}
