"use client";

import { useEffect, useState } from "react";
import Search from "@/src/components/icons/Search";
import Filter from "@/src/components/icons/Filter";

import ProductForm from "@/src/app/(admin)/products/ProductForm";
import ProductFilter from "./ProductFilter";
import ProductTable from "./ProductTable";
import ProductDetail from "./ProductDetail";

import {
  CreateProductInput,
  Variant,
  Color,
  Category,
  Size,
  TableProduct,
  ProductDetailType,
} from "./type";

/* -------------------------------------------------------------------------- */
/*                                   CONST                                    */
/* -------------------------------------------------------------------------- */

const initialFormData: CreateProductInput = {
  name: "",
  description: "",
  category: "",
  price: 0,
  images: [],
  variants: [{ size: "", color: "", quantity: 0 }],
};

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

const Products = () => {
  /* ------------------------------ UI STATE ------------------------------ */

  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenProductDetail, setIsOpenProductDetail] = useState(false);

  /* ------------------------------ FILTER STATE --------------------------- */

  const [filterCategory, setFilterCategory] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState<"single" | "range">("single");
  const [singleDate, setSingleDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* ------------------------------ DATA STATE ----------------------------- */

  const [dataProducts, setDataProducts] = useState<TableProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productDetail, setProductDetail] = useState<ProductDetailType | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateProductInput>(initialFormData);

  /* -------------------------------------------------------------------------- */
  /*                               DATA FETCHING                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const json = await res.json();
      setDataProducts(json.data);
    }
    fetchProducts()
  }, []);

  useEffect(() => {
    const fetchSizes = async () => {
      const res = await fetch("/api/sizes");
      const json = await res.json();
      setSizes(json);
    };
    fetchSizes();
  }, []);

  useEffect(() => {
    const fetchColors = async () => {
      const res = await fetch("/api/colors");
      const json = await res.json();
      setColors(json.data);
    }
    fetchColors();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const json = await res.json();
      setCategories(json.data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedProductId) return;
    const fetchProductDetail = async () => {
      const res = await fetch(`/api/products/${selectedProductId}`)
      const json = await res.json();
      setProductDetail(json.data);
    }
    fetchProductDetail();
  }, [selectedProductId]);


  /* -------------------------------------------------------------------------- */
  /*                                HANDLERS                                    */
  /* -------------------------------------------------------------------------- */

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
  };

  const openDetailModal = (id: string) => {
    setSelectedProductId(id);
    setIsOpenProductDetail(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const updateVariant = (index: number, field: keyof Variant, value: string | number) => {
    setFormData(prev => {
      const variants = [...prev.variants];
      variants[index] = { ...variants[index], [field]: value };
      return { ...prev, variants };
    });
  };

  const handleAddVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { size: "", color: "", quantity: 0 }],
    }));
  };

  const handleRemoveVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleImagesChange = (files: File[]) => {
    const MAX_FILES = 5;
    const MAX_SIZE = 2 * 1024 * 1024;

    const validFiles = files
      .slice(0, MAX_FILES)
      .filter(file => file.size <= MAX_SIZE);

    setFormData(prev => ({ ...prev, images: validFiles }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validVariants = formData.variants.filter(
      v => v.size && v.color && v.quantity > 0
    );

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("category", formData.category);
    fd.append("price", String(formData.price));
    fd.append("variants", JSON.stringify(validVariants));

    formData.images.forEach(file => fd.append("images", file));

    const res = await fetch("/api/products", { method: "POST", body: fd });
    const json = await res.json();

    setDataProducts(prev => [json, ...prev]);
    closeModal();
  };

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

  /* -------------------------------------------------------------------------- */
  /*                                  RENDER                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-gray-900">Products</h2>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md"
        >
          Add Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-gray-100 rounded-lg mb-6 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors ${showFilters
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
          >
            <Filter /> Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <ProductFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterSize={filterSize}
          setFilterSize={setFilterSize}
          filterColor={filterColor}
          setFilterColor={setFilterColor}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterType={filterType}
          setFilterType={setFilterType}
          singleDate={singleDate}
          setSingleDate={setSingleDate}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          // filteredProducts={filteredProducts}
          // products={products}
          // hasActiveFilters={hasActiveFilters}
          clearAllFilters={clearAllFilters}
        />
      )}

      <ProductTable
        products={dataProducts}
        openDetailModal={openDetailModal}
        openModal={openModal}
        setDeleteConfirmId={setDeleteConfirmId}
      />

      {isModalOpen && (
        <ProductForm
          formData={formData}
          handleChange={handleChange}
          handleImagesChange={handleImagesChange}
          handleSubmit={handleSubmit}
          updateVariant={updateVariant}
          handleAddVariant={handleAddVariant}
          handleRemoveVariant={handleRemoveVariant}
          closeModal={closeModal}
          mode="add"
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      )}

      {isOpenProductDetail && productDetail && (
        <ProductDetail
          product={productDetail}
          closeDetailModal={() => {
            setIsOpenProductDetail(false);
            setSelectedProductId(null);
            setProductDetail(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;
