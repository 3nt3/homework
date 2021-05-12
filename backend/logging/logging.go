package logging

import (
	"io"
	"io/ioutil"
	"log"
	"os"

	"git.teich.3nt3.de/3nt3/homework/color"
)

var (
	WarningLogger *log.Logger
	InfoLogger    *log.Logger
	ErrorLogger   *log.Logger
	DebugLogger   *log.Logger
)

func InitLoggers(debug bool) {
	// logging
	file, err := os.OpenFile("logs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
	}

	mw := io.MultiWriter(file, os.Stdout)
	WarningLogger = log.New(mw, color.Yellow+"[WARNING] "+color.Reset, log.Ldate|log.Ltime|log.Lshortfile)
	InfoLogger = log.New(mw, color.Cyan+"[INFO] "+color.Reset, log.Ldate|log.Ltime|log.Lshortfile)
	ErrorLogger = log.New(mw, color.Red+"[ERROR] "+color.Reset, log.Ldate|log.Ltime|log.Lshortfile)

	var debuggingWriter io.Writer
	if debug {
		debuggingWriter = os.Stdout
	} else {
		debuggingWriter = ioutil.Discard
	}
	DebugLogger = log.New(debuggingWriter, color.Purple+"[DEBUG] "+color.Reset, log.Ldate|log.Ltime|log.Lshortfile)

	DebugLogger.Printf("loggers created lol")
}
