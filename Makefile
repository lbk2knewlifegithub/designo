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

deploy-all: deploy-api-auth & deploy-api-images & deploy-api-product-feedbacks & deploy-client-product-feedbacks
destroy-all: destroy-api-auth destroy-api-images destroy-api-product-feedbacks destroy-client-auth destroy-client-product-feedbacks


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

