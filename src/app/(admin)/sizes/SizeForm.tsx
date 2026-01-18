"use client";
import X from "@/src/components/icons/X";
import { Size } from "./type";

type SizeFormProps = {
  editingSize: Size | null;
  formData: Partial<Size>;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFormData: (data: Partial<Size>) => void;
};

const SizeForm = ({
  editingSize,
  formData,
  closeModal,
  handleSubmit,
  setFormData,
}: SizeFormProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">
            {editingSize ? "Edit Size" : "Add Size"}
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
              Size Name
            </label>
            <input
              type="text"
              required
              value={formData.label}
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              placeholder="e.g., M, L, XL"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Bust Measurement
            </label>
            <input
              type="text"
              required
              value={formData.bust}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bust: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              placeholder='e.g., 34-36"'
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Waist Measurement
            </label>
            <input
              type="text"
              required
              value={formData.waist}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  waist: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              placeholder='e.g., 34-36"'
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Hips Measurement
            </label>
            <input
              type="text"
              required
              value={formData.hips}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hips: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              placeholder='e.g., 37-39"'
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
            >
              {editingSize ? "Update" : "Add"}
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

export default SizeForm;
