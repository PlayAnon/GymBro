const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) =>{
    const token_header = req.headers.auth;
    if(!token_header) return res.send({erro: 'Token não enviado!'});

    jwt.verify(token_header, config.password_token, (err, decoded) =>{
        if(err) return res.send({erro: 'Token inválido!'});
        req.userId = decoded.userId;
        return next();
    });

}

module.exports = auth;