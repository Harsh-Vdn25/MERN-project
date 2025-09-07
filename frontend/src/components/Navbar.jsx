import React from 'react'
import { Link } from 'react-router-dom'
import {Plus, PlusIcon} from 'lucide-react';
const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4 flex flex-row justify-between'>
            <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>
                NotesApp
            </h1>
            <div className='flex-items-center gap-4'>
            <Link to={"/create"} className='btn btn-primary'>
            <PlusIcon className='size-5'/>
            <span>New Note</span>
            </Link>
            </div>
        </div>
    </header>
  )
}

export default Navbar