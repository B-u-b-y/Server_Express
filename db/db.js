//db/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const MONGODB_URL = 'mongodb://localhost:27017/Football';

const db = async() => {
    try{
      const con = await mongoose.connect(MONGODB_URL)
        console.log('Connected to the database:', con.connection.host);
    }catch (error){
        console.error('Error connecting to the database:', error);
    }
}

const playerValuationsSchema = require('../models/player_valuations');

module.exports = db;