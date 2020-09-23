const Product = require('../models/product');
const product = require('../models/product');
const { validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
exports.getAddProduct = (req, res, next) => {

    res.render(
        'admin/edit-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
            hasError: false,
            errorMessage: null,
            validationErrors: []
        });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;

    if (!image) { //if it is not set
        return res.status(422).render(
            'admin/edit-product',
            {
                pageTitle: 'Add Product',
                path: '/admin/add-product',
                editing: false,
                hasError: true,
                product: {
                    title: title,
                    price: price,
                    description: description
                },
                errorMessage: 'Attached file is not an image!',
                validationErrors: []
            });
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render(
            'admin/edit-product',
            {
                pageTitle: 'Add Product',
                path: '/admin/add-product',
                editing: false,
                hasError: true,
                product: {
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            });
    }

    const imageUrl = image.path;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product
        .save()
        .then(result => {
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render(
                'admin/edit-product',
                {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: editMode,
                    product: product,
                    hasError: false,
                    errorMessage: null,
                    validationErrors: []
                });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

};

exports.postEditProducts = (req, res, next) => {

    const prodId = req.body.productId;
    const updatetTitle = req.body.title;
    const updatetPrice = req.body.price;
    const image = req.file;
    const updatetDesc = req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render(
            'admin/edit-product',
            {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: true,
                hasError: true,
                product: {
                    title: updatetTitle,
                    price: updatetPrice,
                    description: updatetDesc,
                    _id: prodId
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            });
    }


    Product.findById(prodId).then(product => {
        if (product.userId.toString() !== req.user._id.toString()) {
            return res.redirect('/');
        }
        product.title = updatetTitle;
        product.price = updatetPrice;
        if (image) {
            product.imageUrl = image.path;
        }
        product.description = updatetDesc;
        return product.save()
            .then(result => {
                console.log('Updated product');
                res.redirect('/admin/products');
            })
    })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
        .then(products => {
            console.log(products);
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                layout: 'main-layout'
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({ _id: prodId, userId: req.user._id })
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};