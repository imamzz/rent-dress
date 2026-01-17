"use client";

import Search from "@/src/components/icons/Search";
import Filter from "@/src/components/icons/Filter";
import ChevronLefT from "@/src/components/icons/ChevronLeft";
import ChevronRight from "@/src/components/icons/ChevronRight";
import { useState } from "react";
import Eye from "@/src/components/icons/Eye";
import ProductForm from "@/src/components/ui/ProductForm";

type Variant = {
  size: string;
  color: string;
  quantity: number;
};

type CreateProductInput = {
  name: string;
  description: string;
  category: string;
  dailyRate: number;
  images: string[];
  variants: Variant[];
};

const initialFormData: CreateProductInput = {
  name: "",
  description: "",
  category: "",
  dailyRate: 0,
  images: [],
  variants: [{ size: "", color: "", quantity: 0 }],
};

// const [formData, setFormData] = useState<CreateProductInput>(initialFormData);


const Products = () => {
  const openModal = () => {
    setIsModalOpen(true);
  };
  const [showFilters, setShowFilters] = useState(false);
  const hasActiveFilters = false; // Replace with actual filter state check

  const [filterCategory, setFilterCategory] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState<"single" | "range">("single");
  const [singleDate, setSingleDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const filteredProducts = []; 
  const paginatedProducts = filteredProducts; 
  const [currentPage, setCurrentPage] = useState(1);
  const handleItemsPerPageChange = (itemsPerPage: number) => {
    console.log("Change items per page to:", itemsPerPage);
  };
  const totalPages = 1; // Replace with actual total pages calculation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    
  };

  const openDetailModal = (product: CreateProductInput) => {
    alert(`Open detail modal for product: ${product.name}`);
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateProductInput>(initialFormData);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: string | number
  ) => {
    setFormData((prev) => {
      const variants = [...prev.variants];
      variants[index] = {
        ...variants[index],
        [field]: value,
      };
      return { ...prev, variants };
    });
  };

  const handleAddVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", color: "", quantity: 0 }],
    }));
  };

  const handleRemoveVariant = (index: number) => {
    setFormData((prev) => {
      const variants = prev.variants.filter((_, i) => i !== index);
      return { ...prev, variants };
    });
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      // Implement delete logic here
      setDeleteConfirmId(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "dailyRate" ||
        name === "totalQuantity" ||
        name === "rentedQuantity"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = formData;
    console.log("Form submitted with data:", data);
  };

  const products = []; // Replace with actual products data
  const clearAllFilters = () => {
    setFilterCategory("");
    setFilterSize("");
    setFilterColor("");
    setFilterStatus("");
    setFilterType("single");
    setSingleDate("");
    setStartDate("");
    setEndDate("");
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900">Products</h2>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
        >
          Add Product
        </button>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg mb-6 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              // value={searchQuery}
              // onChange={(e) => {
              //   setSearchQuery(e.target.value);
              //   setCurrentPage(1);
              // }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors ${
              showFilters || hasActiveFilters
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {/* <Filter className="w-4 h-4" /> */}
            <Filter />
            Filters
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="border-t border-gray-100 pt-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  // setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              >
                <option value="">All Categories</option>
                {/* {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))} */}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Size</label>
              <select
                value={filterSize}
                onChange={(e) => {
                  setFilterSize(e.target.value);
                  // setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              >
                <option value="">All Sizes</option>
                {/* {sizes.map((size) => (
                  <option key={size.id} value={size.name}>
                    {size.name}
                  </option>
                ))} */}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Color</label>
              <select
                value={filterColor}
                onChange={(e) => {
                  setFilterColor(e.target.value);
                  // setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              >
                <option value="">All Colors</option>
                {/* {colors.map((color) => (
                  <option key={color.id} value={color.name}>
                    {color.name}
                  </option>
                ))} */}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  // setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="rented">Fully Rented</option>
              </select>
            </div>
          </div>

          {/* Date Filters */}
          <div className="border-t border-gray-100 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Filter Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value as "single" | "range");
                    setSingleDate("");
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                >
                  <option value="single">Single Date</option>
                  <option value="range">Date Range</option>
                </select>
              </div>

              {filterType === "single" ? (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Unavailable On
                  </label>
                  <input
                    type="date"
                    value={singleDate}
                    onChange={(e) => {
                      setSingleDate(e.target.value);
                      // setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      From
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        // setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Until
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        // setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-500">
              {filteredProducts.length} of {products.length} products
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Rate
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Unavailable
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        {product.images.length > 1 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                            +{product.images.length - 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-gray-900 text-sm">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {product.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {product.size}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {product.color}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${product.dailyRate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        <span
                          className={
                            product.rentedQuantity > 0 ? "text-orange-600" : ""
                          }
                        >
                          {product.rentedQuantity}
                        </span>
                        {" / "}
                        <span>{product.totalQuantity}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.totalQuantity - product.rentedQuantity}{" "}
                        available
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs">
                        {product.unavailableFrom ? (
                          <>
                            <span className="text-gray-700">
                              {formatDate(product.unavailableFrom)}
                            </span>
                            {product.unavailableUntil && (
                              <>
                                <br />
                                <span className="text-gray-500">
                                  to {formatDate(product.unavailableUntil)}
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          product.totalQuantity > product.rentedQuantity
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {product.totalQuantity > product.rentedQuantity
                          ? "Available"
                          : "Rented"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openDetailModal(product)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          {/* <Eye className="w-4 h-4" /> */}
                          <Eye />
                        </button>
                        <button
                          // onClick={() => openModal(product)}
                          className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                          title="Edit"
                        >
                          {/* <Edit2 className="w-4 h-4" /> */}
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          {/* <Trash2 className="w-4 h-4" /> */}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show:</label>
            <select
              // value={itemsPerPage}
              onChange={(e) =>
                handleItemsPerPageChange(parseInt(e.target.value))
              }
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              // disabled={currentPage === 1}
              className="p-1.5 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLefT className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-700">
              {/* {currentPage} / {totalPages} */}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          updateVariant={updateVariant}
          handleAddVariant={handleAddVariant}
          closeModal={closeModal}
          mode="add"
          handleRemoveVariant={handleRemoveVariant}
        />

      )}
      ;
    </div>
  );
};

export default Products;
