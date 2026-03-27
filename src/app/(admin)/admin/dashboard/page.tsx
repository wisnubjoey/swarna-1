import { AdminSidebar } from "@/components/Admin/AdminSidebar";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Hello World
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Welcome to the admin page!
        </p>
      </main>
    </div>
  );
}
