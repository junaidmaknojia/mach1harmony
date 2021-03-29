const router = require("express").Router();


router.post("/create", asyncHandler(async (req, res) => { // create a comment on a song

}));

router.delete("/:id(\\d+)", asyncHandler(async (req, res) => { // delete a comment on a song

}));

router.put("/:id(\\d+)", asyncHandler(async (req, res) => { // edit a comment on a song

}));


module.exports = router;
