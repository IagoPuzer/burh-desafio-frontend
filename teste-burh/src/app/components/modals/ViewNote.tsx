import { IoClose } from "react-icons/io5";

interface Note {
  title: string;
  description: string;
}

interface Props {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewNote({
  note,
  isOpen,
  onClose,
}: Props): JSX.Element {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-96 md:w-1/2 2xl:w-1/4">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-bold mb-2">Task </h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none "
                onClick={onClose}
              >
                <IoClose className="size-8" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-700 overflow-x-auto max-h-80">
                {note.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
