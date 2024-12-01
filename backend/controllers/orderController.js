import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

// global vars
const currency = "gbp"
const deliveryCharges = 10

// payment gateway intialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// order method for COD
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        console.log(req.body.address)
        console.log(req.body.orderData)
        console.log(req.body)
        const orderData = {
            userId, items, amount, address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save() //creates object and push to db

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// order method for Stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId, items, amount, address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save() //creates object and push to db

        const line_items = items.map((item) => ({
            price_data: {
                currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency,
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

//verify stripe payment
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// order method for RazorPay
const placeOrderRazorpay = async (req, res) => {

}

// orders data [for admin]
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// user order data [for user]
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// order status update [for admin]
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status updated" })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe }