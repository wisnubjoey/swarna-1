"use client";

import { createProduct, getCategories } from "../actions";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";
import { useState, useRef, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

export default function CreateProductPage() {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "complete" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Secondary Images State
  const [secondaryFiles, setSecondaryFiles] = useState<File[]>([]);
  const [secondaryPreviewUrls, setSecondaryPreviewUrls] = useState<string[]>([]);
  const [secondaryImageUrls, setSecondaryImageUrls] = useState<string[]>([]);
  const [secondaryUploadStatus, setSecondaryUploadStatus] = useState<"idle" | "uploading" | "complete" | "error">("idle");
  const secondaryFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setAllCategories(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setIsLoading(false);
      });
  }, []);

  // Main Image Uploader
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

  // Secondary Images Uploader
  const { startUpload: startSecondaryUpload, isUploading: isSecondaryUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res) {
        const urls = res.map(file => file.url);
        setSecondaryImageUrls(prev => [...prev, ...urls]);
      }
      setSecondaryUploadStatus("complete");
      setSecondaryFiles([]); // Clear files after successful upload
    },
    onUploadError: (error) => {
      console.error("Secondary upload error:", error);
      setSecondaryUploadStatus("error");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setUploadStatus("idle");
      setMainImageUrl("");
    }
  };

  const handleSecondaryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      setSecondaryFiles(prev => [...prev, ...selectedFiles]);
      const newPreviews = selectedFiles.map(f => URL.createObjectURL(f));
      setSecondaryPreviewUrls(prev => [...prev, ...newPreviews]);
      setSecondaryUploadStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (file) {
      await startUpload([file]);
    }
  };

  const handleSecondaryUpload = async () => {
    if (secondaryFiles.length > 0) {
      await startSecondaryUpload(secondaryFiles);
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadStatus("idle");
    setMainImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveSecondaryPreview = (index: number) => {
    setSecondaryFiles(prev => prev.filter((_, i) => i !== index));
    setSecondaryPreviewUrls(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    if (secondaryFileInputRef.current) {
      secondaryFileInputRef.current.value = "";
    }
  };

  const handleRemoveSecondaryUrl = (index: number) => {
    setSecondaryImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      secondaryPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrl, secondaryPreviewUrls]);

  if (isLoading) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create New Product</h1>
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

        {/* Preview */}
        {previewUrl && (
          <div className="mb-4">
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-xs max-h-48 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <button
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Upload Button */}
        {file && !mainImageUrl && (
          <button
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

      {/* Secondary Images Upload Section */}
      <div className="mb-6 bg-white p-6 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Secondary Images</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Images (Max 10)</label>
          <input
            ref={secondaryFileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleSecondaryFileChange}
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

        {/* Previews of files waiting to be uploaded */}
        {secondaryPreviewUrls.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Pending Upload:</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {secondaryPreviewUrls.map((url, index) => (
                <div key={index} className="relative inline-block aspect-square">
                  <img
                    src={url}
                    alt={`Secondary Preview ${index}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSecondaryPreview(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button for secondary images */}
        {secondaryFiles.length > 0 && (
          <button
            type="button"
            onClick={handleSecondaryUpload}
            disabled={isSecondaryUploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm mb-4"
          >
            {isSecondaryUploading ? `Uploading ${secondaryFiles.length} files...` : `Upload ${secondaryFiles.length} Secondary Images`}
          </button>
        )}

        {/* Display already uploaded images */}
        {secondaryImageUrls.length > 0 && (
          <div className="mb-4 pt-4 border-t dark:border-gray-700">
            <p className="text-sm font-medium mb-2">Uploaded Images:</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {secondaryImageUrls.map((url, index) => (
                <div key={index} className="relative inline-block aspect-square">
                  <img
                    src={url}
                    alt={`Uploaded Secondary ${index}`}
                    className="w-full h-full object-cover rounded-lg border border-green-200 dark:border-green-900"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSecondaryUrl(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {secondaryUploadStatus === "error" && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            ✗ Secondary upload failed
          </p>
        )}
      </div>

      <form
        action={createProduct}
        className="space-y-6 bg-white p-6 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
      >
        {/* Hidden field for image URL */}
        {mainImageUrl && (
          <input type="hidden" name="mainImageUrl" value={mainImageUrl} />
        )}

        {/* Hidden fields for secondary image URLs */}
        {secondaryImageUrls.map((url, index) => (
          <input key={index} type="hidden" name="secondaryImageUrls" value={url} />
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              name="name"
              type="text"
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKU *</label>
            <input
              name="sku"
              type="text"
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="categoryId"
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
            >
              <option value="">Select a category</option>
              {allCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price *</label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock Quantity</label>
            <input
              name="stockQuantity"
              type="number"
              defaultValue="0"
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender *</label>
            <select
              name="gender"
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
            >
              <option value="unisex">Unisex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Material</label>
            <input
              name="material"
              type="text"
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              name="color"
              type="text"
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}