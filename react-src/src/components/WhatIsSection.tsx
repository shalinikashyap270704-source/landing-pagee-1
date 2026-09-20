const PIPELINE = ["DATA", "MODEL", "INFERENCE", "PROVENANCE", "EVIDENCE"];

const VALUE = [
  { k: "What", v: "AI integrity & provenance assurance" },
  { k: "Why", v: "Model accuracy alone doesn't guarantee trust" },
  { k: "How", v: "Six layers of independent verification" },
  { k: "Why different", v: "Offline, air-gapped, model-agnostic, human-verifiable" },
];

export default function WhatIsSection() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-7 py-36">
      <div className="max-w-xl">
        <span className="font-mono text-xs uppercase tracking-wide text-white/40">
          What is Trust-Vision
        </span>
        <h2 className="mt-4 text-[clamp(28px,3.4vw,42px)] leading-tight">
          Accuracy tells you the model works. It doesn't tell you the AI
          system can be trusted.
        </h2>
        <p className="mt-4 text-white/60">
          TRUST-VISION acts as an independent assurance layer around existing
          AI systems. It examines the integrity of the data, verifies the
          identity and behaviour of the model, monitors inference behaviour,
          traces artifact provenance, correlates evidence and converts these
          signals into an explainable trust decision.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2.5 font-mono text-xs text-white/60">
        {PIPELINE.map((p, i) => (
          <span key={p} className="flex items-center gap-2.5">
            <span className="border border-white/15 rounded-md px-3 py-1.5 text-white">
              {p}
            </span>
            {i < PIPELINE.length - 1 && <span className="text-white/30">→</span>}
          </span>
        ))}
        <span className="text-white/30">→</span>
        <span className="border border-cyan/40 text-cyan rounded-md px-3 py-1.5">
          TRUSTED DECISION
        </span>
      </div>

      <div className="mt-11 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl border border-white/10 bg-white/10 overflow-hidden">
        {VALUE.map((cell) => (
          <div key={cell.k} className="bg-navy-900/80 p-6">
            <div className="font-mono text-[11px] uppercase tracking-wide text-white/40">
              {cell.k}
            </div>
            <div className="mt-2.5 text-[15px] text-white">{cell.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
