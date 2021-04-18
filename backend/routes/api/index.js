const {User, Song} = require("../../db/models");
// const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const usersRouter = require("./users");
const sessionRouter = require("./session");
const songsRouter = require("./songs");
const commentsRouter = require("./comments");
const genresRouter = require("./genre");
const searchesRouter = require("./searches")


router.use("/users", usersRouter);
router.use("/session", sessionRouter);
router.use("/songs", songsRouter);
router.use("/comments", commentsRouter);
router.use("/genres", genresRouter);
router.use("/searches", searchesRouter);


router.get("/songs", asyncHandler(async (req, res) => { // songs on home page

    const songs = await Song.findAll({
        order: [["createdAt", "DESC"]],
        limit: 5
    });

    return res.json(songs);

}));

router.get("/users", asyncHandler(async (req, res) => { // users on home page

    const users = await User.findAll({
        limit: 5
    });

    return res.json(users);

}));



//---------USER AUTHENTICATION ROUTER TESTS ------------------
// router.get("/set-token-cookie", asyncHandler(async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: "demouser"
//         }
//     });

//     setTokenCookie(res, user);
//     return res.json({user});
// }));

// router.get("/restore-user", restoreUser, (req, res) => {
//     return res.json(req.user);
// });

// router.get("/require-auth", requireAuth, (req,res) => {
//     return res.json(req.user);
// });

module.exports = router;
