const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const express = require("express");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error('Only images files valid'))
        }
    }
}).single('imageupload');

router.get("/:id(\\d+)", asyncHandler( async (req,res) => { // load song page

}));

router.get("/create", asyncHandler( async (req,res) => { // load song upload page

}));

router.post("/create", asyncHandler( async (req,res) => { // handle song upload

    if (req.file) {
        // story.imageURL = '/images/' + req.file.filename;
    }
}));

router.get("/edit/:id(\\d+)", asyncHandler( async (req,res) => { // load song edit page

}));

router.put("/edit/:id(\\d+)", asyncHandler( async (req,res) => { // handle edits to song

}));

module.exports = router;
