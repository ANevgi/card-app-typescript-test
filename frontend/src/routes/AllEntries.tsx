import {useContext} from 'react'
import { EntryContext } from '../utilities/globalContext'
import { EntryContextType, Entry } from '../@types/context'
import { useNavigate, Link } from "react-router-dom";

// Task 1: Added color options for dark mode
// Task 2: Updated card to display scheduled_date instead of created_at
export default function AllEntries() {
    const { entries, deleteEntry, isDarkMode } = useContext(EntryContext) as EntryContextType;
    let navigate = useNavigate();
  
    if (entries.length === 0) {
      return (
        <section>
          <h1 className={`text-center font-semibold text-2xl m-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            You don't have any card
          </h1>
          <p className={`text-center font-medium text-md ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
            Let's{' '}
            <Link className="text-blue-400 underline underline-offset-1" to="/create">
              Create One
            </Link>
          </p>
        </section>
      );
    }
    
    return (
      <section className="grid grid-cols-2 md:grid-cols-4">
        {entries.map((entry, index) => {
          return (
            <div
              id={entry.id}
              key={index}
              className={`${
                isDarkMode ? 'bg-gray-800 shadow-gray-900 text-white' : 'bg-gray-300 shadow-gray-500 text-black'
              } shadow-md m-3 p-4 rounded flex flex-col justify-between`}
            >
              <h1 className="font-bold text-sm md:text-lg">{entry.title}</h1>
              <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
              <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      deleteEntry(entry.id as string);
                    }}
                    className={`m-1 md:m-2 p-1 font-semibold rounded-md ${
                      isDarkMode ? 'bg-red-700 hover:bg-red-900' : 'bg-red-500 hover:bg-red-700'
                    }`}
                  >
                    ✖
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/edit/${entry.id}`, { replace: true });
                    }}
                    className={`m-1 md:m-2 p-1 font-semibold rounded-md ${
                      isDarkMode ? 'bg-blue-700 hover:bg-blue-900' : 'bg-blue-500 hover:bg-blue-700'
                    }`}
                  >
                    🖊
                  </button>
                </div> 
                <time className="text-right text-sm md:text-lg">{new Date(entry.scheduled_date.toString()).toLocaleDateString()}</time>
              </section>
            </div>
          );
        })}
      </section>
    );
  }