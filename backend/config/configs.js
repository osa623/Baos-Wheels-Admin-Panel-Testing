// config/configs.js

import dotenv from 'dotenv';

dotenv.config();

const config = {
    DB_CONNECTION_STRING: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET 
};

export default config;
