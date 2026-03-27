'use client';

import { useEffect, useState } from 'react';
import styles from './Landing.module.css';

export function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Scroll reveal with IntersectionObserver
    const revealElements = document.querySelectorAll(`.${styles.reveal}`);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.active);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));

    // Scroll handler for parallax
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') as string);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.landing}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@200;300;400;500&display=swap"
        rel="stylesheet"
      />
      
      <div className={styles.grainOverlay}></div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.navContent}>
          <div className={styles.navInner}>
            <a href="#" className={styles.navLogo}>
              <span>T</span>RADITIONAL
            </a>

            <div className={styles.navLinks}>
              <a href="#collection" className={`${styles.navLinkItem} ${styles.navLink}`}>Collection</a>
              <a href="#heritage" className={`${styles.navLinkItem} ${styles.navLink}`}>Heritage</a>
              <a href="#artisans" className={`${styles.navLinkItem} ${styles.navLink}`}>Artisans</a>
              <a href="#contact" className={`${styles.navLinkItem} ${styles.navLink}`}>Contact</a>
            </div>

            <button
              id="menuBtn"
              className={styles.menuBtn}
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none' }}></span>
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}
      >
        <div className={styles.mobileMenuContent}>
          <a href="#collection" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#heritage" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Heritage</a>
          <a href="#artisans" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Artisans</a>
          <a href="#contact" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1920&q=80"
            alt="Traditional silk dress on wooden stand"
          />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTextWrapper}>
            <div className={styles.accentLine}></div>
            <h1 className={styles.heroTitle}>
              <span>TRADITIONAL</span><br />
              <span className="italic font-light">Dress</span>
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.reveal} ${styles.revealDelay1}`}>
              Heritage woven into every thread. Discover garments that carry centuries of cultural artistry.
            </p>
            <div className={`${styles.reveal} ${styles.revealDelay2}`}>
              <a href="#collection" className={styles.btnPrimary}>
                <span>Explore Collection</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicatorWrapper}>
          <div className={styles.scrollIndicator}>
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
              <rect x="1" y="1" width="22" height="38" stroke="currentColor" strokeWidth="1" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section id="collection" className={styles.collectionSection}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <div className={styles.reveal}>
              <p className={styles.sectionLabel}>Curated Selection</p>
              <h2 className={styles.sectionTitle}>Featured Pieces</h2>
            </div>
            <p className={`${styles.sectionDescription} ${styles.reveal} ${styles.revealDelay1}`}>
              Each garment tells a story of tradition, crafted by master artisans preserving ancient techniques.
            </p>
          </div>

          <div className={styles.collectionGrid}>
            <div className={`${styles.imgContainer} ${styles.collectionItem} ${styles.reveal} ${styles.revealDelay1}`}>
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"
                alt="Kimono silk traditional dress"
              />
            </div>
            <div className={`${styles.imgContainer} ${styles.collectionItem} ${styles.reveal} ${styles.revealDelay2}`}>
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80"
                alt="Embroidered traditional garment"
              />
            </div>
            <div className={`${styles.imgContainer} ${styles.collectionItem} ${styles.reveal} ${styles.revealDelay3}`}>
              <img
                src="https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=600&q=80"
                alt="Traditional ceremonial dress"
              />
            </div>
            <div className={`${styles.imgContainer} ${styles.collectionItem} ${styles.reveal} ${styles.revealDelay4}`}>
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80"
                alt="Vintage textile artwork"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className={styles.heritageSection}>
        <div className={styles.sectionContent}>
          <div className={styles.heritageGrid}>
            <div className={styles.heritageContent}>
              <div className={styles.reveal}>
                <p className={styles.sectionLabel}>Our Heritage</p>
                <h2 className={styles.sectionTitle}>
                  Preserving the Art of Traditional Craftsmanship
                </h2>
              </div>
              <div className={`${styles.heritageText} ${styles.reveal} ${styles.revealDelay1}`}>
                <p>
                  For generations, our artisans have dedicated their lives to mastering the intricate techniques passed down through centuries. Each stitch, each pattern, carries the weight of cultural memory.
                </p>
                <p>
                  We work directly with communities across Asia, ensuring that traditional methods are preserved while providing sustainable livelihoods for the craftspeople who keep these traditions alive.
                </p>
              </div>
              <div className={`${styles.heritageStats} ${styles.reveal} ${styles.revealDelay2}`}>
                <div className={styles.statItem}>
                  <p className={styles.statNumber}>127</p>
                  <p className={styles.statLabel}>Master Artisans</p>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statNumber}>45</p>
                  <p className={styles.statLabel}>Years of Heritage</p>
                </div>
              </div>
            </div>
            <div className={styles.heritageImage}>
              <div className={`${styles.imgContainer} ${styles.heritageImageWrapper} ${styles.reveal}`}>
                <img
                  src="https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&q=80"
                  alt="Artisan hands working on traditional embroidery"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionContent}>
          <div className={styles.categoriesHeader}>
            <p className={`${styles.sectionLabel} ${styles.reveal}`}>Browse by Style</p>
            <h2 className={styles.sectionTitle}>Dress Categories</h2>
          </div>

          <div className={styles.categoriesGrid}>
            <a href="#" className={`${styles.categoryCard} ${styles.reveal} ${styles.revealDelay1}`}>
              <span className={`${styles.categoryNumber} ${styles.reveal} ${styles.revealDelay1}`}>01</span>
              <h3 className={styles.categoryTitle}>Ceremonial</h3>
              <p className={styles.categoryDescription}>
                Traditional garments for weddings, festivals, and sacred ceremonies. Each piece honors centuries of cultural significance.
              </p>
            </a>
            <a href="#" className={`${styles.categoryCard} ${styles.reveal} ${styles.revealDelay2}`}>
              <span className={`${styles.categoryNumber} ${styles.reveal} ${styles.revealDelay2}`}>02</span>
              <h3 className={styles.categoryTitle}>Everyday Elegance</h3>
              <p className={styles.categoryDescription}>
                Comfortable traditional wear adapted for modern life. Timeless designs that seamlessly blend heritage with practicality.
              </p>
            </a>
            <a href="#" className={`${styles.categoryCard} ${styles.reveal} ${styles.revealDelay3}`}>
              <span className={`${styles.categoryNumber} ${styles.reveal} ${styles.revealDelay3}`}>03</span>
              <h3 className={styles.categoryTitle}>Contemporary</h3>
              <p className={styles.categoryDescription}>
                Modern interpretations of traditional silhouettes. Where ancient craftsmanship meets contemporary design sensibility.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteContent}>
          <div className={styles.reveal}>
            <svg className={styles.quoteIcon} viewBox="0 0 24 24" fill="none">
              <path d="M10 11L8 17H5L7 11H4V7H10V11ZM20 11L18 17H15L17 11H14V7H20V11Z" fill="currentColor" />
            </svg>
            <blockquote className={styles.quoteText}>
              In every thread lies the story of our ancestors, in every pattern the wisdom of generations.
            </blockquote>
            <cite className={styles.quoteAuthor}>
              Master Artisan, Kyoto
            </cite>
          </div>
        </div>
      </section>

      {/* Artisans Grid */}
      <section id="artisans" className={styles.artisansSection}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <div className={styles.reveal}>
              <p className={styles.sectionLabel}>Meet the Makers</p>
              <h2 className={styles.sectionTitle}>Master Artisans</h2>
            </div>
          </div>

          <div className={styles.artisansGrid}>
            <div className={`${styles.artisanCard} ${styles.reveal} ${styles.revealDelay1}`}>
              <div className={`${styles.imgContainer} ${styles.artisanImageWrapper}`}>
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Silk weaver at traditional loom"
                />
              </div>
              <div className={styles.artisanInfo}>
                <div>
                  <h3 className={styles.artisanName}>Yamamoto Textile House</h3>
                  <p className={styles.artisanLocation}>Kyoto, Japan</p>
                </div>
                <span className={styles.artisanSpecialty}>Silk Weaving</span>
              </div>
            </div>
            <div className={`${styles.artisanCard} ${styles.reveal} ${styles.revealDelay2}`}>
              <div className={`${styles.imgContainer} ${styles.artisanImageWrapper}`}>
                <img
                  src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80"
                  alt="Embroidery artisan at work"
                />
              </div>
              <div className={styles.artisanInfo}>
                <div>
                  <h3 className={styles.artisanName}>Chen Embroidery Studio</h3>
                  <p className={styles.artisanLocation}>Suzhou, China</p>
                </div>
                <span className={styles.artisanSpecialty}>Embroidery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="contact" className={styles.newsletterSection}>
        <div className={styles.sectionContent}>
          <div className={styles.newsletterContent}>
            <div className={styles.reveal}>
              <p className={styles.sectionLabel}>Stay Connected</p>
              <h2 className={styles.newsletterTitle}>Join Our Journey</h2>
              <p className={styles.newsletterDescription}>
                Receive stories about our artisans, early access to new collections, and invitations to exclusive events.
              </p>
            </div>
            <form className={`${styles.newsletterForm} ${styles.reveal} ${styles.revealDelay1}`}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.newsletterInput}
                required
                aria-label="Email address"
              />
              <button type="submit" className={styles.btnPrimary}>
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <a href="#" className={styles.footerLogo}>
                <span>T</span>RADITIONAL
              </a>
              <p className={styles.footerDescription}>
                Preserving heritage through authentic traditional dress. Each garment connects you to centuries of artistry and cultural wisdom.
              </p>
            </div>
            <div className={styles.footerColumn}>
              <p className={styles.footerColumnTitle}>Navigate</p>
              <nav className={styles.footerLinks}>
                <a href="#collection" className={styles.footerLink}>Collection</a>
                <a href="#heritage" className={styles.footerLink}>Heritage</a>
                <a href="#artisans" className={styles.footerLink}>Artisans</a>
                <a href="#contact" className={styles.footerLink}>Contact</a>
              </nav>
            </div>
            <div className={styles.footerColumn}>
              <p className={styles.footerColumnTitle}>Connect</p>
              <nav className={styles.footerLinks}>
                <a href="#" className={styles.footerLink}>Instagram</a>
                <a href="#" className={styles.footerLink}>Pinterest</a>
                <a href="#" className={styles.footerLink}>WeChat</a>
              </nav>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>2024 Traditional Dress. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <a href="#" className={styles.footerLegalLink}>Privacy</a>
              <a href="#" className={styles.footerLegalLink}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
