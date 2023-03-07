package pdf

import (
	"io"

	"github.com/go-pdf/fpdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
)

type Writer struct {
	pdf    *fpdf.Fpdf
	writer io.Writer

	globalX, globalY float64
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
	w.globalY += y
}

func (w Writer) SetFont(familyStr, styleStr string, size float64) {
	w.pdf.SetFont(familyStr, styleStr, size)
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

func (w *Writer) SetLink(link, displayedText string, x, movementToY float64, opts ...Option) {
	options, after := w.useOptions(opts...)

	for _, action := range after {
		defer action()
	}

	if options.useX {
		x += w.globalX
	}

	w.globalY += movementToY
	w.pdf.SetXY(x, w.globalY)
	w.pdf.WriteLinkString(0, displayedText, link)
	w.globalX = x + float64(len(displayedText)*2)
}

func (w *Writer) SetText(text string, x, movementToY float64, opts ...Option) {
	options, after := w.useOptions(opts...)

	for _, action := range after {
		defer action()
	}

	if options.useX {
		x += w.globalX
	}

	w.globalY += movementToY

	if len(text) > int(options.charsLimit) {
		compensation := float64(0)

		lines := w.pdf.SplitText(text, options.charsLimit)

		for _, line := range lines {
			w.pdf.SetXY(x, w.globalY+compensation)
			w.pdf.Cell(0, 0, line)

			compensation += 5
		}

		w.globalX = x + float64(len(lines[len(lines)-1]))
		w.globalY += compensation

		return
	}

	w.pdf.SetXY(x, w.globalY)
	w.pdf.Cell(0, 0, text)

	w.globalX = x + float64(len(text)*2)
}

func (w Writer) useOptions(opts ...Option) (*options, []func()) {
	var (
		o     options
		after []func()
	)

	for _, opt := range opts {
		opt(&o)
	}

	if o.wordSpacing != 0 {
		w.pdf.SetWordSpacing(o.wordSpacing)

		after = append(after, func() { w.pdf.SetWordSpacing(0) })
	}

	if len(o.fillRGB) == 3 {
		w.pdf.SetFillColor(o.fillRGB[0], o.fillRGB[1], o.fillRGB[2])

		after = append(after, func() { w.pdf.SetFillColor(0, 0, 0) })
	}

	if len(o.textRGB) == 3 {
		w.pdf.SetTextColor(o.textRGB[0], o.textRGB[1], o.textRGB[2])

		after = append(after, func() { w.pdf.SetTextColor(0, 0, 0) })
	}

	if o.charsLimit == 0 {
		o.charsLimit = 200
	}

	if o.fontSize != 0 {
		oldSize, _ := w.pdf.GetFontSize()
		w.pdf.SetFontSize(o.fontSize)

		after = append(after, func() { w.pdf.SetFontSize(oldSize) })
	}

	if o.fontStyle != "" {
		w.pdf.SetFontStyle(o.fontStyle)

		after = append(after, func() { w.pdf.SetFontStyle(pdfutil.Regular) })
	}

	return &o, after
}
