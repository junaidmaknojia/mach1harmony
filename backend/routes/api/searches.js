const router = require("express").Router();
const { User, Song, Follow, Genre } = require('../../db/models');
const asyncHandler = require("express-async-handler");

router.get("/search/:search", asyncHandler(async (req,res) => {
    const search = req.params.search;

    // const songs = await Song.findAll({
    //     where: {
    //         userId: {
    //             // [Op.<operator>]: <value>
    //         }
    //     },
    //     {/* include: <include_specifier>, */}
    //     offset: 10,
    //     limit: 2
    // });
    const songs = await Song.findAll();
    const users = await User.findAll();

    const foundSongs = songs.filter(song => {
        const catches = [song.title.toLowerCase(), song.album.toLowerCase(), song.artist.toLowerCase()];
        return catches.includes(search.toLowerCase())
    });

    // return res.json(genres)
}));


module.exports = router;
