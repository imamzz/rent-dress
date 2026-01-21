"use client";

import X from "@/src/components/icons/X";
import { Size } from "../sizes/type";
import { Category } from "../categories/type";
import { Color } from "../colors/type";
import { CreateProductInput, Variant } from "./type";

interface ProductFormProps {
  formData: CreateProductInput;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleImagesChange: (files: File[]) => void;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
  mode: "add" | "edit";
  updateVariant: (
    index: number,
    field: keyof Variant,
    value: string | number
  ) => void;
  handleAddVariant?: () => void;
  handleRemoveVariant: (index: number) => void;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

export default function ProductForm({
  formData,
  handleChange,
  handleImagesChange,
  handleSubmit,
  closeModal,
  mode,
  updateVariant,
  handleAddVariant,
  handleRemoveVariant,
  categories,
  sizes,
  colors,
}: ProductFormProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">
            {mode === "edit" ? "Edit Product" : "Add Product"}
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
              Product Name
            </label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Daily Rate ($)
              </label>
              <input
                name="price"
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            {formData.variants.map((variant, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">
                  Variant {index + 1}
                </label>

                <div className="grid w-full grid-cols-[1fr_1fr_1fr_auto] gap-4">
                  {/* Size */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Size</label>
                    <select
                      value={variant.size}
                      onChange={(e) =>
                        updateVariant(index, "size", e.target.value)
                      }
                      className="w-full h-[38px] px-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value="">Select Size</option>
                      {sizes.map((size) => (
                        <option
                          key={size.id}
                          value={size.id}
                        >
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Color</label>
                    <select
                      value={variant.color}
                      onChange={(e) =>
                        updateVariant(index, "color", e.target.value)
                      }
                      className="w-full h-[38px] px-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value="">Select Color</option>
                      {colors.map((color) => (
                        <option
                          key={color.id}
                          value={color.id}
                        >
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      min={0}
                      value={variant.quantity}
                      onChange={(e) =>
                        updateVariant(index, "quantity", Number(e.target.value))
                      }
                      className="w-full h-[38px] px-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>

                  {/* Remove button */}
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="h-9.5 w-9.5 flex items-center justify-center bg-red-600 text-white rounded-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            ))}

            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleAddVariant}
                className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
              >
                Add Variant
              </button>
            </div>

          </div>


          <div>
            <label className="block text-sm text-gray-700 mb-2">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (!e.target.files) return;
                handleImagesChange(Array.from(e.target.files));
              }}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm"
            />
          </div>


          {formData.images.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {formData.images.map((file, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}


          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
            >
              {mode === "edit" ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-8 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
