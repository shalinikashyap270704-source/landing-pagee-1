import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TrustCore3D from "./TrustCore3D";
import { LAYERS } from "../data/layers";

const statusColor: Record<string, string> = {
  verified: "text-green",
  review: "text-amber",
  flag: "text-red",
};

export default function LayersSection() {
  const [active, setActive] = useState(0);
  const [pulse, setPulse] = useState(0);
  const layer = LAYERS[active];

  function select(i: number) {
    setActive(i);
    setPulse(performance.now() + 900);
  }

  return (
    <section id="layers" className="mx-auto max-w-6xl px-7 py-36">
      <div className="max-w-xl mb-14">
        <span className="font-mono text-xs uppercase tracking-wide text-white/40">
          Interactive multi-layer protection
        </span>
        <h2 className="mt-4 text-[clamp(28px,3.4vw,42px)] leading-tight">
          How does Trust-Vision protect an AI system?
        </h2>
        <p className="mt-4 text-white/60">
          Six independent layers of verification, wrapped around a single
          trust core. Select a layer to see what it checks and the evidence
          it produces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] rounded-2xl border border-white/10 overflow-hidden bg-navy-900/60 backdrop-blur">
        {/* left: 3D core + layer nav */}
        <div className="border-r border-white/10 lg:flex lg:flex-col">
          <div className="relative h-56 border-b border-white/10">
            <TrustCore3D activeLayer={active} pulse={pulse} className="absolute inset-0" />
          </div>
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible">
            {LAYERS.map((l, i) => (
              <button
                key={l.key}
                onClick={() => select(i)}
                className={`flex items-center gap-3 whitespace-nowrap px-5 py-4 text-left border-b lg:border-b border-white/10 transition
                  ${
                    i === active
                      ? "bg-cyan/[0.07] text-white shadow-[inset_3px_0_0_#3fd8e0]"
                      : "text-white/50 hover:text-white"
                  }`}
              >
                <span
                  className={`font-mono text-xs ${
                    i === active ? "text-cyan" : "text-white/30"
                  }`}
                >
                  {l.num}
                </span>
                <span className="text-sm font-medium">{l.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* right: description panel */}
        <div className="p-9 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={layer.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="font-mono text-xs uppercase tracking-wide"
                style={{ color: layer.color }}
              >
                {layer.num} — {layer.title}
              </div>
              <h3 className="mt-3 text-2xl text-white">{layer.title}</h3>
              <p className="mt-3 max-w-xl text-[15px] text-white/60">
                {layer.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {layer.chips.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-xs text-white/60 border border-white/15 rounded-md px-2.5 py-1.5"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-7 max-w-md rounded-lg border border-white/15 bg-white/[0.02] p-5 font-mono text-[13px] grid gap-2">
                {layer.evidence.map((row, idx) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-4 text-white/60"
                  >
                    <span>{row.label}</span>
                    <b
                      className={`font-medium text-white ${
                        idx === layer.evidence.length - 1
                          ? statusColor[layer.statusClass]
                          : ""
                      }`}
                    >
                      {row.value}
                    </b>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
