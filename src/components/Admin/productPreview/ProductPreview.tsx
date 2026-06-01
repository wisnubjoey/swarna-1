"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  ChevronRight, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  Droplets, 
  Package, 
  Clock, 
  X, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import styles from "./ProductPreview.module.css";

const productImages = [
  {
    id: 0,
    src: "https://picsum.photos/seed/aurum-vase-main/800/1000.jpg",
    zoom: "https://picsum.photos/seed/aurum-vase-main/1600/2000.jpg",
    thumb: "https://picsum.photos/seed/aurum-vase-main/200/200.jpg"
  },
  {
    id: 1,
    src: "https://picsum.photos/seed/aurum-vase-side/800/1000.jpg",
    zoom: "https://picsum.photos/seed/aurum-vase-side/1600/2000.jpg",
    thumb: "https://picsum.photos/seed/aurum-vase-side/200/200.jpg"
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/aurum-vase-detail/800/1000.jpg",
    zoom: "https://picsum.photos/seed/aurum-vase-detail/1600/2000.jpg",
    thumb: "https://picsum.photos/seed/aurum-vase-detail/200/200.jpg"
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/aurum-vase-lifestyle/800/1000.jpg",
    zoom: "https://picsum.photos/seed/aurum-vase-lifestyle/1600/2000.jpg",
    thumb: "https://picsum.photos/seed/aurum-vase-lifestyle/200/200.jpg"
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/aurum-vase-group/800/1000.jpg",
    zoom: "https://picsum.photos/seed/aurum-vase-group/1600/2000.jpg",
    thumb: "https://picsum.photos/seed/aurum-vase-group/200/200.jpg"
  }
];

const colors = [
  { name: "Sage", value: "#8e9f92" },
  { name: "Sand", value: "#d4c5b0" },
  { name: "Charcoal", value: "#3c3c3c" },
  { name: "Ivory", value: "#f0ece4" }
];

const sizes = [
  { id: "S", label: "S" },
  { id: "M", label: "M" },
  { id: "L", label: "L" },
  { id: "XL", label: "XL", addon: "+ $20" }
];

const testimonials = [
  {
    id: 1,
    initials: "EM",
    name: "Eleanor M.",
    meta: "Verified Buyer · Sage / L",
    text: "\"Absolutely stunning piece. The glaze has these beautiful subtle variations that catch the light differently throughout the day. It's become the centrepiece of our living room.\"",
    rating: 5
  },
  {
    id: 2,
    initials: "TK",
    name: "Thomas K.",
    meta: "Verified Buyer · Sand / M",
    text: "\"Beautiful craftsmanship and the packaging was impeccable. Took one star off only because the colour was slightly more muted than expected — but honestly, I love it even more in person.\"",
    rating: 4
  },
  {
    id: 3,
    initials: "SL",
    name: "Sofia L.",
    meta: "Verified Buyer · Ivory / XL",
    text: "\"Bought as a gift and the recipient was overjoyed. The XL size makes such a statement. Already planning to order the Charcoal for myself.\"",
    rating: 5
  }
];

const relatedProducts = [
  { id: 1, title: "Sculptural Bowl", price: "$120.00", img: "https://picsum.photos/seed/aurum-bowl/600/800.jpg" },
  { id: 2, title: "Dinner Plate Set", price: "$95.00", img: "https://picsum.photos/seed/aurum-plate/600/800.jpg" },
  { id: 3, title: "Ceramic Pitcher", price: "$145.00", img: "https://picsum.photos/seed/aurum-pitcher/600/800.jpg", badge: "Best Seller" },
  { id: 4, title: "Tea Cup Duo", price: "$68.00", img: "https://picsum.photos/seed/aurum-cup/600/800.jpg" }
];

