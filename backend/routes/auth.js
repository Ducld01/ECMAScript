import express from 'express';
import { userSingupValidator } from '../validator';
const router = express.Router();

import { signup, signin, signout } from '../controllers/auth';

router.post('/signup', userSingupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;