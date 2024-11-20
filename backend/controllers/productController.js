import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

// add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        //will only contain existing images
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item) => {
                let result  = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        // console.log(typeof(name), description, price, category, subCategory, typeof(sizes), bestSeller)
        // console.log(images)
        // console.log(imagesUrl)

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData)
        await product.save()

        res.json({success: true, message: 'product added'})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

// list product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({}) //get all data
        res.json({success: true, products})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

// remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: 'product removed'})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

// single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success: true, product})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }