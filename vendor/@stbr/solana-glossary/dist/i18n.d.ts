import { G as GlossaryTerm } from './types-B9zESk6e.js';

/**
 * Returns all glossary terms with locale-specific overrides applied.
 * Falls back to English for any term without a translation.
 *
 * @param locale - Locale code, e.g. "pt", "es", "zh"
 */
declare function getLocalizedTerms(locale: string): GlossaryTerm[];

export { getLocalizedTerms };
