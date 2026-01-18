interface CategoryDeleteProps {
  deleteConfirmId: string;
  setDeleteConfirmId: (id: string | null) => void;
  handleDelete: (id: string) => void;
}

const CategoryDelete = ({
  deleteConfirmId,
  setDeleteConfirmId,
  handleDelete,
}: CategoryDeleteProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-gray-900 mb-2">Delete Category</h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleDelete(deleteConfirmId)}
            className="flex-1 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => setDeleteConfirmId(null)}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDelete;
