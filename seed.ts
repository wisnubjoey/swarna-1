import 'dotenv/config';
import db from './src/index';
import { categories, products } from './src/db/Product';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Seeding database...');

  try {
    // 1. Insert a Dummy Category
    const [category] = await db.insert(categories).values({
      name: 'Jewelry',
      slug: 'jewelry',
      description: 'Elegant jewelry collection',
    }).onConflictDoNothing().returning();

    // If the category already existed and wasn't returned, fetch it
    let categoryId = category?.id;
    if (!categoryId) {
      const existing = await db.select().from(categories).where(eq(categories.slug, 'jewelry'));
      categoryId = existing[0]?.id;
    }

    if (!categoryId) {
      throw new Error('Could not find or create category');
    }

    // 2. Insert a Dummy Product
    await db.insert(products).values({
      sku: 'GOLD-RING-001',
      name: 'Classic Gold Ring',
      description: 'A beautiful 18k gold ring.',
      categoryId: categoryId,
      price: '299.99', // decimal is usually string in JS
      stockQuantity: 10,
      material: 'Gold',
      color: 'Gold',
      size: '7',
      gender: 'unisex',
      status: 'active',
    }).onConflictDoNothing();

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // For node-postgres with drizzle, the process might hang if the pool isn't closed.
    // However, since we're using the default export which doesn't expose the pool easily,
    // we can just exit the process.
    process.exit(0);
  }
}

seed();