export function ProductPreview() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const mainImageRef = useRef<HTMLDivElement>(null);
  const zoomLensRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mainImageRef.current || !zoomLensRef.current || window.innerWidth <= 768) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensWidth = 180;
    const lensHeight = 180;

    let lensX = x - lensWidth / 2;
    let lensY = y - lensHeight / 2;

    // Constrain lens
    if (lensX < 0) lensX = 0;
    if (lensX > rect.width - lensWidth) lensX = rect.width - lensWidth;
    if (lensY < 0) lensY = 0;
    if (lensY > rect.height - lensHeight) lensY = rect.height - lensHeight;

    zoomLensRef.current.style.left = `${lensX}px`;
    zoomLensRef.current.style.top = `${lensY}px`;

    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;

    zoomLensRef.current.style.backgroundImage = `url(${productImages[activeImageIdx].zoom})`;
    zoomLensRef.current.style.backgroundSize = `${rect.width * 2}px ${rect.height * 2}px`;
    zoomLensRef.current.style.backgroundPosition = `${bgX}% ${bgY}%`;
  };

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className={styles.previewContainer}>
      <div className={styles.sectionInner}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <a href="#" className={styles.breadcrumbLink}>Home</a>
          <ChevronRight size={12} />
          <a href="#" className={styles.breadcrumbLink}>Living</a>
          <ChevronRight size={12} />
          <span className={styles.breadcrumbCurrent}>Ceramic Vase Collection</span>
        </nav>

        <div className={styles.mainGrid}>
          {/* LEFT: Image Gallery */}
          <div className={styles.gallerySection}>
            <div 
              className={styles.mainImageWrap} 
              ref={mainImageRef}
              onMouseMove={handleMouseMove}
            >
              <img 
                src={productImages[activeImageIdx].src} 
                alt="Artisan Ceramic Vase" 
                className={styles.mainImage}
              />
              <div className={styles.zoomLens} ref={zoomLensRef} />
              <div className={styles.badge}>New Arrival</div>
              <button 
                className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlistBtnActive : ""}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <div className={styles.thumbnailGrid}>
              {productImages.map((img, idx) => (
                <button 
                  key={img.id}
                  className={`${styles.thumbnailBtn} ${activeImageIdx === idx ? styles.thumbnailBtnActive : ""}`}
                  onClick={() => setActiveImageIdx(idx)}
                >
                  <img src={img.thumb} alt={`View ${idx + 1}`} className={styles.thumbnailImg} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className={styles.infoSection}>
            <div className={styles.tags}>
              <span className={`${styles.tag} ${styles.tagAccent}`}>Handcrafted</span>
              <span className={styles.tag}>Limited Edition</span>
            </div>

            <h1 className={styles.title}>PRODUCT NAME</h1>
            
            <p className={styles.subtitle}>
              From the <span className={styles.subtitleSerif}>Earth & Form</span> Collection — Hand-thrown stoneware with a reactive glaze finish
            </p>

            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className={`${styles.starIcon} ${styles.starFilled}`} />
                ))}
                <Star className={`${styles.starIcon} ${styles.starEmpty}`} />
              </div>
              <span className={styles.ratingValue}>4.0</span>
              <span style={{color: 'var(--preview-border)'}}>·</span>
              <a href="#reviews" className={styles.reviewsLink}>24 Reviews</a>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>$185.00</span>
              <span className={styles.oldPrice}>$220.00</span>
              <span className={styles.saveBadge}>Save 16%</span>
            </div>

            <div className={styles.divider} />

            {/* Color Selection */}
            <div className={styles.selector}>
              <div className={styles.selectorHeader}>
                <span className={styles.selectorLabel}>Color</span>
                <span className={styles.selectorValue}>{selectedColor.name}</span>
              </div>
              <div className={styles.swatchGrid}>
                {colors.map((color) => (
                  <button 
                    key={color.name}
                    className={`${styles.colorSwatch} ${selectedColor.name === color.name ? styles.colorSwatchActive : ""}`}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  >
                    <span 
                      className={styles.colorSwatchInner} 
                      style={{ backgroundColor: color.value }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className={styles.selector}>
              <div className={styles.selectorHeader}>
                <span className={styles.selectorLabel}>Size</span>
                <button className={styles.sizeGuideBtn} onClick={() => setShowModal(true)}>Size Guide</button>
              </div>
              <div className={styles.sizeGrid}>
                {sizes.map((size) => (
                  <button 
                    key={size.id}
                    className={`${styles.sizeBtn} ${selectedSize.id === size.id ? styles.sizeBtnActive : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.label}
                    {size.addon && <span className={styles.sizeAddon}>{size.addon}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className={styles.actionRow}>
              <div className={styles.qtyControl}>
                <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={14} />
                </button>
                <input 
                  type="number" 
                  className={styles.qtyInput} 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
                <button className={styles.qtyBtn} onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                  <Plus size={14} />
                </button>
              </div>

              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                Add to Cart
              </button>
            </div>

            <button className={styles.buyNowBtn}>Buy Now</button>

            {/* Perks */}
            <div className={styles.perksGrid}>
              <div className={styles.perk}>
                <Truck className={styles.perkIcon} />
                <span className={styles.perkText}>Free Shipping<br/>over $150</span>
              </div>
              <div className={styles.perk}>
                <RefreshCw className={styles.perkIcon} />
                <span className={styles.perkText}>30-Day<br/>Returns</span>
              </div>
              <div className={styles.perk}>
                <ShieldCheck className={styles.perkIcon} />
                <span className={styles.perkText}>2-Year<br/>Warranty</span>
              </div>
            </div>

            {/* Accordions */}
            <div className={styles.accordionContainer}>
              {/* Description */}
              <div className={`${styles.accordion} ${openAccordions.includes('desc') ? styles.accordionOpen : ""}`}>
                <button className={styles.accordionTrigger} onClick={() => toggleAccordion('desc')}>
                  <span className={styles.accordionLabel}>Description</span>
                  {openAccordions.includes('desc') ? <Minus className={styles.accordionIcon} /> : <Plus className={styles.accordionIcon} />}
                </button>
                <div className={styles.accordionContent}>
                  <div className={styles.accordionContentInner}>
                    <p className={styles.accordionPara}>
                      Each piece in our Artisan Ceramic Collection is hand-thrown on a potter&apos;s wheel by skilled craftspeople in our Portuguese studio. The reactive glaze creates unique variations — no two pieces are exactly alike.
                    </p>
                    <p className={styles.accordionPara}>
                      Inspired by organic forms found in nature, the gentle undulations and earthy tones bring a sense of calm and authenticity to any interior space.
                    </p>
                    <p className={`${styles.accordionPara} ${styles.accordionParaSerif}`}>
                      &quot;Every imperfection tells the story of the maker&apos;s hand.&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className={`${styles.accordion} ${openAccordions.includes('specs') ? styles.accordionOpen : ""}`}>
                <button className={styles.accordionTrigger} onClick={() => toggleAccordion('specs')}>
                  <span className={styles.accordionLabel}>Specifications</span>
                  {openAccordions.includes('specs') ? <Minus className={styles.accordionIcon} /> : <Plus className={styles.accordionIcon} />}
                </button>
                <div className={styles.accordionContent}>
                  <div className={styles.accordionContentInner}>
                    <table className={styles.specsTable}>
                      <tbody>
                        <tr>
                          <td className={`${styles.specsTd} ${styles.specsTdLabel}`}>Material</td>
                          <td className={styles.specsTd}>Stoneware Clay</td>
                        </tr>
                        <tr>
                          <td className={`${styles.specsTd} ${styles.specsTdLabel}`}>Glaze</td>
                          <td className={styles.specsTd}>Reactive Matte Finish</td>
                        </tr>
                        <tr>
                          <td className={`${styles.specsTd} ${styles.specsTdLabel}`}>Dimensions (S)</td>
                          <td className={styles.specsTd}>H 18cm × Ø 12cm</td>
                        </tr>
                        <tr>
                          <td className={`${styles.specsTd} ${styles.specsTdLabel}`}>Origin</td>
                          <td className={styles.specsTd}>Handmade in Portugal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Care */}
              <div className={`${styles.accordion} ${openAccordions.includes('care') ? styles.accordionOpen : ""}`}>
                <button className={styles.accordionTrigger} onClick={() => toggleAccordion('care')}>
                  <span className={styles.accordionLabel}>Care & Delivery</span>
                  {openAccordions.includes('care') ? <Minus className={styles.accordionIcon} /> : <Plus className={styles.accordionIcon} />}
                </button>
                <div className={styles.accordionContent}>
                  <div className={styles.accordionContentInner}>
                    <div className={styles.careItem}>
                      <Droplets className={styles.careIcon} />
                      <p className={styles.careText}>Wipe clean with a soft, damp cloth. Avoid abrasive cleaners.</p>
                    </div>
                    <div className={styles.careItem}>
                      <Package className={styles.careIcon} />
                      <p className={styles.careText}>Carefully wrapped in protective tissue and shipped in recycled cardboard.</p>
                    </div>
                    <div className={styles.careItem}>
                      <Clock className={styles.careIcon} />
                      <p className={styles.careText}>Standard delivery: 5–7 business days. Express available.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section id="reviews" className={styles.testimonialsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Testimonials</span>
            <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
          </div>
          <div className={styles.testimonialGrid}>
            {testimonials.map((t) => (
              <div key={t.id} className={styles.testimonialCard}>
                <div className={styles.stars} style={{ marginBottom: '16px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className={styles.starFilled} />
                  ))}
                </div>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.testimonialUser}>
                  <div className={styles.avatarCircle}>{t.initials}</div>
                  <div>
                    <p className={styles.userName}>{t.name}</p>
                    <p className={styles.userMeta}>{t.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className={styles.relatedSection}>
        <div className={styles.sectionInner}>
          <div className={styles.relatedHeader}>
            <div>
              <span className={styles.sectionTag}>You May Also Like</span>
              <h2 className={styles.sectionTitle}>Related Pieces</h2>
            </div>
            <a href="#" className={styles.viewAllLink}>
              View All <ArrowRight size={16} />
            </a>
          </div>
          <div className={styles.productGrid}>
            {relatedProducts.map((p) => (
              <a key={p.id} href="#" className={styles.productCard}>
                <div className={styles.productImgWrap}>
                  <img src={p.img} alt={p.title} className={styles.productImg} />
                  {p.badge && <div className={styles.badge} style={{ top: 12, left: 12 }}>{p.badge}</div>}
                </div>
                <h4 className={styles.productTitle}>{p.title}</h4>
                <p className={styles.productPrice}>{p.price}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      <div className={`${styles.toast} ${showToast ? styles.toastActive : ""}`}>
        <CheckCircle className={styles.toastIcon} />
        <span className={styles.toastText}>Added to cart successfully</span>
      </div>

      {/* Size Guide Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h3 className={styles.modalTitle}>Size Guide</h3>
            <table className={styles.modalTable}>
              <thead>
                <tr>
                  <th className={styles.modalTh}>Size</th>
                  <th className={styles.modalTh}>Height</th>
                  <th className={styles.modalTh}>Diameter</th>
                  <th className={styles.modalTh}>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={styles.modalTd}>S</td><td className={styles.modalTd}>18 cm</td><td className={styles.modalTd}>12 cm</td><td className={styles.modalTd}>$185</td></tr>
                <tr><td className={styles.modalTd}>M</td><td className={styles.modalTd}>24 cm</td><td className={styles.modalTd}>16 cm</td><td className={styles.modalTd}>$185</td></tr>
                <tr><td className={styles.modalTd}>L</td><td className={styles.modalTd}>32 cm</td><td className={styles.modalTd}>20 cm</td><td className={styles.modalTd}>$185</td></tr>
                <tr><td className={styles.modalTd}>XL</td><td className={styles.modalTd}>40 cm</td><td className={styles.modalTd}>24 cm</td><td className={styles.modalTd}>$205</td></tr>
              </tbody>
            </table>
            <p className={styles.modalNote}>Due to the handmade nature, dimensions may vary ±1cm</p>
          </div>
        </div>
      )}
    </div>
  );
}
