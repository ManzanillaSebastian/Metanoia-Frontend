"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Usuarios", href: "/admin/users" },
  { label: "Reportes", href: "/admin/reports" },
];

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/brand-logo.png" alt="Logo de Metanoia" className="sidebar-logo-img"/>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          if (isActive) {
            return (
              <span key={item.href} className="sidebar-link sidebar-link-active" aria-current="page">
                {item.label}
              </span>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="sidebar-link">
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-profile">
        <Link href="/admin/settings" className="sidebar-settings-icon" aria-label="Configuración">
          <img src="/settings.png" alt="Configuración" className=".sidebar-settings-icon"/>
        </Link>
        <div className="sidebar-avatar">{user ? getInitials(user.full_name) : "…"}</div>
        <span className="sidebar-username">{user?.full_name ?? "Cargando..."}</span>
      </div>
    </aside>
  );
}