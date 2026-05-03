import db from "@/index";
import { categories } from "@/db/Product";
import { createCategory } from "./actions";

export default async function CategoriesPage() {
  const allCategories = await db.select().from(categories);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

      {/* Add Category Form */}
      <section className="mb-10 bg-white p-6 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <form action={createCategory} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
              placeholder="e.g. Jewelry"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
              placeholder="Optional description..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Category
          </button>
        </form>
      </section>

      {/* Categories List */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Existing Categories</h2>
        <div className="bg-white rounded-lg border dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <th className="p-3 border-b dark:border-gray-700">Name</th>
                <th className="p-3 border-b dark:border-gray-700">Slug</th>
                <th className="p-3 border-b dark:border-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {allCategories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                allCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="p-3 border-b dark:border-gray-700">{cat.name}</td>
                    <td className="p-3 border-b dark:border-gray-700 font-mono text-sm">
                      {cat.slug}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700 text-gray-600 dark:text-gray-400">
                      {cat.description || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
