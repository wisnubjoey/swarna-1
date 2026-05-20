'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll for navigation links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          setMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.navContent}>
          <div className={styles.navInner}>
            <Link href="/" className={styles.navLogo}>
              <span>T</span>RADITIONAL
            </Link>

            <div className={styles.navLinks}>
              <a href="#collection" className={styles.navLinkItem}>Collection</a>
              <a href="#heritage" className={styles.navLinkItem}>Heritage</a>
              <a href="#artisans" className={styles.navLinkItem}>Artisans</a>
              <a href="#contact" className={styles.navLinkItem}>Contact</a>
            </div>

            <button
              className={styles.menuBtn}
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }}></span>
              <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}
      >
        <div className={styles.mobileMenuContent}>
          <a href="#collection" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#heritage" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Heritage</a>
          <a href="#artisans" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Artisans</a>
          <a href="#contact" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </div>
    </>
  );
}
