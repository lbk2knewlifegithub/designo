VERSION=$(shell echo $RANDOM | md5sum | head -c 20)

staging:
	echo USING VERSION=$(VERSION)
	kubectx minikube
	kubectl apply -f secret/config-staging.yaml

# Upgrade redis
	helm upgrade -i redis-staging -f secret/redis-staging.yaml bitnami/redis

# Upgrade ysql
	helm upgrade -i ysql-staging -f secret/ysql-staging.yaml yugabytedb/yugabyte 

# Build api auth STAGING
	docker build -t lbk2kdocker/api-auth:$(VERSION) api -f api/auth.Dockerfile
	docker push lbk2kdocker/api-auth:$(VERSION)
	helm upgrade -i api-auth-staging charts/api \
	-f values/staging/api-auth.yaml \
	--set tag=$(VERSION)

# Build api product feedbacks STAGING
	docker build -t lbk2kdocker/api-product-feedbacks:$(VERSION) api -f api/product-feedbacks.Dockerfile
	docker push lbk2kdocker/api-product-feedbacks:$(VERSION)

	helm upgrade -i api-product-feedbacks-staging charts/api \
	-f values/staging/api-product-feedbacks.yaml \
	--set tag=$(VERSION)

# Build api images STAGING
	docker build -t lbk2kdocker/api-images:$(VERSION) api \
	-f api/images.Dockerfile
	docker push lbk2kdocker/api-images:$(VERSION)

	helm upgrade -i api-images-staging charts/api-storage \
	-f values/staging/api-images.yaml \
	--set tag=$(VERSION)

# Build Client Product Feedbacks STAGING
	docker build -t lbk2kdocker/client-product-feedbacks:$(VERSION) client \
	-f client/product-feedbacks-stage.Dockerfile
	docker push lbk2kdocker/client-product-feedbacks:$(VERSION)
	helm upgrade -i client-product-feedbacks-staging charts/client \
	-f values/staging/client-product-feedbacks.yaml \
	--set tag=$(VERSION)

# Apply ingress
	kubectl apply -f ingress/api-staging.yaml

# API AUTH
deploy-api-auth:
	okteto ns use lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f .okteto/api-auth.yaml 

# API IMAGES
# okteto ns use lemon-lbk2knewlifegithub && okteto kubeconfig 
deploy-api-images:
	okteto ns use lemon-lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f .okteto/api-images.yaml -n lemon-lbk2knewlifegithub
destroy-api-images:
	okteto destroy -f okteto/api-images.yaml -n lemon-lbk2knewlifegithub

# API PRODUCT FEEDBACKS
deploy-api-product-feedbacks:
	okteto ns use lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f okteto/api-product-feedbacks.yaml 
destroy-api-product-feedbacks:
	okteto destroy -f okteto/api-product-feedbacks.yaml -n lemon-lbk2knewlifegithub

# API FRONTENDMENTOR 
deploy-api-frontendmentor:
	okteto ns use lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f .okteto/api-frontendmentor.yaml 

# CLIENT PRODUCT FEEDBACKS 
deploy-client-product-feedbacks:
	okteto ns use client-lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f okteto/client-product-feedbacks.yaml 
destroy-client-product-feedbacks:
	okteto destroy -n client-lbk2knewlifegithub -f okteto/client-product-feedbacks.yaml

# Deploy client frontendmentor
deploy-client-frontendmentor:
	okteto ns use client-lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f .okteto/client-frontendmentor.yaml 


# Secret 
apply-secret:
	kubectl apply -f secret/my-secret.yaml -n lbk2knewlifegithub
	kubectl apply -f secret/my-secret.yaml -n lemon-lbk2knewlifegithub
delete-secret:
	kubectl delete secrets my-secret  -n lbk2knewlifegithub
	kubectl delete secrets my-secret  -n lemon-lbk2knewlifegithub

# Delete all
delete-all:
	okteto ns use lbk2knewlifegithub && okteto kubeconfig 
	kubectl delete all --all 
	okteto ns use lemon-lbk2knewlifegithub && okteto kubeconfig 
	kubectl delete all --all 

# Configmap
delete-all-configmap:
	okteto ns use lbk2knewlifegithub && okteto kubeconfig 
	kubectl delete configmap --all 
	okteto ns use lemon-lbk2knewlifegithub && okteto kubeconfig 
	kubectl delete configmap --all 

# Forward Ysql staging
forward-ysql-staging:
	echo "Forwarding YugabyteDb STAGING to port 5434"
	kubectl port-forward svc/yb-tserver-service 5434:5433

# YugabyteDB PRODUCTION
upgrade-ysql-prod:
	helm upgrade -i ysql -n db-lbk2knewlifegithub -f secret/ysql.yaml yugabytedb/yugabyte 

uninstall-ysql-prod:
	helm delete ysql -n db-lbk2knewlifegithub

forward-ysql-prod:
	echo "Forwarding YugabyteDb PRODUCTION to port 5435"
	kubectl port-forward -n db-lbk2knewlifegithub svc/yb-tserver-service 5435:5433



# Redis PRODUCTION
upgrade-redis-prod:
	helm upgrade -i redis-prod -n banana-lbk2knewlifegithub -f secret/redis.yaml bitnami/redis

uninstall-redis-prod:
	helm delete redis-prod -n banana-lbk2knewlifegithub

forward-redis-prod:
	echo "Forwarding REDIS PRODUCTION to port 6381"
	kubectl port-forward --namespace db-lbk2knewlifegithub svc/redis-master 6381:6379

