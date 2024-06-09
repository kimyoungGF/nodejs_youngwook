const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main');
const dotenv = require('dotenv');

// 환경 변수 로드
dotenv.config();
const app = express();


// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 설정
app.use('/', mainRouter);

// 서버 실행
const port = process.env.PORT2 || 8001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
