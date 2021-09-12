const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('dotenv').config();
const User = require('../model/user_model');


async function signup(req, resp) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
        }

        User.create(user).then(function(userResp) {
            var token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
            resp.json({
                user: userResp,
                token: token,
            });
        }).catch(function(err) {
            console.log(err);
            const errObj = {};

            if (err.errors !== undefined) {
                err.errors.map(er => {
                    errObj[er.path] = er.message;
                })
            }
            resp.status(400).send({
                messsage: errObj
            });
        });
    });
};

async function login(req, resp) {

    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        }

        const dbUser = await User.findOne({ where: { email: user.email } });

        if (dbUser === null) {
            return resp.status(400).send({
                messsage: 'No user found with this email'
            });
        }

        const isPasswordValid = await bcrypt.compare(user.password, dbUser.password);

        if (!isPasswordValid) {
            return resp.status(400).send({
                messsage: 'Password is not valid'
            });
        }

        var token = jwt.sign(dbUser.toJSON(), process.env.ACCESS_TOKEN_SECRET);
        resp.json({
            user: dbUser,
            token: token,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            message: 'Something went wrong',
        });
    }
};


module.exports = {
    signup: signup,
    login: login,
}