import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-content">{children}</main>
    </div>
  );
}