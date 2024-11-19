import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('database connection established...')
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
}

export default connectDB