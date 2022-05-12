package service

type screenshot struct{}

var Screenshot *screenshot = &screenshot{}

// Take screenshot website and return path of image save in /tmp/screenshot.jpeg
func (s *screenshot) TakeScreenShot(URL *string) (*string, error) {
	panic("implement me")
}
