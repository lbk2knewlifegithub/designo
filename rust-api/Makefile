export API-IMAGE-NAME=lbk2kdocker/api:$(VERSION)
export IMAGE-UPLOADER-IMAGE-NAME=lbk2kdocker/client-image-uploader:$(VERSION)

# RealTime
realtime-dev:
	cargo run --bin realtime	
realtime-dev-watch:
	cargo watch -c -x 'run --bin realtime'	
realtime-prod:
	cargo run --bin realtime --release

# Report
report-dev:
	cargo run --bin report	
report-dev-watch:
	cargo watch -c -x 'run --bin report'	
report-prod:
	cargo run --bin report --release

# Auth
auth-dev:
	cargo run --bin auth	
auth-dev-watch:
	cargo watch -c -x 'run --bin auth'	
auth-prod:
	cargo run --bin auth --release

# Product Feedbacks
product-feedbacks-dev:
	cargo run --bin product-feedbacks	
product-feedbacks-prod:
	cargo run --bin product-feedbacks --release

# Images
images-dev:
	cargo run --bin images	
images-prod:
	cargo run --bin images --release

# FrontendMentor
frontendmentor-dev:
	cargo run --bin frontendmentor
frontendmentor-dev-watch:
	cargo watch -c -x 'run --bin frontendmentor'	
frontendmentor-prod:
	cargo run --bin frontendmentor --release

# Invoices
invoice-app-dev:
	cargo run --bin invoice-app	
invoice-app-prod:
	cargo run --bin invoice-app --release

# YugabyteDB dev
api-dev:
	docker-compose up -d 
	echo "YugabyteDB, Redis started."