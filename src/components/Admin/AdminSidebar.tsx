"use client";

import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import styles from "./AdminSidebar.module.css";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: DashboardIcon },
  { name: "Products", href: "/admin/products", icon: ProductsIcon },
  { name: "Orders", href: "/admin/orders", icon: OrdersIcon, badge: 12 },
  { name: "Artisans", href: "/admin/artisans", icon: ArtisansIcon },
];

function DashboardIcon() {
  return (
    <svg className={styles.navItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg className={styles.navItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg className={styles.navItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>
  );
}

function ArtisansIcon() {
  return (
    <svg className={styles.navItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
    </svg>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <span className={styles.logoWrapper}>
          <span className={styles.logoTextStrong}>T</span>
          <span className={styles.logoTextLight}>RADITIONAL</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className={styles.navSection}>
        <div className={styles.navSectionCategory}>
          <p className={styles.navSectionCategoryText}>Main</p>
        </div>

        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.navItemActive : ""}`}
          >
            <item.icon />
            <span className={styles.navText}>{item.name}</span>
            {item.badge && (
              <span className={styles.navItemBadge}>{item.badge}</span>
            )}
          </a>
        ))}

        <div className={styles.navSectionCategory}>
          <p className={styles.navSectionCategoryText}>Analytics</p>
        </div>

        <a href="/admin/reports" className={styles.navItem}>
          <svg className={styles.navItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span className={styles.navText}>Reports</span>
        </a>

        <a href="/admin/performance" className={styles.navItem}>
          <svg className={styles.navItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/>
          </svg>
          <span className={styles.navText}>Performance</span>
        </a>

        <div className={styles.navSectionCategory}>
          <p className={styles.navSectionCategoryText}>Settings</p>
        </div>

        <a href="/admin/settings" className={styles.navItem}>
          <svg className={styles.navItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span className={styles.navText}>Settings</span>
        </a>
      </nav>

      {/* User Section */}
      <div className={styles.userSection}>
        <div className={styles.userSectionContent}>
          <div className={styles.userAvatar}>YK</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Yamamoto Kimiko</p>
            <p className={styles.userRole}>Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
