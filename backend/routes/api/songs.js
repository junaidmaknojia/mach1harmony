const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const multer = require('multer');
const {Comment, User, Song} = require("../../db/models");


const songStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'frontend/public/songs')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const songUpload = multer({
    songStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav') {
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error('Only mp3 and wav files valid'))
        }
    }
}).single('audioUpload');

const songCoverStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'frontend/public/images/album')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const songCoverUpload = multer({
    songCoverStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error('Only png, jpg and jpeg files valid'));
        }
    }
}).single('coverPhotoUpload');

router.get("/:id(\\d+)", asyncHandler( async (req, res) => { // load song page

}));

router.get("/create", asyncHandler( async (req, res) => { // load song upload page

}));

router.post("/", songCoverUpload, songUpload, asyncHandler( async (req, res) => { // handle song upload

    // if(req.session){
        // console.log("---- req is ", req);
        console.log("-----------", req.file);
        const songFile = req.files["audioUpload"];
        const songPhoto = req.files["coverPhotoUpload"];

        console.log(songFile);
        const {title, artist, album, year} = req.body;
        const userId = req.session.auth.userId;
        let song = await Song.build({title, artist, album, year, userId});

        if(songPhoto) song.coverPhoto = '/songs/' + req.files["coverPhotoUpload"].filename;
        if (songFile){
            song.filePath = '/songs/' + req.files["audioUpload"].filename;
        } else {

        }
        await song.save();
        return res;
    }

// }
));

router.get("/edit/:id(\\d+)", asyncHandler( async (req,res) => { // load song edit page

}));

router.put("/edit/:id(\\d+)", asyncHandler( async (req,res) => { // handle edits to song

}));

module.exports = router;
