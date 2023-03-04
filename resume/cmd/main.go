package main

import (
	"github.com/go-pdf/fpdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
)

func main() {
	pdf := fpdf.New(pdfutil.Portrait, pdfutil.Millimeter, pdfutil.A4, ".")

	pdf.AddPage()
	pdf.SetFont("Arial", "B", 16)
	pdf.Cell(40, 10, "Hello, world")

	if err := pdf.OutputFileAndClose("./build/resume.pdf"); err != nil {
		panic(err)
	}
}
