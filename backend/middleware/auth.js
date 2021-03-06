const jwt = require('jsonwebtoken')

function auth(req,res,next){
    let jwtToken = req.header('Authorization')//Contiene las credenciañes para autenticar a un usuario con un servidor
    if(!jwtToken) return res.status(401).send('Acceso Denegado. No hay token')
    jwtToken = jwtToken.split(' ')[1]

    try {
        const payload = jwt.verify(jwtToken,"secretKey");
        req.user = payload
        next()
    } catch (e) {
        res.status(401).send("Acceso Denegado. Token no válido")
    }
}

module.exports = auth;