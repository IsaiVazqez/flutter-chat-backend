const mongoose = require('mongoose');

const dbConenection = async() => {

    try{
        await mongoose.connect(process.env.DB_CNN, {

        });
        console.log('Db online');

    } catch (error){
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConenection
}