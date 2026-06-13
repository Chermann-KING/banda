/**
 * Pagination de tableau : <nav> natif, boutons précédent/suivant,
 * fenêtre de pages avec ellipse, page courante en aria-current.
 */
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';

export interface TablePaginationProps {
  /** Page courante (1-indexée). */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PAGE_BUTTON =
  'flex h-8 min-w-8 items-center justify-center rounded-md px-2 font-sans text-sm text-banda-text ' +
  'transition-colors duration-fast hover:bg-banda-surface-muted ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring ' +
  'disabled:pointer-events-none disabled:opacity-50';

/** Fenêtre de 3 pages autour de la courante, bornée aux extrémités. */
function visiblePages(page: number, pageCount: number): number[] {
  const start = Math.max(1, Math.min(page - 1, pageCount - 2));
  return [start, start + 1, start + 2].filter((value) => value >= 1 && value <= pageCount);
}

export function TablePagination({ page, pageCount, onPageChange, className }: TablePaginationProps) {
  const pages = visiblePages(page, pageCount);
  const hasTrailingEllipsis = (pages[pages.length - 1] ?? pageCount) < pageCount;

  return (
    <nav
      aria-label="Pagination"
      className={['flex items-center justify-center gap-1 font-sans', className]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className={PAGE_BUTTON}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={14} aria-hidden="true" /> Précédent
      </button>
      {pages.map((value) => (
        <button
          key={value}
          type="button"
          aria-current={value === page ? 'page' : undefined}
          aria-label={`Page ${value}`}
          className={[
            PAGE_BUTTON,
            value === page ? 'border border-banda-border bg-banda-surface font-medium' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onPageChange(value)}
        >
          {value}
        </button>
      ))}
      {hasTrailingEllipsis ? (
        <span className="flex h-8 w-8 items-center justify-center text-banda-text-muted" aria-hidden="true">
          <Ellipsis size={14} />
        </span>
      ) : null}
      <button
        type="button"
        className={PAGE_BUTTON}
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Suivant <ChevronRight size={14} aria-hidden="true" />
      </button>
    </nav>
  );
}
