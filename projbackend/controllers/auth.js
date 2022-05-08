const User = require("../models/user");
const {validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    };

    console.log("REQ BODY", req.body);
//     const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save in DB"
            });
        } else {
            return res.status(200).json({
                message: "user saved to DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};

exports.signin = (req,res) => {
    const errors = validationResult(req);

    const {email, password} = req.body;
    const user = new User(req.body);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    };

    User.findOne({email}, (err, user) => {
        if(err) {
            res.status(400).json({
                err: "USER email does not exist"
            });
        }

        if(!user.autheticate(password)) {
            return res.status(401).json({
                err: "Email and password do not match"
            });
        }

        //CREATE token
        const token = jwt.sign({_id: user._id}, PROCESS.env.SECRET);
        //pur token in cookie
        res.cookie("token", token, {expire: new Date() + 9999 });

        //send response to front end 
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}});
    });

};
