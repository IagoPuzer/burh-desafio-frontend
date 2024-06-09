"use client";
import { useState } from "react";
import { toast } from "sonner";
import { NoteData } from "@/app/types/Note";

interface Props {
  onSubmit: (data: NoteData) => void;
  onClose: () => void;
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
    if (error) setError("");
  };

  const createNewNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newNoteData.title.trim() || !newNoteData.description.trim()) {
      setError("Os campos de título e/ou descrição não podem estar vazios.");
      return;
    }

    try {
      await onSubmit(newNoteData);
      setNewNoteData({ title: "", description: "" });
      onClose();
      toast.success("Nota criada com sucesso");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <form className="bg-gray-100 p-4 rounded mb-8" onSubmit={createNewNote}>
      <label htmlFor="title" className="text-slate-700">
        Título:
      </label>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="Title"
        className="block w-full border border-gray-300 rounded mb-2 p-2 text-black bg-white focus:outline-none"
        value={newNoteData.title}
        onChange={handleChange}
      />
      <label htmlFor="description" className="text-slate-700">
        Descrição:
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        className="text-black block w-full h-40 border border-gray-300 rounded mb-2 p-2 bg-white focus:outline-none"
        value={newNoteData.description}
        onChange={handleChange}
      />
      {error && (
        <p className="text-red-500 p-4" role="alert">
          {error}
        </p>
      )}
      <div className="flex justify-center mt-4 gap-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Criar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
        >
          Fechar
        </button>
      </div>
    </form>
  );
}
