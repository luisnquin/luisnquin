package pdf

import (
	"io"

	"github.com/go-pdf/fpdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
)

type PDF struct {
	writer *fpdf.Fpdf
}

func NewWriter() PDF {
	writer := fpdf.New(pdfutil.Portrait, pdfutil.Millimeter, pdfutil.Letter, ".")
	writer.AddPage()

	return PDF{
		writer: writer,
	}
}

func (p PDF) SetLine(x1, y1, x2, y2 float64, opts ...Option) {
	var o options

	for _, opt := range opts {
		opt(&o)
	}

	if len(o.drawRGB) == 3 {
		p.writer.SetDrawColor(o.drawRGB[0], o.drawRGB[1], o.drawRGB[2])
		defer p.writer.SetDrawColor(0, 0, 0)
	}

	p.writer.Line(x1, y1, x2, y2)
}

func (p PDF) SetText(text string, x, y float64, opts ...Option) {
	var o options

	for _, opt := range opts {
		opt(&o)
	}

	if o.wordSpacing != 0 {
		p.writer.SetWordSpacing(o.wordSpacing)
		defer p.writer.SetWordSpacing(0)
	}

	// if len(o.drawRGB) == 3 {
	// 	p.writer.SetDrawColor(o.drawRGB[0], o.drawRGB[1], o.drawRGB[2])
	// 	defer p.writer.SetDrawColor(0, 0, 0)
	// }

	if len(o.fillRGB) == 3 {
		p.writer.SetFillColor(o.fillRGB[0], o.fillRGB[1], o.fillRGB[2])
		defer p.writer.SetFillColor(0, 0, 0)
	}

	if len(o.textRGB) == 3 {
		p.writer.SetTextColor(o.textRGB[0], o.textRGB[1], o.textRGB[2])
		defer p.writer.SetTextColor(0, 0, 0)
	}

	if len(text) > 200 {
		compensation := float64(0)

		for _, line := range p.writer.SplitText(text, 200) {
			p.writer.SetXY(x, y+compensation)
			p.writer.Cell(0, 0, line)

			compensation += 5
		}
	} else {
		p.writer.SetXY(x, y)
		p.writer.Cell(0, 0, text)
	}
}

func (p PDF) SetFont(familyStr, styleStr string, size float64) {
	p.writer.SetFont(familyStr, styleStr, size)
}

func (p PDF) OutTo(w io.Writer) error {
	return p.writer.Output(w)
}
