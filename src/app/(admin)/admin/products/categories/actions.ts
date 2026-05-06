"use server";

import db from "@/index";
import { categories } from "@/db/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  // Simple slug generation: lowercase and replace spaces with hyphens
  const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

  if (!name || !slug) {
    throw new Error("Name is required");
  }

  await db.insert(categories).values({
    name,
    slug,
    description,
  });

  revalidatePath("/admin/products/categories");
  redirect("/admin/products/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  // Simple slug generation: lowercase and replace spaces with hyphens
  const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

  if (!id || !name || !slug) {
    throw new Error("ID and Name are required");
  }

  await db.update(categories).set({
    name,
    slug,
    description,
  }).where(eq(categories.id, id));

  revalidatePath("/admin/products/categories");
  redirect("/admin/products/categories");
}

export async function deleteCategory(id: string) {
  if (!id) throw new Error("ID is required");

  await db.delete(categories).where(eq(categories.id, id));

  revalidatePath("/admin/products/categories");
  redirect("/admin/products/categories");
}
