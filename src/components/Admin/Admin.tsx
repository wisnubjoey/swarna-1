'use client';

import { useState, useEffect } from 'react';
import styles from './Admin.module.css';

const orders = [
  { id: '#1247', customer: 'Kyoto Gallery', product: 'Ceremonial Kimono', amount: 2450, status: 'pending', date: '2024-01-15' },
  { id: '#1246', customer: 'Tokyo Museum', product: 'Embroidered Obi Set', amount: 890, status: 'completed', date: '2024-01-14' },
  { id: '#1245', customer: 'Osaka Boutique', product: 'Silk Yukata Collection', amount: 3200, status: 'shipped', date: '2024-01-14' },
  { id: '#1244', customer: 'Nara Cultural Center', product: 'Vintage Textile Set', amount: 1850, status: 'completed', date: '2024-01-13' },
  { id: '#1243', customer: 'Hiroshima Gallery', product: 'Artisan Kimono', amount: 4200, status: 'processing', date: '2024-01-12' },
];

const statusStyles = {
  pending: { bg: '#F5EFC6', color: '#B8860B' }, // accent-soft / warning
  completed: { bg: '#E8F0EA', color: '#4A7C59' }, // success bg / success
  shipped: { bg: '#F5F4F0', color: '#1A1A18' }, // bg-secondary / fg
  processing: { bg: '#E5E4E0', color: '#7A7A74' } // border / fg-muted
};

