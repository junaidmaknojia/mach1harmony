const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const express = require("express");
const multer = require('multer');


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
}).single('audioUpload');

router.get("/:id(\\d+)", asyncHandler( async (req, res) => { // load song page

}));

router.get("/create", asyncHandler( async (req, res) => { // load song upload page

}));

router.post("/create", asyncHandler( async (req, res) => { // handle song upload

    if (req.file) {
        song.imageURL = '/songs/' + req.file.filename;
    }
}));

router.get("/edit/:id(\\d+)", asyncHandler( async (req,res) => { // load song edit page

}));

router.put("/edit/:id(\\d+)", asyncHandler( async (req,res) => { // handle edits to song

}));

module.exports = router;
