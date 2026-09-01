import type { ReactNode } from 'react';

export function Figure({
  n,
  title,
  caption,
  children,
}: {
  n: string;
  title: string;
  caption: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="nfig">
      <div className="nfig-grid">{children}</div>
      <figcaption>
        <strong>
          Fig. {n} | {title}.
        </strong>{' '}
        {caption}
      </figcaption>
    </figure>
  );
}

export function Panel({
  tag,
  title,
  children,
  wide,
}: {
  tag: string;
  title?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide === true ? 'npanel npanel-wide' : 'npanel'}>
      <span className="npanel-tag">{tag}</span>
      {title !== undefined ? <p className="npanel-title">{title}</p> : null}
      {children}
    </div>
  );
}
