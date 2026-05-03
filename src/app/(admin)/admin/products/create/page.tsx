import db from "@/index";
import { categories } from "@/db/Product";
import { createProduct } from "../actions";
import Link from "next/link";

export default async function CreateProductPage() {
  const allCategories = await db.select().from(categories);

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

      <form action={createProduct} className="space-y-6 bg-white p-6 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input name="name" type="text" required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKU *</label>
            <input name="sku" type="text" required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select name="categoryId" required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600">
              <option value="">Select a category</option>
              {allCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price *</label>
            <input name="price" type="number" step="0.01" required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock Quantity</label>
            <input name="stockQuantity" type="number" defaultValue="0" className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender *</label>
            <select name="gender" required className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600">
              <option value="unisex">Unisex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Material</label>
            <input name="material" type="text" className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input name="color" type="text" className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600" rows={3} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600">
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
