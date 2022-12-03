const router = require('express').Router()

const {getProducts, addProduct,updateProduct,deleteProduct,deleteAllProducts} = require('../Controllers/productController.js')



router.get('/getproducts',getProducts);
router.post('/add',addProduct);
router.put('/update/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);
router.delete('/deleteall',deleteAllProducts);
module.exports = router