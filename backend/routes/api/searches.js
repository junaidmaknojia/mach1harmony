const router = require("express").Router();
const { User, Song, Follow, Genre } = require('../../db/models');
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(async (req,res) => {
    // const genres = await Genre.findAll();

    // return res.json(genres)
}));


module.exports = router;
