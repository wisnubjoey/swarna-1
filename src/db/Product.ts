import { 
  pgTable, 
  text, 
  integer, 
  decimal, 
  timestamp, 
  varchar, 
  pgEnum 
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const genderEnum = pgEnum("gender", ["female", "male", "unisex"]);
export const statusEnum = pgEnum("status", ["active", "draft", "archived"]);

export const categories = pgTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  stockQuantity: integer("stock_quantity").default(0).notNull(),
  material: varchar("material", { length: 100 }),
  color: varchar("color", { length: 50 }),
  size: varchar("size", { length: 20 }),
  styleType: varchar("style_type", { length: 100 }),
  gender: genderEnum("gender").notNull(),
  mainImageUrl: text("main_image_url"),
  status: statusEnum("status").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));
