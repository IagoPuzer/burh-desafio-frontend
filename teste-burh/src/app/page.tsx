"use client";
import { useState, useEffect } from "react";
import NoteCard from "./components/card/NoteCard";
import CreateNoteButton from "./components/buttons/CreateNoteButton";
import NoteModal from "./components/modals/NoteModal";
import CreateNoteForm from "./components/forms/CreateNoteForm";
import { Note } from "./types/Note";
import {
  fetchNotes,
  createNote,
  deleteNote,
  updateNote,
} from "./services/noteServices";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchAllNotes = async () => {
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createNewNote = async (newNoteData: Note) => {
    try {
      const newNote = await createNote(newNoteData);
      setNotes([...notes, newNote]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDeleteNote = async (noteId: Note["id"]) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditNote = async (updatedNoteData: Note) => {
    try {
      const updatedNoteFromServer = await updateNote(
        updatedNoteData.id,
        updatedNoteData
      );
      setNotes(
        notes.map((note) =>
          note.id === updatedNoteFromServer.id ? updatedNoteFromServer : note
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleToggleDone = async (noteId: number) => {
    try {
      const noteToUpdate = notes.find((note) => note.id === noteId);
      if (!noteToUpdate) return;

      const updatedNote = { ...noteToUpdate, done: !noteToUpdate.done };
      const updatedNoteFromServer = await updateNote(noteId, updatedNote);
      setNotes(
        notes.map((note) =>
          note.id === updatedNoteFromServer.id ? updatedNoteFromServer : note
        )
      );
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
          <h1 className="text-3xl font-bold text-slate-100">Tasks APP</h1>
          <div className="flex gap-6">
            <CreateNoteButton onCreate={handleOpenModalCreateNote} />
          </div>
        </div>
        <div className="">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-3xl text-center flex justify-center">
              Sem tasks cadastradas
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onUpdate={handleEditNote}
                  onToggleDone={handleToggleDone}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <NoteModal
        isOpen={isModalOpen}
        title="Criar task"
        formComponent={
          <CreateNoteForm onSubmit={createNewNote} onClose={handleCloseModal} />
        }
      />
    </div>
  );
}
