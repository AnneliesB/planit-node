const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    // get info from request
    let username = req.body.username;
    let password = req.body.password;

    // create new user and save in db
    const user = new User({
        username: username
    });
    await user.setPassword(password);
    await user.save()
        .then(result => {
            let token = jwt.sign({
                uid:result._id,
                username: result.username
            }, "MyVerySecretWord")

            res.json({
                "status": "success",
                "data":{
                    "token": token
                }
            })
        }).catch(error => {
            res.json({
                "status": "error"
            })
        });
}

const login = async (req, res, next) => {
    await User.authenticate()(req.body.username, req.body.password)
        .then(result => {
            res.json({
                "status": "success",
                "data": {
                    "user": result
                }
            })
        })
        .catch(error => {
            res.json({
                "status": "error",
                "message": error
            })
        });
}
module.exports.signup = signup;
module.exports.login = login;