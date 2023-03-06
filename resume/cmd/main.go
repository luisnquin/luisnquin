package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/goccy/go-json"
	"github.com/luisnquin/luisnquin/resume/internal/models"
	"github.com/luisnquin/luisnquin/resume/internal/pdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
)

func main() {
	dev := flag.Bool("dev", false, "runs the program in development mode")
	flag.Parse()

	fmt.Println(dev)

	f, err := os.Create("./build/resume.pdf")
	try(err)

	defer f.Close()

	userInfo, err := os.ReadFile("./assets/user_info.json")
	try(err)

	var owner models.UserInfo

	try(json.Unmarshal(userInfo, &owner))

	writer := pdf.NewWriter(f)
	writer.SetFont("Arial", pdfutil.Bold, 20)
	writer.SetText(owner.FullName, 11, 15)

	writer.SetFont("Arial", pdfutil.Regular, 9)
	writer.SetText(owner.Contact.PhoneNumber, 11, 8)
	writer.SetText(owner.Contact.Email, 11, 5)
	writer.SetText(owner.Contact.Web, 11, 5, pdf.WithTextColor("#295ee3"), pdf.IsLink())

	writer.SetText(owner.SelfDescription, 10, 10, pdf.WithFontSize(10))
	writer.SetLine(210, 70, 10, 70, pdf.WithDrawColor("#8f8f8f"))

	writer.SetText("Work experiences", 10, 9, pdf.WithFontSize(14), pdf.WithFontStyle(pdfutil.Bold))
	writer.AddY(2)

	for _, je := range owner.JobExperiences {
		writer.SetText(je.Position, 11, 5, pdf.WithFontSize(10), pdf.WithFontStyle(pdfutil.Bold))
		writer.SetText(fmt.Sprintf("%s %s", je.Company, je.FromToLabel), 11, 4,
			pdf.WithFontSize(9), pdf.WithFontStyle(pdfutil.Italic), pdf.WithTextColor("#2b2b2b"))

		writer.SetText(je.Description, 10, 5, pdf.WithFontSize(10))
	}

	writer.SetLine(210, 188, 10, 188, pdf.WithDrawColor("#8f8f8f"))

	writer.SetText("Hobbies", 10, 7, pdf.WithFontSize(13), pdf.WithFontStyle(pdfutil.Bold))
	writer.AddY(1)

	for _, hobby := range owner.Hobbies {
		writer.SetText(pdfutil.ToBullet(fmt.Sprintf("%s:", hobby.Label)), 10, 5,
			pdf.WithFontStyle(pdfutil.Bold, pdfutil.Italic))
		writer.SetText(hobby.Description, -1, 0, pdf.UsingX())
	}

	try(writer.Flush())
}

func try(err error) {
	if err != nil {
		panic(err)
	}
}
