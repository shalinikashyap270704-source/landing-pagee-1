import { motion } from "framer-motion";
import TrustCore3D from "./TrustCore3D";

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <TrustCore3D
        activeLayer={-1}
        pulse={0}
        className="absolute inset-0 -z-10"
      />
      <div className="relative mx-auto max-w-6xl px-7">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#3fd8e0]" />
            AIR-GAPPED AI ASSURANCE
          </span>

          <h1 className="mt-6 text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-tight">
            <span className="block text-white">VERIFY THE AI.</span>
            <span className="block bg-gradient-to-r from-cyan via-ablue to-violet bg-clip-text text-transparent">
              TRUST THE DECISION.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-[17.5px] text-white/60">
            TRUST-VISION is an offline, model-agnostic AI assurance platform
            that verifies data integrity, model identity, inference behaviour
            and provenance — turning hidden AI risks into evidence-backed
            decisions.
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <a href="#layers" className="btn-primary">
              Explore the Trust Layer →
            </a>
            <a href="#how" className="btn-ghost">
              See how it works ↓
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-7 font-mono text-[12.5px] text-white/40">
            <div>
              <b className="block mb-1.5 text-xs tracking-wide text-white/60">
                DATA
              </b>
              <span className="text-green">✓ Verified</span>
            </div>
            <div>
              <b className="block mb-1.5 text-xs tracking-wide text-white/60">
                MODEL
              </b>
              <span className="text-green">✓ Verified</span>
            </div>
            <div>
              <b className="block mb-1.5 text-xs tracking-wide text-white/60">
                INFERENCE
              </b>
              <span className="text-amber">◌ Monitoring</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
