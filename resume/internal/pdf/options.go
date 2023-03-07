package pdf

import (
	"strings"

	"github.com/gookit/color"
)

type Option func(*options)

type options struct {
	drawRGB, fillRGB, textRGB         []int
	wordSpacing, charsLimit, fontSize float64

	fontStyle string
	useX      bool
}

func WithSpaceSize(spaceSize float64) Option {
	return func(o *options) {
		o.wordSpacing = spaceSize
	}
}

func WithDrawColor(hex string) Option {
	return func(o *options) {
		o.drawRGB = color.HEX(hex).Values()
	}
}

func WithFillColor(hex string) Option {
	return func(o *options) {
		o.fillRGB = color.HEX(hex).Values()
	}
}

func WithTextColor(hex string) Option {
	return func(o *options) {
		o.textRGB = color.HEX(hex).Values()
	}
}

func WithFontSize(size float64) Option {
	return func(o *options) {
		o.fontSize = size
	}
}

func WithFontStyle(styles ...string) Option {
	var style strings.Builder

	for _, s := range styles {
		style.WriteString(s)
	}

	return func(o *options) {
		o.fontStyle = style.String()
	}
}

func WithCharsLimit(limit float64) Option {
	return func(o *options) {
		o.charsLimit = limit
	}
}

func UsingX() Option {
	return func(o *options) {
		o.useX = true
	}
}
