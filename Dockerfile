# Node.js v18.19.1 이미지를 사용합니다.
FROM node:18.19.1

# 앱 디렉토리를 생성합니다.
WORKDIR /usr/src/app

# 앱 의존성을 설치합니다.
COPY package*.json ./

RUN npm install

# 앱 소스 코드를 복사합니다.
COPY . .

# 앱이 8001 포트를 사용하도록 합니다.
EXPOSE 8001

# 앱 실행 명령어를 정의합니다.
CMD [ "node", "app.js" ]
