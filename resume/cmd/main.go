package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/url"
	"os"
	"path/filepath"

	"github.com/go-cmd/cmd"
	"github.com/luisnquin/luisnquin/resume/internal/logger"
	"github.com/luisnquin/luisnquin/resume/internal/models"
	"github.com/luisnquin/luisnquin/resume/internal/pdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
	"github.com/mitchellh/go-ps"
)

func main() {
	dev := flag.Bool("dev", false, "runs the program in development mode")
	flag.Parse()

	inputFile := flag.Arg(0) // TODO: how to process batch
	if inputFile == "" {
		logger.Fatal().Msg("input file not specified")
	}

	logger.Trace().Str("input file", inputFile).Send()

	if _, err := os.Stat(inputFile); err != nil {
		logger.Fatal().Err(err).Send()
	}

	outputFile := flag.Arg(1)
	if outputFile == "" {
		logger.Fatal().Msg("output file not specified")
	}

	logger.Trace().Str("output file", outputFile).Send()

	if *dev {
		logger.Info().Msgf("in development mode")

		process(inputFile, outputFile, true)
	} else {
		process(inputFile, outputFile, false)
	}
}

func process(inputFile, outputFile string, openIfNeeded bool) {
	try(os.MkdirAll(filepath.Dir(outputFile), 0o700))

	f, err := os.Create(outputFile)
	try(err)

	defer f.Close()

	logger.Trace().Str("file", outputFile).Msg("file created")

	if openIfNeeded {
		openZathuraIfNeeded(outputFile)
	}

	userInfo, err := readUserInfo(inputFile)
	if err != nil {
		logger.Fatal().Err(err).Msg("while trying to input file")
	}

	try(generatePdf(f, userInfo))

	logger.Trace().Msg("pdf successfully generated")
}

func usage() {
}

func readUserInfo(inputFile string) (*models.UserInfo, error) {
	data, err := os.ReadFile(inputFile)
	if err != nil {
		logger.Fatal().Err(err).Msg("unexpected error reading input file")
	}

	userInfo := new(models.UserInfo)

	return userInfo, json.Unmarshal(data, userInfo)
}

func generatePdf(w io.Writer, owner *models.UserInfo) error {
	writer := pdf.NewWriter(w)

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

func openZathuraIfNeeded(filePath string) {
	processes, err := ps.Processes()
	try(err)

	found := false

	for _, proc := range processes {
		if proc.Executable() == ".zathura-wrappe" {
			found = true

			break
		}
	}

	if !found {
		logger.Info().Msg("zathura process not found, a new one will be created")

		zathura := cmd.NewCmd("zathura", filePath)
		zathura.Start()
		logger.Info().Strs("cmd", zathura.Args).Msg("zathura has been started")
	} else {
		logger.Info().Msg("zathura is already running")
	}
}

func try(err error) {
	if err != nil {
		logger.Err(err).Msg("failed attempt")
		os.Exit(2)
	}
}
