// Task 2: Added field for scheduled_date
export interface Entry {
  id?: string;
  title: string;
  description: string;
  scheduled_date: Date | string;
  updated_at: Date | string;
  created_at: Date | string;
}

// Task 1: Added fields for dark mode
export type EntryContextType = {
  entries: Entry[];
  saveEntry: (entry: Entry) => void;
  updateEntry: (id: string, entryData: Entry) => void;
  deleteEntry: (id: string) => void;
  isDarkMode: boolean; // Dark mode state
  toggleDarkMode: () => void; // Dark mode toggle
};
