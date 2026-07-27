import { X } from "@phosphor-icons/react";
import { useCallback, useMemo, useState } from "react";
import useFocusTrap from "../hooks/useFocusTrap.js";

export default function SearchOverlay({ isOpen, onClose, navItems = [] }) {
  const [query, setQuery] = useState("");
  const closeSearch = useCallback(() => onClose(), [onClose]);
  const dialogRef = useFocusTrap(isOpen, closeSearch);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return [];
    }

    const navResults = navItems.flatMap((item) => [
      { id: item.id, label: item.label, type: "Navigation", href: item.href },
      ...(item.children || []).map((child) => ({
        id: child.id,
        label: child.label,
        type: "Navigation",
        href: child.href
      }))
    ]);

    return navResults.filter((item) =>
      item.label.toLowerCase().includes(normalizedQuery)
    );
  }, [navItems, query]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/35 px-4 py-6 sm:py-10" role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        className="mx-auto max-w-2xl rounded-heritage bg-sandstone-50 p-5 shadow-soft"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="search-title" className="text-3xl">
              Search
            </h2>
            <p className="mt-1 text-ink-700">Find navigation links across the site.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50"
            aria-label="Close search"
          >
            <X size={22} weight="bold" />
          </button>
        </div>

        <label htmlFor="site-search" className="mt-6 block font-semibold text-ink-900">
          Search the site
        </label>
        <input
          id="site-search"
          data-initial-focus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mt-2 w-full rounded-heritage border border-sandstone-200 bg-white px-4 py-3 text-ink-900 shadow-soft"
          placeholder="Try admissions, events, or values"
        />

        <div className="mt-6" aria-live="polite">
          {query.trim() && results.length === 0 ? (
            <p className="rounded-heritage border border-sandstone-200 bg-white p-4 text-ink-700">
              No results found for "{query}".
            </p>
          ) : null}

          {results.length > 0 ? (
            <ul className="grid gap-2">
              {results.map((result) => (
                <li key={`${result.type}-${result.id}`}>
                  <a
                    href={result.href}
                    onClick={onClose}
                    className="block rounded-heritage border border-sandstone-200 bg-white p-4 no-underline hover:border-maroon-100 hover:bg-maroon-50"
                  >
                    <span className="block text-sm font-semibold text-maroon-700">{result.type}</span>
                    <span className="mt-1 block text-ink-900">{result.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
