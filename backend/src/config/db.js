import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/csi_vcet';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick fallback if local mongod is not running
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host} / database: ${conn.connection.name}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${uri}.`);
    console.warn(`[MongoDB Info] Error details: ${error.message}`);
    console.warn(`[MongoDB Info] Running in Autonomous In-Memory Mode with rich pre-seeded CSI VCET dataset.`);
    console.warn(`[MongoDB Tip] To connect to MongoDB, ensure mongod is running locally or provide MONGODB_URI in backend/.env`);
  }
};

export const getDbStatus = () => ({
  connected: isMongoConnected,
  mode: isMongoConnected ? 'MongoDB (Mongoose)' : 'Autonomous In-Memory Fallback',
});
