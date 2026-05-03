"use server";

import db from "@/index";
import { products } from "@/db/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

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

  if (!name || !sku || !categoryId || !price || !gender) {
    throw new Error("Missing required fields");
  }

  await db.insert(products).values({
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

  if (!id || !name || !sku || !categoryId || !price || !gender) {
    throw new Error("Missing required fields");
  }

  await db.update(products).set({
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
  }).where(eq(products.id, id));

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  if (!id) throw new Error("ID is required");

  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/admin/products");
  redirect("/admin/products");
}
