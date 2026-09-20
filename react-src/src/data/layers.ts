export interface EvidenceRow {
  label: string;
  value: string;
}

export interface TrustLayer {
  num: string;
  key: string;
  color: string;
  title: string;
  description: string;
  chips: string[];
  evidence: EvidenceRow[];
  statusClass: "verified" | "review" | "flag";
}

export const LAYERS: TrustLayer[] = [
  {
    num: "01",
    key: "data",
    color: "#3fd8e0",
    title: "Data Integrity",
    description:
      "Before an AI model can be trusted, the data feeding it must be trustworthy. TRUST-VISION examines datasets for signs of manipulation, poisoning, inconsistencies and anomalous samples.",
    chips: [
      "Data poisoning detection",
      "Label inconsistency",
      "Duplicate detection",
      "Out-of-distribution samples",
      "Suspicious trigger patterns",
    ],
    evidence: [
      { label: "Sample ID", value: "DS-0147" },
      { label: "Finding", value: "ANOMALY DETECTED" },
      { label: "Confidence", value: "94.7%" },
      { label: "Evidence", value: "Distribution deviation" },
    ],
    statusClass: "flag",
  },
  {
    num: "02",
    key: "model",
    color: "#4c8dff",
    title: "Model Integrity",
    description:
      "TRUST-VISION verifies that the model being deployed is the model that was intended to be deployed.",
    chips: [
      "Model fingerprinting",
      "Cryptographic hash",
      "Artifact verification",
      "Behavioural analysis",
      "Backdoor indicators",
    ],
    evidence: [
      { label: "Model", value: "V3.4" },
      { label: "Hash (SHA-256)", value: "8F4A…C921" },
      { label: "Status", value: "✓ VERIFIED" },
    ],
    statusClass: "verified",
  },
  {
    num: "03",
    key: "inference",
    color: "#9b7cf0",
    title: "Inference Integrity",
    description:
      "Even an authentic model can behave unexpectedly. TRUST-VISION evaluates how the model behaves when it receives real inputs, comparing expected vs. observed behaviour.",
    chips: [
      "Behavioural anomalies",
      "Unexpected responses",
      "Distribution drift",
      "Suspicious outputs",
      "Trigger-like behaviour",
    ],
    evidence: [
      { label: "Input stream", value: "1,204 samples" },
      { label: "Expected", value: "Stable output band" },
      { label: "Observed", value: "1 outlier flagged" },
      { label: "Status", value: "REVIEW" },
    ],
    statusClass: "review",
  },
  {
    num: "04",
    key: "provenance",
    color: "#4c8dff",
    title: "Provenance & Lineage",
    description:
      "Trust also depends on knowing where an AI artifact came from, who created it, how it was transformed and where it was deployed.",
    chips: [
      "Contributor → Dataset",
      "Preprocessing",
      "Training",
      "Model",
      "Deployment",
      "Inference",
    ],
    evidence: [
      { label: "Signature", value: "VALID" },
      { label: "Hash", value: "VERIFIED" },
      { label: "Origin", value: "TRUSTED" },
    ],
    statusClass: "verified",
  },
  {
    num: "05",
    key: "evidence",
    color: "#f0b23f",
    title: "Evidence-Based Risk Fusion",
    description:
      "TRUST-VISION does not rely on a single signal. It combines integrity findings, behavioural analysis and provenance evidence to create an explainable risk assessment.",
    chips: [
      "Data signal",
      "Model signal",
      "Inference signal",
      "Provenance signal",
      "Risk fusion engine",
    ],
    evidence: [
      { label: "Fused score", value: "87 / 100" },
      { label: "Status", value: "REVIEW" },
      { label: "Note", value: "Conceptual demonstration" },
    ],
    statusClass: "review",
  },
  {
    num: "06",
    key: "human",
    color: "#3fe0a0",
    title: "Human-in-the-Loop Verification",
    description:
      "AI identifies suspicious behaviour, but critical trust decisions remain reviewable by humans. TRUST-VISION presents the evidence behind a finding so an authorized reviewer can validate it.",
    chips: [
      "AI detection",
      "Evidence packet",
      "Risk assessment",
      "Human review",
      "Final decision",
    ],
    evidence: [
      { label: "Reviewer", value: "Assigned" },
      { label: "Evidence packet", value: "6 linked artifacts" },
      { label: "Decision", value: "Pending review" },
    ],
    statusClass: "review",
  },
];
