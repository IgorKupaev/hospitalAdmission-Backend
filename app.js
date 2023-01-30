const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const { PORT,  DB_CONNECTION } = require('./config');
const apiRoutes = require("./src/routes/admission");

const loadApp = async () => {
  try {
    mongoose.set('strictQuery', false);
    app.use(express.json());
    app.use('/', apiRoutes);
    app.use(cors());

    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

loadApp();
