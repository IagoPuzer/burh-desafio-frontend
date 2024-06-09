interface Props {
  onCreate: () => void;
}

export default function CreateNoteButton({ onCreate }: Props): JSX.Element {
  return (
    <button
      onClick={onCreate}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      Criar Tasks
    </button>
  );
}
