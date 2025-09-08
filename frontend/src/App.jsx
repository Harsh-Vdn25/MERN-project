import { React, useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import Homepage from '../src/page/Homepage';
import CreatePage from '../src/page/CreatePage';
import NoteDetailPage from '../src/page/NoteDetailPage';
import toast from 'react-hot-toast';
const App = () => {
  const [isAllowed, setisAllowed] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setisAllowed(true);
    }
    else {
      setisAllowed(false);
    }
  }, [])

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path='/' element={<LoginPage setisAllowed={setisAllowed} />} />
        <Route path='/home'
          element={isAllowed ? <Homepage /> : <Navigate to='/' />}
        />
        <Route path='/create'
          element={localStorage.getItem("Token") ? <CreatePage /> : <Navigate to='/' />}
        />

        <Route path='/home/note/:id'
          element={localStorage.getItem("Token") ? <NoteDetailPage /> : <Navigate to='/' />}
        />


      </Routes>
    </div>
  )
}

export default App