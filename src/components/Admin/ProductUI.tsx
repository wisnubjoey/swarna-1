import React from 'react';
import Link from 'next/link';

// Define the exact shape of the data we are passing from page.tsx
type ProductUIProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    gender: "female" | "male" | "unisex";
    price: string; // Drizzle decimal fields return strings
    material: string | null;
    color: string | null;
    stockQuantity: number;
    size: string | null;
    category: {
      name: string;
    };
  };
};

// Helper to determine stock status styling
const getStockStatus = (quantity: number) => {
  if (quantity === 0) {
    return {
      label: "Out of Stock",
      dotColor: "bg-red-400",
      textColor: "text-red-500",
    };
  }
  if (quantity <= 5) {
    return {
      label: `Low Stock · ${quantity} left`,
      dotColor: "bg-amber-400",
      textColor: "text-amber-600",
    };
  }
  return {
    label: `In Stock · ${quantity} available`,
    dotColor: "bg-emerald-400",
    textColor: "text-emerald-600",
  };
};

const ProductUI: React.FC<ProductUIProps> = ({ product }) => {
  // Format the price string from Drizzle into standard USD currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parseFloat(product.price));

  const stockStatus = getStockStatus(product.stockQuantity);

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

        {/* Stock Badge (Top Right) */}
        <div className="absolute top-4 right-4 bg-white/90 border border-[rgba(58,42,26,0.1)] px-3 py-1.5 flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${stockStatus.dotColor} ${product.stockQuantity > 0 && product.stockQuantity <= 5 ? 'animate-pulse' : ''}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${stockStatus.textColor}`}>
            {product.stockQuantity === 0 ? "Out of Stock" : product.stockQuantity <= 5 ? "Low Stock" : "In Stock"}
          </span>
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

        {/* Product Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Material */}
          <div className="py-2.5">
            <p className="text-[#bfb09a] text-[9px] font-semibold uppercase tracking-[0.2em] mb-1">
              Material
            </p>
            <p className="text-[#3a2a1a] text-xs font-medium truncate">
              {product.material || "—"}
            </p>
          </div>

          {/* Color */}
          <div className="py-2.5">
            <p className="text-[#bfb09a] text-[9px] font-semibold uppercase tracking-[0.2em] mb-1">
              Color
            </p>
            <p className="text-[#3a2a1a] text-xs font-medium truncate">
              {product.color || "—"}
            </p>
          </div>

          {/* Size */}
          <div className="bg-[#faf7f2] border border-[rgba(58,42,26,0.06)] px-3 py-2.5">
            <p className="text-[#bfb09a] text-[9px] font-semibold uppercase tracking-[0.2em] mb-1">
              Available sizes
            </p>
            <p className="text-[#3a2a1a] text-md font-bold truncate">
              {product.size || "—"}
            </p>
          </div>

          {/* Stock Quantity */}
          <div className="bg-[#faf7f2] border border-[rgba(58,42,26,0.06)] px-3 py-2.5">
            <p className="text-[#bfb09a] text-[9px] font-semibold uppercase tracking-[0.2em] mb-1">
              Quantity
            </p>
            <p className={`text-md font-bold ${stockStatus.textColor}`}>
              {product.stockQuantity} units
            </p>
          </div>
        </div>

        {/* Gold Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

        {/* Price & Edit Row */}
        <div className="flex items-end justify-between gap-4">

          {/* Price Block */}
          <div className="flex flex-col gap-1">
            <span className="text-[#3a2a1a] text-2xl font-serif font-semibold tracking-tight">
              {formattedPrice}
            </span>
            <span className={`text-[10px] font-medium ${stockStatus.textColor}`}>
              {stockStatus.label}
            </span>
          </div>

          {/* Edit Button */}
          <Link 
            href={`/admin/products/${product.id}/edit`}
            className="bg-gradient-to-br from-[#c9a84c] to-[#a6872e] shadow-[0_2px_8px_rgba(201,168,76,0.3)] hover:from-[#d4b65e] hover:to-[#b89438] hover:shadow-[0_4px_16px_rgba(201,168,76,0.4)] text-white text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 flex-shrink-0"
          >
            Edit
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductUI;