var express = require('express')
var router = express.Router()

const { check } = require("express-validator");

const {signup, signin} = require("../controllers/auth");
//method 1 to use route
router.get("/signout", (req,res) => {
    res.send("user signout");
});

//method 2 to use route - half part is in controller folder
router.post("/signup", [
    check("name", "name should be atleast 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleat 3 char").isLength({ min: 3 })
], signup);

router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 4 })
], signin);

module.exports = router;