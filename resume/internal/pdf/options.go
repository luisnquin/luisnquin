package pdf

import "github.com/gookit/color"

type Option func(*options)

type options struct {
	drawRGB, fillRGB, textRGB []int
	wordSpacing               float64
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
