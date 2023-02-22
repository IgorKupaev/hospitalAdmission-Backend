const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const { PORT,  DB_CONNECTION } = require('./config');
const apiRoutes = require("./src/routes/admission");

const loadApp = async () => {
  try {
    mongoose.set('strictQuery', false);
    app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', '*');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });
    app.use(express.json());
    app.use('/', apiRoutes);
    app.use(cors());

    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    
    app.listen(PORT, () => {
      console.log(`Hospital Admissions listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

loadApp();
