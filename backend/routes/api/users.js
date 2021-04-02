const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Follow } = require('../../db/models');
const { check } = require("express-validator");
const { singlePublicFileUpload, singleMulterUpload} = require("../../awsS3");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { Op } = require("sequelize");

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.post("/", validateSignup, asyncHandler(async (req,res) => {
    const {email, password, username} = req.body;
    const user = await User.signup({email, username, password});

    await setTokenCookie(res, user);

    return res.json({user});
}));


router.get("/:id", asyncHandler(async (req,res) => { // get songs for this user

    const userId = req.params.id;
    const songs = await Song.findAll({
        where: {
            userId
        }
    });

    return res.json({songs});
}));

router.patch("/:id", singleMulterUpload("profilePic"), asyncHandler(async (req,res) => { // update profile info

    const userId = req.params.id;
    const profilePic = await singlePublicFileUpload(req.file);
    const {bio} = req.body;

    const user = await User.findByPk(userId);
    user.bio = bio;
    if(profilePic) user.profilePic = profilePic;

    await user.save();
    return res.json();

}));




router.get("/follow/:id", asyncHandler(async (req, res) => {
    const userId = req.params.id;
    // const myFollowers = await User.findByPk(userId, {
    //     include: [{
    //         model: "otherPeople",
    //         where: {
    //             followerId: userId
    //         }
    //     }]
    // });

}));

router.patch("/follow/:id", async (req,res) => {
    const userId = req.params.id;
    const {followerId} = req.body;

    let isFollowing = false;

    const foundFriend = await Follow.findOne({
        where: {
            [Op.and]: [{ followerId }, { userId }]
        }
    })

    if(foundFriend) {
        await foundFriend.destroy();
    } else {
        await Follow.create({userId, followerId});
        isFollowing = true;
    }
    res.json( isFollowing );
})

module.exports = router;
