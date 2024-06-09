import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onSubmit: (data: NoteData) => void;
  onClose: () => void;
  initialData: NoteData;
}

export interface NoteData {
  id: number;
  title: string;
  description: string;
}

export default function UpdateNoteForm({
  onSubmit,
  onClose,
  initialData,
}: Props): JSX.Element {
  const [noteData, setNoteData] = useState<NoteData>(initialData);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const handleUpdateNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!noteData.title.trim() || !noteData.description.trim()) {
      setError("Os campos de título e/ou descrição não podem estar vazios.");
      return;
    }

    try {
      onSubmit(noteData);
      onClose();
      toast.success("Nota editada com sucesso");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <form className="bg-gray-100 p-4 rounded mb-8 " onSubmit={handleUpdateNote}>
      <label className="text-slate-700">Titulo:</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="block w-full border border-gray-300 rounded mb-2 p-2 text-black bg-white focus:outline-none"
        value={noteData.title}
        onChange={handleChange}
      />
      <label className="text-slate-700">Descrição:</label>
      <textarea
        name="description"
        placeholder="Description"
        className="text-black block w-full border border-gray-300 rounded mb-2 p-2 bg-white focus:outline-none h-40"
        value={noteData.description}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 p-4">{error}</p>}
      <div className="flex justify-center mt-4 gap-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Atualizar
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
