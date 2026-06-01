import { ProductPreview } from "@/components/Admin/productPreview/ProductPreview";
import { getProductById } from "../actions";
import { notFound } from "next/navigation";

type ProductPreviewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPreviewPage({ params }: ProductPreviewPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductPreview product={product} />;
}
