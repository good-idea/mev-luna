import { Maybe } from '../types';
/**
 * definitely. The opposite of "Maybe" but for arrays.
 *
 * If you're dealing with an array that might include null or undefined values,
 * use this to ensure that you get an array of non-falsy values.
 *
 * @param {Maybe<T>[] | null} an array of T, null, or undefined
 * @returns {T[]} a type-safe array of T, without null or undefined
 */
export function definitely<T>(items?: Maybe<T>[] | null): T[] {
  if (!items) return [];
  return items.filter((i): i is T => Boolean(i));
}
