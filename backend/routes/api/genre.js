const router = require("express").Router();
const { User, Song, Follow, Genre } = require('../../db/models');
const asyncHandler = require("express-async-handler");



module.exports = router;

router.get("/", asyncHandler(async (req,res) => {
    const genres = await Genre.findAll();

    return res.json(genres)
}));

router.get("/:id", asyncHandler(async (req,res) => {
    const genreId = req.params.id;
    const songs = await Song.findAll({
        where: genreId
    });

    return res.json(songs)
}));
