export API-IMAGE-NAME=lbk2kdocker/api:$(VERSION)
export IMAGE-UPLOADER-IMAGE-NAME=lbk2kdocker/client-image-uploader:$(VERSION)

auth-dev:
	cargo run --bin auth	

auth-prod:
	cargo run --bin auth --release

product-feedbacks-dev:
	cargo run --bin product-feedbacks	

product-feedbacks-prod:
	cargo run --bin product-feedbacks --release

images-dev:
	cargo run --bin images	

images-prod:
	cargo run --bin images --release