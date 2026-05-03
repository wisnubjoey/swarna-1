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
            Maison Éternelle {/* Gender */}
          </p>
          <h3 className="text-[#3a2a1a] text-lg font-serif font-semibold leading-snug tracking-tight">
            Heritage Chronograph {/* Product Name */}
          </h3>
          <p className="text-[#bfb09a] text-xs font-light mt-1.5 leading-relaxed">
            Swiss-made automatic movement with 18k gold accents. {/* Product Description */}
          </p>
        </div>

        

        {/* Gold Divider (Inline gradient replacement) */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

        {/* Price & Buy Row */}
        <div className="flex items-end justify-between gap-4">

          {/* Price Block */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[#3a2a1a] text-2xl font-serif font-semibold tracking-tight">
                $1,490 {/* Product Price No calculation here */}
              </span>
              <span className="text-[rgba(191,176,154,0.6)] text-xs font-mono line-through">
                $2,490 {/* Product Price No calculation here */}
              </span>
            </div>
            <span className="text-[#a6872e] text-[10px] font-mono font-medium uppercase tracking-wider">
              You save $1,000
            </span>
          </div>

          {/* Buy Button (Inline shadow & gradient replacement) */}
          <button className="bg-gradient-to-br from-[#c9a84c] to-[#a6872e] shadow-[0_2px_8px_rgba(201,168,76,0.3)] hover:from-[#d4b65e] hover:to-[#b89438] hover:shadow-[0_4px_16px_rgba(201,168,76,0.4)] text-white text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 flex-shrink-0">
            
            Edit
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductUI;