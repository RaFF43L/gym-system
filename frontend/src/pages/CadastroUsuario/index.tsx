import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Container, TextField, Typography, Grid, Link} from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import axios from 'axios';
import Header from '../../components/Header/index';
export default function CadastroAluno() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [tipo, setTipo] = useState("");
    const [mensagem, setMensagem] = useState({
        err: false,
        msg: ''
    });
    function reset(){
        setEmail('');
        setNome('');
        setCpf('');
        setTipo('');

    }
    const handleChange = (event: any) => {
        setTipo(event.target.value);
      };
    async function handleSubmit(){
        const dados = {
            nome: nome,
            email: email,
            cpf: cpf,
            tipo: tipo
        }
        try {
            const {data} = await axios.post('http://localhost:8001/students/create', dados);
            setMensagem({
                err: false,
                msg: data.cadastro
            })
            reset();
            navigate('/dashboard');
        } catch (error: any) {
            
            setMensagem({
                err: true,
                msg: error.response.data.err
            });

            reset();
        }
    }
    return (
    <>
    <Header/>
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
              label="Digite seu Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
              onChange={(event) => setNome(event.target.value)}
            />
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
              name="cpf"
              label="Digite seu CPF"
              type="CPF"
              autoComplete="current-password"
              onChange={(event) => setCpf(event.target.value)}
            />
             <Box sx={{ minWidth: 400 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tipo}
                        label="Tipo"
                        onChange={handleChange}
                        >
                    <MenuItem value="1">Mensal</MenuItem>
                    <MenuItem value="2">Semestral</MenuItem>
                    <MenuItem value="3">Anual</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button  variant="contained" color="secondary" fullWidth sx={{mt: 3, mb: 3}} onClick={handleSubmit}>Cadastro</Button>
        </Box>
      </Container>
    </>
     
    )
}
  
