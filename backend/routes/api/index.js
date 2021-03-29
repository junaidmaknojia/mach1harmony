const {User} = require("../../db/models");
// const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const usersRouter = require("./users");
const sessionRouter = require("./session");
const songsRouter = require("./songs");
const commentsRouter = require("./comments");


router.use("/users", usersRouter);
router.use("/session", sessionRouter);
router.use("/songs", songsRouter);
router.use("/comments", commentsRouter);


router.get("/:id(\\d+)", asyncHandler(async (req, res) => { // home page with logged in user
    // const userId = parseInt(req.params.id, 10);
    // const user = await User.findByPk(userId);

    // const userStories = await Story.findAll({
    //   where: { userId },
    //   order: [["createdAt", "DESC"]]
    // });

    // const peopleYoureFollowing = await User.findAll({
    //     include: {
    //       model: User,
    //       as: "otherPeople"
    //     },
    //     where: {id: userId}
    // })

}));

// router.post("/test", function(req,res){
//     res.json({requestBody: req.body});
// });


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
