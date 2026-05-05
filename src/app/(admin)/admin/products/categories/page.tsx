import db from "@/index";
import { categories } from "@/db/Product";
import Link from "next/link";
import { createCategory, deleteCategory } from "./actions";
import DeleteCategoryButton from "./DeleteCategoryButton";

export default async function CategoriesPage() {
  const allCategories = await db.select().from(categories);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link 
          href="/admin/products"
          className="text-gray-600 hover:text-gray-900 underline text-sm"
        >
          Back to Products
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">All Categories</h2>
        <form action={createCategory} className="flex gap-2">
          <input
            name="name"
            type="text"
            required
            placeholder="Category name"
            className="px-3 py-2 border rounded dark:bg-gray-900 dark:border-gray-600"
          />
          <input
            name="description"
            type="text"
            placeholder="Description (optional)"
            className="px-3 py-2 border rounded dark:bg-gray-900 dark:border-gray-600"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
          >
            + Create Category
          </button>
        </form>
      </div>

      {allCategories.length === 0 ? (
        <div className="bg-white p-8 rounded border text-center dark:bg-gray-800 dark:border-gray-700">
          <p className="text-gray-500">No categories found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <th className="p-3 border-b dark:border-gray-700">Name</th>
                <th className="p-3 border-b dark:border-gray-700">Slug</th>
                <th className="p-3 border-b dark:border-gray-700">Description</th>
                <th className="p-3 border-b dark:border-gray-700 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-3 border-b dark:border-gray-700">{cat.name}</td>
                  <td className="p-3 border-b dark:border-gray-700 font-mono text-sm">
                    {cat.slug}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700 text-gray-600 dark:text-gray-400">
                    {cat.description || "-"}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    <div className="flex gap-2">
                      <Link 
                        href={`/admin/products/categories/${cat.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <DeleteCategoryButton categoryId={cat.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
