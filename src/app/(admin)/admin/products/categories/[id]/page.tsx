import db from "@/index";
import { categories } from "@/db/Product";
import { updateCategory } from "../actions";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [category] = await db.select().from(categories).where(eq(categories.id, id));

  if (!category) {
    notFound();
  }

  const updateWithId = updateCategory.bind(null, id);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Category</h1>
        <Link 
          href="/admin/products/categories"
          className="text-gray-600 hover:text-gray-900 underline text-sm"
        >
          Back to Categories
        </Link>
      </div>

      <form action={updateWithId} className="space-y-6 bg-white p-6 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            name="name"
            type="text"
            defaultValue={category.name}
            required
            className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            defaultValue={category.slug}
            readOnly
            className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 cursor-not-allowed"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Slug will be auto-generated from the name
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={category.description || ""}
            className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
        >
          Update Category
        </button>
      </form>
    </div>
  );
}
