package main

import (
	"os"

	"github.com/goccy/go-json"
	"github.com/luisnquin/luisnquin/resume/internal/models"
	"github.com/luisnquin/luisnquin/resume/internal/pdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
)

func main() {
	userInfo, err := os.ReadFile("./user_info.json")
	try(err)

	var user models.UserInfo

	try(json.Unmarshal(userInfo, &user))

	writer := pdf.NewWriter()
	writer.SetFont("Arial", pdfutil.Bold, 20)
	writer.SetText(user.FullName, 11, 15) // ! fix

	writer.SetFont("Arial", pdfutil.Regular, 9)
	writer.SetText(user.Contact.PhoneNumber, 11, 26)
	writer.SetText(user.Contact.Email, 11, 30)
	writer.SetText(user.Contact.Web, 11, 34)

	writer.SetText(user.SelfDescription, 10, 43)
	writer.SetLine(210, 70, 10, 70, pdf.WithDrawColor("#8f8f8f"))

	f, err := os.Create("./build/resume.pdf")
	try(err)

	defer f.Close()

	try(writer.OutTo(f))
}

func try(err error) {
	if err != nil {
		panic(err)
	}
}
