
const e = require('cors');
const jwt = require('jsonwebtoken')



const genererarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY, {
            expiresIn:'4h',
        }, (error, token) =>{
            if(error){
                console.log(error);
                reject( 'No se pudo generar el JWT')
            }else {
                resolve(token)
            }
        })



    })

}

module.exports = genererarJWT