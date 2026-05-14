"use server";

import db from "@/index";
import { products, categories, productImages } from "@/db/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function getCategories() {
  return await db.select().from(categories);
}

// UPDATED: Fetch a single product by ID with its secondary images
export async function getProductById(id: string) {
  return await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      secondaryImages: true,
    },
  });
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as string;
  const stockQuantity = parseInt(formData.get("stockQuantity") as string) || 0;
  const material = formData.get("material") as string;
  const color = formData.get("color") as string;
  const size = formData.get("size") as string;
  const gender = formData.get("gender") as "female" | "male" | "unisex";
  const status = (formData.get("status") as "active" | "draft" | "archived") || "draft";
  const mainImageUrl = formData.get("mainImageUrl") as string || null;
  
  // Extract multiple secondary image URLs
  const secondaryImageUrls = formData.getAll("secondaryImageUrls") as string[];

  if (!name || !sku || !categoryId || !price || !gender) {
    throw new Error("Missing required fields");
  }

  await db.transaction(async (tx) => {
    const [newProduct] = await tx.insert(products).values({
      sku,
      name,
      description,
      categoryId,
      price,
      stockQuantity,
      material,
      color,
      size,
      gender,
      status,
      mainImageUrl,
    }).returning({ id: products.id });

    if (secondaryImageUrls.length > 0) {
      await tx.insert(productImages).values(
        secondaryImageUrls.map((url, index) => ({
          productId: newProduct.id,
          url,
          sortOrder: index,
        }))
      );
    }
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as string;
  const stockQuantity = parseInt(formData.get("stockQuantity") as string) || 0;
  const material = formData.get("material") as string;
  const color = formData.get("color") as string;
  const size = formData.get("size") as string;
  const gender = formData.get("gender") as "female" | "male" | "unisex";
  const status = (formData.get("status") as "active" | "draft" | "archived") || "draft";
  const mainImageUrl = formData.get("mainImageUrl") as string || null;

  // Extract multiple secondary image URLs
  const secondaryImageUrls = formData.getAll("secondaryImageUrls") as string[];

  if (!id || !name || !sku || !categoryId || !price || !gender) {
    throw new Error("Missing required fields");
  }

  await db.transaction(async (tx) => {
    // Update the product core data
    await tx.update(products).set({
      sku,
      name,
      description,
      categoryId,
      price,
      stockQuantity,
      material,
      color,
      size,
      gender,
      status,
      mainImageUrl,
    }).where(eq(products.id, id));

    // Sync secondary images: delete existing and insert new ones
    await tx.delete(productImages).where(eq(productImages.productId, id));
    
    if (secondaryImageUrls.length > 0) {
      await tx.insert(productImages).values(
        secondaryImageUrls.map((url, index) => ({
          productId: id,
          url,
          sortOrder: index,
        }))
      );
    }
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  if (!id) throw new Error("ID is required");

  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/admin/products");
  redirect("/admin/products");
}