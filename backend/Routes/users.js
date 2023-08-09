const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const createUserToken = (userId) => {
    return jwt.sign({userId: userId}, config.password_token, {expiresIn: '7d'});
}


router.get('/', async (req, res) =>{

    try{
        const users = await Users.find({});
        return res.send(users);
  
    }catch(err){
        return res.status(500).send({error: 'Erro na consulta do usuário'});
    }
})

router.post('/create', async (req, res) =>{
    const { email, senha } = req.body;

    if(!email || !senha) return res.status(400).send({error: 'Dados insuficientes!'});

    try{
        if (await Users.findOne({email})) return res.status(400).send({error: 'Usuário já cadastrado!'});

        const user = await Users.create(req.body);
        user.senha = undefined;

        return res.status(201).send({user, token: createUserToken(user._id)});
  
    }catch(err){
        console.log(err);
        return res.status(500).send({error: 'Erro ao buscar usuário'});
    }
})

router.post('/auth', async (req, res) =>{
    const { email, senha } = req.body;

    if(!email || !senha) return res.status(400).send({error: 'Dados insuficientes!'});

    try{
        const user = await Users.findOne({email}).select('+senha');
        if(!user) return res.status(400).send({error: 'Usuário não cadastrado'});

        const pass_ok = await bcrypt.compare(senha, user.senha);
        if(!pass_ok) return res.status(401).send({error: 'Erro ao autenticar usuário!'});

        user.senha = undefined;
        return res.send({user, token: createUserToken(user._id)});
  
    }catch(err){
        return res.status(500).send({error: 'Erro ao buscar usuário'});
    }
})

router.patch('/:id', async (req, res) =>{

    const { id } = req.params;

    const { nome, peso, altura, idade, tempoTreino, objetivoP, uriImg, descricao} = req.body;

    const auxAtualizado = {
        nome, peso, altura, idade, tempoTreino, objetivoP, uriImg, descricao
    } 

    try{
        const user = await Users.updateOne({_id:id}, auxAtualizado)
        const userAtualizado = await Users.findById(id)
        if(user.matchedCount === 0){
            return res.status(422).send({error: 'O usuário não foi encontrado'});
        }

        return res.send(userAtualizado);
    }catch(err){
        return res.status(500).send({error: 'Erro ao atualizar usuário'});
    }
})

router.patch('/findOne/:id', async (req, res) =>{

    const { id } = req.params;
    
    try{
        const user = await Users.findById(id)
        return res.send(user);
    }catch(err){
        return res.status(500).send({error: 'Erro ao buscar usuário'});
    }
})

router.put('/addswipe', async (req, res) =>{

    const { userId, swipedUserId } = req.body;

    try{

        const query = {_id: userId}

        const userSwiped = await Users.findById(swipedUserId).select('-passes -swipes');
        
        const updateDocument = {
            $push: {swipes: userSwiped}
        }
    
        const user = await Users.findOneAndUpdate(query, updateDocument, {new: true });

        return res.send(user);
    }catch(err){
        return res.status(500).send({error: 'Erro ao dar swiped com usuário'});
    }
})

router.put('/addpasses', async (req, res) =>{

    const { userId, passesUserId } = req.body;

    try{

        const query = {_id: userId}

        const userPassed = await Users.findById(passesUserId).select('-passes -swipes');
        
        const updateDocument = {
            $push: {passes: userPassed}
        }
    
        const user = await Users.findOneAndUpdate(query, updateDocument, {new: true });
        
        return res.send(user);
    }catch(err){
        return res.status(500).send({error: 'Erro ao pass usuário'});
    }
})

router.put('/addmatches', async (req, res) =>{

    const { userId, userSwipedId } = req.body;

    try{

        const query = {_id: userId}

        const query2 = {_id: userSwipedId}

        const userMatched = await Users.findById(userSwipedId).select('-passes -swipes');

        const userLogged = await Users.findById(userId).select('-passes -swipes');
        
        const updateDocument = {
            $push: {matches: userMatched}
        }

        const updateDocument2 = {
            $push: {matches: userLogged}
        }
    
        const user = await Users.findOneAndUpdate(query, updateDocument, {new: true });

        const user2 = await Users.findOneAndUpdate(query2, updateDocument2, {new: true });
        
        return res.send(user);
    }catch(err){
        return res.status(500).send({error: 'Erro ao pass usuário'});
    }
})

router.get('/getProfiles/:userId', async (req, res) =>{

    const { userId } = req.params;

    try{
        const user = await Users.findById(userId)
        const emails = user.swipes.map(usuario => usuario.email).concat(user.passes.map(usuario => usuario.email))
        
        emails.push(user.email);
        
        const usersUpdateProfiles = await Users.find({email:{$nin:emails}})

        return res.send(usersUpdateProfiles);

    }catch(err){
        console.log(err)
        return res.status(500).send({error: 'Erro na consulta do usuário'});
    }
})

module.exports = router;