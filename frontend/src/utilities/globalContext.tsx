import {createContext , useState, FC, ReactNode, useEffect} from 'react'
import {Entry, EntryContextType} from '../@types/context'
import axios from 'axios'

export const EntryContext = createContext<EntryContextType | null>(null);

export const EntryProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Task 1: Dark mode state


    const initState = async () => {
        const data = await axios.get<Entry[]>('http://localhost:3001/get/')
        const initialStateBody = data.data
        setEntries(initialStateBody)
    }

    useEffect(() => {
        initState()
      }, []);

    // Task 1: Change background color of page when dark mode setting is toggled
    useEffect(() => {
      document.body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
    }, [isDarkMode]);

    const saveEntry = async (entry: Entry) => {
        const requestData = await axios.post<Entry>('http://localhost:3001/create/', entry)
        const newEntry = requestData.data
        setEntries([...entries, newEntry])
      }

    const updateEntry = async (id: string, entry: Entry) => {
        await axios.put<Entry>(`http://localhost:3001/update/${id}`, entry)
        setEntries(entries => {
          const entryIndex = entries.findIndex((obj => obj.id == id))
          entries[entryIndex] = entry
          console.log(entries)
          return entries
        })
    }
    const deleteEntry = async (id: string) => {
        await axios.delete<Entry>(`http://localhost:3001/delete/${id}`)
        setEntries(e => e.filter(entry => entry.id != id))
    }

    // Task 1: Dark mode toggle function
    const toggleDarkMode = () => {
      setIsDarkMode(prevMode => !prevMode);
  };

    return (
        <EntryContext.Provider value={{ entries, saveEntry, updateEntry, deleteEntry, isDarkMode, toggleDarkMode }}> 
          {children}
        </EntryContext.Provider>
      )
}

