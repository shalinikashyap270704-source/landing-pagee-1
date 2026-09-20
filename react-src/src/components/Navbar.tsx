import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "bg-navy-950/85 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-7 py-4.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 font-mono text-sm">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L3 6v6c0 5.2 3.6 9.4 9 10 5.4-.6 9-4.8 9-10V6l-9-4z"
              stroke="#3fd8e0"
              strokeWidth="1.4"
            />
            <circle cx="12" cy="12" r="2.4" fill="#3fd8e0" />
          </svg>
          TRUST-VISION
        </div>
        <ul className="hidden md:flex gap-8 text-sm text-white/60">
          <li>
            <a href="#how" className="hover:text-white">
              How it works
            </a>
          </li>
          <li>
            <a href="#layers" className="hover:text-white">
              Protection layers
            </a>
          </li>
          <li>
            <a href="#score" className="hover:text-white">
              Trust score
            </a>
          </li>
        </ul>
        <a
          href="#layers"
          className="font-mono text-xs font-semibold bg-cyan text-navy-950 px-4 py-2 rounded-md"
        >
          Explore the Trust Layer →
        </a>
      </div>
    </nav>
  );
}
