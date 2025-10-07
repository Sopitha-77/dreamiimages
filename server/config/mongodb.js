import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dreamiimages';
        
        await mongoose.connect(connectionString);
        
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

export default connectDB;