import type { ReactNode } from 'react';
import { Assumption, Claim, Note } from '../components/Claim.tsx';
import { Eq, Sym } from '../components/Eq.tsx';
import { Defense, Primer } from '../components/Voice.tsx';
import { PAPER } from '../data/paper.ts';
import { AODShuttle } from '../viz/AODShuttle.tsx';
import { ArrayHero } from '../viz/ArrayHero.tsx';
import { CameraMeasurement } from '../viz/CameraMeasurement.tsx';
import { AtomLevels } from '../viz/AtomLevels.tsx';
import { BelowThreshold } from '../viz/BelowThreshold.tsx';
import { BlochDrive } from '../viz/BlochDrive.tsx';
import { BlockadeDynamics } from '../viz/BlockadeDynamics.tsx';
import { CodePrimer } from '../viz/CodePrimer.tsx';
import { MachineCycle } from '../viz/MachineCycle.tsx';
import { LogicAndMagic } from '../viz/LogicAndMagic.tsx';
import { Processor } from '../viz/Processor.tsx';
import { PulseRack } from '../viz/PulseRack.tsx';
import { QubitPrimer } from '../viz/QubitPrimer.tsx';
import { RamanStark } from '../viz/RamanStark.tsx';
import { RydbergBlockade } from '../viz/RydbergBlockade.tsx';
import { SLMHologram } from '../viz/SLMHologram.tsx';
import { SpinToPosition } from '../viz/SpinToPosition.tsx';
import { SurfaceCode } from '../viz/SurfaceCode.tsx';
import { TeleportEntropy } from '../viz/TeleportEntropy.tsx';

export type Chapter = {
  id: string;
  num: string;
  title: string;
  kicker: string;
  body: ReactNode;
};

