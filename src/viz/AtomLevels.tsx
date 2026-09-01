import { useState } from 'react';
import { Figure, Panel } from '../components/Figure.tsx';
import { Slider } from '../components/Slider.tsx';
import { PAPER } from '../data/paper.ts';
import { meanRadiusNm, worldScale } from '../physics/orbitals.ts';
import { AtomCloud } from '../viz3d/AtomCloud.tsx';
import { ScaleBar } from '../viz3d/ScaleBar.tsx';
import { Stage3D } from '../viz3d/Stage3D.tsx';
import { LevelDiagram } from './plots/LevelDiagram.tsx';
import { RadialPlot } from './plots/RadialPlot.tsx';

type Mode = '5s' | '5p' | 'rydberg' | 'compare';

export function AtomLevels() {
  const [mode, setMode] = useState<Mode>('5s');
  const [n, setN] = useState<number>(PAPER.rydberg.n);
  const r5s = meanRadiusNm(5, 0);
  const rRyd = meanRadiusNm(n, 0);
  const ratio = rRyd / r5s;
  const compareScale = worldScale(n);
  const plotN = mode === '5p' ? 5 : mode === '5s' ? 5 : n;
  const plotL = mode === '5p' ? 1 : 0;
  const plotColor = mode === '5p' ? '#d4a24a' : mode === '5s' ? '#6ea8d4' : '#b08ad6';

  return (
    <div className="board">
      <div className="mode-row">
        {(['5s', '5p', 'rydberg', 'compare'] as const).map((id) => (
          <button key={id} type="button" className={mode === id ? 'active' : undefined} onClick={() => setMode(id)}>
            {id === '5s' ? '5s ground' : id === '5p' ? '5p' : id === 'rydberg' ? `Rydberg n=${n}` : 'same scale'}
          </button>
        ))}
      </div>
      {(mode === 'rydberg' || mode === 'compare') && (
        <Slider label="principal n" value={n} min={15} max={70} step={1} onChange={setN} />
      )}
      <Figure
        n="1"
        title="The valence electron of ⁸⁷Rb"
        caption={
          <>
            Hydrogenic stand-in (real 5s has quantum defect n* ≈ 1.87 and is tighter). Panel a is
            the level diagram a spectroscopist would draw; the active state is brighter. Panel b
            samples |ψ|² in 3D — each point is one draw of the electron’s position; the gold speck
            is the nucleus. Panel c is the radial probability r²R(r)² with ⟨r⟩ marked.{' '}
            {mode === 'compare'
              ? `Both orbitals share one world scale, so 5s is the spark at the origin (⟨r⟩ ratio ≈ ${ratio.toFixed(0)}×).`
              : `⟨r⟩(5s) ≈ ${r5s.toFixed(2)} nm; ⟨r⟩(n=${n}) ≈ ${rRyd.toFixed(0)} nm.`}{' '}
            For n &gt; 12 the nodal pattern is n = 12 and the radius scales as n².
          </>
        }
      >
        <Panel tag="a" title="Energy levels">
          <LevelDiagram mode={mode} n={n} />
        </Panel>
        <Panel tag="b" title="|ψ|²  (orbit to inspect)">
          <Stage3D camera={mode === '5s' || mode === '5p' ? [0, 1.1, 4.2] : [0, 2.2, 8]}>
            {mode === '5s' && (
              <>
                <AtomCloud n={5} l={0} color="#6ea8d4" count={22000} />
                <ScaleBar length={0.9} label={`${(r5s * 0.7).toFixed(1)} nm`} />
              </>
            )}
            {mode === '5p' && <AtomCloud n={5} l={1} color="#d4a24a" count={22000} />}
            {mode === 'rydberg' && (
              <>
                <AtomCloud n={n} l={0} color="#b08ad6" count={24000} size={0.04} opacity={0.75} />
                <ScaleBar length={1.1} label={`${(rRyd * 0.35).toFixed(0)} nm`} />
              </>
            )}
            {mode === 'compare' && (
              <>
                <AtomCloud n={n} l={0} color="#b08ad6" count={24000} size={0.04} opacity={0.65} scale={compareScale} />
                <AtomCloud n={5} l={0} color="#6ea8d4" count={8000} size={0.08} scale={compareScale} />
              </>
            )}
          </Stage3D>
        </Panel>
        <Panel tag="c" title={`Radial density, n=${plotN}, ℓ=${plotL}`} wide>
          <RadialPlot n={plotN} l={plotL} color={plotColor} />
        </Panel>
      </Figure>
    </div>
  );
}
