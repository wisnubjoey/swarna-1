import db from "@/index";
import ProductUI from "@/components/Admin/ProductUI";
import Link from "next/link";

export default async function ProductsPage() {
  // Use db.query to automatically fetch the related category
  const allProducts = await db.query.products.findMany({
    with: {
      category: true, 
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-8 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products Data</h1>
        <Link 
          href="/admin/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
        >
          + Create Product
        </Link>
      </div>

      {allProducts.length === 0 ? (
        <div className="bg-white p-8 rounded border text-center dark:bg-gray-800 dark:border-gray-700">
          <p className="text-gray-500">no data</p>
        </div>
      ) : (
        /* Grid layout to display the product cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductUI key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}