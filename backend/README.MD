# Autenticação

Essa API é utilizada para fazer cadastro e login de um usuário com autenticação JWT

## Endpoints 

### POST /users/create

Endpoint responsável por criar um novo usuário

#### Parâmetros

email: E-mail que será cadastrado no sistema,
senha: Senha que será cadastrada no sistema

Exemplo: 
```
{
    "email": "usuario@teste.com",
    "senha": "123456"
}
```

#### Respostas
##### OK! 200
Exemplo de retorno:
```
{
    "cadastro": "Usuário Cadastrado com sucesso!"
}
```

##### Error! 504

Exemplo de retorno:
```
{
    "err": "E-mail inserido já existe!"
}
```

##### Error! 400 
Exemplo de retorno:
```
{
    "err": "Falha interna!"
}
```

### POST /user/login

Endpoint responsável por verificar os usuários cadastrados e retornar a autenticação

#### Parâmetros

email: E-mail que será cadastrado no sistema,
senha: Senha que será cadastrada no sistema

Exemplo: 
```
{
    "email": "usuario@teste.com",
    "senha": "123456"
}
```

#### Respostas
##### OK! 200
Exemplo de retorno:

```
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJyYWZmYWVsLnBpbWVudGVsQGFuYmV0ZWMuY29tLmJyIiwiaWF0IjoxNjU1NjE4NjcwLCJleHAiOjE2NTU2MjIyNzB9.mJL4UWpKbHGZzwoX_lrcVBq6m9K3QdL4DGp7Jq2bNQo"
    
}

```
##### NotFound! 406
Exemplo de retorno:

```
{
    "err": "Senha inválida!"
},
{
    "err": "E-mail inválido!"
}
```

##### Error! 400

Exemplo de retorno:

```
{
    "err": "Falha interna!"
},

```
