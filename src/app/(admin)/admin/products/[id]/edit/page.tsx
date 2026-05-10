"use client";

import { updateProduct, deleteProduct, getProductById, getCategories } from "../../actions";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";
import { useState, useRef, useEffect, use } from "react";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  categoryId: string;
  price: string;
  stockQuantity: number;
  material: string | null;
  color: string | null;
  size: string | null;
  gender: "female" | "male" | "unisex";
  status: "active" | "draft" | "archived";
  mainImageUrl: string | null;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise (Next.js 15 App Router standard)
  const { id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Image states (initialized to empty, populated in useEffect)
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "complete" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch product and categories on mount
  useEffect(() => {
    Promise.all([getProductById(id), getCategories()])
      .then(([productData, categoriesData]) => {
        if (productData) {
          setProduct(productData);
          // Pre-populate the image states with existing DB data
          setMainImageUrl(productData.mainImageUrl || "");
          setPreviewUrl(productData.mainImageUrl || null);
        }
        setAllCategories(categoriesData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setIsLoading(false);
      });
  }, [id]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]?.url) {
        setMainImageUrl(res[0].url);
      }
      setUploadStatus("complete");
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      setUploadStatus("error");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setUploadStatus("idle");
      setMainImageUrl(""); // Clear old URL so the user must upload the new file
    }
  };

  const handleUpload = async () => {
    if (file) {
      await startUpload([file]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadStatus("idle");
    setMainImageUrl(""); 
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (isLoading) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Product not found.</p>
        </div>
      </div>
    );
  }

  // Bind the ID to the actions
  const updateWithId = updateProduct.bind(null, id);
  const deleteWithId = deleteProduct.bind(null, id);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <Link 
          href="/admin/products" 
          className="text-gray-600 hover:text-gray-900 underline text-sm"
        >
          Back to list
        </Link>
      </div>

      {/* Main Image Upload Section */}
      <div className="mb-6 bg-white p-6 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Main Image</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              dark:file:bg-gray-700 dark:file:text-gray-300
              dark:hover:file:bg-gray-600"
          />
        </div>

        {/* Preview (shows existing DB image or newly selected local file) */}
        {previewUrl && (
          <div className="mb-4">
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-xs max-h-48 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Upload Button (only shows if a new file is selected but not yet uploaded) */}
        {file && !mainImageUrl && (
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        )}

        {uploadStatus === "complete" && mainImageUrl && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            ✓ Image uploaded successfully
          </p>
        )}
        {uploadStatus === "error" && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            ✗ Upload failed
          </p>
        )}
      </div>

      <div className="space-y-6">
        <form action={updateWithId} className="space-y-6 bg-white p-6 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
          {/* Hidden field for image URL - passes final URL to Server Action */}
          <input type="hidden" name="mainImageUrl" value={mainImageUrl} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input name="name" type="text" defaultValue={product.name} required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SKU *</label>
              <input name="sku" type="text" defaultValue={product.sku} required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select name="categoryId" defaultValue={product.categoryId} required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600">
                <option value="">Select a category</option>
                {allCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price *</label>
              <input name="price" type="number" step="0.01" defaultValue={product.price} required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock Quantity</label>
              <input name="stockQuantity" type="number" defaultValue={product.stockQuantity} className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender *</label>
              <select name="gender" defaultValue={product.gender} required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600">
                <option value="unisex">Unisex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Material</label>
              <input name="material" type="text" defaultValue={product.material || ""} className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input name="color" type="text" defaultValue={product.color || ""} className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" defaultValue={product.description || ""} className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" rows={3} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select name="status" defaultValue={product.status} className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>

        <form action={deleteWithId}>
          <button
            type="submit"
            className="w-full bg-red-50 text-red-600 font-bold py-2 rounded border border-red-200 hover:bg-red-100 transition"
          >
            Delete Product
          </button>
        </form>
      </div>
    </div>
  );
}