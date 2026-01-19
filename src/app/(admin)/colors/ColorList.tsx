import Edit from "@/src/components/icons/Edit";
import Trash from "@/src/components/icons/Trash";
import { Color } from "./type";

interface ColorListProps {
    colors: Color[],
    openModal: (color: Color) => void,
    handleDelete: (id: string) => void
}   

const ColorList = ({colors, openModal, handleDelete}: ColorListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {colors.map((color) => (
        <div
          key={color.id}
          className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:border-gray-200 transition-colors"
        >
          <div
            className="h-24 w-full"
            style={{ backgroundColor: color.hexCode }}
          />
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-0.5">{color.name}</h3>
                <p className="text-sm text-gray-500">{color.hexCode}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openModal(color)}
                  className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(color.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorList;
