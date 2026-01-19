"use client";

import { Color, ColorCreate } from "./type";

import { useEffect, useState } from "react";
import ColorDelete from "./ColorDelete";
import ColorForm from "./ColorForm";
import ColorList from "./ColorList";
import { toast } from "@/src/components/ui/toast/use-toast";

const ColorsPage = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<Color | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const initiateColor: ColorCreate = {
    name: "",
    hexCode: "#000000",
  };
  const [formData, setFormData] = useState<ColorCreate>(initiateColor);
  useEffect(() => {
    const fetchColors = async () => {
      const res = await fetch("/api/colors");
      const json = await res.json();
      setColors(json.data);
    };
    fetchColors();
  }, []);

  console.log("colors:", colors);

  const openModal = (color?: Color) => {
    if (color) {
      setEditingColor(color);
      setFormData(color);
    } else {
      setEditingColor(null);
      setFormData(initiateColor);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingColor(null);
    setFormData(initiateColor);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEdit = Boolean(editingColor);
    const url = isEdit ? `/api/colors/${editingColor!.id}` : "/api/colors";

    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();

    if (!res.ok) {
      toast(json.message || "Failed to save color", "error");
      return;
    }
    setColors((prev) =>
      isEdit ? prev.map((c) => (c.id === json.data.id ? json.data : c)) : [...prev, json.data],
    );
    toast(isEdit ? "Color has been updated" : "Color has been created");

    closeModal();
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };
  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    const res = await fetch(`/api/colors/${deleteConfirmId}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok) {
      toast(json.message || "Failed to delete color");
      return;
    }
    toast("Color has been deleted");
    setDeleteConfirmId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900">Colors</h2>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
        >
          Add Color
        </button>
      </div>

      <ColorList
        colors={colors}
        openModal={openModal}
        handleDelete={handleDelete}
      />

      {/* Modal */}
      {isModalOpen && (
        <ColorForm
          editingColor={editingColor}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <ColorDelete
          setDeleteConfirmId={setDeleteConfirmId}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default ColorsPage;
