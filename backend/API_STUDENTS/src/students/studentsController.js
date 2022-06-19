const express = require('express');
const router = express.Router();
const Students = require("./students");

router.post('/students/create', (req, res)=>{
    const {nome, email, cpf, tipo} = req.body;
    Students.findOne({
        where:{
            cpf: cpf
        }
    }).then((user)=>{
        if(user == undefined){
            Students.create({
                nome: nome,
                email: email, 
                cpf: cpf,
                tipo: tipo
            }).then(()=>{
                res.status(200);
                res.json({cadastro: 'Usuário Cadastrado com sucesso!'});
            }).catch(err => {
                res.status(504);
                res.json({cadastro: 'Erro ao realizar o cadastro', err: err});
            })
        }else{
            res.status(504);
            res.json({err: 'CPF já cadastrado no sistema!'});
        }
    }).catch((err)=>{
        res.status(400);
        res.json(err);
    })
});

router.get('/students', (req, res) =>{
    Students.findAll().then((users)=>{
     if(!users){
         res.status(400).json('Nenhum usuário Cadastrado!');
     }else{
         res.status(200).json(users);
     }
     }).catch((err)=>{
         res.status(400).json({err: 'Erro ao consultar usuários', err});
     })
 });

 router.delete('/students/:id', (req, res) =>{
    const {id} = req.params;
    if(id != undefined){
        if(!isNaN(id)){
            Students.destroy({
                where: {
                     id: id
                }
            }).then(()=>{
                res.status(200).json('Aluno deletado com sucesso!')
            })
        }else{
            res.status(400).json('Falha ao deletar aluno')
        }
    }else{
        res.status(400).json('Id inserido inválido!');
    }
 });

module.exports = router;