const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    // MongoDB에서 Favorite 숫자 가져오기
    Favorite.find({ movieId: req.body.movieId })
        .exec((err, docs) => {
            if (err) return res.status(400).json({ err: err, message: 'Failed to load data' })
            return res.status(200).json({ success: true, favoriteNumber: docs.length })
        })
});

router.post('/favorited', (req, res) => {
    // MongoDB에서 사용자가 해당 영화를 Favorite했는지 체크
    Favorite.find({ userFrom: req.body.userFrom, movieId: req.body.movieId })
        .exec((err, docs) => {
            if (err) return res.status(400).json({ err: err, message: 'Failed to load data' })
            let result = (docs.length != 0) ? true : false;
            return res.status(200).json({ success: true, isFavorited: result })
        })
});

router.post('/addFavorite', (req, res) => {
    // MongoDB에 Favorite을 추가
    const favorite = new Favorite(req.body)
    favorite.save((err, docs) => {
        if (err) return res.status(400).json({ err: err, message: 'Failed to save favorite' })
        return res.status(200).json({ success: true })
    })
});

router.post('/removeFavorite', (req, res) => {
    // MongoDB에서 Favorite을 삭제
    Favorite.findOneAndDelete(req.body)
        .exec((err, docs) => {
            if (err) return res.status(400).json({ err: err, message: 'Failed to delete favorite' })
            return res.status(200).json({ success: true })
        })
});

router.post('/getFavoriteList', (req, res) => {
    // MongoDB에서 Favorite List 가져오기
    Favorite.find({ userFrom: req.body.userFrom })
    .exec((err, favoriteList) => {
        if (err) return res.status(400).json({ err: err, message: 'Failed to load data' })
        return res.status(200).json({ success: true, favoriteList })
    })
})

module.exports = router;
