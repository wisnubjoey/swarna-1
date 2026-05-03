"use server";

import db from "@/index";
import { categories } from "@/db/Product";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  
  // Simple slug generation: lowercase and replace spaces with hyphens
  const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

  if (!name || !slug) {
    throw new Error("Name and slug are required");
  }

  await db.insert(categories).values({
    name,
    slug,
    description,
  });

  revalidatePath("/admin/categories");
}
