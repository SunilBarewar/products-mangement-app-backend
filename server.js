const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { connectDB } = require('./dbConnect.js')
const bodyParser = require('body-parser')
const app = express();
// importing routes
const productRoute = require('./Routes/productRoute.js')
const authRoute = require('./Routes/authRoute.js')
const uploadRoute = require('./Routes/uploadRoute.js')
const { deleteImage,uploadImage } = require("./Controllers/uploadController.js")
const path = require('path')
const multer = require('multer')
app.use(cors());
dotenv.config();

// middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// to store images 
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'public/images')))

connectDB();


app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))

// using routes
app.use('/api/product', productRoute);
app.use('/api/auth', authRoute)
app.use('/api/image', uploadRoute)
