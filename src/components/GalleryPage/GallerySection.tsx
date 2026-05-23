"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./GallerySection.module.css";

interface ColorSwatch {
  name: string;
  color: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  swatches?: ColorSwatch[];
  variant?: "standard" | "horizontal" | "minimal";
}

const products: Product[] = [
  {
    id: "1",
    name: "Silk Kimono with Embroidered Cranes",
    category: "Ceremonial",
    description: "Handcrafted by master artisans in Kyoto using traditional techniques passed down through generations.",
    price: 2450,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    rating: 4.9,
    reviews: 24,
    swatches: [
      { name: "Black", color: "#1A1A18" },
      { name: "Crimson", color: "#8B0000" },
      { name: "Navy", color: "#00008B" },
    ],
  },
  {
    id: "2",
    name: "Vintage Wedding Kimono with Gold Thread",
    category: "Bridal",
    description: "Heirloom-quality piece featuring intricate gold embroidery on pure silk satin.",
    price: 2880,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    rating: 5.0,
    reviews: 18,
    badge: "Limited Edition",
    swatches: [
      { name: "Ivory", color: "#FFFAF0" },
      { name: "Beige", color: "#F5F5DC" },
    ],
  },
  {
    id: "3",
    name: "Contemporary Obi Belt with Geometric Pattern",
    category: "Accessories",
    description: "Modern interpretation of the traditional obi, perfect for both formal and casual wear.",
    price: 890,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    rating: 4.8,
    reviews: 42,
    badge: "New Arrival",
    swatches: [
      { name: "Gold", color: "#C9A227" },
      { name: "Dark Teal", color: "#2F4F4F" },
      { name: "Burgundy", color: "#800020" },
    ],
  },
  {
    id: "4",
    name: "Cotton Yukata with Indigo Dye Pattern",
    category: "Everyday",
    description: "Lightweight summer kimono featuring traditional Shibori dyeing technique.",
    price: 1650,
    image: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=600&q=80",
    rating: 4.7,
    reviews: 56,
    swatches: [
      { name: "Indigo", color: "#4B0082" },
      { name: "Lavender", color: "#E6E6FA" },
    ],
  },
];

const horizontalProducts: Product[] = [
  {
    id: "h1",
    name: "Edo Period Samurai Formal Attire",
    category: "Antique Collection",
    description: "Rare preserved piece from the late Edo period, authenticated by the Kyoto National Museum. Each garment tells a story of honor and tradition, featuring original family crests and hand-woven silk.",
    price: 4200,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    rating: 5.0,
    reviews: 8,
    badge: "Authentic",
    variant: "horizontal",
  },
];

const minimalProducts: Product[] = [
  { id: "m1", name: "Hand-painted Silk Scarf", category: "Accessories", price: 320, image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&q=80", rating: 4.8, reviews: 12, variant: "minimal", description: "" },
  { id: "m2", name: "Embroidered Kinchaku Pouch", category: "Small Goods", price: 420, originalPrice: 480, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.7, reviews: 15, variant: "minimal", description: "" },
  { id: "m3", name: "Gold-leaf Sensu Fan", category: "Ceremonial", price: 1850, image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&q=80", rating: 5.0, reviews: 6, variant: "minimal", description: "" },
  { id: "m4", name: "Casual Cotton Yukata", category: "Everyday", price: 580, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80", rating: 4.6, reviews: 21, variant: "minimal", description: "" },
  { id: "m5", name: "Traditional Tabi Socks", category: "Footwear", price: 240, image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80", rating: 4.5, reviews: 34, variant: "minimal", description: "" },
  { id: "m6", name: "Nagoya Obi with Crane", category: "Accessories", price: 980, originalPrice: 1200, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80", rating: 4.9, reviews: 9, variant: "minimal", description: "" },
];

function StarIcon() {
  return (
    <svg className={styles.ratingIcon} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [activeSwatch, setActiveSwatch] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const variantClass = product.variant === "horizontal" 
    ? styles.variantHorizontal 
    : product.variant === "minimal" 
      ? styles.variantMinimal 
      : "";

  return (
    <article 
      ref={cardRef}
      className={`${styles.productCard} ${variantClass} ${styles.fadeUp} ${isVisible ? styles.fadeUpVisible : ""}`}
    >
      <div className={styles.productImageContainer}>
        {product.badge && <span className={styles.productBadge}>{product.badge}</span>}
        <span className={`${styles.priceTag} ${product.originalPrice ? styles.priceTagSale : ""}`}>
          {product.originalPrice && (
            <span className={styles.originalPrice}>${product.originalPrice.toLocaleString()}</span>
          )}
          ${product.price.toLocaleString()}
        </span>
        <img src={product.image} alt={product.name} className={styles.productImage} />
        {product.variant !== "minimal" && (
          <div className={styles.quickActions}>
            <button className={styles.btnQuick} onClick={() => console.log(`Quick view for: ${product.name}`)}>
              {product.variant === "horizontal" ? "Inquire Now" : "Quick View"}
            </button>
          </div>
        )}
      </div>
      <div className={styles.productInfo}>
        <div className="flex items-start justify-between">
          <div>
            <p className={styles.productCategory}>{product.category}</p>
            <h3 className={styles.productName}>{product.name}</h3>
          </div>
          {product.variant === "horizontal" && product.badge && (
             <span className={styles.productBadge} style={{ position: 'static' }}>{product.badge}</span>
          )}
        </div>
        {product.description && <p className={styles.productDescription}>{product.description}</p>}
        
        {product.variant !== "minimal" && (
          <div className={styles.footerActions}>
            <div className={styles.rating}>
              <StarIcon />
              <span>{product.rating} ({product.reviews})</span>
            </div>
            {product.swatches && (
              <div className={styles.colorSwatches}>
                {product.swatches.map((swatch, idx) => (
                  <span
                    key={swatch.name}
                    className={`${styles.swatch} ${activeSwatch === idx ? styles.swatchActive : ""}`}
                    style={{ background: swatch.color }}
                    title={swatch.name}
                    onClick={() => setActiveSwatch(idx)}
                  />
                ))}
              </div>
            )}
            {product.variant === "horizontal" && (
               <button className={`${styles.btnQuick} w-auto`} style={{ width: 'auto' }}>Inquire Now</button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function GallerySection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
        <p className={styles.sectionLabel}>Product Components</p>
        <h1 className={styles.sectionTitle}>Traditional Dress Collection</h1>
      </div>

      {/* Standard Grid */}
      <div className={`${styles.grid} ${styles.gridStandard}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Horizontal Layout */}
      <div style={{ marginBottom: '64px' }}>
        <h2 className={styles.productName} style={{ fontSize: '24px', marginBottom: '32px' }}>Horizontal Layout</h2>
        <div className="space-y-4">
          {horizontalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Minimal Layout */}
      <div>
        <h2 className={styles.productName} style={{ fontSize: '24px', marginBottom: '32px' }}>Minimal Layout</h2>
        <div className={`${styles.grid} ${styles.gridMinimal}`}>
          {minimalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
