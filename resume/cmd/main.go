package main

import (
	"os"

	"github.com/luisnquin/luisnquin/resume/internal/pdf"
	"github.com/luisnquin/luisnquin/resume/internal/pdfutil"
)

func main() {
	writer := pdf.NewWriter(pdfutil.Portrait, pdfutil.Millimeter, pdfutil.Letter)

	writer.SetFont("Arial", pdfutil.Bold, 20)
	writer.SetText("Luis Quinones Requelme", 11, 15) // ! fix

	writer.SetFont("Arial", pdfutil.Regular, 9)
	writer.SetText("+fe abc def ghi", 11, 26)
	writer.SetText("lpaandres2020@gmail.com", 11, 30)
	writer.SetText("https://luisquinones.me", 11, 34)

	writer.SetText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus nibh, bibendum at maximus at, condimentum vel eros. Morbi nec erat mollis, volutpat leo nec, elementum arcu. Integer porttitor viverra elit, et vulputate neque aliquet nec. Aenean vel tellus pellentesque eros gravida sagittis. Nam luctus varius egestas. Nulla vitae ornare massa. Aenean nec tristique quam, at dictum enim. Ut quis enim tristique, placerat nibh non, sollicitudin dolor. Ut luctus enim vitae sapien porttitor, vel eleifend magna pellentesque. Donec consectetur nisl nec mauris varius tempus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam euismod consequat purus ac consequat. Phasellus eget ipsum ac arcu ultricies faucibus sit amet id risus. Integer ex elit, facilisis quis interdum in, cursus ac ante. Sed quis ipsum quis nibh tincidunt malesuada sed lobortis ligula.", 10, 40)

	writer.SetLine(200, 50, 10, 50, pdf.WithDrawColor("#f05b6a"))

	f, err := os.Create("./build/resume.pdf")
	if err != nil {
		panic(err)
	}

	defer f.Close()

	if err := writer.OutTo(f); err != nil {
		panic(err)
	}
}
