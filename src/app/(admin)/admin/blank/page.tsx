"use client";

import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { useUploadThing } from "@/lib/uploadthing";
import { useState, useRef, useEffect } from "react";

export default function BlankPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "complete" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Upload complete:", res);
      setUploadStatus("complete");
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      setUploadStatus("error");
    },
    onUploadBegin: () => {
      setUploadStatus("uploading");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setUploadStatus("idle");
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Upload Image
          </h1>

          {/* File Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Image
            </label>
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
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preview
              </h2>
              <div className="relative inline-block">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-md max-h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
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
          {file && (
            <div className="flex gap-4">
              <button
                onClick={handleUpload}
                disabled={uploadStatus === "uploading"}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {uploadStatus === "uploading" ? "Uploading..." : "Upload Image"}
              </button>
              
              {uploadStatus === "complete" && (
                <span className="px-6 py-2 bg-green-100 text-green-800 rounded-md text-sm flex items-center">
                  ✓ Uploaded successfully!
                </span>
              )}
              
              {uploadStatus === "error" && (
                <span className="px-6 py-2 bg-red-100 text-red-800 rounded-md text-sm flex items-center">
                  ✗ Upload failed
                </span>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
