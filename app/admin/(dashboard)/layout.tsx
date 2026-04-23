import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] flex">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
