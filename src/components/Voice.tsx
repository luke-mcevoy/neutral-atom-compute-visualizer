import type { ReactNode } from 'react';

export function Primer({ children }: { children: ReactNode }) {
  return (
    <section className="voice primer">
      <p className="voice-label">Primer | Physics without the jargon</p>
      {children}
    </section>
  );
}

export function Defense({ children }: { children: ReactNode }) {
  return (
    <section className="voice defense-voice">
      <p className="voice-label">Results | What the paper measured</p>
      {children}
    </section>
  );
}
