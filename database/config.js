const mongose = require('mongoose')

const dbConnection = async() => {

    try {
        
        await mongose.connect(process.env.MONGODB_CNN,
            {
            useNewUrlParser: true,
        //     useUnifiedTopology:true,
        //     // useCreateIndex: true,
        //     // useFindAndModify: false
         }
        );

        console.log('Base de datos online');        

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos')
    }

}

module.exports = {
    dbConnection
}