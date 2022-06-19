const express = require("express");
const app = express();
const connection = require('./src/database/database');
const Students = require('./src/students/students');
const userController = require('./src/students/studentsController');
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", userController);

connection.authenticate()
.then(()=>{
    console.log("Conexão feita com sucesso!");
}).catch((error)=>{
    console.log(error);
})

app.listen(8001,()=>{
console.log('API RODANDO NA PORTA 8001');
})