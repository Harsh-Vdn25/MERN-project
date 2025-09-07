import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import NotesNotFound from '../components/NotesNotFound';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios'


const Homepage = () => {
  const [israteLimited,setisrateLimited]=useState(false);
  const [notes,setNotes]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetchNotes=async()=>{
      try{
        const res=await api.get("notes");
        console.log(res.data);
        setNotes(res.data);
        setisrateLimited(false);
      }catch(err){
        console.log("Error fetching notes");
        console.log(err);
        if(err.response?.status===429){
          setisrateLimited(true);
        }else{
          toast.error("Failed to fetch the data");
        }
      }finally{
        setLoading(false);
      }
    }
    fetchNotes();
  },[])
  return (
    <div className='min-h-screen'>
      <Navbar />
      {israteLimited&&<RateLimitedUI/>}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading&&<div className='text-center text-primary py-10'>Loading notes...</div>}
        {notes.length>0&& !israteLimited&&(
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map(note=>(
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
          </div>
        )}
        {notes.length===0&&!israteLimited&&<NotesNotFound/>}
      </div>
    </div>
  )
}

export default Homepage