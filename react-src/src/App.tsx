import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatIsSection from "./components/WhatIsSection";
import LayersSection from "./components/LayersSection";

export default function App() {
  return (
    <div className="relative min-h-screen bg-void">
      <Navbar />
      <Hero />
      <WhatIsSection />
      <LayersSection />

      {/*
        Extend here with the remaining sections from the brief, following the
        same pattern (a section component + TrustCore3D re-used with a
        different `activeLayer`/`pulse` prop, or its own small R3F scene):

          - AccuracyVsTrustSection   (scroll-driven black-box -> glass-box)
          - TrustLensSection         (draggable clip-path reveal)
          - AirGappedSection         (perimeter sphere, internal vs external)
          - ModelAgnosticSection     (orbiting model nodes -> pulled to core)
          - ThreatRevealSection      (scroll-sequenced anomaly badges)
          - EvidenceChainSection     (click-through investigation stepper)
          - TrustScoreSection        (animated 72 -> 81 -> 87 counter)
          - FinalConvergenceSection  (all signals converge into the core)
          - Footer
      */}
    </div>
  );
}
