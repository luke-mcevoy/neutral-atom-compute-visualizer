# Neutral-atom compute visualizer

<p align="center">
  <img src="docs/hero.png" alt="Nature-styled explainer of Bluvstein, Geim et al., Nature 649, 39–46 (2026)" />
</p>

An interactive walkthrough of [Bluvstein, Geim et al., *Nature* **649**, 39–46 (2026)](https://doi.org/10.1038/s41586-025-09848-5) — the Harvard–MIT CUA experiment that ran a reconfigurable array of up to **448 ⁸⁷Rb atoms** as the working pieces of a universal, fault-tolerant processor.

You read it like a journal article. The figures move. Every displayed number is taken from the paper or computed from a formula stated there.

[Paper](https://www.nature.com/articles/s41586-025-09848-5) · [DOI 10.1038/s41586-025-09848-5](https://doi.org/10.1038/s41586-025-09848-5)

---

## Public paper only — no insider information

This is an **unofficial** explainer of a **published** article. It is not affiliated with Springer Nature or the authors.

- Every number, claim, and figure is from Bluvstein, Geim et al., *Nature* **649**, 39–46 (2026) or from a formula in that paper or its public supplement.
- There is **no insider information**: nothing unpublished, nothing from private communication with the authors, and no laboratory access beyond the paper.

---

## Demo

<p align="center">
  <img src="docs/array.png" alt="Optical-tweezer array of rubidium atoms" />
  <br />
  <em>A small array of trapped ⁸⁷Rb atoms. Amber cones are 852 nm tweezers; the fog is |ψ|².</em>
</p>

<p align="center">
  <img src="docs/atom.png" alt="Valence-electron probability cloud of rubidium" />
  <br />
  <em>The valence electron as a Monte Carlo sample of |ψ|², with the radial density r²R²(r).</em>
</p>

<p align="center">
  <img src="docs/rydberg.png" alt="Two Rydberg atoms and the blockade condition" />
  <br />
  <em>Rydberg blockade is a pair-state energy shift — not overlapping electron clouds.</em>
</p>

---

## What it is

A dark, Nature-styled article you can operate.

- **Two voices** in every section: a physics primer with no quantum-computing jargon, then what the paper actually measured.
- **Live figures** in the journal’s `Fig. n | title.` form: 3D |ψ|² clouds, Raman driving, Rydberg blockade, SLM holograms, AOD shuttling, surface-code patches.
- **Grounded claims**: 448 atoms, n = 53, 270 ns CZ, 2.14(13)× lower error at d = 5 than d = 3 on a four-round circuit — each tagged to a figure or Methods line.

Sixteen sections, from the atom to below-threshold correction:

The machine · What a qubit is · The atom · Light as a Hamiltonian · How two atoms talk · How you hold a hundred atoms · How you move them mid-circuit · Who plays the lasers · Four rooms, one processor · How you read a bit and keep the atom · Why one atom is not a computer · Below-threshold correction · Doing logic on a coded bit · Every rotation you might want · Running without heating up · What would make it a computer

---

## Run

```bash
git clone git@github.com:luke-mcevoy/neutral-atom-compute-visualizer.git
cd neutral-atom-compute-visualizer
npm install
npm run dev
```

Opens on [http://127.0.0.1:5200/](http://127.0.0.1:5200/). Arrow keys jump between sections. Drag to orbit the 3D boards.

---

## Cite the paper

Bluvstein, D., Geim, A.A., Li, S.H. et al. A fault-tolerant neutral-atom architecture for universal quantum computation. *Nature* **649**, 39–46 (2026). https://doi.org/10.1038/s41586-025-09848-5
