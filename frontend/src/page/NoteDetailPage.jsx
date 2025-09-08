import React from 'react'
import {useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/axios';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const NoteDetailPage = () => {
  const [note,setNote]=useState(null);
  const [loading,isLoading]=useState(true);
  const [saving,isSaving]=useState(false);
  const navigate=useNavigate();

  const {id}=useParams();//Destructure the id or any params from the Url
  useEffect(()=>{
    const token=localStorage.getItem('Token');
    const fetchNote=async()=>{
      try{
        const Notes=await api.get(`/notes/${id}`,{
          headers:{
            token:token
          }
        });
        setNote(Notes.data);
      }catch(err){
        console.log("Error fetching notes");
        console.log(err);
        if(err.response?.status===429){
          setisrateLimited(true);
        }else{
          console.log("Error in fetching the note");
          toast.error("Failed to fetch the data");
        }
      }finally{
        isLoading(false);
      }
    }
    fetchNote();
  },[id])

  const handleDelete=async()=>{
    const token=localStorage.getItem('Token');
    if(!window.confirm("Are you sure you want to delete this?"))return;
    try{
      await api.delete(`/notes/${id}`,{
        headers:{
          token:token
        }      
      });
      console.log("deleted");
      toast.success("Successfully deleted");
      navigate('/');
    }catch{
      console.log("Error:",err);
      toast.error("Failed to delete the note");
    }
  };
  
  const handleSave=async()=>{
    
    if(!note.title.trim()||!note.content.trim()){
      toast.error("Please add the title or content");
      return;
    }
    const token=localStorage.getItem('Token');

    try{
      await api.put(`/notes/${id}`,{
        title:note.title,
        content:note.content
      },{
        headers:{
          token:token
        }
      });
      toast.success("Updated the note successfully");
      navigate('/');
    }catch(err){
      console.log("Error occured",err);
      toast.error("Failed to update the note");
    }finally{
      isSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage