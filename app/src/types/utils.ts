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

/**
 * Transforms all sanity reference types to the type being referenced.
 *
 * If you are expanding references within your GROQ queries, use this type
 * to transform all references.
 *
 * Example:
 *
 * Sanity.Schema.BlogPost['author'] == Sanity.Reference
 *   .i.e. { _type: 'reference', _ref: 'some-document-id' }
 *
 * Instead, do:
 *
 * type BlogPost = ExpandAllReferences<Sanity.Schema.BlogPost>
 *
 * BlogPost['author'] = ExpandAllReferences<Sanity.Schema.SwellBeing>
 *
 * const myBlogPost: BlogPost = { ... }
 *
 * myBlogPost.author._id // string
 * myBlogPost.author.bestFriend // SwellBeing
 *
 */
export type ExpandAllReferences<TBase> = {
  [K in keyof TBase]: ExtractRef<TBase[K]>;
};

/**
 * If the given type is a reference or an array of references,
 * returns the referenced type. Otherwise, returns the type as-is.
 */
type ExtractRef<TRef> =
  // If the type is a sanity reference, expand it
  TRef extends Sanity.Reference<infer Reference>
    ? ExpandAllReferences<Reference>
    : // Else, if the type is a keyed reference, expand it
    TRef extends Sanity.KeyedReference<infer KeyedReference>
    ? ExpandAllReferences<KeyedReference>
    : // else if it as an array of keyed items, expand all array items
    TRef extends Array<
        Sanity.KeyedReference<infer KeyedItem> | Sanity.Keyed<infer KeyedItem>
      >
    ? ExpandAllReferences<KeyedItem>[]
    : // else if it is an array of something non-keyed
    TRef extends Array<infer ArrayItem>
    ? ExpandAllReferences<ArrayItem>[]
    : ExpandAllReferences<TRef>;

/**
 * Extracts a union of "_type" values given a Sanity.Reference<T1 | T2 | T3>
 *
 * i.e. ExtractDocumentTypeNames<Sanity.Reference<Article | GlossaryTerm>>
 *      = Article | GlossaryTerm
 */
export type ExtractDocumentTypes<TRef> = TRef extends Sanity.Reference<
  infer Reference
>
  ? Reference extends Sanity.Schema.Document
    ? ExpandAllReferences<Reference>
    : never
  : never;

/**
 * Filters a union of documents to include only those with
 * specific _type values
 */
export type FilterDocsByType<
  D extends ExpandAllReferences<Sanity.Schema.Document>,
  T extends string,
> = D extends ExpandAllReferences<Sanity.Schema.Document>
  ? D['_type'] extends T
    ? D
    : never
  : never;

/**
 * Filters a union of documents to omit those with
 * specific _type values
 */

export type OmitDocsByType<
  D extends ExpandAllReferences<Sanity.Schema.Document>,
  T extends string,
> = D extends ExpandAllReferences<Sanity.Schema.Document>
  ? D['_type'] extends T
    ? never
    : D
  : never;
