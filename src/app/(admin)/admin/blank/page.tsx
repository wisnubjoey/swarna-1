import { Admin } from "@/components/Admin/Admin";
import { AdminSidebar } from "@/components/Admin/AdminSidebar";

export default function BlankPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Admin />
    </div>
  );
}
