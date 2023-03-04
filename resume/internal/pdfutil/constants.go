package pdfutil

import "github.com/go-pdf/fpdf"

// File sizes.
const (
	Tabloid = "Tabloid"
	Letter  = fpdf.PageSizeLetter
	Legal   = fpdf.PageSizeLegal
	A3      = fpdf.PageSizeA3
	A4      = fpdf.PageSizeA4
	A5      = fpdf.PageSizeA5
)

// File units.
const (
	Centimeter = fpdf.UnitCentimeter
	Millimeter = fpdf.UnitMillimeter
	Point      = fpdf.UnitPoint
	Inch       = fpdf.UnitInch
)

// File orientations.
const (
	Portrait  = fpdf.OrientationPortrait
	Landscape = fpdf.OrientationLandscape
)

// Font styles.
const (
	Bold       = "B"
	Italic     = "I"
	Regular    = ""
	Underscore = "U"
	StrikeOut  = "S"
)

// Text alignments.
const (
	AlignLeft     = fpdf.AlignLeft
	AlignCenter   = fpdf.AlignCenter
	AlignRight    = fpdf.AlignRight
	AlignTop      = fpdf.AlignTop
	AlignBottom   = fpdf.AlignBottom
	AlignMiddle   = fpdf.AlignMiddle
	AlignBaseline = fpdf.AlignBaseline
)

// Borders.
const (
	BorderNone   = fpdf.BorderNone
	BorderFull   = fpdf.BorderFull
	BorderLeft   = fpdf.BorderLeft
	BorderTop    = fpdf.BorderTop
	BorderRight  = fpdf.BorderRight
	BorderBottom = fpdf.BorderBottom
)
