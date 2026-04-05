import { G as GlossaryTerm, C as Category } from './types-B9zESk6e.js';

declare const allTerms: GlossaryTerm[];
/** Get a term by its id or any of its aliases */
declare function getTerm(idOrAlias: string): GlossaryTerm | undefined;
/** Get all terms in a given category */
declare function getTermsByCategory(category: Category): GlossaryTerm[];
/** Search terms by query string (matches term name, definition, and aliases) */
declare function searchTerms(query: string): GlossaryTerm[];
/** Get all available categories */
declare function getCategories(): Category[];

export { Category, GlossaryTerm, allTerms, getCategories, getTerm, getTermsByCategory, searchTerms };
