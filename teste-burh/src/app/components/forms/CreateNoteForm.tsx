import { toast } from "sonner";
import { Note } from "@/app/types/Note";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: Note) => void;
  onClose: () => void;
}

export default function CreateNoteForm({
  onSubmit,
  onClose,
}: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>();

  const createNewNote = handleSubmit(async (formData: Note) => {
    try {
      await onSubmit(formData);
      onClose();
      toast.success("Task criada com sucesso");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  });

  return (
    <form className="bg-gray-100 p-4 rounded mb-8" onSubmit={createNewNote}>
      <label htmlFor="title" className="text-slate-700">
        Título:
      </label>
      <input
        id="title"
        type="text"
        {...register("title", { required: true })}
        placeholder="Title"
        className={`block w-full border border-gray-300 rounded mb-2 p-2 text-black bg-white focus:outline-none ${
          errors.title && "border-red-500"
        }`}
      />
      {errors.title && (
        <p className="text-red-500 p-4" role="alert">
          Este campo é obrigatório
        </p>
      )}

      <label htmlFor="description" className="text-slate-700">
        Descrição:
      </label>
      <textarea
        id="description"
        {...register("description", { required: true })}
        placeholder="Description"
        className={`text-black block w-full h-40 border border-gray-300 rounded mb-2 p-2 bg-white focus:outline-none ${
          errors.description && "border-red-500"
        }`}
      />
      {errors.description && (
        <p className="text-red-500 p-4" role="alert">
          Este campo é obrigatório
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
