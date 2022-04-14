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

deploy-all: deploy-api-auth deploy-api-images deploy-api-product-feedbacks deploy-client-auth deploy-client-product-feedbacks
destroy-all: destroy-api-auth destroy-api-images destroy-api-product-feedbacks destroy-client-auth destroy-client-product-feedbacks

# Postgres
upgrade-pg:
	helm upgrade -i postgresql -n db-lbk2knewlifegithub -f secret/pg-values.yaml bitnami/postgresql --version 11.1.19

uninstall-pg:
	helm delete postgresql -n db-lbk2knewlifegithub

forward-pg:
	echo "Forwarding port 5000"
	kubectl port-forward --namespace db-lbk2knewlifegithub svc/postgresql-primary 5000:5432

# Redis
upgrade-redis:
	helm upgrade -i redis -n db-lbk2knewlifegithub -f secret/redis-values.yaml bitnami/redis

uninstall-redis:
	helm delete redis -n db-lbk2knewlifegithub

forward-redis:
	echo "Forwarding port 6379"
	kubectl port-forward --namespace db-lbk2knewlifegithub svc/redis-master 6379:6379

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