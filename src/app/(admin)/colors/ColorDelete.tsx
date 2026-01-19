import X from "@/src/components/icons/X";

interface ColorDeleteProps {
  setDeleteConfirmId: (id: string | null) => void;
  confirmDelete: () => void;
}

const ColorDelete = ({ setDeleteConfirmId, confirmDelete }: ColorDeleteProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-gray-900">Confirm Delete</h3>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="p-1 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-gray-500">
                Are you sure you want to delete this color?
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-500 transition-colors"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ColorDelete