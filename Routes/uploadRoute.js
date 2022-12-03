const router = require('express').Router();
const multer = require('multer')
const path = require('path')
const {uploadImage, deleteImage} = require('../Controllers/uploadController.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images'));
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const upload = multer({ storage: storage }).single('file');


router.post("/upload", upload, uploadImage);
router.delete("/delete/:imagename",deleteImage);
module.exports = router

