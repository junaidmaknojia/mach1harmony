const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Comment, User } = require('../../db/models');


router.post("/:id", asyncHandler(async (req, res) => { // create a comment on a song
    const songOnComment = req.params.id;
    const { text, userId, songId } = req.body;

    const createdComment = await Comment.create({ text, userId, songId });
    return res.json(createdComment);

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

router.delete("/:id", asyncHandler(async (req, res) => { // delete a comment on a song
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);
    const deletedComment = await comment.destroy();
    return res.json({message: "Delete good"});

}));

router.put("/:id(\\d+)", asyncHandler(async (req, res) => { // edit a comment on a song
    const {text} = req.body;
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);
    comment.text = text;

    await comment.save();

    return res.json({comment});
}));


module.exports = router;
