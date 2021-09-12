const postController = require('../controller/product_controller');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();

router.get('/', authorizeUser, postController.getPosts);
router.post('/post', postController.createPost);

function authorizeUser(req, resp, next) {
    const authorization = req.headers['authorization'];
    if (authorization === undefined || !authorization) {
        return resp.sendStatus(401).json({ message: 'Not authorized' });
    }

    jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log('error: ' + err);
        if (!err) {
            return next();
        }
        resp.sendStatus(403).send({ message: 'Invalid token' });
    })
}

module.exports = router;