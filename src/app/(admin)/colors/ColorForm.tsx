import X from "@/src/components/icons/X";
import { Color, ColorCreate } from "./type";

interface ColorFormProps {
  editingColor: Color | null;
  formData: ColorCreate;
  setFormData: (data: ColorCreate) => void;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
}

const ColorForm = ({
  editingColor,
  formData,
  setFormData,
  handleSubmit,
  closeModal,
}: ColorFormProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">
            {editingColor ? "Edit Color" : "Add Color"}
          </h3>
          <button
            onClick={closeModal}
            className="p-1 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Color Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              placeholder="e.g., Navy Blue"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Hex Code</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={formData.hexCode}
                onChange={(e) =>
                  setFormData({ ...formData, hexCode: e.target.value })
                }
                className="w-12 h-10 border border-gray-200 rounded-md cursor-pointer"
              />
              <input
                type="text"
                required
                value={formData.hexCode}
                onChange={(e) =>
                  setFormData({ ...formData, hexCode: e.target.value })
                }
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                placeholder="#000000"
                pattern="^#[0-9A-Fa-f]{6}$"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
            >
              {editingColor ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorForm;
