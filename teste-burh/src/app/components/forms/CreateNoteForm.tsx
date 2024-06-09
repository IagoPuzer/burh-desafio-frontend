"use client";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onSubmit: (data: NoteData) => void;
  onClose: () => void;
}

export interface NoteData {
  title: string;
  description: string;
}

export default function CreateNoteForm({
  onSubmit,
  onClose,
}: Props): JSX.Element {
  const [newNoteData, setNewNoteData] = useState<NoteData>({
    title: "",
    description: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNoteData({ ...newNoteData, [name]: value });
  };

  const createNewNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newNoteData.title.trim() || !newNoteData.description.trim()) {
      setError("Os campos de título e/ou descrição não podem estar vazios.");
      return;
    }

    try {
      onSubmit(newNoteData);
      setNewNoteData({ title: "", description: "" });
      onClose();
      toast.success("Nota criada com sucesso");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <form className="bg-gray-100 p-4 rounded mb-8" onSubmit={createNewNote}>
      <label className="text-slate-700">Titulo:</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="block w-full border border-gray-300 rounded mb-2 p-2 text-black bg-white focus:outline-none"
        value={newNoteData.title}
        onChange={handleChange}
      />
      <label className="text-slate-700">Descrição:</label>
      <textarea
        name="description"
        placeholder="Description"
        className="text-black block w-full h-40 border border-gray-300 rounded mb-2 p-2 bg-white focus:outline-none"
        value={newNoteData.description}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 p-4">{error}</p>}
      <div className="flex justify-center mt-4 gap-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Criar
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
        >
          Fechar
        </button>
      </div>
    </form>
  );
}
