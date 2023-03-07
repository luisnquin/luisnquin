package main

import (
	"flag"
	"fmt"
	"net/url"
	"os"

	"github.com/goccy/go-json"
	"github.com/luisnquin/luisnquin/resume/internal/logger"
	"github.com/luisnquin/luisnquin/resume/internal/models"
	"github.com/luisnquin/luisnquin/resume/internal/pdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
)

func main() {
	dev := flag.Bool("dev", false, "runs the program in development mode")
	flag.Parse()

	targetFilePath := "./out/luis-quinones.pdf"

	if *dev {
		logger.Info().Msgf("started in development mode")

		targetFilePath = "./build/resume.pdf"
	}

	logger.Trace().Str("file", targetFilePath).Msg("file created")

	f, err := os.Create(targetFilePath)
	try(err)

	defer f.Close()

	userInfo, err := os.ReadFile("./assets/user_info.json")
	try(err)

	owner := new(models.UserInfo)

	try(json.Unmarshal(userInfo, owner))

	try(generate(pdf.NewWriter(f), owner))
}

func generate(writer pdf.Writer, owner *models.UserInfo) error {
	writer.SetFont("Arial", pdfutil.Bold, 20)
	writer.SetText(owner.FullName, 11, 15)
	// Sad fact
	writer.SetLine(41.4, 12.5, 43.5, 12.5)
	writer.SetText(owner.PositionTitle, 11, 7, pdf.WithFontSize(14), pdf.WithTextColor("#2e2e2e"))

	writer.SetFont("Arial", pdfutil.Regular, 9)
	writer.SetText(owner.Contact.PhoneNumber, 11, 8)
	writer.SetText(owner.Contact.Email, 0, 0, pdf.UsingX())

	blueFontOption := pdf.WithTextColor("#295ee3")

	linkedInUrl, err := url.Parse(owner.Contact.Links.LinkedIn)
	if err != nil {
		logger.Fatal().Err(err).Msg("while trying to parse LinkedIn URL")
	}

	githubUrl, err := url.Parse(owner.Contact.Links.GitHub)
	if err != nil {
		logger.Fatal().Err(err).Msg("while trying to parse GitHub URL")
	}

	webUrl, err := url.Parse(owner.Contact.Links.Web)
	if err != nil {
		logger.Fatal().Err(err).Msg("while trying to parse Web URL")
	}

	writer.SetLink(linkedInUrl.String(), linkedInUrl.Path, 0, 0, pdf.UsingX(), blueFontOption)
	writer.SetLink(githubUrl.String(), githubUrl.Host+githubUrl.Path, 0, 0, pdf.UsingX(), blueFontOption)
	writer.SetLink(webUrl.String(), webUrl.Host, 0, 0, pdf.UsingX(), blueFontOption)

	writer.SetText(owner.SelfDescription, 10, 8.5, pdf.WithFontSize(10))

	writer.SetLine(210, 65, 10, 65, pdf.WithDrawColor("#8f8f8f"))

	writer.SetText("Work experiences", 10, 7, pdf.WithFontSize(14), pdf.WithFontStyle(pdfutil.Bold))
	writer.AddY(2)

	for _, je := range owner.JobExperiences {
		writer.SetText(je.Position, 11, 5, pdf.WithFontSize(10), pdf.WithFontStyle(pdfutil.Bold))
		writer.SetText(fmt.Sprintf("%s %s", je.Company, je.FromToLabel), 11, 4,
			pdf.WithFontSize(9), pdf.WithFontStyle(pdfutil.Italic), pdf.WithTextColor("#2b2b2b"))

		writer.SetText(je.Description, 10, 5, pdf.WithFontSize(10))
	}

	writer.SetLine(210, 182, 10, 182, pdf.WithDrawColor("#8f8f8f"))

	writer.SetText("Hobbies", 10, 7, pdf.WithFontSize(13), pdf.WithFontStyle(pdfutil.Bold))
	writer.AddY(1)

	for _, hobby := range owner.Hobbies {
		writer.SetText(pdfutil.ToBullet(fmt.Sprintf("%s:", hobby.Label)), 10, 5,
			pdf.WithFontStyle(pdfutil.Bold, pdfutil.Italic))
		writer.SetText(hobby.Description, -1, 0, pdf.UsingX())
	}

	return writer.Flush()
}

func try(err error) {
	if err != nil {
		logger.Err(err).Msg("failed attempt")
		os.Exit(2)
	}
}
