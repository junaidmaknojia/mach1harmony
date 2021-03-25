const {User} = require("../../db/models");
const { setTokenCookie } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const router = require("express").Router();

router.post("/test", function(req,res){
    res.json({requestBody: req.body});
});

router.get("/set-token-cookie", asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: {
            username: "demouser"
        }
    });

    setTokenCookie(res, user);
    return res.json({user});
}));

module.exports = router;
