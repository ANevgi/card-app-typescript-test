import {useState, useContext, ChangeEvent, MouseEvent} from 'react'
import {EntryContext} from '../utilities/globalContext'
import {Entry, EntryContextType} from '../@types/context'

// Task 1: Added color options for dark mode
// Task 2: Updated form to set value to scheduled_date not created_at
// Task 2: Removed option to add past dates in calendar (assuming scheduled dates are only today or in future)
export default function NewEntry(){
    const emptyEntry: Entry = {title: "", description: "", scheduled_date: new Date(), created_at: new Date(), updated_at: new Date()}
    const { saveEntry, isDarkMode } = useContext(EntryContext) as EntryContextType
    const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)
    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name] : event.target.value
        })
    }
    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        // Set created_at and updated_at values to now
        const currentDate = new Date().toISOString();
        newEntry.created_at = currentDate
        newEntry.updated_at = currentDate

        saveEntry(newEntry)
        
        setNewEntry(emptyEntry)
    }
    return (
        <section
            className={`flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 p-8 rounded-md ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
            }`}
        >
            <input
                className={`p-3 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                type="text"
                placeholder="Title"
                name="title"
                value={newEntry.title}
                onChange={handleInputChange}
            />
            <textarea
                className={`p-3 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                placeholder="Description"
                name="description"
                value={newEntry.description}
                onChange={handleInputChange}
            />
            <input
                className={`p-3 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                name="scheduled_date"
                value={new Date(newEntry.scheduled_date).toISOString().split('T')[0]}
                onChange={handleInputChange}
            />
            <button
                onClick={(e) => handleSend(e)}
                className={`font-semibold p-3 rounded-md ${
                    isDarkMode ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-400 hover:bg-blue-600'
                } text-white`}
            >
                Create
            </button>
        </section>
    );
}
