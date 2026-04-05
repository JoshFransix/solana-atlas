"use client";

import { useCallback } from "react";
import { getTerm } from "@/lib/glossary";
import { useAtlasStore } from "@/lib/store";
import { categoryColor, CATEGORY_COLORS } from "@/lib/colors";

const CATEGORY_LABELS: Record<string, string> = {
  "core-protocol": "Core Protocol",
  "programming-model": "Programming Model",
  "token-ecosystem": "Token Ecosystem",
  defi: "DeFi",
  "zk-compression": "ZK Compression",
  infrastructure: "Infrastructure",
  security: "Security",
  "dev-tools": "Dev Tools",
  network: "Network",
  "blockchain-general": "Blockchain General",
  web3: "Web3",
  "programming-fundamentals": "Programming Fundamentals",
  "ai-ml": "AI / ML",
  "solana-ecosystem": "Solana Ecosystem",
};

export default function TermPanel() {
  const { selectedTerm, setSelectedTerm } = useAtlasStore();

  const handleClose = useCallback(() => setSelectedTerm(null), [setSelectedTerm]);

  const handleRelatedClick = useCallback(
    (id: string) => {
      const t = getTerm(id);
      if (t) setSelectedTerm(t);
    },
    [setSelectedTerm]
  );

  if (!selectedTerm) return null;

  const color = categoryColor(selectedTerm.category);

  return (
    <div
      className="
        absolute right-4 top-[64px] bottom-4 w-80
        flex flex-col rounded-xl border border-white/10
        bg-[#0a0a1a]/90 backdrop-blur-md overflow-hidden
        shadow-2xl
      "
      style={{ borderTopColor: color }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 p-4 pb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block h-2 w-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color }}>
              {CATEGORY_LABELS[selectedTerm.category] ?? selectedTerm.category}
            </span>
          </div>
          <h2 className="text-base font-semibold text-white leading-snug">
            {selectedTerm.term}
          </h2>
        </div>
        <button
          onClick={handleClose}
          className="mt-0.5 flex-shrink-0 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5 custom-scrollbar">
        {/* Definition */}
        {selectedTerm.definition ? (
          <p className="text-sm text-white/70 leading-relaxed">{selectedTerm.definition}</p>
        ) : (
          <p className="text-sm text-white/30 italic">No definition yet.</p>
        )}

        {/* Aliases */}
        {selectedTerm.aliases && selectedTerm.aliases.length > 0 && (
          <div>
            <h3 className="mb-1.5 text-[10px] uppercase tracking-widest text-white/30 font-medium">
              Also known as
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedTerm.aliases.map((alias: string) => (
                <span
                  key={alias}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60"
                >
                  {alias}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Terms */}
        {selectedTerm.related && selectedTerm.related.length > 0 && (
          <div>
            <h3 className="mb-2 text-[10px] uppercase tracking-widest text-white/30 font-medium">
              Related Terms
            </h3>
            <div className="flex flex-col gap-1">
              {selectedTerm.related.map((relId: string) => {
                const rel = getTerm(relId);
                if (!rel) return null;
                const relColor = categoryColor(rel.category);
                return (
                  <button
                    key={relId}
                    onClick={() => handleRelatedClick(relId)}
                    className="
                      flex items-center gap-2 rounded-lg border border-white/5
                      bg-white/5 px-3 py-2 text-left text-sm text-white/70
                      hover:border-white/15 hover:bg-white/10 hover:text-white
                      transition-all
                    "
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: relColor }}
                    />
                    <span className="truncate">{rel.term}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
