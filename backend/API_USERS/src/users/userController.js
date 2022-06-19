const express = require('express');
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require('../middlewares/auth');


const JWTSecret = "djkshahjksdajksdhasjkdhasjkdhasjkdhasjkd";

router.post('/users/create', (req, res)=>{
    const {email, senha} = req.body;

    User.findOne({
        where:{
            email: email
        }
    }).then((user)=>{
        if(user == undefined){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(senha, salt);
            User.create({
                email: email,
                password: hash
            }).then(()=>{
                res.status(200);
                res.json({cadastro: 'Usuário Cadastrado com sucesso!'});
            }).catch(err => {
                res.status(504);
                res.json({cadastro: 'Erro ao realizar o cadastro', err: err});
            })
        }else{
            res.status(504);
            res.json({err: 'E-mail inserido já existe!'});
        }
    }).catch((err)=>{
        res.status(400);
        res.json({err: 'Falha interna'});
    })
  
});

router.post('/user/login', (req, res) =>{
    const {email, senha} = req.body;
    console.log(typeof(senha));
    User.findOne({
        where:{
            email: email
        }
    }).then((user)=>{
        if(user != undefined){
            const correct  = bcrypt.compareSync(senha, user.password);
            if(correct){
                jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn:'1h'},(err, token) =>{
                    if(err){
                        res.status(400);
                        res.json({err: 'Falha interna'});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                });
            }else{
                res.status(406)
                res.json({err: 'Senha inválida!'});
            }
        }else{
            res.status(406)
            res.json({err: 'E-mail inválido!'});
        }
    })
});

module.exports = router;