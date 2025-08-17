import { create } from 'zustand';

// Define the shape of a single document
export interface Document {
  id: number;
  filename: string;
}

// Define the shape of a single chat message
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Define the shape of our application's state
interface AppState {
  documents: Document[];
  messages: Message[];
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  addMessage: (message: Message) => void;
}

// Create the Zustand store
export const useAppStore = create<AppState>((set) => ({
  // Initial state
  documents: [],
  messages: [
    { role: 'assistant', content: 'Hello! Upload a document and I can answer questions about it.' }
  ],

  // Action to completely replace the document list
  setDocuments: (documents) => set({ documents }),

  // Action to add a new document to the list
  addDocument: (document) => set((state) => ({ documents: [...state.documents, document] })),

  // Action to add a new message to the chat history
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
