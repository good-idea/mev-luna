/**
 * Maybe, mabye not
 */
export type Maybe<T> = T | null | undefined;

/**
 * "Unpacks" an array into a union, i.e.
 *
 * OneOf<Array<Animal | Human | Machine>> =>
 *   Animal | Human | Machine
 */
export type OneOf<T> = T extends (infer U)[] ? U : T;
