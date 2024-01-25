const express = require('express')
const cors = require('cors');
const { route } = require('../routes/usuarios');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

        // Conectar a la base de datos

        this.conectarDb();

        // Middlewares

        this.middlewares();

        // Rutas de mi aplicacion

        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())
        
        // Directorio publico
        this.app.use( express.static('public'))

        
    }

    async conectarDb(){
        await dbConnection();
    }

    routes() {
        // Middleware dee las rutas desde routes/user.js 
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

}


module.exports = Server