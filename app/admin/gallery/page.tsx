import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";
import {
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Save,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";
import { initialGalleryItems } from "../../../data/gallery";
import { GalleryItem } from "../../../types/product";

const MotionDiv = motion.div as any;

const AdminGalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [form, setForm] = useState({
    imageUrl: "",
    category: "Product" as GalleryItem["category"],
    titleEn: "",
    isActive: true,
  });

  useEffect(() => {
    const savedItems = localStorage.getItem("fixoboard_gallery");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(initialGalleryItems);
      localStorage.setItem(
        "fixoboard_gallery",
        JSON.stringify(initialGalleryItems),
      );
    }
  }, []);

  const saveToStorage = (newItems: GalleryItem[]) => {
    localStorage.setItem("fixoboard_gallery", JSON.stringify(newItems));
    setItems(newItems);
  };

  const showNotify = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 3000);
  };

  const resetForm = () => {
    setForm({
      imageUrl: "",
      category: "Product",
      titleEn: "",
      isActive: true,
    });
    setEditingItem(null);
    setIsAdding(false);
    setUploadMethod("file");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showNotify(
          "error",
          "Image too large. Max size is 2MB for local storage.",
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
        showNotify("success", "Image processed successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.imageUrl) {
      showNotify("error", "Please select an image or provide a URL.");
      return;
    }

    if (editingItem) {
      const updated = items.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              imageUrl: form.imageUrl,
              category: form.category,
              title: { ...item.title, en: form.titleEn },
              isActive: form.isActive,
            }
          : item,
      );
      saveToStorage(updated);
      showNotify("success", "Visual updated successfully");
    } else {
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        imageUrl: form.imageUrl,
        category: form.category,
        title: { en: form.titleEn },
        createdAt: new Date().toISOString(),
        isActive: form.isActive,
      };
      const updated = [newItem, ...items];
      saveToStorage(updated);
      showNotify("success", "New image added to gallery");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this image from the gallery?")) {
      const updated = items.filter((i) => i.id !== id);
      saveToStorage(updated);
      showNotify("success", "Image removed");
    }
  };

  const toggleActive = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item,
    );
    saveToStorage(updated);
    showNotify("success", "Visibility updated");
  };

  const startEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setForm({
      imageUrl: item.imageUrl,
      category: item.category,
      titleEn: item.title.en,
      isActive: item.isActive,
    });
    setUploadMethod(item.imageUrl.startsWith("data:") ? "file" : "url");
    setIsAdding(true);
  };

  return (
    <ProtectedRoute>
      <div className="flex bg-slate-50 min-h-screen">
        <AdminSidebar />

        <main className="flex-grow pl-72">
          <div className="p-10 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h1 className="font-display text-4xl font-black text-slate-900">
                  Gallery Admin
                </h1>
                <p className="text-slate-500 mt-1">
                  Control center for project visuals and showcases.
                </p>
              </div>
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] shadow-lg shadow-brand-blue/20"
              >
                <Plus size={16} />
                Add New Visual
              </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {!item.isActive && (
                      <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                          Hidden
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider text-slate-700 shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-slate-900 mb-4 truncate">
                      {item.title.en}
                    </h3>
                    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-brand-blue/10 hover:text-brand-blue transition-colors"
                        title="Edit Details"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => toggleActive(item.id)}
                        className={`p-2.5 rounded-xl transition-colors ${
                          item.isActive
                            ? "bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                            : "bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
                        }`}
                        title={item.isActive ? "Deactivate" : "Activate"}
                      >
                        {item.isActive ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-brand-red/10 hover:text-brand-red transition-colors"
                        title="Delete Permanently"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal & Notifications remain same internal logic but now wrapped in sidebar layout */}
            <AnimatePresence>
              {isAdding && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                    onClick={resetForm}
                  />
                  <MotionDiv
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                  >
                    <div className="p-8 md:p-12">
                      {/* Modal header */}
                      <div className="flex justify-between items-center mb-10">
                        <h2 className="font-display text-2xl font-black text-slate-900">
                          {editingItem ? "Edit Visual" : "Upload To Gallery"}
                        </h2>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Upload method toggle */}
                        <div className="flex p-1 bg-slate-100 rounded-xl w-fit mb-6">
                          <button
                            type="button"
                            onClick={() => setUploadMethod("file")}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all ${
                              uploadMethod === "file"
                                ? "bg-white text-brand-blue shadow-sm"
                                : "text-slate-400"
                            }`}
                          >
                            <Upload size={13} /> Upload File
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadMethod("url")}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all ${
                              uploadMethod === "url"
                                ? "bg-white text-brand-blue shadow-sm"
                                : "text-slate-400"
                            }`}
                          >
                            <LinkIcon size={13} /> From URL
                          </button>
                        </div>

                        {/* Image input */}
                        <div>
                          {uploadMethod === "file" ? (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden aspect-[16/9] ${
                                form.imageUrl
                                  ? "border-brand-blue bg-brand-blue/5"
                                  : "border-slate-200 bg-slate-50 hover:border-brand-blue/50"
                              }`}
                            >
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                              />
                              {form.imageUrl ? (
                                <div className="absolute inset-0">
                                  <img
                                    src={form.imageUrl}
                                    className="w-full h-full object-cover"
                                    alt="Preview"
                                  />
                                  <div className="absolute inset-0 bg-brand-dark/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="bg-white text-slate-900 px-6 py-3 rounded-xl text-[11px] font-semibold uppercase tracking-wider">
                                      Change Image
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue mb-4 shadow-sm">
                                    <Upload size={28} />
                                  </div>
                                  <p className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                                    Click or Drag to Upload
                                  </p>
                                  <p className="text-slate-400 text-[11px] mt-1">
                                    Max 2MB
                                  </p>
                                </>
                              )}
                            </div>
                          ) : (
                            <input
                              required
                              type="url"
                              value={form.imageUrl}
                              onChange={(e) =>
                                setForm({ ...form, imageUrl: e.target.value })
                              }
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                              placeholder="Paste image URL here..."
                            />
                          )}
                        </div>

                        {/* Category + Visibility */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 ml-1">
                              Category *
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={form.category}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    category: e.target.value as any,
                                  })
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all appearance-none"
                              >
                                <option value="Product">
                                  Product Showcase
                                </option>
                                <option value="Application">
                                  Real-World Application
                                </option>
                                <option value="Manufacturing">
                                  Manufacturing Hub
                                </option>
                                <option value="Installation">
                                  Field Installation
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 ml-1">
                              Visibility
                            </label>
                            <div className="flex gap-4 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 h-[46px] items-center">
                              <label className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={form.isActive}
                                  onChange={() =>
                                    setForm({ ...form, isActive: true })
                                  }
                                  className="w-4 h-4 accent-brand-blue"
                                />
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                  Public
                                </span>
                              </label>
                              <label className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={!form.isActive}
                                  onChange={() =>
                                    setForm({ ...form, isActive: false })
                                  }
                                  className="w-4 h-4 accent-brand-blue"
                                />
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                  Draft
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 ml-1">
                            Title / Caption *
                          </label>
                          <input
                            required
                            type="text"
                            value={form.titleEn}
                            onChange={(e) =>
                              setForm({ ...form, titleEn: e.target.value })
                            }
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                            placeholder="e.g. WPC Solid Door Frame Installation"
                          />
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                          <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-blue/20"
                          >
                            {editingItem
                              ? "Save Changes"
                              : "Publish To Gallery"}
                            <Save size={16} />
                          </button>
                        </div>
                      </form>
                    </div>
                  </MotionDiv>
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {notification && (
                <MotionDiv
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl flex items-center gap-3 text-white font-semibold text-sm shadow-2xl z-[100] ${
                    notification.type === "success"
                      ? "bg-brand-blue shadow-brand-blue/20"
                      : "bg-brand-red shadow-brand-red/20"
                  }`}
                >
                  {notification.type === "success" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  {notification.msg}
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminGalleryPage;
