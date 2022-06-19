import React, {useState, useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import PrivateRoutes from './PrivateRoutes';
export const AppRoutes = () =>{
    const { user }: any = useContext(AuthContext);
    return (
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/cadastro' element={<Cadastro/>}></Route>
            <Route path='/dashboard' element={
                <PrivateRoutes user={user} redirectPath={'/'}>
                    <Dashboard/>
                </PrivateRoutes>
            }></Route>
        </Routes>
    )
}