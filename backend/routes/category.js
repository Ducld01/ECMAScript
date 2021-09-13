import express from 'express';

const router = express.Router();
import { create, list, categoryById, read, update, remove } from '../controllers/category';
import { requireSignin, isAdmin, isAuth , } from '../controllers/auth';
import { userById } from '../controllers/user';

// router.post('/category/create/:userId',requireSignin, isAuth, isAdmin,  create);
router.post('/category', create)
router.put('/category/:categoryId', update);
router.get('/categories', list);
router.get('/category/:categoryId', read);
// router.delete('/category/:categoryId/:userId',  remove);
router.delete('/category/:categoryId', remove)

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;