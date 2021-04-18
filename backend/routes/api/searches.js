const router = require("express").Router();
const { User, Song, Follow, Genre } = require('../../db/models');
const asyncHandler = require("express-async-handler");

router.get("/:search", asyncHandler(async (req,res) => {
    const search = req.params.search;

    const songs = await Song.findAll();
    const users = await User.findAll();

    const foundSongs = songs.filter(song => {
        const catches = [song.title.toLowerCase(), song.album.toLowerCase(), song.artist.toLowerCase()];
        return catches.includes(search.toLowerCase());
    });

    const foundUsers = users.filter(user => {
        const name = user.username.toLowerCase();
        return name.includes(search.toLowerCase());
    });

    return res.json({foundSongs, foundUsers});

}));


module.exports = router;
