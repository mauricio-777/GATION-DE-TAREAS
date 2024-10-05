const mongoose = require('mongoose');


function dbConnection() {
    const DB_URL= process.env.DB_URL
    mongoose.connect(DB_URL);
    console.log("DB: Conexion a base de datos exitosa!!!!!")
}

module.exports = dbConnection