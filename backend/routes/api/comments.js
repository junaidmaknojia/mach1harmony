const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Comment, User } = require('../../db/models');


router.post("/:id", asyncHandler(async (req, res) => { // create a comment on a song
    const songOnComment = req.params.id;
    const { comment, userId, songId } = req.body;

    const createdComment = await Comment.create({ text: comment, userId, songId });
    return res.json({ createdComment });

}));

router.get("/:id", asyncHandler(async (req, res) => { // get all the comments on a song
    const songId = req.params.id;

    const comments = await Comment.findAll({
        include: [{
            model: User
        }],
        where: { songId },
        order: [[
            'createdAt', 'DESC'
        ]]
    });

    return res.json(comments);

}));

router.delete("/:id(\\d+)", asyncHandler(async (req, res) => { // delete a comment on a song

}));

router.put("/:id(\\d+)", asyncHandler(async (req, res) => { // edit a comment on a song

}));


module.exports = router;
