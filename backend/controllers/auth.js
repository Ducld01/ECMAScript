import User from '../models/auth';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt'


export const signup = (req, res) => {
    console.log(req.body);

    const user = new User(req.body);

    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                message: "Thêm User không thành công"
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({ user })
    })
}
export const signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                message: "User with that email does not exist. Please signup"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                message: "Email and password not match"
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.cookie('t', token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = user;
        return res.json({
            token, user: { _id, email, name, role }
        })
    })
}
export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout Success'
    })
}
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});
export const userId = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: "Err"
            })
        }
        req.profile = user;
        next();
    })
}
export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).send('Access Denied')
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).send('Admin resource! Access Denined')
    }
    next();
}