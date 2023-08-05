const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{

    return res.send({message: `Tudo ok com o método GET da rota index`})
})

router.post('/', (req, res) =>{
    return res.send({message: 'Tudo ok com o método POST da rota index'})
})

module.exports = router;