export function Admin() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('monthly');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    // Re-trigger animations on tab change if needed
  }, [activeTab]);

  return (
    <div className={styles.adminWrapper}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@200;300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <div className={styles.grainOverlay}></div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
          <div className="h-16 flex items-center px-6 border-b border-[var(--admin-border)]">
            <span className={`${styles.fontDisplay} text-[var(--admin-accent)] text-2xl`}>
              <span className="font-semibold">T</span>
              {!isSidebarCollapsed && <span className={`${styles.logoText} font-light`}>RADITIONAL</span>}
            </span>
          </div>

          <nav className="flex-1 py-6 overflow-y-auto">
            <div className="px-4 mb-4">
              <p className={`${styles.navText} text-xs tracking-widest uppercase text-[var(--admin-fg-muted)] px-2`}>
                {!isSidebarCollapsed && 'Main'}
              </p>
            </div>
            
            <a href="#" className={`${styles.navItem} ${styles.navItemActive}`}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
              {!isSidebarCollapsed && <span className={styles.navText}>Dashboard</span>}
            </a>

            <a href="#" className={styles.navItem}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              {!isSidebarCollapsed && <span className={styles.navText}>Products</span>}
            </a>

            <a href="#" className={styles.navItem}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              {!isSidebarCollapsed && (
                <>
                  <span className={styles.navText}>Orders</span>
                  <span className="ml-auto bg-[var(--admin-accent)] text-white text-xs px-2 py-0.5">12</span>
                </>
              )}
            </a>

            <div className="px-4 mt-8 mb-4">
              <p className={`${styles.navText} text-xs tracking-widest uppercase text-[var(--admin-fg-muted)] px-2`}>
                {!isSidebarCollapsed && 'Analytics'}
              </p>
            </div>

            <a href="#" className={styles.navItem}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              {!isSidebarCollapsed && <span className={styles.navText}>Reports</span>}
            </a>
          </nav>

          <div className="p-4 border-t border-[var(--admin-border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--admin-bg-secondary)] flex items-center justify-center">
                <span className={`${styles.fontDisplay} text-lg`}>YK</span>
              </div>
              {!isSidebarCollapsed && (
                <div className={`${styles.userInfo} flex-1 min-w-0`}>
                  <p className="text-sm font-light truncate">Yamamoto Kimiko</p>
                  <p className="text-xs text-[var(--admin-fg-muted)]">Administrator</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`${styles.main} ${isSidebarCollapsed ? styles.mainCollapsed : ''}`}>
          <header className={styles.header}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="w-10 h-10 flex items-center justify-center hover:bg-[var(--admin-bg-secondary)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-64 bg-[var(--admin-bg)] border border-[var(--admin-border)] pl-10 pr-4 py-2 text-sm font-light focus:border-[var(--admin-accent)] focus:outline-none transition-colors"
                />
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-fg-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[var(--admin-bg-secondary)] transition-colors relative"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--admin-accent)]"></span>
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--admin-card)] border border-[var(--admin-border)] shadow-lg z-50">
                    <div className="p-4 border-b border-[var(--admin-border)]">
                      <p className="text-sm font-medium">Notifications</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-4 border-b border-[var(--admin-border)] hover:bg-[var(--admin-bg-secondary)] transition-colors cursor-pointer">
                        <p className="text-sm font-light">New order received from Kyoto Gallery</p>
                        <p className="text-xs text-[var(--admin-fg-muted)] mt-1">2 minutes ago</p>
                      </div>
                      <div className="p-4 border-b border-[var(--admin-border)] hover:bg-[var(--admin-bg-secondary)] transition-colors cursor-pointer">
                        <p className="text-sm font-light">Inventory alert: Silk Kimono low stock</p>
                        <p className="text-xs text-[var(--admin-fg-muted)] mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative ml-2">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 py-2 px-3 hover:bg-[var(--admin-bg-secondary)] transition-colors"
                >
                  <div className="w-8 h-8 bg-[var(--admin-fg)] flex items-center justify-center">
                    <span className="text-[var(--admin-bg)] text-sm">YK</span>
                  </div>
                  <svg className="w-4 h-4 text-[var(--admin-fg-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--admin-card)] border border-[var(--admin-border)] shadow-lg z-50">
                    <a href="#" className="block px-4 py-3 text-sm font-light hover:bg-[var(--admin-bg-secondary)] transition-colors">Profile Settings</a>
                    <a href="#" className="block px-4 py-3 text-sm font-light hover:bg-[var(--admin-bg-secondary)] transition-colors">Billing</a>
                    <hr className="border-[var(--admin-border)]" />
                    <a href="#" className="block px-4 py-3 text-sm font-light text-[var(--admin-danger)] hover:bg-[var(--admin-bg-secondary)] transition-colors">Sign Out</a>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-8">
            <div className={`${styles.fadeIn} mb-8`}>
              <div className="flex items-center gap-2 text-sm text-[var(--admin-fg-muted)] mb-2">
                <span>Home</span>
                <span>/</span>
                <span className="text-[var(--admin-accent)]">Dashboard</span>
              </div>
              <h1 className={`${styles.fontDisplay} text-3xl font-light`}>Overview</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Revenue', value: '$48,294', change: '+12.5%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'success' },
                { label: 'Total Orders', value: '1,847', change: '+8.2%', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', color: 'success' },
                { label: 'Products', value: '324', change: '-3.1%', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'danger' },
                { label: 'Artisans', value: '127', change: '2 new', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'success' }
              ].map((stat, i) => (
                <div key={i} className={`${styles.statCard} ${styles.fadeIn} ${styles[`delay${i + 1}`]}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-[var(--admin-bg-secondary)] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--admin-fg-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={stat.icon}/>
                      </svg>
                    </div>
                    <span className={`text-xs text-[var(--admin-${stat.color})] flex items-center gap-1`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--admin-fg-muted)] mb-1">{stat.label}</p>
                  <p className={`${styles.fontDisplay} text-3xl font-light`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chart Section */}
              <div className={`${styles.statCard} lg:col-span-2 ${styles.fadeIn} ${styles.delay3}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className={`${styles.fontDisplay} text-xl font-light`}>Revenue Overview</h2>
                    <p className="text-sm text-[var(--admin-fg-muted)] mt-1">Monthly performance</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveTab('monthly')}
                      className={`${styles.btnPrimary} ${activeTab !== 'monthly' ? styles.btnOutline : ''} !py-1 !px-3`}
                    >
                      Monthly
                    </button>
                    <button 
                      onClick={() => setActiveTab('weekly')}
                      className={`${styles.btnPrimary} ${activeTab !== 'weekly' ? styles.btnOutline : ''} !py-1 !px-3`}
                    >
                      Weekly
                    </button>
                  </div>
                </div>

                <div className="h-64 flex items-end gap-3 pt-8">
                  {[45, 62, 38, 75, 55, 88, 72, 95, 40, 30, 25, 20].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`${styles.chartBar} w-full bg-[var(--admin-accent)]`} 
                        style={{ height: `${height}%`, animationDelay: `${0.1 + i * 0.05}s` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className={`${styles.statCard} ${styles.fadeIn} ${styles.delay4}`}>
                <h2 className={`${styles.fontDisplay} text-xl font-light mb-6`}>Recent Activity</h2>
                <div className="space-y-6">
                  {[
                    { title: 'New order #1247 received', desc: 'Kyoto Gallery - 2 min ago', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                    { title: 'Order #1243 completed', desc: 'Tokyo Museum - 15 min ago', icon: 'M5 13l4 4L19 7' },
                    { title: 'New artisan registered', desc: 'Mei Lin - Embroidery - 1 hr ago', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-[var(--admin-bg-secondary)] flex-shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[var(--admin-fg-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={activity.icon}/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-light">{activity.title}</p>
                        <p className="text-xs text-[var(--admin-fg-muted)] mt-1">{activity.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className={`${styles.tableContainer} mt-6 ${styles.fadeIn} ${styles.delay5}`}>
              <div className="p-6 border-b border-[var(--admin-border)] flex items-center justify-between">
                <div>
                  <h2 className={`${styles.fontDisplay} text-xl font-light`}>Recent Orders</h2>
                  <p className="text-sm text-[var(--admin-fg-muted)] mt-1">Latest transactions</p>
                </div>
                <div className="flex gap-2">
                  <button className={styles.btnOutline}>Export</button>
                  <button className={styles.btnPrimary}>New Order</button>
                </div>
              </div>

              <table className="w-full">
                <thead className={styles.tableHeader}>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i} className={styles.tableRow}>
                      <td><span className="font-medium">{order.id}</span></td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>${order.amount.toLocaleString()}</td>
                      <td>
                        <span 
                          className="inline-block px-3 py-1 text-xs tracking-wide uppercase"
                          style={{ 
                            backgroundColor: statusStyles[order.status as keyof typeof statusStyles].bg,
                            color: statusStyles[order.status as keyof typeof statusStyles].color
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="text-[var(--admin-fg-muted)]">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
