import React, { useState } from "react";
import { CompetitorData, CandidateProfile } from "../types";
import {
  Users2,
  Tv,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  DollarSign,
  Share2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface CompetitorComparisonProps {
  candidate: CandidateProfile;
  competitors: CompetitorData[];
  onTriggerDebateStrategy: (opponentName: string, weakness: string) => void;
}

export const CompetitorComparison: React.FC<CompetitorComparisonProps> = ({
  candidate,
  competitors = [],
  onTriggerDebateStrategy,
}) => {
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>(
    competitors[0]?.id || ""
  );

  const selectedCompetitor =
    competitors.find((c) => c.id === selectedCompetitorId) ||
    competitors[0] ||
    null;

  const strengths = selectedCompetitor?.strengths || [
    "Base eleitoral mobilizada e histórico partidário",
    "Capilaridade em redutos estratégicos",
  ];

  const weaknesses =
    selectedCompetitor?.weaknesses ||
    selectedCompetitor?.mainVulnerabilities || [
      "Dificuldade de expansão fora do seu nicho tradicional",
      "Tempo reduzido no Horário Eleitoral Gratuito",
    ];

  return (
    <div id="competitor-comparison-container" className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 uppercase tracking-wide">
              Inteligência Competitiva
            </span>
            <span className="text-xs text-slate-400">
              Benchmarking de Campanhas & Força Eleitoral
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#F2EFE6] mt-1">
            Comparativo de Concorrentes & Análise SWOT
          </h2>
          <p className="text-xs text-slate-300">
            Monitore intenção de voto, taxa de rejeição, tempo de rádio/TV e vulnerabilidades programáticas dos adversários.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {competitors.length} adversários mapeados na disputa
          </span>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Our Candidate Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#16304A] to-[#112233] border-2 border-[#D4A537] shadow-xl space-y-3 relative overflow-hidden">
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-[#D4A537] text-[#0B1B2B]">
            Nossa Campanha
          </div>

          <div>
            <span className="text-xs font-mono text-[#D4A537] font-bold">
              {candidate.party} • Nº {candidate.number}
            </span>
            <h3 className="text-base font-extrabold text-[#F2EFE6] leading-snug">
              {candidate.ballotName}
            </h3>
            <p className="text-[11px] text-slate-400">{candidate.role}</p>
          </div>

          <div className="space-y-2 pt-1 border-t border-[#1E3A5F]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Intenção de Voto:</span>
              <span className="font-extrabold text-base text-[#D4A537]">
                37.1%
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Taxa de Rejeição:</span>
              <span className="font-bold text-[#2E9C87]">18.4% (Baixa)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Tempo de TV/Rádio:</span>
              <span className="font-semibold text-white">2m 45s / dia</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Redes Sociais:</span>
              <span className="font-semibold text-white">350k seguidores</span>
            </div>
          </div>
        </div>

        {/* Competitor Cards */}
        {competitors.map((comp) => {
          const isSelected = selectedCompetitor?.id === comp.id;

          return (
            <div
              key={comp.id}
              onClick={() => setSelectedCompetitorId(comp.id)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                isSelected
                  ? "bg-[#16304A] border-rose-500/80 shadow-lg ring-1 ring-rose-500/50"
                  : "bg-[#112233] border-[#1E3A5F] hover:bg-[#16304A]/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    {comp.party}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0B1B2B] text-slate-400">
                    Oposição
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#F2EFE6] leading-snug">
                  {comp.name}
                </h3>
                <p className="text-[11px] text-slate-400">{comp.role || "Candidato"}</p>
              </div>

              <div className="space-y-2 pt-1 border-t border-[#1E3A5F]">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Intenção:</span>
                  <span className="font-bold text-slate-200">
                    {comp.estimatedVotePct}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Rejeição:</span>
                  <span className="font-bold text-rose-400">
                    {comp.rejectionPct ?? 25.0}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tempo TV/Rádio:</span>
                  <span className="text-slate-300">
                    {comp.tvTimeSecondsDaily ?? 30}s / dia
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Engajamento:</span>
                  <span className="text-slate-300">{comp.engagementRate ?? 4.0}%</span>
                </div>
              </div>

              <div className="text-[10px] text-center py-1 rounded bg-[#0B1B2B] text-slate-400 border border-[#1E3A5F]">
                {isSelected ? "Selecionado para Análise" : "Clique para inspecionar"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed SWOT Dossier on Selected Competitor */}
      {selectedCompetitor && (
        <div
          id="competitor-swot-card"
          className="p-5 md:p-6 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-xl space-y-5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1E3A5F] pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Dossiê Estratégico & Análise de Vulnerabilidades
              </span>
              <h3 className="text-xl font-bold text-[#F2EFE6]">
                {selectedCompetitor.name} ({selectedCompetitor.party})
              </h3>
              <p className="text-xs text-slate-300">
                Narrativa central do adversário: "
                <span className="italic text-amber-200">
                  {selectedCompetitor.mainNarrative || selectedCompetitor.counterStrategy || "Alternativa oposicionista"}
                </span>
                "
              </p>
            </div>

            {/* Rejection Alert Pill */}
            <div className="flex items-center gap-3 bg-[#0B1B2B] px-4 py-2 rounded-xl border border-rose-900/50">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Teto de Votos / Rejeição
                </span>
                <span className="text-base font-extrabold text-rose-400 font-mono">
                  {selectedCompetitor.rejectionPct ?? 25.0}% de Rejeição
                </span>
              </div>
            </div>
          </div>

          {/* SWOT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths / Pontos Fortes */}
            <div className="p-4 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E9C87] uppercase">
                <CheckCircle2 className="w-4 h-4" />
                Pontos Fortes do Adversário (O que neutralizar):
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2E9C87] mt-0.5">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses / Vulnerabilidades Legais */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase">
                <AlertCircle className="w-4 h-4" />
                Vulnerabilidades a Explorar em Debates (Ética TSE):
              </div>
              <ul className="space-y-1.5 text-xs text-rose-100">
                {weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5">•</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button: Formulate Debate Rebuttal with AI */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#16304A]/60 p-3.5 rounded-xl border border-[#1E3A5F]">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">Preparação para Sabatina / Debate:</span>{" "}
              Crie perguntas e réplicas contundentes para desarmar a narrativa de {selectedCompetitor.name}.
            </div>
            <button
              onClick={() =>
                onTriggerDebateStrategy(
                  selectedCompetitor.name,
                  weaknesses[0] || "Propostas genéricas"
                )
              }
              className="px-4 py-2 rounded-xl bg-[#D4A537] hover:bg-[#E5B648] text-[#0B1B2B] font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#D4A537]/20 shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gerar Confronto de Propostas</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
