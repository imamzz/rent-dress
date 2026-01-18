import Edit from "@/src/components/icons/Edit";
import Trash from "@/src/components/icons/Trash";

interface Category {
  id: string;
  name: string;
  description: string;
  productCount?: number;
}

const CategoryList = ({
  categories,
  openModal,
  setDeleteConfirmId,
}: {
  categories: Category[];
  openModal: (category: Category) => void;
  setDeleteConfirmId: (id: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white border border-gray-100 rounded-lg p-6 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => openModal(category)}
                className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteConfirmId(category.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              {category.productCount} products
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
