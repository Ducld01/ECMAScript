import express from 'express';
const router = express.Router();
import { list, create, productById, read, remove, update, listRelated, listCategories, photo, } from '../controllers/product';
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { userById } from '../controllers/user';

// product details
router.get('/product/:productId', read);
//list product
router.get('/products', list);
router.get('/products/categories', listCategories)
//relate product
router.get('/products/relate/:productId', listRelated)
router.get('/product/photo/:productId', photo)
//add product
// router.post('/product/create/:useId',requireSignin ,isAuth ,isAdmin , create);
router.post('/product',create)
//delete product
router.delete('/product/:productId', remove);
//Update product
router.put('/product/:productId', update)

//
router.param ('useId', userById)
router.param('productId', productById);
module.exports = router;