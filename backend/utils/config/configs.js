import dotenv from 'dotenv';

dotenv.config();

const config = {
    DB_CONNECTION_STRING: process.env.MONGO_URL,
    JWT_SECRET: process.env.ACCESS_TOKEN_SECRET 
};

export default config;
