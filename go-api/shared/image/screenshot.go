package image

import (
	"context"
	"github.com/chromedp/chromedp"
	"log"
)

func TakeScreenshot(url *string) (*[]byte, error) {
	// create context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// capture screenshot of an element
	var buf []byte

	// capture entire browser viewport, returning png with quality=90
	if err := chromedp.Run(ctx,
		chromedp.Tasks{
			chromedp.EmulateViewport(1440, 0),
			chromedp.Navigate(*url),
			chromedp.FullScreenshot(&buf, 70),
		},
	); err != nil {
		log.Println("Error capture screenshot: ", err)
		return nil, err
	}

	return &buf, nil
}
