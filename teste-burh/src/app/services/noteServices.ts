import { Note, NoteData } from "@/app/types/Note";

const API_URL = "./api/notes";

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
};

export const createNote = async (newNoteData: NoteData): Promise<Note> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNoteData),
  });
  if (!response.ok) {
    throw new Error("Failed to create new note");
  }
  return response.json();
};

export const deleteNote = async (noteId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${noteId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
};

export const updateNote = async (
  noteId: number,
  updatedNoteData: Note
): Promise<Note> => {
  const response = await fetch(`${API_URL}/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNoteData),
  });
  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return response.json();
};
