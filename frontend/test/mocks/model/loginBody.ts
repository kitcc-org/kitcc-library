/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * KITCC Library API
 * OpenAPI spec version: 1.0.0
 */

export type LoginBody = {
  email: string;
  /**
   * @minLength 8
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$
   */
  password: string;
};
