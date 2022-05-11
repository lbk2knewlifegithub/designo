# User
user-run:
	cd user && go run . 
user-watch:
	cd user && air	
user-tidy:
	cd user && go mod tidy && cd -

# feedback
feedback-watch:
	cd feedback && air	
feedback:
	go run feedback
feedback-tidy:
	cd feedback && go mod tidy && cd -

# frontendmentor
frontendmentor-watch:
	cd frontendmentor && air	
frontendmentor-run:
	cd frontendmentor && go run .
frontendmentor-tidy:
	cd frontendmentor && go mod tidy && cd -

# upload
upload-watch:
	cd upload && air	
upload-run:
	cd upload && go run .
upload-tidy:
	cd upload && go mod tidy && cd -

# Shared
shared-tidy:
	cd shared && go mod tidy && cd -


tidy: auth-tidy feedback-tidy shared-tidy frontendmentor-tidy upload-tidy

env:
	export $(grep -v '^#' .env | xargs)