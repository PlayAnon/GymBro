const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    senha: { type: String, required: true, select: false },
    nome: { type: String, required: true },
    peso: { type: Number, required: true },
    altura: { type: Number, required: true },
    idade: { type: Number, required: true },
    tempoTreino: { type: Number, required: true },
    objetivoP: { type: String, required: true },
    uriImg: { type: String, required: false },
    descricao: { type: String, required: true },
    nomeLocal: {type:String, required: false},
    lat: {type:String, required: true},
    lon: {type:String, required: true},
    swipes: [],
    passes: [],
    matches: [],
    created: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next){
    let user = this;
    if(!user.isModified('senha')) return next();

    user.senha = await bcrypt.hash(user.senha, 10);
    return next();

})

module.exports = mongoose.model('User', UserSchema);