export const CHAPTERS: Chapter[] = [
  {
    id: 'thesis',
    num: '00',
    title: 'The machine',
    kicker: 'A computer whose bits are individual atoms',
    body: (
      <>
        <Primer>
          <p className="lede">
            You already know what a computer is: a machine that holds a state, changes that state
            with reliable operations, and can run long enough to finish a calculation. This one
            does the same three things. The state is stored in the internal energy levels of
            rubidium atoms. The operations are pulses of laser light. The hard part — the reason
            this is a Nature paper and not a freshman lab — is that those energy levels are
            analog, fragile, and continuously leaking heat into the vacuum. The machine has to
            <em> throw entropy out </em> while it computes, or the calculation dissolves.
          </p>
          <p>
            The figures below are the argument, not decoration. Captions name what is drawn. The
            glowing fog is the valence electron of one atom, sampled from |ψ|². Amber cones are
            trap light.
          </p>
        </Primer>
        <ArrayHero />
        <div className="claim-row">
          <Claim value={PAPER.atoms} unit="atoms in the processor" source="Abstract" />
          <Claim value={`${PAPER.qec.belowThreshold}(${PAPER.qec.belowThresholdUnc})×`} unit="d=5 quieter than d=3" source="Fig. 2d, four QEC rounds" />
          <Claim value={PAPER.deep.layers} unit="reused circuit layers" source="Figs. 5–6" />
          <Claim value={PAPER.codes.maxLogicals} unit="logical qubits at once" source="Fig. 6h" />
        </div>
        <Defense>
          <p>
            The thesis, in the language of the committee: they ran a reconfigurable array of up to
            {` ${PAPER.atoms} `} {PAPER.species} atoms as a <em>logical</em> processor — not a
            bag of physical qubits — and demonstrated the pieces a universal fault-tolerant
            architecture actually needs. (1) Repeated surface-code correction, using detected atom
            loss as erasure information, is below threshold on a four-round circuit:
            {` ${PAPER.qec.belowThreshold}(${PAPER.qec.belowThresholdUnc})× `} lower error per
            round at distance 5 than at 3. (2) Transversal gates put logic on the data, so
            stabilizer measurements are entropy pumps and need only O(1) rounds per gate; lattice
            surgery puts the logic in the measurements and dies if those measurements are dirty.
            (3) Teleportation through a 3D colour code supplies a T and an H, which is how they
            get universality without violating Eastin–Knill, and the same teleportation leaves
            physical junk behind so a deep circuit can run at constant internal entropy.
          </p>
          <Note>
            Paper numbers carry a figure or Methods tag. Interactive sliders are labelled as toys.
          </Note>
        </Defense>
      </>
    ),
  },
  {
    id: 'qubit',
    num: '01',
    title: 'What a qubit is',
    kicker: 'Two energy levels, and a direction between them',
    body: (
      <>
        <Primer>
          <p>
            A classical bit is a switch: off or on. Physics already gave you a better object — any
            isolated two-level system. Call the lower level |0⟩ and the upper |1⟩. A general
            state is α|0⟩ + β|1⟩ with |α|² + |β|² = 1. That is one complex direction, which you
            can draw as a point on a sphere (the Bloch sphere). A <em>gate</em> is a rotation of
            that point. A <em>measurement</em> in the 0/1 basis collapses the point onto a pole
            and gives you a classical bit, with probabilities |α|² and |β|².
          </p>
          <p>
            Two qubits can be entangled: the joint state is not a product of two spheres. The
            cheapest useful entanglement is a controlled-Z (or CNOT): “if this one is 1, flip
            (or phase) that one.” Every algorithm in this paper is a recipe of single-qubit
            rotations and two-qubit phases, plus measurements.
          </p>
          <QubitPrimer />
          <p>
            Why not use a spin in a magnetic field and call it a day? Because a magnetic moment
            precesses at a rate proportional to B. Field noise is a random rotation — decoherence.
            The paper’s qubit is a <em>clock</em> transition: two states whose first-order Zeeman
            shifts cancel, so a few gauss of laboratory field does not smear the sphere.
          </p>
        </Primer>
        <BlochDrive />
        <Defense>
          <p>
            Encoding: 5S<sub>1/2</sub> hyperfine clock states, <Sym>m_F = 0</Sym>, splitting
            6.8 GHz, <Sym>T<sub>2</sub> &gt; 1 s</Sym> (Methods). Global Raman rotations at
            ~{PAPER.raman.globalRabiMHz} MHz (~{PAPER.raman.compositeUs} μs composite pulses);
            local Raman through a second AOD pair. Entangling gate: 270 ns Rydberg CZ.
            “Logical qubit” later means many of these physical qubits tied together by a code.
            Do not confuse the two.
          </p>
        </Defense>
      </>
    ),
  },
  {
    id: 'rubidium',
    num: '02',
    title: 'The atom',
    kicker: 'One nucleus, one valence electron, two useful sizes',
    body: (
      <>
        <Primer>
          <p>
            Rubidium-87 is an alkali: a closed shell plus one 5s electron. That electron is a
            standing wave around the nucleus — a probability cloud, not a planet. Start the board
            on <em>1. Ground atom</em>. Gold speck = nucleus. Blue fog = electron. Each dot is
            one Monte Carlo sample of |ψ|². Then open <em>4. Both, true scale</em>. The ground
            cloud collapses to a spark inside a much larger Rydberg cloud. Promoting the electron
            to n ≈ 53 makes the atom fat enough to feel its neighbour several microns away.
            That is the switch they use for entanglement.
          </p>
        </Primer>
        <AtomLevels />
        <Defense>
          <p>
            Nuclear spin <Sym>I = 3/2</Sym> splits 5S<sub>1/2</sub> into F = 1 and F = 2. The
            qubit is |F=1, m_F=0⟩ ↔ |F=2, m_F=0⟩. Finite field 8.6 G for pumping; clock
            states stay first-order quiet. Optical workhorse lines: D2 780.241 nm, D1 794.978 nm
            (standard values; the paper assumes them). The Rydberg climb is a different pair:
            420 nm + 1013 nm to n = {PAPER.rydberg.n}.
          </p>
          <Eq label="clock subspace">
            H/ℏ = (ω<sub>hfs</sub>/2) σ<sub>z</sub> + (1/2) Ω<sub>R</sub>(t) [cos φ σ<sub>x</sub> + sin φ σ<sub>y</sub>]
          </Eq>
          <Assumption>
            Hydrogenic 5s is a stand-in. Real Rb 5s has quantum defect n* ≈ 1.87 and is tighter.
            Computational subspace is the two clock states; other hyperfine levels are leakage.
            At 8.6 G they sit ~6 MHz away, comparable to the 4.6 MHz Rydberg Rabi frequency.
          </Assumption>
        </Defense>
      </>
    ),
  },
  {
    id: 'light',
    num: '03',
    title: 'Light as a Hamiltonian',
    kicker: 'Off-resonant light still pushes. That push is the whole toolbox.',
    body: (
      <>
        <Primer>
          <p>
            Shine light on an atom far from resonance and you do not absorb photons so much as
            you shift energies (the AC Stark effect) and, if you use two tones whose difference
            matches the clock splitting, you rotate the qubit (a Raman transition). Same
            second-order perturbation theory you used in atomic physics: amplitude to be in the
            excited state is Ω/2Δ, energy shift is Ω²/4Δ, scattering is Γ Ω²/4Δ². Red-detuned
            (Δ &lt; 0) makes a high-field-seeking potential — a trap. Two Raman legs with
            unequal Ω make a differential shift of |0⟩ versus |1⟩, which looks like an extra
            magnetic field along z.
          </p>
        </Primer>
        <RamanStark />
        <Eq label="far-detuned two-level estimates (sliders use ordinary frequencies; treat as toys for mechanism)">
          Ω<sub>eff</sub> = Ω<sub>1</sub>Ω<sub>2</sub> / 2Δ, &nbsp; δ<sub>AC</sub> = (Ω<sub>1</sub>² − Ω<sub>2</sub>²) / 4Δ, &nbsp; Γ<sub>sc</sub> = Γ Ω² / 4Δ²
        </Eq>
        <Defense>
          <p>
            Intermediate Raman detuning raised to {PAPER.raman.intermediateDetuningGHz} GHz so
            scattering falls as 1/Δ². Measured {PAPER.raman.scatteringPerPulse.toExponential(0)}
            per SCROFULOUS pulse. Global path plus local AOD path share a 6.8 GHz IQ reference.
            A separate Stark shift is the 1,529.49 nm shield: ~{PAPER.shield.powerW} W,
            ~{PAPER.shield.lightshiftGHz} GHz on 5P<sub>3/2</sub>, so imaging light 50 μm away
            does not talk to stored qubits. Ground-state polarizability ratio ~2×10<sup>−5</sup>.
            They knife-edge the Gaussian tail; stray 1,529 nm ruins imaging. The shield slider
            interpolates that one operating point; the paper’s spectrum has Autler–Townes
            structure the slider does not contain.
          </p>
        </Defense>
      </>
    ),
  },
  {
    id: 'rydberg',
    num: '04',
    title: 'How two atoms talk',
    kicker: 'A fat atom shifts its neighbour. That shift is a controlled-Z.',
    body: (
      <>
        <Primer>
          <p>
            Two ordinary 5s atoms a few microns apart barely notice each other. Promote one
            electron to a high-n Rydberg orbital and the atom becomes a large, polarizable dipole.
            Two such atoms interact with a van der Waals potential C<sub>6</sub>/R<sup>6</sup>.
            If that shift is larger than the driving Rabi frequency, the second atom cannot
            absorb the same laser — <em>blockade</em>. You do not need the electron clouds to
            overlap; you need the pair-state energy to miss the laser. A pulse that would give
            one isolated atom a 2π rotation then gives the pair a conditional phase: a CZ gate.
          </p>
        </Primer>
        <RydbergBlockade />
        <BlockadeDynamics />
        <Defense>
          <p>
            Time-optimal two-photon pulse, 270 ns, 420 + 1013 nm, 4.8 GHz red of the
            intermediate state, n = {PAPER.rydberg.n}. Nominal CZ 99.6%. Three leakages:
            loss (partner sees a dark atom, gate off); hyperfine leakage (6 MHz vs 4.6 MHz
            Ω); Rydberg-P leftovers (~0.07%, &gt;100 μs) that blockade later gates. Waiting
            100 μs instead of 4 μs between benchmarking pulses takes CZ from 99.3% to 99.5%.
            Surface-code motion already waits ~400 μs, so the avalanche converts to loss.
          </p>
          <Assumption>
            The slider’s C₆ = n¹¹ and “CZ phase” are a unitless toy. They are not 53S
            spectroscopy and not the 270 ns waveform.
          </Assumption>
        </Defense>
      </>
    ),
  },
  {
    id: 'slm',
    num: '05',
    title: 'How you hold a hundred atoms',
    kicker: 'A hologram is a chip. They reprint it every time the layout changes.',
    body: (
      <>
        <Primer>
          <p>
            A tightly focused red-detuned laser is an optical tweezer: the AC Stark shift is
            deeper at the focus, so the atom sits there. One tweezer, one atom. A hundred
            tweezers means a hundred foci. A spatial light modulator paints a phase pattern
            φ(x,y) on a single 852 nm beam; a lens Fourier-transforms that field; the foci
            appear in the focal plane. Click the |E|² map to add a trap. You are editing the
            hologram, not dragging atoms by hand.
          </p>
        </Primer>
        <SLMHologram />
        <Eq label="ideal phase-only Fourier construction">
          E(u,v) = Σ<sub>k</sub> exp[−i 2π (x<sub>k</sub>u + y<sub>k</sub>v)], &nbsp; φ = arg E, &nbsp; I<sub>f</sub> = |ℱ[e<sup>iφ</sup>]|²
        </Eq>
        <Defense>
          <p>
            Hamamatsu X13138-02, array on the zeroth order, entangling/storage depths set to
            half of readout/reservoir in the hologram target. Each new code layout is a new
            printed chip: SLM inhomogeneity showed up as cooling nonuniformity and echo
            failure. Holography is in the error budget.
          </p>
        </Defense>
      </>
    ),
  },
  {
    id: 'aod',
    num: '06',
    title: 'How you move them mid-circuit',
    kicker: 'A frequency is a position. A chirp is a trajectory.',
    body: (
      <>
        <Primer>
          <p>
            An acousto-optic deflector is a radio-driven diffraction grating. Tone frequency
            f sets deflection angle θ = λf / v. Two crossed AODs give a 2D grid of moving
            tweezers. The static SLM holds the furniture; the AOD picks atoms up and carries
            them to another room of the processor — including during the algorithm. That is
            why this architecture can do transversal gates: you physically interlace two
            blocks and fire one global pulse.
          </p>
        </Primer>
        <AODShuttle />
        <Defense>
          <p>
            AA DTSX-400 pair, 852 nm. Design rule: translate, do not compress; keep X and Y
            combs incommensurate so intermodulation beats miss trap frequencies. Surface-code
            storage is interlaced so block metric matches the entangling zone — hence 165 μm
            width, not “as small as possible.”
          </p>
        </Defense>
      </>
    ),
  },
  {
    id: 'control',
    num: '07',
    title: 'Who plays the lasers',
    kicker: 'Five waveform generators, one 6.8 GHz phase, memory as a depth limit',
    body: (
      <>
        <Primer>
          <p>
            Nothing here is a conventional CPU issuing “CNOT qubit 17.” The circuit is a
            multi-channel analog waveform: trap-move voltages, Rydberg envelopes, Raman
            I and Q, local-addressing tones. If those channels disagree by tens of
            nanoseconds, the gate is a different Hamiltonian. The “compiler” is a rack of
            arbitrary-waveform generators sharing one clock.
          </p>
        </Primer>
        <PulseRack />
        <Defense>
          <p>
            Five Spectrum AWGs, &lt;{PAPER.control.jitterNs} ns sync. Deep circuits
            {` ${PAPER.deep.circuitS} `} s. Moving / Rydberg / Raman-AOD loop one layer;
            Raman IQ cannot loop without breaking the 6.8 GHz phase, so they fill AWG
            memory — that, not lifetime, caps Fig. 6 at {PAPER.deep.layers} layers.
            A QEC round is 4.45 ms (2.57 ms of that is swapping ancillas). A teleportation
            layer is 41.9 ms, bottlenecked by desktop image analysis. The 4 ms Rabi cycle
            on 200 atoms is the speed-of-physics existence proof.
          </p>
        </Defense>
      </>
    ),
  },
  {
    id: 'zones',
    num: '08',
    title: 'Four rooms, one processor',
    kicker: 'Light that entangles must not light that images',
    body: (
      <>
        <Primer>
          <p>
            You cannot do everything to every atom at once. Rydberg light that performs a
            CZ will scramble atoms you meant to store. Imaging light that reads a bit will
            decohere neighbours. So the array is a floorplan: a room for gates, a room for
            memory, a room for measurement, a room of spare atoms. Parallel optics is the
            instruction set — every physical qubit in a logical block sees the same pulse.
          </p>
        </Primer>
        <Processor />
        <MachineCycle />
        <Defense>
          <p>
            Surface-code: 55 μm / 12-row readout, two traps per atom, six interlaced
            blocks, Rydberg tophats ~1% over 60 μm, 40 μm dark gap. Deep-circuit: 256
            atoms entangling on 8×16 over 175 μm; 128-atom readout; 196-atom reservoir;
            shield waist matched to 35 μm of storage. Loading 75% by D1 grey molasses,
            then AOD compaction. Fig. 6 ends when the reservoir empties — occupancy of
            the reservoir is tracked in software because imaging does not cover it.
          </p>
        </Defense>
      </>
    ),
  },
  {
    id: 'readout',
    num: '09',
    title: 'How you read a bit and keep the atom',
    kicker: 'Spin becomes a position. A camera counts photons. A hole becomes an erasure.',
    body: (
      <>
        <Primer>
          <p>
            A projective measurement is not a special opcode. It is an irreversible
            correlation with a large environment, then a classical record. Here the
            environment is the radiation field, and the record is a CMOS frame.
          </p>
          <p>
            The usual alkali trick destroys the atom: push one spin state out of the
            trap and photograph what remains. You learn 0 versus 1 and you have lost
            the qubit. This paper needs the atom back — for reuse, and because a
            missing atom is information (an erasure), not a random 0. So they do three
            things, in this order.
          </p>
          <p>
            <em>First, kill the superposition.</em> Optical pumping maps the clock
            states onto stretched states: |F=2, m<sub>F</sub>=0⟩ (|1⟩) is pumped
            σ<sub>−</sub> into |2,−2⟩; |F=1, m<sub>F</sub>=0⟩ (|0⟩) is transferred
            into |2,+2⟩. That step already chooses a world. The camera never sees a
            Bloch vector.
          </p>
          <p>
            <em>Second, turn that choice into a position.</em> A 795 nm lattice pins
            the bright stretched state. An AOD tweezer walks the dark one ~2 μm. The
            bit is now which well is occupied — or neither, if the atom is gone.
          </p>
          <p>
            <em>Third, photograph both wells.</em> 780 nm light — the same beams that
            cool — drives the cycling transition. The atom scatters. A 0.65-NA
            objective collects a geometric fraction (1 − cos θ)/2 of 4π onto a
            Hamamatsu ORCA-Quest, chosen for fast electronic readout. Software sums
            two regions of interest. Occupied / empty / both-empty is |0⟩ / |1⟩ /
            loss. Two spots 2 μm apart sit several Rayleigh lengths
            (0.61 λ/NA ≈ 0.73 μm) apart, so they do not merge.
          </p>
        </Primer>
        <SpinToPosition />
        <CameraMeasurement />
        <Eq label="geometric collection of an air objective, and the Rayleigh length on the camera">
          η = (1 − cos θ)/2, &nbsp; θ = arcsin(NA), &nbsp; d = 0.61 λ / NA
        </Eq>
        <Defense>
          <p>
            795 nm σ<sub>−</sub> lattice, 50–200 GHz blue of D1; |2,−2⟩ dark (this is
            |1⟩, and the AOD moves it), |2,+2⟩ bright and pinned (this is |0⟩),
            ~6 MHz light shift. Pump/Raman into those stretched states, 100 μs ramp,
            2 μm / 500 μs AOD walk, then a conventional fluorescence image.
            Imaging optics: 0.65-NA Special Optics objective onto {PAPER.imaging.camera}.{' '}
            {PAPER.lattice.bitFlipPct}({PAPER.lattice.bitFlipUnc})% bit-flip,{' '}
            {PAPER.lattice.lossPct}({PAPER.lattice.lossUnc})% loss; error lives on
            the dark state (0.87% vs 0.05%). Mid-circuit cooling: 1D PGC in finite B
            by detuning the two σ beams by twice the Zeeman splitting (rotating frame
            cancels B), then EIT ~80 MHz blue of F=2→F′=2. Re-pump: 24 Raman-assisted
            cycles. The 1,529 nm shield exists so this 780 nm light does not talk to
            stored qubits 50 μm away.
          </p>
          <Assumption>
            Photon counts on the camera board are a teaching Poisson model. The paper
            does not publish photoelectrons per frame. NA, λ, camera, 2 μm split, and
            the 0.46(4)% / 0.24(2)% errors are paper numbers. Collection η ignores
            coatings and quantum efficiency.
          </Assumption>
        </Defense>
      </>
    ),
  },
  {
    id: 'why-code',
    num: '10',
    title: 'Why one atom is not a computer',
    kicker: 'You cannot copy a qubit. You can hide it in a pattern.',
    body: (
      <>
        <Primer>
          <p>
            A physical qubit has an error rate of order 10<sup>−3</sup> per operation
            here. An algorithm you care about wants 10<sup>−10</sup> or worse. Classical
            computers copy bits and vote. The no-cloning theorem forbids that for
            unknown quantum states. The way out, discovered in the mid-1990s, is to
            store the information in the <em>correlations</em> among many physical
            qubits — an error-correcting code. You never ask “is atom 7 a 0?” You ask
            “do these four neighbours still agree on their parity?” That question is a
            <em>stabilizer</em> measurement: it extracts a syndrome bit and, if you
            designed it right, does not collapse the logical information.
          </p>
          <CodePrimer />
          <p>
            Distance d means it takes at least d single-atom mistakes to fake a logical
            flip. If the physical error probability p is below a threshold p_th, the
            logical error scales roughly as (p/p_th)<sup>(d+1)/2</sup> — making the
            block bigger makes the encoded bit quieter. “Below threshold” is the
            experimental sentence “d = 5 is quieter than d = 3 on this circuit.”
          </p>
        </Primer>
        <Defense>
          <p>
            Surface code: 2D lattice, X- and Z-type plaquettes, used in Figs. 1–3.
            Colour codes appear later for magic ({PAPER.codes.steane},{' '}
            {PAPER.codes.reedMuller}) and high-rate blocks ({PAPER.codes.tesseract}).
            Atom loss is an erasure if you detect it: a distance-d code corrects
            (d−1)/2 unknown Paulis but up to d−1 known-location erasures. They detect
            loss late (final readout) and the decoder enumerates when it could have
            happened.
          </p>
        </Defense>
      </>
    ),
  },
  {
    id: 'qec',
    num: '11',
    title: 'Below-threshold correction',
    kicker: 'A bigger code is quieter — if you tell the decoder which atoms vanished',
    body: (
      <>
        <Primer>
          <p>
            Look at the lattice. Each gold knot is one physical qubit. Crimson is a
            missing atom. If you pretend the hole was a 0, the neighbouring parity
            checks fight each other and flicker forever. If you multiply those checks
            into a “supercheck” around the hole, they commute again and you still have
            a syndrome. That is erasure-aware decoding, in one picture.
          </p>
        </Primer>
        <SurfaceCode />
        <BelowThreshold />
        <Defense>
          <p>
            Distance-5 data block, fresh ancilla block each round, up to five rounds.
            Hybrid decoder: delayed-erasure MLE (Stim model updated per shot, CMA-ES
            tuned) plus a net trained on 200 million {'{0,1,loss}'} shots, ensembled,
            fine-tuned, geometric-mean confidences 0.4 / 1. Result: 0.62(3)% LEPR at
            d=5 vs 1.33(4)% at d=3 — {PAPER.qec.belowThreshold}({PAPER.qec.belowThresholdUnc})×,
            no postselection. Loss+ML is a 1.73(13)× win over bare methods. No-loss
            shots fall toward ~0.1% LEPR (p³-ish; ~half the budget is loss). &gt;80%
            of leakage is atom loss. Global coherent injections Zeno-project; logical
            coherent piece is exponentially small in d. Detector histogram matches
            uncorrelated Pauli+loss Stim; no burst errors.
          </p>
          <Assumption>
            “Below threshold” is this four-round circuit, not a published p_th.
            Stim says the d=5/d=3 ratio can worsen ~15% at many rounds and ~10% with
            one transversal gate per round. The toy p<sup>(d+1)/2</sup> card is not
            Fig. 2d.
          </Assumption>
        </Defense>
      </>
    ),
  },
  {
    id: 'logic',
    num: '12',
    title: 'Doing logic on a coded bit',
    kicker: 'Either the data do the gate, or the measurements do',
    body: (
      <>
        <Primer>
          <p>
            You now have a quiet encoded bit. How do you entangle two of them? Two
            philosophies. <em>Transversal:</em> physically pair every data atom of
            block A with one of block B and fire one global CZ. The logic sits on the
            data. Later stabilizer checks only mop up the entropy that gate created.
            <em>Lattice surgery:</em> grow a seam of extra atoms between the blocks
            and measure a joint logical operator. The measurements <em>are</em> the
            gate. If those measurements are wrong, the logic is wrong — so textbooks
            demand d rounds. That is a different machine.
          </p>
        </Primer>
        <LogicAndMagic />
        <Eq label="logical error depends on entropy, not a single fidelity (Methods)">
          1 − F<sub>L</sub> ∝ [ (P<sub>det</sub> + N ΔP<sub>det</sub>)<sup>(d+1)/2</sup> ] / N
        </Eq>
        <Defense>
          <p>
            Injected ancilla measurement error kills surgery and barely touches
            transversal. Optimum ~3 transversal CNOTs per QEC round. Surgery at two
            rounds (less than d=5): 15.2(3)% Bell error vs 13.1% Stim; they use
            error detection to compensate. The Bloch / T-spacing graphic on that
            board is a cartoon of Solovay–Kitaev-style densification, not the
            paper’s reconstructed angles.
          </p>
        </Defense>
      </>
    ),
  },
  {
    id: 'universal',
    num: '13',
    title: 'Every rotation you might want',
    kicker: 'A theorem forbids a universal set of transversal unitaries. Measurement gets around it.',
    body: (
      <>
        <Primer>
          <p>
            The gates you can do “in parallel, atom by atom, without looking” are
            called transversal. If those already included every rotation, a slightly
            wrong physical pulse would be a slightly wrong logical pulse — unprotected.
            That is the Eastin–Knill theorem. The way out is to allow measurement.
            Some 3D codes have a transversal T (a 45° rotation). Prepare a block in
            |T⟩, entangle, measure, feed forward: you teleport a Hadamard. The set
            {' {H, T, CNOT} '} generates a dense subgroup of SU(2) — any single-qubit
            rotation to exponential accuracy with a sequence whose length grows only
            polylogarithmically in 1/ε (Solovay–Kitaev). You have a universal computer
            made of digital pieces.
          </p>
        </Primer>
        <Defense>
          <p>
            Reed–Muller {PAPER.codes.reedMuller}: extra plateau at 45° only if the
            block is properly entangled and stabilizer signs are +1. 2D codes revive
            at 90°; bare qubits at 180°. |T_L⟩ is an eigenstate of
            (X<sup>⊗n</sup> + Y<sup>⊗n</sup>)/√2 — magic requires in-block
            entanglement. Error-corrected CHSH: {PAPER.codes.chsh}, saturating
            Tsirelson. Circuit is a stripped 15-to-1 distillation (inner surface
            codes replaced by physical qubits). Without feedforward the teleport
            randomly synthesizes 2<sup>N−1</sup> angles; they reconstructed N ≤ 3
            in software. Fig. 4a is a global-phase sweep, not optical spectroscopy.
          </p>
        </Defense>
      </>
    ),
  },
  {
    id: 'entropy',
    num: '14',
    title: 'Running without heating up',
    kicker: 'Move the information. Leave the dirt on the atom you are about to reset.',
    body: (
      <>
        <Primer>
          <p>
            Every gate dumps heat: bit flips, leaked population, hotter motion,
            missing atoms. Stabilizer checks remove the digital part of that heat.
            The rest you can only fix by touching the atom — image, cool, refill,
            re-pump. If the algorithm itself teleports the logical state onto a
            fresh block, then measuring the old block is free: the calculation
            continues, the junk stays behind. That is a computer that can run
            indefinitely, limited by whether you still have spare atoms.
          </p>
        </Primer>
        <TeleportEntropy />
        <Defense>
          <p>
            Groups A/B alternate: encode A, entangle in space, transversal gate
            with B in time, measure B, store A, reinit B from the reservoir.
            32 Steane {PAPER.codes.steane} blocks, up to {PAPER.deep.layers} layers.
            Stabilizer error flat vs cycle. Logical cluster correlators persist;
            physical-error correlators die — until the reservoir empties.
            Same death of physical correlations on {PAPER.codes.tesseract}; in-block
            permutation CNOTs (relabelings) extend logical range. Up to{' '}
            {PAPER.codes.maxLogicals} d=4 logicals live at once. CNN decoder,
            window 3, &gt;100 M shots × 4 models. Pauli-frame feedforward is
            software.
          </p>
          <Assumption>
            Several Fig. 6 panels use confidence postselection (acceptance as low
            as 0.24% on a 2D-cluster cut) and truncate when filling fails. Constant
            entropy is for the internal state of surviving, accepted shots — not an
            unconditioned 27-layer logical fidelity.
          </Assumption>
        </Defense>
      </>
    ),
  },
  {
    id: 'outlook',
    num: '15',
    title: 'What would make it a computer',
    kicker: 'The Hamiltonians are the right ones. The constants are still too large.',
    body: (
      <>
        <Primer>
          <p>
            You have now seen the whole object. Atoms hold clock qubits. Light
            rotates them, traps them, and, for 270 ns at a time, entangles them.
            A hologram and a pair of deflectors are the memory and the data bus.
            A code hides each logical bit in a pattern. Measurement throws entropy
            out. Teleportation is both a useful gate and a reset. That is a
            computer, in the same sense a transistor array is a computer: the
            architecture exists. What remains is to make each physical operation
            quieter so the encoded bits reach algorithmically useful error rates.
          </p>
        </Primer>
        <Defense>
          <p>
            About 2× below the relevant thresholds today. Path they write down:
            Raman to 2.5 THz and 99.99%; movement loss 1% → 0.2%; vacuum 0.6% →
            &lt;0.01% at 4 ms; 4× Rydberg power (4.8→9.6 GHz, 270→135 ns) to
            ~0.15% CZ. That package is ~8× below threshold, where a few hundred
            qubits per block can reach ~10<sup>−10</sup>. Leftovers: stream
            waveforms instead of filling AWG memory; refill the reservoir
            continuously (a separate 3,000-atom apparatus already reloads). ML
            decoding is ~1 μs/shot on a GPU and not yet a scalable algorithm.
          </p>
          <p className="lede close">
            The physics required for a neutral-atom fault-tolerant computer is
            the physics that has been run. The rest is making the prefactors
            smaller.
          </p>
          <p className="cite">
            {PAPER.cite}. Open access, DOI {PAPER.doi}. Lukin, Vuletić, Greiner,
            Yelin, Cain, and the Harvard–MIT Center for Ultracold Atoms.
          </p>
        </Defense>
      </>
    ),
  },
];
