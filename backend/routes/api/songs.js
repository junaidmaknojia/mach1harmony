const asyncHandler = require("express-async-handler");
const router = require("express").Router();


router.get("/:id(\\d+)", asyncHandler( async (req,res) => { // load song page

}));

router.get("/create", asyncHandler( async (req,res) => { // load song upload page

}));

router.post("/create", asyncHandler( async (req,res) => { // handle song upload

}));

router.get("/edit/:id(\\d+)", asyncHandler( async (req,res) => { // load song edit page

}));

router.put("/edit/:id(\\d+)", asyncHandler( async (req,res) => { // handle edits to song

}));

module.exports = router;
