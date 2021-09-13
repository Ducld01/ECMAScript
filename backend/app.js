import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import cors from 'cors'



dotenv.config();
const app = express();
app.use(bodyParser.json());
////////
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const userRoutes = require('./routes/user')




//connection;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log(`Database connected`)
});

//Middlerare
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors({ credentials: 'same-origin' }));
//routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);



const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Server is running on port', port)
})
