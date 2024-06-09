# Makefile

# 변수 정의
IMAGE_NAME = node_kim
CONTAINER_NAME = node_kim_container
PORT = 8001

# Docker 이미지 빌드
build:
	docker build -t $(IMAGE_NAME) .

# Docker 컨테이너 실행
run:
	docker run -p $(PORT):$(PORT) --name $(CONTAINER_NAME) -d $(IMAGE_NAME)

# Docker 컨테이너 중지 및 삭제
stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

# Docker 이미지 삭제
clean:
	docker rmi $(IMAGE_NAME)

# 전체 재빌드 및 실행
rebuild: stop clean build run