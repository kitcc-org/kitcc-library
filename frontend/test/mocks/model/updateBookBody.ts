/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * KITCC Library API
 * OpenAPI spec version: 1.0.0
 */

export type UpdateBookBody = {
  authors?: string[];
  /** @pattern ^\d{10}(\d{3})?$ */
  isbn?: string;
  publishedDate?: string;
  publisher?: string;
  stock?: number;
  title?: string;
};
