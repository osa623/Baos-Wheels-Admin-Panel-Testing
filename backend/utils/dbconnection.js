import mongoose from "mongoose";
import config from "../config/configs";

let database;

const connect = async () => {
    const MONGODB_URL = config.DB_CONNECTION_STRING;

    if (database) return;

    try {
        await mongoose.connect(MONGODB_URL, {
            
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        database = mongoose.connection;
        console.log("Database connected successfully");
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
};

export { connect };
