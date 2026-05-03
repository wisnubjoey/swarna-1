import React from 'react';

// Define the exact shape of the data we are passing from page.tsx
type ProductUIProps = {
  product: {
    name: string;
    description: string | null;
    gender: "female" | "male" | "unisex";
    price: string; // Drizzle decimal fields return strings
    category: {
      name: string;
    };
  };
};

const ProductUI: React.FC<ProductUIProps> = ({ product }) => {
  // Format the price string from Drizzle into standard USD currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parseFloat(product.price));

  return (
    <div className="w-full max-w-[360px] overflow-hidden transition-all duration-300 group bg-white border border-[rgba(58,42,26,0.08)] shadow-[0_1px_3px_rgba(58,42,26,0.04),0_8px_32px_rgba(58,42,26,0.06)]">

      {/* Image Section (Keeping your hardcoded placeholder) */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f0e8]">
        <img
          src="https://picsum.photos/seed/lux-watch-77/720/540.jpg"
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,42,26,0.05)] via-transparent to-transparent pointer-events-none" />

        {/* Category Badge (Mapped from DB) */}
        <div className="absolute top-4 left-4 bg-white/90 border border-[rgba(58,42,26,0.1)] text-[#3a2a1a] text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5">
          {product.category.name}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">

        {/* Gender & Product Name */}
        <div>
          <p className="text-[#8a7260] text-[10px] font-semibold uppercase tracking-[0.25em] mb-1.5">
            {product.gender}
          </p>
          <h3 className="text-[#3a2a1a] text-lg font-serif font-semibold leading-snug tracking-tight">
            {product.name}
          </h3>
          <p className="text-[#bfb09a] text-xs font-light mt-1.5 leading-relaxed line-clamp-2">
            {product.description || "No description available."}
          </p>
        </div>

        {/* Gold Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

        {/* Price & Edit Row */}
        <div className="flex items-end justify-between gap-4">

          {/* Price Block (Removed original price & savings) */}
          <div className="flex flex-col gap-1">
            <span className="text-[#3a2a1a] text-2xl font-serif font-semibold tracking-tight">
              {formattedPrice}
            </span>
          </div>

          {/* Edit Button */}
          <button className="bg-gradient-to-br from-[#c9a84c] to-[#a6872e] shadow-[0_2px_8px_rgba(201,168,76,0.3)] hover:from-[#d4b65e] hover:to-[#b89438] hover:shadow-[0_4px_16px_rgba(201,168,76,0.4)] text-white text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 flex-shrink-0">
            Edit
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductUI;