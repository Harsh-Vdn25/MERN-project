import { React, useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import Homepage from '../src/page/Homepage';
import CreatePage from '../src/page/CreatePage';
import NoteDetailPage from '../src/page/NoteDetailPage';
import toast from 'react-hot-toast';


const App = () => {
  const token = localStorage.getItem("Token");
  return (
    <Routes>
      <Route path='/' element={token?<Navigate to='/home'/>:<LoginPage />} />
      <Route path='/home' element={token ? <Homepage /> : <Navigate to="/" />} />
      <Route path='/create' element={token ? <CreatePage /> : <Navigate to="/" />} />
      <Route path='/home/note/:id' element={token ? <NoteDetailPage /> : <Navigate to="/" />} />
    </Routes>
  );
};


export default App