import userModel from "../models/userModel.js"
import validator from "validator"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// user login routing
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success: false, message: "User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({success: true, token})
        } else {
            return res.json({success: false, message: 'Invalid password'})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// user signup routing
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        // user exists?
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success: false, message: 'User already exist'})
        }
        //validating email and password strength
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: 'Please enter a valid email'})
        }
        
        if (password.length < 8) {
            return res.json({success: false, message: 'Please enter a strong password'})
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
// admin login routing
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: 'Invalid credentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { loginUser, registerUser ,adminLogin }