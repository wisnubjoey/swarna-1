import db from "@/index";
import { products } from "@/db/Product";

export default async function ProductsPage() {
  const allProducts = await db.select().from(products);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-8 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Products Data</h1>
      {allProducts.length === 0 ? (
        <p>no data</p>
      ) : (
        <pre className="bg-white p-4 rounded border dark:bg-gray-800 dark:border-gray-700 overflow-auto">
          {JSON.stringify(allProducts, null, 2)}
        </pre>
      )}
    </div>
  );
}
