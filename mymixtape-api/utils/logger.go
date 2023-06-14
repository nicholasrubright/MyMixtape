package utils

import "log"

const (
	colorRed   = "\033[31m"
	colorReset = "\033[0m"
)

func LogError(endpoint string, message string) {
	log.Println(string(colorRed), "Error at "+endpoint+": "+message, string(colorReset))
}