APP_NAME=devops-tutorial
IMAGE=$(APP_NAME):local

build:
	docker build -t $(IMAGE) .

run:
	docker run -p 3000:3000 $(IMAGE)

stop:
	docker stop $(APP_NAME)-container || true

clean:
	docker rmi $(IMAGE) || true