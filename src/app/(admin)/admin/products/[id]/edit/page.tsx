import db from "@/index";
import { categories, products } from "@/db/Product";
import { updateProduct, deleteProduct } from "../../actions";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [product] = await db.select().from(products).where(eq(products.id, id));
  const allCategories = await db.select().from(categories);

  if (!product) {
    notFound();
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

      <div className="space-y-6">
        <form action={updateWithId} className="space-y-6 bg-white p-6 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
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
