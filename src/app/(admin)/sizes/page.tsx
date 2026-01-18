"use client";

import { useEffect, useState } from "react";
import SizeForm from "./SizeForm";
import SizeDelete from "./SizeDelete";
import SizeList from "./SizeList";
import { Size } from "./type";
import { toast } from "@/src/components/ui/toast/use-toast";

const SizePage = () => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSize, setEditingSize] = useState<Size | null>(null);
  const [formData, setFormData] = useState<Partial<Size>>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  console.log("sizes:", sizes);

  useEffect(() => {
    const fetchSizes = async () => {
      const res = await fetch("/api/sizes");
      const json = await res.json();
      setSizes(json);
    };
    fetchSizes();
  }, []);

  const openModal = (size?: Size) => {
    if (size) {
      setEditingSize(size);
      setFormData(size);
    } else {
      setEditingSize(null);
      setFormData({});
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSize(null);
    setFormData({});
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEdit = Boolean(editingSize);
    const url = isEdit ? `/api/sizes/${editingSize!.id}` : "/api/sizes";

    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const json = await res.json();
    const newSize = json.data;
    console.log("response json:", json);

    if (!res.ok) {
      toast(json.message || "Failed to save category", "error");
      return;
    }

    setSizes((prev) =>
      isEdit ? prev.map((s) => (s.id === newSize.id ? newSize : s)) : [...prev, newSize],
    );

    toast(isEdit ? "Size has been updated" : "Size has been created");

    closeModal();
  };
  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
    confirmDelete();
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    const res = await fetch(`/api/sizes/${deleteConfirmId}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (!res.ok) {
      toast(json.message || "Failed to delete size", "error");
      return;
    }

    setSizes((prev) => prev.filter((size) => size.id !== deleteConfirmId));

    toast("Size has been deleted");
    setDeleteConfirmId(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900">Sizes</h2>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
        >
          Add Size
        </button>
      </div>

      <SizeList
        sizes={sizes}
        openModal={openModal}
        handleDelete={handleDelete}
      />

      {/* Modal */}
      {isModalOpen && (
        <SizeForm
          closeModal={closeModal}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          editingSize={editingSize}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <SizeDelete
          deleteConfirmId={deleteConfirmId}
          setDeleteConfirmId={setDeleteConfirmId}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SizePage;
