export VERSION=$(shell echo $RANDOM | md5sum | head -c 20)
staging:
	echo USING VERSION=$(VERSION)
	kubectx minikube
	envsubst < secret/staging-secret.yaml > secret.yaml
	kubectl apply -f secret.yaml
	rm secret.yaml

	# Build api auth STAGING
	docker build -t lbk2kdocker/api-auth:$(VERSION) api -f api/auth.Dockerfile
	docker push lbk2kdocker/api-auth:$(VERSION)
	helm upgrade -i api-auth-staging charts/api -f values/staging/api-auth.yaml --set tag=$(VERSION)

  # # Build api product feedbacks STAGING
  # - okteto build -t okteto.dev/api-product-feedbacks:${OKTETO_GIT_COMMIT} api -f api/product-feedbacks.Dockerfile
  # - helm upgrade -i api-product-feedbacks-staging charts/api -n lemon-lbk2knewlifegithub -f values/staging/api-product-feedbacks.yaml --set tag=${OKTETO_GIT_COMMIT}

  # # Build api images STAGING
  # - okteto build -t okteto.dev/api-images:${OKTETO_GIT_COMMIT} api -f api/images.Dockerfile
  # - helm upgrade -i api-images-staging charts/api-storage -n lemon-lbk2knewlifegithub -f values/staging/api-images.yaml --set tag=${OKTETO_GIT_COMMIT}

  # Build Client Product Feedbacks STAGING
#   - okteto build -t okteto.dev/client-product-feedbacks:${OKTETO_GIT_COMMIT} client -f client/product-feedbacks-stage.Dockerfile
#   - helm upgrade -i client-product-feedbacks-staging charts/client -n lemon-lbk2knewlifegithub -f values/staging/client-product-feedbacks.yaml --set tag=${OKTETO_GIT_COMMIT}

  # Apply ingress
#   - kubectl apply -f ingress/api-staging.yaml

# API AUTH
deploy-api-auth:
	okteto ns use lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f okteto/api-auth.yaml 
destroy-api-auth:
	okteto destroy -f okteto/api-auth.yaml -n lemon-lbk2knewlifegithub

# API IMAGES
# okteto ns use lemon-lbk2knewlifegithub && okteto kubeconfig 
deploy-api-images:
	okteto ns use lemon-lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f okteto/api-images.yaml -n lemon-lbk2knewlifegithub
destroy-api-images:
	okteto destroy -f okteto/api-images.yaml -n lemon-lbk2knewlifegithub

# API PRODUCT FEEDBACKS
deploy-api-product-feedbacks:
	okteto ns use lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f okteto/api-product-feedbacks.yaml 
destroy-api-product-feedbacks:
	okteto destroy -f okteto/api-product-feedbacks.yaml -n lemon-lbk2knewlifegithub


# CLIENT PRODUCT FEEDBACKS 
deploy-client-product-feedbacks:
	okteto ns use client-lbk2knewlifegithub && okteto kubeconfig 
	okteto deploy -f okteto/client-product-feedbacks.yaml 
destroy-client-product-feedbacks:
	okteto destroy -n client-lbk2knewlifegithub -f okteto/client-product-feedbacks.yaml


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


# YugabyteDB STAGING
upgrade-ysql-staging:
	helm upgrade -i ysql-staging -n lemon-lbk2knewlifegithub -f secret/ysql-staging.yaml yugabytedb/yugabyte 

uninstall-ysql-staging:
	helm delete ysql-staging -n lemon-lbk2knewlifegithub

forward-ysql-staging:
	echo "Forwarding YugabyteDB STATING to port 5434"
	kubectl port-forward -n lemon-lbk2knewlifegithub svc/yb-tserver-service 5434:5433


# YugabyteDB PRODUCTION
upgrade-ysql-prod:
	helm upgrade -i ysql -n db-lbk2knewlifegithub -f secret/ysql.yaml yugabytedb/yugabyte 

uninstall-ysql-prod:
	helm delete ysql -n db-lbk2knewlifegithub

forward-ysql-prod:
	echo "Forwarding YugabyteDb PRODUCTION to port 5435"
	kubectl port-forward -n db-lbk2knewlifegithub svc/yb-tserver-service 5435:5433


# Redis STAGING
upgrade-redis-staging:
	helm upgrade -i redis-staging -n lemon-lbk2knewlifegithub -f secret/redis-staging.yaml bitnami/redis

uninstall-redis-staging:
	helm delete redis-staging -n lemon-lbk2knewlifegithub

forward-redis-staging:
	echo "Forwarding REDIS STAGING to  port  6380"
	kubectl port-forward --namespace lemon-lbk2knewlifegithub svc/redis-master 6380:6379


# Redis PRODUCTION
upgrade-redis-prod:
	helm upgrade -i redis-prod -n banana-lbk2knewlifegithub -f secret/redis.yaml bitnami/redis

uninstall-redis-prod:
	helm delete redis-prod -n banana-lbk2knewlifegithub

forward-redis-prod:
	echo "Forwarding REDIS PRODUCTION to port 6381"
	kubectl port-forward --namespace db-lbk2knewlifegithub svc/redis-master 6381:6379

