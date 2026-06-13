'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { BandaButton, useTheme } from '@banda/react';
import { CATALOG, CATEGORIES, type CatalogEntry } from './registry';

/** Slug courant depuis le hash : '#/c/button' → 'button' ; sinon null (index). */
function slugFromHash(): string | null {
  const match = window.location.hash.match(/^#\/c\/([\w-]+)$/);
  return match ? (match[1] ?? null) : null;
}

function useHashRoute(): string | null {
  // null = SSR-safe initial value ; mis à jour après hydratation côté client.
  const [slug, setSlug] = useState<string | null>(null);
  useEffect(() => {
    setSlug(slugFromHash());
    const onHashChange = () => setSlug(slugFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return slug;
}

function CatalogCard({ entry }: { entry: CatalogEntry }) {
  const delivered = entry.Demo !== undefined;
  return (
    <a
      href={delivered ? `#/c/${entry.slug}` : undefined}
      aria-disabled={delivered ? undefined : true}
      className={[
        'flex flex-col gap-1 rounded-lg border border-banda-border bg-banda-surface p-4 no-underline',
        'transition-colors duration-fast',
        delivered
          ? 'cursor-pointer hover:border-banda-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring'
          : 'opacity-60',
      ].join(' ')}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-sans text-sm font-semibold text-banda-text">{entry.name}</span>
        <span
          className={[
            'rounded-full px-2 font-sans text-xs font-semibold',
            delivered
              ? 'bg-banda-success-muted text-banda-success'
              : 'bg-banda-surface-muted text-banda-text-muted',
          ].join(' ')}
        >
          {delivered ? 'Livré' : `Phase ${entry.phase}`}
        </span>
      </span>
      <span className="font-mono text-xs text-banda-text-muted">{entry.base}</span>
      {entry.note ? (
        <span className="font-sans text-xs text-banda-text-muted">{entry.note}</span>
      ) : null}
    </a>
  );
}

function CatalogIndex() {
  const delivered = CATALOG.filter((entry) => entry.Demo).length;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="m-0 font-sans text-4xl font-bold leading-tight tracking-tight text-banda-text">
          Composants Banda
        </h1>
        <p className="m-0 font-sans leading-normal text-banda-text-muted">
          {CATALOG.length} familles de composants — {delivered} livrées, le reste arrive par
          phases. Base HTML native, tokens Banda, icônes Lucide, saisies sanitizées.
        </p>
      </div>
      {CATEGORIES.map((category) => (
        <section key={category} className="flex flex-col gap-3">
          <h2 className="m-0 font-sans text-xl font-bold leading-tight tracking-tight text-banda-text">
            {category}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CATALOG.filter((entry) => entry.category === category).map((entry) => (
              <CatalogCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ComponentPage({ entry }: { entry: CatalogEntry }) {
  const Demo = entry.Demo;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <a
          href="#/"
          className="inline-flex items-center gap-1 font-sans text-sm text-banda-text-muted no-underline hover:text-banda-text"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Catalogue
        </a>
        <h1 className="m-0 font-sans text-4xl font-bold leading-tight tracking-tight text-banda-text">
          {entry.name}
        </h1>
        <p className="m-0 font-sans leading-normal text-banda-text-muted">
          Base : <code>{entry.base}</code>
          {entry.note ? ` — ${entry.note}` : ''}
        </p>
      </div>
      {Demo ? (
        <div className="flex flex-col gap-6">
          <Demo />
        </div>
      ) : (
        <p className="m-0 font-sans leading-normal text-banda-text-muted">
          À venir — phase {entry.phase} du catalogue.
        </p>
      )}
    </div>
  );
}

export function CatalogPage() {
  const slug = useHashRoute();
  const current = slug ? CATALOG.find((entry) => entry.slug === slug) : undefined;
  const { theme, toggle } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Barre d'application — <header>/<nav> natifs (BandaNav arrivera en phase D). */}
      <header className="sticky top-0 z-sticky flex items-center gap-6 border-b border-banda-border bg-banda-surface px-6 py-3">
        <span className="font-sans text-lg font-bold text-banda-primary">Banda</span>
        <nav aria-label="Navigation principale" className="flex flex-1 gap-4">
          <a
            href="#/"
            aria-current={current ? undefined : 'page'}
            className={[
              'rounded-sm px-2 py-1 font-sans text-sm font-medium no-underline',
              'hover:bg-banda-surface-muted hover:text-banda-text',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
              current ? 'text-banda-text-muted' : 'text-banda-primary',
            ].join(' ')}
          >
            Composants
          </a>
        </nav>
        <BandaButton variant="ghost" size="sm" onClick={toggle}>
          {theme === 'dark' ? (
            <>
              <Sun size={16} aria-hidden="true" /> Mode clair
            </>
          ) : (
            <>
              <Moon size={16} aria-hidden="true" /> Mode sombre
            </>
          )}
        </BandaButton>
      </header>
      <div className="flex flex-1 items-stretch">
        {/* Latérale — <aside>/<nav> natifs. */}
        <aside className="w-64 shrink-0 border-r border-banda-border bg-banda-surface p-4">
          <nav aria-label="Navigation latérale">
            {CATEGORIES.map((category) => (
              <div key={category} className="mb-6">
                <span className="mb-2 block px-2 font-sans text-xs font-semibold uppercase tracking-wide text-banda-text-muted">
                  {category}
                </span>
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {CATALOG.filter((entry) => entry.category === category && entry.Demo).map(
                    (entry) => {
                      const active = current?.slug === entry.slug;
                      return (
                        <li key={entry.slug}>
                          <a
                            href={`#/c/${entry.slug}`}
                            aria-current={active ? 'page' : undefined}
                            className={[
                              'block rounded-md px-2 py-2 font-sans text-sm no-underline',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
                              active
                                ? 'bg-banda-primary-muted font-medium text-banda-primary'
                                : 'text-banda-text hover:bg-banda-surface-muted',
                            ].join(' ')}
                          >
                            {entry.name}
                          </a>
                        </li>
                      );
                    },
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <main className="max-w-5xl flex-1 p-8">
          {current ? <ComponentPage entry={current} /> : <CatalogIndex />}
        </main>
      </div>
    </div>
  );
}
