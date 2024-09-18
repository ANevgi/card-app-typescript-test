import {NavLink} from 'react-router-dom'
import React, { useContext } from 'react';
import {EntryContext} from '../utilities/globalContext'
import {Entry, EntryContextType} from '../@types/context'

// Task 1: Added dark mode toggle checkbox
// Task 1: Added color options to change button color and text color depending on dark mode toggle
export default function NavBar(){
  const { isDarkMode, toggleDarkMode } = useContext(EntryContext) as EntryContextType;
    
    return (
      <nav className="flex justify-center gap-5">
        <NavLink
          className={`m-3 p-4 text-xl rounded-md font-medium ${
            isDarkMode ? 'bg-blue-700 hover:bg-blue-900 text-white' : 'bg-blue-400 hover:bg-blue-500 text-white'
          }`}
          to={'/'}
        >
          All Entries
        </NavLink>
        <NavLink
          className={`m-3 p-4 text-xl rounded-md font-medium ${
            isDarkMode ? 'bg-blue-700 hover:bg-blue-900 text-white' : 'bg-blue-400 hover:bg-blue-500 text-white'
          }`}
          to={'/create'}
        >
          New Entry
        </NavLink>
        <div className="flex items-center m-3 p-4">
          <label className={`mr-2 text-xl font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>Dark Mode</label>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="toggle-checkbox"
          />
        </div>
      </nav>
    );
  }
