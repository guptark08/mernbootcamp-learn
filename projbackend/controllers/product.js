const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "problem with image"
            });
        }
        //destructure the fields
        const {name , description, price, category, stock} = fields;
        if( !name || !description || !price || !category || !stock ) {
            return res.status(400).json({
                error: "please include fields"
            });
        }

        let product = new Product(fields);

        //handle files here
        if(files.photo) {
            if(files.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too big"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        //save to the DB
        product.save((err, product) => {
            if(err) {
                res.status(400).json({
                    error: "Saving tshirt in DB failed"
                });
            }
            res.json(product);
        })
    });
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.photo = (req, res, next) => {
    if(req.product.photo.data) 
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    
}