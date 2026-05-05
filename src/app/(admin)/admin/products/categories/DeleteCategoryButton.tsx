"use client";

import { deleteCategory } from "./actions";

export default function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(categoryId);
    }
  };

  return (
    <form action={deleteCategory.bind(null, categoryId)} onSubmit={handleDelete}>
      <button
        type="submit"
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Delete
      </button>
    </form>
  );
}
