import {useState, createContext} from 'react';
import axios from 'axios';
export const AuthContext = createContext({});

export default function AuthProvider({ children }: any){
    const [user, setUser] = useState('');
    const [mensagem, setMensagem] = useState({
        err: false,
        msg: ''
    });
    
    async function Login(email: any, senha: any){
        const dados = {
            email: email,
            senha: senha
        }
        try {
            const {data} = await axios.post('http://localhost:8000/user/login', dados);
            setUser(data.token);
            localStorage.setItem('AuthToken', data.token);
            localStorage.setItem('User', email);
            return 'OK';

        } catch (error: any) {
            const msg = error.response.data.err;
            setMensagem({
                err: true,
                msg: msg
            });
            return
        }
    }
    return(
        <>
            <AuthContext.Provider value={{Login, mensagem, user, setUser}}>
                {children}
            </AuthContext.Provider> 
        </>
    )
}