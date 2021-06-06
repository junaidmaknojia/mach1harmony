const router = require("express").Router();
const { User, Song, Follow, Genre } = require('../../db/models');
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(async (req,res) => {
    const genres = await Genre.findAll();

    return res.json(genres)
}));

router.get("/songs", asyncHandler(async (req,res) => {
    const songs = await Song.findAll();
    return res.json(songs);
}));

router.get("/:id(\\d+)", asyncHandler(async (req,res) => {
    const genreId = req.params.id;
    console.log(genreId);
    const songs = await Song.findAll({
        where: {genreId}
    });

    return res.json(songs)
}));

module.exports = router;
