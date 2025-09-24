import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const affiliates = pgTable("affiliates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull(),
  totalWagered: decimal("total_wagered", { precision: 12, scale: 2 }).notNull().default("0.00"),
  totalEarnings: decimal("total_earnings", { precision: 12, scale: 2 }).notNull().default("0.00"),
  rank: integer("rank").notNull().default(0),
  betCount: integer("bet_count").notNull().default(0),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAffiliateSchema = createInsertSchema(affiliates).omit({
  id: true,
  lastUpdated: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;
export type Affiliate = typeof affiliates.$inferSelect;

// API Response types
export const affiliateApiResponseSchema = z.object({
  data: z.array(z.object({
    affiliate_id: z.string(),
    username: z.string(),
    total_wagered: z.string(),
    total_earnings: z.string(),
    bet_count: z.number(),
    rank: z.number().optional(),
  })),
  success: z.boolean(),
  message: z.string().optional(),
});

export type AffiliateApiResponse = z.infer<typeof affiliateApiResponseSchema>;
