const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const { singlePublicFileUpload, singleMulterUpload, multipleMulterUpload, multiplePublicFileUpload } = require("../../awsS3");
const { Comment, User, Song, Like } = require("../../db/models");
const { Op } = require("sequelize");


router.get("/:id(\\d+)", asyncHandler(async (req, res) => { // load song page

}));

router.get("/likes/:id(\\d+)", asyncHandler(async (req, res) => { // get likes
    const songId = req.params.id;

    const likes = await Like.findAll({
        where: { songId }
    });

    return res.json(likes);

}));

router.patch("/likes/:id", asyncHandler(async (req, res) => { // adjust likes
    const songId = req.params.id;
    const { userId } = req.body;

    let foundLike = await Like.findOne({
        where: {
            [Op.and]: [{ songId }, { userId }]
        }
    });

    if(!foundLike){
        await Like.create({userId, songId});
    }else {
        const dislike = await Like.findByPk(foundLike.id);
        await dislike.destroy();
    }
    const likes = await Like.findAll({
        where: {songId}
    });
    return res.json(likes);

}));



router.post("/:id", multipleMulterUpload("files"), asyncHandler(async (req, res) => { // handle song upload

    const userId = req.params.id;
    // if(req.session){

    const urls = await multiplePublicFileUpload(req.files);
    console.log(urls);

    const { title, artist, album, year } = req.body;
    // const userId = req.session.auth.userId;
    let song = await Song.build({ title, artist, album, year, userId });

    if (urls.length === 1) {
        song.filePath = urls[0] // only song added
    } else if (urls.length === 2) {
        song.filePath = urls[0] // both added
        song.coverPhoto = urls[1]
    }
    //validate file types and multiple ones error before saving
    await song.save();
    return res.json();
}

    // }
));

router.put("/:id(\\d+)", multipleMulterUpload("files"), asyncHandler(async (req, res) => { // handle edits to song
    const songId = req.params.id;
    const { title, artist, album, year } = req.body;

    const urls = await multiplePublicFileUpload(req.files);


    let song = await Song.findByPk(songId);
    song.title = title;
    song.artist = artist;
    song.album = album;
    song.year = year;

    urls.forEach(file => {
        if (file.substring(file.length - 3) === "mp3") {
            song.filePath = file;
        } else if (file.substring(file.length - 3) === "jpg") {
            song.coverPhoto = file;
        }
    });

    await song.save();
    return res.json(song);
}));

router.delete("/:id", asyncHandler(async (req, res) => { // delete song
    const songId = req.params.id;
    const song = await Song.findByPk(songId);
    await song.destroy();
    return res.json();
}));


router.patch("/listens/:id", asyncHandler(async (req,res) => {
    const songId = req.params.id;
    const song = await Song.findByPk(songId);
    song.numListens = song.numListens + 1;
    return res.json();
}));
module.exports = router;
