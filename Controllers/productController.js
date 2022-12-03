const productModel = require('../Models/productModel.js')



// get products
const ITEMS_PER_PAGE = 5;
const categoryOptions = [
    "smartphone", "watch", "laptop", "shoes", "shirts"
]
const getProducts = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const search = req.query.search || "";
        const sort = req.query.sort || "rating";
        const order = parseInt(req.query.order) || -1;
        let categories = req.query.category || "All"
        const skip = (page - 1) * ITEMS_PER_PAGE;

        categories === "All"
            ? (categories = [...categoryOptions])
            : (categories = req.query.category.split(","))


        let sortBy = {}
        sortBy[sort] = order
   
        const products = await productModel.find({ name: { $regex: search, $options: "i" } })
            .limit(ITEMS_PER_PAGE)
            .skip(skip)
            .where("category")
            .in([...categories])
            .sort(sortBy)


        const count = await productModel.countDocuments({
            category: { $in: [...categories] },
            name:{$regex:search,$options:"i"},
        });
        const pageCount = Math.ceil(count / ITEMS_PER_PAGE)
        res.status(200).json({
            pageCount,
            products
        });
    } catch (error) {
        res.status(500).json(error);
    }
}



// add new product

const addProduct = async (req, res) => {
    let newProduct = new productModel(req.body)

    try {
        await newProduct.save();
        res.status(200).json({ message: 'new product added successfully', product: newProduct })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// update a product

const updateProduct = async (req, res) => {
    const id = req.params.id;

    if (id) {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json({ message: "product updated successfully", product: updatedProduct });
        } catch (error) {

            res.status(500).json({ message: "product updation failed" });
        }
    } else {
        res.status(500).json({ message: "id is undefined" })
    }
}

// delete a product
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        await productModel.findByIdAndDelete(id)
        res.status(200).json({ message: "product deleted successfully!" })
    } catch (error) {
        res.status(500).json({ message: "product deletion failed" })
    }

}
// delete all products
const deleteAllProducts = async (req, res) => {
    try {
        await productModel.deleteMany({})
        res.status(200).json({ message: "products deleted successfully!" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts
}