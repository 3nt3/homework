package mail

import (
	"fmt"

	"git.teich.3nt3.de/3nt3/homework/logging"
	"git.teich.3nt3.de/3nt3/homework/structs"
	"github.com/segmentio/ksuid"

	gomail "gopkg.in/mail.v2"
)

var SMTPUser string
var SMTPHost string
var SMTPPassword string

type userUIDPair struct {
	User structs.User
	UID  ksuid.KSUID
}

var userUIDPairs []userUIDPair

func WelcomeMail(user structs.User) error {
	subject := "ACTION REQUIRED: confirm your hausis.3nt3.de account"

	uid := ksuid.New()

	logging.InfoLogger.Printf("sending mail to %s with subject '%s'\n", user.Email, subject)
	message := fmt.Sprintf("welcome to hausis.3nt3.de. to activate your account please press this link lol:\n\nhttps://hausis.3nt3.de/confirm/%s", uid.String())

	m := gomail.NewMessage()

	m.SetHeader("From", SMTPUser)
	m.SetHeader("To", user.Email)
	m.SetHeader("Subject", subject)
	m.SetBody("text/plain", message)

	d := gomail.NewDialer(SMTPHost, 587, SMTPUser, SMTPPassword)

	err := d.DialAndSend(m)
	if err != nil {
		return err
	}

	userUIDPairs = append(userUIDPairs, userUIDPair{User: user, UID: uid})

	return nil
}
