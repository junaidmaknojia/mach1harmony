const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {setTokenCookie, restoreUser} = require("../../utils/auth");
const {User} = require("../../db/models");

const validateLogin = [
    check("credential")
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors,
];

router.post("/", validateLogin, asyncHandler(async (req,res,next) => {
    const {credential, password} = req.body;
    console.log(credential, password);
    const user = await User.login({credential, password});

    if(!user){
        const err = new Error("Login failed");
        err.status = 400;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid"];
        return next(err);
    }

    await setTokenCookie(res, user);
    return res.json({user});

}));

router.delete("/", asyncHandler(async (req,res) => {
    res.clearCookie("token");
    return res.json({message: "successfully deleted"});
}));

router.get("/", restoreUser, asyncHandler(async (req,res) => {
    // res.json("test");
    const {user} = req;
    if(user){
        return res.json({
            user: user.toSafeObject()
        });
    } else {
        return res.json({});
    }
}));

module.exports = router;
