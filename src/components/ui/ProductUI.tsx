import React from 'react';

/*
  ⚠️ NOTE ON FONTS ⚠️
  This component uses font-serif, font-sans, and font-mono classes.
  For the typography to match the luxury design, make sure you link 
  the Google Fonts in your public/index.html <head> tag:
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
*/

const ProductUI: React.FC = () => {
  return (
    <div className="w-full max-w-[360px] overflow-hidden transition-all duration-300 group bg-white border border-[rgba(58,42,26,0.08)] shadow-[0_1px_3px_rgba(58,42,26,0.04),0_8px_32px_rgba(58,42,26,0.06)]">

      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f0e8]">
        <img
          src="https://picsum.photos/seed/lux-watch-77/720/540.jpg"
          alt="Heritage Chronograph Watch"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Gradient Overlay (Replaces CSS ::after) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,42,26,0.05)] via-transparent to-transparent pointer-events-none" />

        {/* Discount Tag */}
        <div className="absolute top-4 right-4 bg-[#3a2a1a] text-[#e2cc7e] text-[10px] font-mono font-medium uppercase tracking-[0.2em] px-3 py-1.5">
          −40% Off
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 border border-[rgba(58,42,26,0.1)] text-[#3a2a1a] text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5">
          Horlogerie
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">

        {/* Brand & Product Name */}
        <div>
          <p className="text-[#8a7260] text-[10px] font-semibold uppercase tracking-[0.25em] mb-1.5">
            Maison Éternelle
          </p>
          <h3 className="text-[#3a2a1a] text-lg font-serif font-semibold leading-snug tracking-tight">
            Heritage Chronograph
          </h3>
          <p className="text-[#bfb09a] text-xs font-light mt-1.5 leading-relaxed">
            Swiss-made automatic movement with 18k gold accents.
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {/* 4 Filled Stars */}
            {Array.from({ length: 4 }).map((_, i) => (
              <svg key={`star-filled-${i}`} className="w-3.5 h-3.5 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            {/* 1 Empty Star */}
            <svg className="w-3.5 h-3.5 text-[rgba(191,176,154,0.4)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-[#bfb09a] text-[10px] font-mono tracking-wider">(128 reviews)</span>
        </div>

        {/* Gold Divider (Inline gradient replacement) */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

        {/* Price & Buy Row */}
        <div className="flex items-end justify-between gap-4">

          {/* Price Block */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[#3a2a1a] text-2xl font-serif font-semibold tracking-tight">
                $1,490
              </span>
              <span className="text-[rgba(191,176,154,0.6)] text-xs font-mono line-through">
                $2,490
              </span>
            </div>
            <span className="text-[#a6872e] text-[10px] font-mono font-medium uppercase tracking-wider">
              You save $1,000
            </span>
          </div>

          {/* Buy Button (Inline shadow & gradient replacement) */}
          <button className="bg-gradient-to-br from-[#c9a84c] to-[#a6872e] shadow-[0_2px_8px_rgba(201,168,76,0.3)] hover:from-[#d4b65e] hover:to-[#b89438] hover:shadow-[0_4px_16px_rgba(201,168,76,0.4)] text-white text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-5.98.572l-.005.029m5.985-.6A3 3 0 0112 15.75a3 3 0 015.985.6m-1.99-6.027a2.25 2.25 0 00-1.292-.763l-7.493-1.69a2.25 2.25 0 00-1.59.108l-3.644 1.82" />
            </svg>
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductUI;