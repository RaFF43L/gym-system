import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Container, TextField, Typography, Grid, Link} from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import axios from 'axios';
export default function Cadastro() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState({
        err: false,
        msg: ''
    });
    function reset(){
        setEmail('');
        setSenha('');
    }
    async function handleSubmit(){
        const dados = {
            email: email,
            senha: senha
        }
        try {
            const {data} = await axios.post('http://localhost:8000/users/create', dados);
            setMensagem({
                err: false,
                msg: data.cadastro
            })
            reset();
            navigate('/');
        } catch (error: any) {
            
            setMensagem({
                err: true,
                msg: error.response.data.err
            });

            reset();
        }
    }
    return (
      <Container component="main" maxWidth="xs">
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Avatar sx={{bgcolor: 'success.main'}}>
                <FitnessCenterIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Cadastro
            </Typography>
            {mensagem.err ? (
                <div>
                    <span style={{color: 'red'}}>{mensagem.msg}</span>
                </div>
            ) : (
                <div>
                    <span style={{color: 'green'}}>{mensagem.msg}</span>
                </div>
            )}
            <TextField
              margin="normal"
              fullWidth
              label="Digite seu E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Digite sua Senha"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setSenha(event.target.value)}
            />
            <Button  variant="contained" color="secondary" fullWidth sx={{mt: 3, mb: 3}} onClick={handleSubmit}>Cadastro</Button>

            <Grid item>
            <Link href="/" variant="body2">
                {"Já possui uma conta? Login"}
            </Link>
            </Grid>
        </Box>
      </Container>
    )
}
  
