const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// 환경 변수 로드
dotenv.config();

const FASTAPI_URL2 = process.env.FASTAPI_URL2;

router.get('/', async (req, res) => {
    const artId = req.query.art_id;
    if (!artId) {
        return res.send('Main Page');
    }

    try {
        // FastAPI에서 작품 정보를 가져옴
        const response = await axios.get(`${FASTAPI_URL2}/get-art-info/${artId}`);
        const artwork = response.data;

        // FastAPI에서 작품 설명을 생성하여 가져옴
        const textResponse = await axios.post(`${FASTAPI_URL2}/generate-text`, { art_id: artId });
        artwork.art_description = textResponse.data.description;

        // FastAPI에서 오디오 URL을 가져옴
        const audioResponse = await axios.post(`${FASTAPI_URL2}/generate-audio`, { art_id: artId });
        artwork.art_audio_url = audioResponse.data.file_url;

        // artworks 변수를 임시로 생성 (데모 목적)
        const artworks = [
            { art_name: "모나리자", art_artist: "레오나르도 다빈치" }
        ];


        res.render('detail', { artwork, artworks });
    } catch (error) {
        console.error('Error fetching art details from FastAPI:', error);
        res.status(500).send('Error fetching art details from FastAPI');
    }
});

router.get('/generate-audio/:art_id', async (req, res) => {
    try {
        const artId = req.params.art_id;
        const response = await axios.post(`${FASTAPI_URL2}/generate-audio`, { art_id: artId });
        res.json(response.data);
    } catch (error) {
        console.error('Error generating audio:', error);
        res.status(500).send('Error generating audio');
    }
});

module.exports = router;
