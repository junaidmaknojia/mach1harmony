const router = require("express").Router();
const { User, Song, Follow } = require('../../db/models');
const asyncHandler = require("express-async-handler");



module.exports = router;

router.get("/genres", asyncHandler(async (req,res) => {
    const genres = await Genre.findAll();

    return res.json(genres)
}));

router.get("/genres/:id", asyncHandler(async (req,res) => {
    const genreId = req.params.id;
    const songs = await Song.findAll({
        where: genreId
    });

    return res.json(songs)
}));