import type { ComponentPropsWithRef } from 'react';

function joinClasses(base: string, className?: string) {
  return [base, className].filter(Boolean).join(' ');
}

export type BandaCardProps = ComponentPropsWithRef<'article'>;

/**
 * Étend <article> natif — conteneur de contenu autonome, pattern composé :
 * BandaCard.Header / .Title / .Description / .Body / .Footer.
 */
export function BandaCard({ className, ...rest }: BandaCardProps) {
  return (
    <article
      className={joinClasses(
        'rounded-lg border border-banda-border bg-banda-surface text-banda-text shadow-sm',
        className,
      )}
      {...rest}
    />
  );
}

function CardHeader({ className, ...rest }: ComponentPropsWithRef<'header'>) {
  return <header className={joinClasses('flex flex-col gap-1.5 p-6', className)} {...rest} />;
}

function CardTitle({ className, ...rest }: ComponentPropsWithRef<'h3'>) {
  return (
    <h3
      className={joinClasses('m-0 font-sans text-lg font-semibold text-banda-text', className)}
      {...rest}
    />
  );
}

function CardDescription({ className, ...rest }: ComponentPropsWithRef<'p'>) {
  return (
    <p
      className={joinClasses('m-0 font-sans text-sm text-banda-text-muted', className)}
      {...rest}
    />
  );
}

function CardBody({ className, ...rest }: ComponentPropsWithRef<'div'>) {
  return <div className={joinClasses('px-6 pb-6', className)} {...rest} />;
}

function CardFooter({ className, ...rest }: ComponentPropsWithRef<'footer'>) {
  return (
    <footer className={joinClasses('flex items-center gap-2 px-6 pb-6', className)} {...rest} />
  );
}

/** Zone média pleine largeur (image, dégradé…) — arrondie en tête de carte. */
function CardMedia({ className, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={joinClasses('w-full overflow-hidden first:rounded-t-lg', className)} {...rest} />
  );
}

/* Pattern composé : BandaCard.Header / .Title / .Description / .Body / .Footer / .Media */
BandaCard.Header = CardHeader;
BandaCard.Title = CardTitle;
BandaCard.Description = CardDescription;
BandaCard.Body = CardBody;
BandaCard.Footer = CardFooter;
BandaCard.Media = CardMedia;
