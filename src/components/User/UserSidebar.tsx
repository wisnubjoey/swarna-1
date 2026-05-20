"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import styles from "./UserSidebar.module.css";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
];

function DashboardIcon() {
  return (
    <svg className={styles.navItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
    </svg>
  );
}

export function UserSidebar() {
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
          <Link
            key={item.name}
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.navItemActive : ""}`}
          >
            <item.icon />
            <span className={styles.navText}>{item.name}</span>
            {item.badge && (
              <span className={styles.navItemBadge}>{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className={styles.userSection}>
        <div className={styles.userSectionContent}>
          <div className={styles.userAvatar}>US</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>User Name</p>
            <p className={styles.userRole}>Customer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
