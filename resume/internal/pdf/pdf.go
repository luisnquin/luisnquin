package pdf

import (
	"io"

	"github.com/go-pdf/fpdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
)

type Writer struct {
	writer *fpdf.Fpdf
}

func NewWriter() Writer {
	writer := fpdf.New(pdfutil.Portrait, pdfutil.Millimeter, pdfutil.Letter, ".")
	writer.AddPage()

	return Writer{
		writer: writer,
	}
}

func (w Writer) SetLine(x1, y1, x2, y2 float64, opts ...Option) {
	var o options

	for _, opt := range opts {
		opt(&o)
	}

	if len(o.drawRGB) == 3 {
		w.writer.SetDrawColor(o.drawRGB[0], o.drawRGB[1], o.drawRGB[2])
		defer w.writer.SetDrawColor(0, 0, 0)
	}

	w.writer.Line(x1, y1, x2, y2)
}

func (w Writer) SetText(text string, x, y float64, opts ...Option) {
	var o options

	for _, opt := range opts {
		opt(&o)
	}

	if o.wordSpacing != 0 {
		w.writer.SetWordSpacing(o.wordSpacing)
		defer w.writer.SetWordSpacing(0)
	}

	if len(o.fillRGB) == 3 {
		w.writer.SetFillColor(o.fillRGB[0], o.fillRGB[1], o.fillRGB[2])
		defer w.writer.SetFillColor(0, 0, 0)
	}

	if len(o.textRGB) == 3 {
		w.writer.SetTextColor(o.textRGB[0], o.textRGB[1], o.textRGB[2])
		defer w.writer.SetTextColor(0, 0, 0)
	}

	if o.charsLimit == 0 {
		o.charsLimit = 200
	}

	if len(text) > int(o.charsLimit) {
		compensation := float64(0)

		for _, line := range w.writer.SplitText(text, o.charsLimit) {
			w.writer.SetXY(x, y+compensation)
			w.writer.Cell(0, 0, line)

			compensation += 5
		}
	} else {
		w.writer.SetXY(x, y)
		w.writer.Cell(0, 0, text)
	}
}

func (w Writer) SetFont(familyStr, styleStr string, size float64) {
	w.writer.SetFont(familyStr, styleStr, size)
}

func (p Writer) OutTo(w io.Writer) error {
	return p.writer.Output(w)
}
