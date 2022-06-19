const express = require('express');
const app = express();
const connection = require("./src/database/database");
const User = require('./src/users/user');
const userController = require('./src/users/userController');

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// DATABASE
connection.
authenticate()
.then(()=>{
    console.log("Conexão feita com sucesso");
}).catch((error)=>{
    console.log(error);
});

app.use("/", userController);


app.listen(8000,() => {
    console.log('API RODANDO 8000');
});
