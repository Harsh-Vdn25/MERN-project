import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/");
    window.location.reload(); 
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4 flex flex-row justify-between">
        <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
          NotesApp
        </h1>
        <div className="flex items-center gap-4">
          <Link to="/create" className="btn btn-primary">
            <PlusIcon className="size-5" />
            <span>New Note</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="bg-green-500 text-black font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
            >
              Menu
              <svg
                className="w-2.5 h-2.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-700  font-lg font-bold  rounded-lg shadow-sm">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <button
                      className="block w-full text-green-500 text-left px-4 py-2 hover:bg-black-100"
                    >
                      Profile
                    </button>
                  </li>
                  <hr/>
                  <li>
                    <button
                      onClick={()=>handleLogout()}
                      className="block w-full text-green-500 text-left px-4 py-2 hover:bg-black-100"
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar