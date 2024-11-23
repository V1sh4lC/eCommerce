import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('database connection established...')
    })
    await mongoose.connect("mongodb+srv://vishal:dj7GMbLmKnllodaK@cluster0.cjqpr.mongodb.net/ecommerce")
}


connectDB()