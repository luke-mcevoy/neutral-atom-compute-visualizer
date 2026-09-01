import { useEffect, useState } from 'react';
import { CHAPTERS } from './chapters/pages.tsx';

export function App() {
  const [active, setActive] = useState(CHAPTERS[0]?.id ?? 'thesis');

  useEffect(() => {
    const nodes = CHAPTERS.map((ch) => document.getElementById(ch.id)).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (nodes.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '0px 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    );
    for (const node of nodes) io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const el = event.target;
      if (el instanceof HTMLElement) {
        const tag = el.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable) return;
      }
      const i = CHAPTERS.findIndex((ch) => ch.id === active);
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        const next = CHAPTERS[Math.min(CHAPTERS.length - 1, Math.max(0, i) + 1)];
        if (next) document.getElementById(next.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const prev = CHAPTERS[Math.max(0, i - 1)];
        if (prev) document.getElementById(prev.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div className="page">
      <header className="masthead">
        <p className="wordmark">
          nature<span>explainer</span>
        </p>
        <p className="mast-meta">
          <a href="https://doi.org/10.1038/s41586-025-09848-5">Article</a>
          <span>volume 649</span>
          <span>pages 39–46 (2026)</span>
        </p>
      </header>

      <aside className="provenance" role="note">
        <p className="provenance-kicker">Public paper only · No insider information</p>
        <p>
          This page is an unofficial explainer of a published article. Every number,
          claim, and figure is taken from Bluvstein, Geim et al., <em>Nature</em>{' '}
          <strong>649</strong>, 39–46 (2026) (
          <a href="https://doi.org/10.1038/s41586-025-09848-5">
            doi:10.1038/s41586-025-09848-5
          </a>
          ) or computed from a formula stated there. There is no insider information:
          nothing unpublished, nothing from private communication with the authors, and
          no laboratory access beyond the paper and its public supplement.
        </p>
      </aside>

      <div className="sheet">
        <nav className="toc" aria-label="Contents">
          <p className="toc-label">Contents</p>
          {CHAPTERS.map((ch) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className={active === ch.id ? 'active' : undefined}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {ch.title}
            </a>
          ))}
        </nav>

        <article className="article">
          <p className="journal-line">
            <em>Nature</em> <strong>649</strong>, 39–46 (2026)
          </p>
          <p className="article-kicker">Article | Open access</p>
          <h1>A fault-tolerant neutral-atom architecture for universal quantum computation</h1>
          <p className="authors">
            Dolev Bluvstein<sup>1,2</sup>, Alexandra A. Geim<sup>1</sup>, Sophie H. Li<sup>1</sup>, Simon J.
            Evered<sup>1</sup>, J. Pablo Bonilla Ataides<sup>1</sup> … &amp; Mikhail D. Lukin
            <sup>1</sup>
          </p>
          <p className="affil">
            <sup>1</sup>Department of Physics, Harvard University, Cambridge, MA, USA.{' '}
            <sup>2</sup>Present address as in the published article. Full author list and
            affiliations: Bluvstein, Geim et al., <em>Nature</em> <strong>649</strong>, 39–46 (2026).
          </p>
          <p className="dates">
            Published: 10 November 2025 · DOI:{' '}
            <a href="https://doi.org/10.1038/s41586-025-09848-5">10.1038/s41586-025-09848-5</a>
          </p>

          <aside className="cite-box">
            <h3>Cite this article</h3>
            <p>
              Bluvstein, D., Geim, A.A., Li, S.H. et al. A fault-tolerant neutral-atom architecture
              for universal quantum computation. <em>Nature</em> <strong>649</strong>, 39–46 (2026).
            </p>
          </aside>

          <section className="abstract">
            <h2>Abstract</h2>
            <p>
              Quantum error correction is essential for large-scale quantum computers, but
              operating on encoded logical qubits and assembling those operations into an
              efficient architecture remains an open experimental problem. This explainer walks
              through Bluvstein, Geim et al. (2026), who use reconfigurable arrays of up to 448{' '}
              <sup>87</sup>Rb atoms to implement the working pieces of a universal, fault-tolerant
              processor — and the atomic, optical, and thermodynamic physics those pieces rest on.
            </p>
          </section>

          {CHAPTERS.map((ch) => (
            <section key={ch.id} id={ch.id} className="sec">
              <h2>
                <span>{ch.num}</span>
                {ch.title}
              </h2>
              <p className="standfirst">{ch.kicker}</p>
              {ch.body}
            </section>
          ))}

          <footer className="article-foot">
            <p>
              Interactive explainer of Bluvstein, Geim et al. <em>Nature</em> <strong>649</strong>,
              39–46 (2026). DOI{' '}
              <a href="https://doi.org/10.1038/s41586-025-09848-5">10.1038/s41586-025-09848-5</a>.
              Not affiliated with Springer Nature. Dark theme; typography after the journal’s
              article pages.
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}
