# Auth
auth-run:
	cd auth && go run . 
auth-watch:
	cd auth && air	
auth-tidy:
	cd auth && go mod tidy && cd -

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

# Shared
shared-tidy:
	cd shared && go mod tidy && cd -


tidy: auth-tidy feedback-tidy shared-tidy frontendmentor-tidy

env:
	export $(grep -v '^#' .env | xargs)