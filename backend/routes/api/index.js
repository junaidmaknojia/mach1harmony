const {User} = require("../../db/models");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const router = require("express").Router();

router.post("/test", function(req,res){
    res.json({requestBody: req.body});
});


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
