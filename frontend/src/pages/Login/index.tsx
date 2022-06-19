import React, {useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Container, TextField, Typography, Grid, Link} from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { Login, mensagem }: any = useContext(AuthContext);


    async function handleSubmit(){
      const user = await Login(email, senha);
      if(user){
        navigate("/dashboard");
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
                Login
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
              onChange={(event) => setSenha(event.target.value)}
            />
            <Button  variant="contained" color="secondary" fullWidth sx={{mt: 3, mb: 3}} onClick={handleSubmit}>Login</Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/cadastro" variant="body2">
                  {"Não possui uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Container>
    )
}