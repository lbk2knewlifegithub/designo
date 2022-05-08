# Auth
auth-watch:
	cd auth && air	
auth:
	go run auth
auth-tidy:
	cd auth && go mod tidy && cd -

# feedback
feedback-watch:
	cd feedback && air	
feedback:
	go run feedback
feedback-tidy:
	cd feedback && go mod tidy && cd -

# Shared
shared-tidy:
	cd shared && go mod tidy && cd -


tidy: auth-tidy feedback-tidy shared-tidy

env:
	export $(grep -v '^#' .env | xargs)