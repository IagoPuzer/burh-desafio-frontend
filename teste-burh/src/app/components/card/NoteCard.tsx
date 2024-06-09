import { useState } from "react";
import NoteModal from "../modals/NoteModal";
import UpdateNoteForm, { NoteData } from "../forms/UpdateNoteForm";
import ViewNote from "../modals/ViewNote";
import { toast } from "sonner";

interface Note {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

interface Props {
  note: Note;
  onDelete: (noteId: number) => void;
  onUpdate: (updatedNoteData: NoteData) => void;
  onToggleDone: (noteId: number) => void;
}

export default function NoteCard({
  note,
  onDelete,
  onUpdate,
  onToggleDone,
}: Props) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);

  const handleDeleteClick = () => {
    onDelete(note.id);
    toast.error("Nota excluída");
  };

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };

  const handleViewClick = () => {
    setIsViewModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setIsViewModalOpen(false);
  };

  const handleToggleDoneClick = () => {
    onToggleDone(note.id);
  };

  return (
    <>
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <div className="flex flex-col">
            <h3 className="mb-4 text-xl font-medium text-slate-700">
              {note.title}
            </h3>
          </div>
          <p className="truncate">{note.description}</p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              className={`p-2 rounded-md text-black ${
                note.done ? "bg-green-300" : "bg-green-100 hover:bg-green-300"
              }`}
              onClick={handleToggleDoneClick}
            >
              {note.done ? "Undone" : "Done"}
            </button>
            <button
              className="bg-red-200 hover:bg-red-300 p-2 rounded-md text-black"
              onClick={handleDeleteClick}
            >
              Deletar
            </button>
            <button
              className="bg-sky-100 hover:bg-sky-300 p-2 rounded-md text-black"
              onClick={handleUpdateClick}
            >
              Editar
            </button>
            <button
              className="border-2  p-2 rounded-md text-black"
              onClick={handleViewClick}
            >
              Visualizar
            </button>
          </div>
        </div>
      </div>
      <NoteModal
        isOpen={isUpdateModalOpen}
        note={note}
        formComponent={
          <UpdateNoteForm
            initialData={note}
            onSubmit={onUpdate}
            onClose={handleCloseUpdateModal}
          />
        }
      />
      <ViewNote
        note={note}
        isOpen={isViewModalOpen}
        onClose={handleCloseUpdateModal}
      />
    </>
  );
}
