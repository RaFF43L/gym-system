import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { IconButton } from '@mui/material';


export default function DataTable() {

const [itens, setItens] = useState<any[]>([]);

useEffect(()=>{
    async function loadUsers(){
        try {
            const { data } = await axios.get("http://localhost:8001/students");
            setItens(data);
        } catch (error) {
            console.log(error);
        }
    }
    loadUsers();
},[itens])
const rows = itens;
const handleDelete = async (id: number) =>{
    try {
        await axios.delete(`http://localhost:8001/students/${id}`);
        // AtualizarTabela();
    } catch (error) {
        console.log(error);
    }
}
// const AtualizarTabela = async () =>{
//     try {
//         const { data } = await axios.get("http://localhost:8001/students");
//         setItens(data);
//     } catch (error) {
//         console.log(error);
//     }
// }
  return (
    <TableContainer component={Paper} variant="outlined" sx={{m: 1, width: 'auto'}}>
      <Table sx={{ minWidth: 650 , marginTop: 2}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">NOME</TableCell>
            <TableCell align="center">E-MAIL</TableCell>
            <TableCell align="center">CPF</TableCell>
            <TableCell align="center">TIPO</TableCell>
            <TableCell align="center">AÇÕES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row)=> (
            <TableRow key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="center">{row.nome}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.cpf}</TableCell>
              <TableCell align="center">{row.tipo}</TableCell>
              <TableCell align="center">
                    <IconButton size='small' onClick={() => handleDelete(row.id)}>
                       <DeleteIcon color="warning"/>
                    </IconButton>

                    <IconButton size='small'>
                       <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
