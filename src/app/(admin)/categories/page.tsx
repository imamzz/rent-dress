"use client";

import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryDelete from "./CategoryDelete";
import CategoryList from "./CategoryList";
import { toast } from "@/src/components/ui/toast/use-toast";
import { Category } from "./type";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const json = await res.json();

      setCategories(json.data);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "" });
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEdit = Boolean(editingCategory);
    const url = isEdit
      ? `/api/categories/${editingCategory!.id}`
      : "/api/categories";

    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const json = await res.json();

    if (!res.ok) {
      toast(json.message || "Failed to save category", "error");
      return;
    }

    setCategories((prev) =>
      isEdit ? prev.map((c) => (c.id === json.id ? json : c)) : [...prev, json],
    );

    toast(isEdit ? "Category has been updated" : "Category has been created");

    closeModal();
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    const res = await fetch(`/api/categories/${deleteConfirmId}`, {
      method: "DELETE",
    });
    const json = await res.json();

    if (!res.ok) {
      toast(json.message || "Failed to delete category", "error");
      return;
    }
    toast("Category has been deleted");
    setCategories((prev) =>
      prev.filter((category) => category.id !== deleteConfirmId),
    );
    setDeleteConfirmId(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900">Categories</h2>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
        >
          Add Category
        </button>
      </div>

      <CategoryList
        categories={categories}
        openModal={openModal}
        setDeleteConfirmId={setDeleteConfirmId}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <CategoryDelete
          deleteConfirmId={deleteConfirmId}
          setDeleteConfirmId={setDeleteConfirmId}
          handleDelete={handleDelete}
        />
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <CategoryForm
          closeModal={closeModal}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
