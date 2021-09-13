import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs'; 
import _ from 'lodash';
// import { error } from 'console';

export const create = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        
        if (err) {
            return res.status(400).json({
                error: "Thêm sản phẩm thành công"
            })
        }
        const { name, description, price }= fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin"
            })
        }
       let product = new Product(fields);
        if (files.photo) {
            if (files.photo.size > 200000) {
                res.status(400).json({
                    error:"Bạn nên upload ảnh dưới 2mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
        }
        product.save((err, data) =>{
            if (err) {
                res.status(400).json({
                    error:"Không thêm được sản phẩm"
                })
            }
            res.json(data)
        })
    });
}
export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: "Không tìm thấy sản phẩm"
            })
        }
        req.product = product;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.product);
}
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) =>{
        if (err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        res.json({
            deleteProduct,
            message: "Sản phẩm được xóa thành công"
        })
    })
}
export const list = (req, res) => {
    Product.find()
        .select("-photo")
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Product not found"
                })
            }
            res.json(data)
        })
    
}
// update sản phảm
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        if (err) {
            return res.status(400).json({
                error: "Update sản phẩm thành công"
            })
        }
        const { name, description, price }= fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin"
            })
        }
      // let product = new Product(fields);
      let product = req.product;
            product = _.assignIn(product, fields);
        if (files.photo) {
            if (files.photo.size > 200000) {
                res.status(400).json({
                    error:"Bạn nên upload ảnh dưới 2mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
        }
        product.save((err, data) =>{
            if (err) {
                res.status(400).json({
                    error:"Update sản phẩm không thành công"
                })
            }
            res.json(data)
        })
    });
}

export const listRelated = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 5;
    Product.find({
        _id: {$ne: req.product },
        category: req.product.category
    })
        .limit(limit)
        .populate('category', '_id name',)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                })
            }
            res.json(products)
        })
}

export const listCategories = (req, res) =>{
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Products not found"
            })
        }
        res.json(categories);
    })
}

export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}