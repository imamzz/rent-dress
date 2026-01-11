import Sidebar from "@/components/admin/layout/Sidebar";
import Topbar from "@/components/admin/layout/Topbar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <Topbar />

      <div className="flex">
        {/* Sidebar Navigation */}
        <Sidebar/>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50/50">{children}</main>
      </div>
    </div>
  );
};

export default layout;
