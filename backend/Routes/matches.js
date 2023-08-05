const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Users = require('../model/user');
const Matches = require('../model/match');

router.get('/matchUsers/:userId/:profileUserId', async (req, res) =>{

    const { userId, profileUserId } = req.params;

    try{
        const userProfile = await Users.findById(profileUserId)
        const userLogged = await Users.findById(userId)

        const ids = userProfile.swipes.map(usuario => usuario._id.toString())

        if (ids.includes(userId)) {
            const match = await Matches.create({users:[userLogged,userProfile]});
            
            return res.status(201).send(match);
        } else {

            res.status(204).send();
        }
    }catch(err){
        return res.status(500).send({error: 'Erro na consulta do usuário'});
    }
})

router.get('/getMessages/:userId/:userSwipedId', async (req, res) =>{

    const { userId, userSwipedId } = req.params;

    try{

        const ObjectId = mongoose.Types.ObjectId;

        const matches = await Matches.findOne({$and: [
            { users: { $elemMatch: { _id: new ObjectId(userId) }}},
            { users: { $elemMatch: { _id: new ObjectId(userSwipedId) } }}
          ]});

        if (matches) {
            return res.status(201).send(matches.messages);
        } else {
            return res.status(404).send({error: 'Match não encontrado'});
        }

    }catch(err){
        console.log(err)
        return res.status(500).send({error: 'Erro na consulta do usuário'});
    }
})


module.exports = router;