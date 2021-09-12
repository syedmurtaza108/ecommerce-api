const Product = require('../model/product_model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getPosts = (req, resp) => {
    try {
        Product.findAll({
            limit: 20
        }).then(rows => {
            resp.status(200).json({ products: rows });
        })
    } catch (error) {
        resp.status(500).json({ message: 'Something went wrong' });
    }
};

exports.createPost = (req, resp) => {
    const post = new Post(req.body);
    console.log(req.body);
    post.save((err, result) => {
        if (err) {
            return resp.status(400).json({
                error: err
            });
        }
        resp.status(200).json({
            post: result
        });
    });
};