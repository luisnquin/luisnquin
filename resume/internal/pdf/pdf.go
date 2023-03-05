package pdf

import (
	"io"

	"github.com/go-pdf/fpdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
)

type Writer struct {
	pdf    *fpdf.Fpdf
	writer io.Writer

	beforeX, beforeY float64
}

func NewWriter(w io.Writer) Writer {
	fpdf := fpdf.New(pdfutil.Portrait, pdfutil.Millimeter, pdfutil.Letter, ".")
	fpdf.AddPage()

	return Writer{
		pdf:    fpdf,
		writer: w,
	}
}

func (w Writer) Flush() error {
	return w.pdf.Output(w.writer)
}

func (w *Writer) AddY(y float64) {
	w.beforeY += y
}

func (w Writer) SetLine(x1, y1, x2, y2 float64, opts ...Option) {
	var o options

	for _, opt := range opts {
		opt(&o)
	}

	if len(o.drawRGB) == 3 {
		w.pdf.SetDrawColor(o.drawRGB[0], o.drawRGB[1], o.drawRGB[2])
		defer w.pdf.SetDrawColor(0, 0, 0)
	}

	w.pdf.Line(x1, y1, x2, y2)
}

//nolint:funlen
func (w *Writer) SetText(text string, x, movementToY float64, opts ...Option) {
	var o options

	for _, opt := range opts {
		opt(&o)
	}

	if o.wordSpacing != 0 {
		w.pdf.SetWordSpacing(o.wordSpacing)
		defer w.pdf.SetWordSpacing(0)
	}

	if len(o.fillRGB) == 3 {
		w.pdf.SetFillColor(o.fillRGB[0], o.fillRGB[1], o.fillRGB[2])
		defer w.pdf.SetFillColor(0, 0, 0)
	}

	if len(o.textRGB) == 3 {
		w.pdf.SetTextColor(o.textRGB[0], o.textRGB[1], o.textRGB[2])
		defer w.pdf.SetTextColor(0, 0, 0)
	}

	if o.charsLimit == 0 {
		o.charsLimit = 200
	}

	if o.fontSize != 0 {
		oldSize, _ := w.pdf.GetFontSize()
		w.pdf.SetFontSize(o.fontSize)

		defer w.pdf.SetFontSize(oldSize)
	}

	if o.fontStyle != "" {
		w.pdf.SetFontStyle(o.fontStyle)
		defer w.pdf.SetFontStyle(pdfutil.Regular)
	}

	if o.useX {
		x += w.beforeX
	}

	w.beforeY += movementToY

	if len(text) > int(o.charsLimit) {
		compensation := float64(0)

		lines := w.pdf.SplitText(text, o.charsLimit)

		for _, line := range lines {
			w.pdf.SetXY(x, w.beforeY+compensation)
			w.pdf.Cell(0, 0, line)

			compensation += 5
		}

		w.beforeX = x + float64(len(lines[len(lines)-1]))
		w.beforeY += compensation

		return
	}

	if o.useLink {
		linkId := w.pdf.AddLink()
		w.pdf.SetLink(linkId, w.beforeY, 1)
		w.pdf.Link(x, w.beforeY, 1, 1, linkId)
	}

	w.pdf.SetXY(x, w.beforeY)
	w.pdf.Cell(0, 0, text)

	w.beforeX = x + float64(len(text)*2)
}

func (w Writer) SetFont(familyStr, styleStr string, size float64) {
	w.pdf.SetFont(familyStr, styleStr, size)
}
