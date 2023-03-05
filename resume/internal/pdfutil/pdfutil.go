package pdfutil

import "fmt"

func ToBullet(text string) string {
	return fmt.Sprintf(" - %s", text)
}
