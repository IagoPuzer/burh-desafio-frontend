"use client";
import { useState, useEffect } from "react";
import NoteCard from "./components/card/NoteCard";
import CreateNoteButton from "./components/buttons/CreateNoteButton";
import NoteModal from "./components/modals/NoteModal";
import CreateNoteForm, { NoteData } from "./components/forms/CreateNoteForm";

interface Note {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchAllNotes = async () => {
    try {
      const response = await fetch("./api/notes");
      if (response.ok) {
        const data: Note[] = await response.json();
        setNotes(data);
      } else {
        console.error("Failed to fetch notes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const createNewNote = async (newNoteData: NoteData) => {
    try {
      const response = await fetch("./api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNoteData),
      });
      if (response.ok) {
        const newNote = await response.json();
        setNotes([...notes, newNote]);
        setIsModalOpen(false);
      } else {
        console.error("Failed to create new note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDeleteNote = async (noteId: Note["id"]) => {
    try {
      await fetch(`./api/notes/${noteId}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEditNote = async (updatedNoteData: Note) => {
    try {
      const response = await fetch(`./api/notes/${updatedNoteData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNoteData),
      });
      if (response.ok) {
        const updatedNoteFromServer: Note = await response.json();
        setNotes(
          notes.map((note) =>
            note.id === updatedNoteFromServer.id ? updatedNoteFromServer : note
          )
        );
        setIsModalOpen(false);
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleOpenModalCreateNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100">Notes APP</h1>
          <div className="flex gap-6">
            <CreateNoteButton onCreate={handleOpenModalCreateNote} />
          </div>
        </div>
        <div className="">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-3xl text-center flex justify-center">
              Sem notas cadastradas
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onUpdate={handleEditNote}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <NoteModal
        isOpen={isModalOpen}
        formComponent={
          <CreateNoteForm onSubmit={createNewNote} onClose={handleCloseModal} />
        }
      />
    </div>
  );
}
