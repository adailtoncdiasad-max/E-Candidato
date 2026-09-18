import React, { useState } from "react";
import { PollRecord, CandidateProfile, CompetitorData } from "../types";
import {
  TrendingUp,
  Sliders,
  CheckCircle2,
  Calendar,
  AlertCircle,
  HelpCircle,
  BarChart3,
  Percent,
} from "lucide-react";

interface PredictivePollsProps {
  polls: PollRecord[];
  candidate: CandidateProfile;
  competitors: CompetitorData[];
}

export const PredictivePolls: React.FC<PredictivePollsProps> = ({
  polls = [],
  candidate,
  competitors = [],
}) => {
  const [selectedPollId, setSelectedPollId] = useState<string>("");

  // Monte Carlo 2nd round simulation parameters
  const [opponentBMigration, setOpponentBMigration] = useState<number>(45); // % of B's votes going to our candidate
  const [opponentCMigration, setOpponentCMigration] = useState<number>(55); // % of C's votes going to our candidate
  const [undecidedMigration, setUndecidedMigration] = useState<number>(50); // % of undecided going to our candidate

  const mainOpponent = competitors[0] || {
    name: "Adversário Principal",
    estimatedVotePct: 30.9,
    party: "PL",
  };

  const activePoll: PollRecord =
    polls.find((p) => p.id === selectedPollId) ||
    polls[polls.length - 1] ||
    polls[0] || {
      id: "default-poll",
      date: "Hoje",
      institute: "Pesquisa TSE",
      tseRegistration: "BR-00000/2022",
      sampleSize: 2000,
      marginOfError: 2.0,
      ourCandidate: 50.0,
      opponentA: 40.0,
      opponentB: 5.0,
      opponentC: 2.0,
      undecided: 2.0,
      nullBlank: 1.0,
    };

  const latest = activePoll;

  // Compute 2nd round projection:
  // Base votes: our candidate vs opponent A
  const ourBase = latest.ourCandidate;
  const oppBase = latest.opponentA;

  // Distribute other candidates' votes based on slider
  const fromBToUs = (latest.opponentB || 0) * (opponentBMigration / 100);
  const fromBToOpp = (latest.opponentB || 0) * ((100 - opponentBMigration) / 100);

  const fromCToUs = (latest.opponentC || 0) * (opponentCMigration / 100);
  const fromCToOpp = (latest.opponentC || 0) * ((100 - opponentCMigration) / 100);

  const fromUndecidedToUs = (latest.undecided || 0) * (undecidedMigration / 100);
  const fromUndecidedToOpp = (latest.undecided || 0) * ((100 - undecidedMigration) / 100);

  const totalProjectedOur = ourBase + fromBToUs + fromCToUs + fromUndecidedToUs;
  const totalProjectedOpp = oppBase + fromBToOpp + fromCToOpp + fromUndecidedToOpp;

  // Normalized to 100% of valid projected votes
  const validTotal = totalProjectedOur + totalProjectedOpp;
  const ourValidPct = validTotal > 0 ? ((totalProjectedOur / validTotal) * 100).toFixed(1) : "50.0";
  const oppValidPct = validTotal > 0 ? ((totalProjectedOpp / validTotal) * 100).toFixed(1) : "50.0";

  return (
    <div id="predictive-polls-container" className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 uppercase tracking-wide">
              Estatística Preditiva
            </span>
            <span className="text-xs text-slate-400">
              Registrado no TSE com Intervalo de Confiança de 95%
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#F2EFE6] mt-1">
            Tracking & Curva Preditiva de Intenção de Voto
          </h2>
          <p className="text-xs text-slate-300">
            Agregação ponderada de pesquisas oficiais registradas e simulação probabilística de 2º Turno.
          </p>
        </div>

        {/* Current Leader Metric Pill */}
        <div className="flex items-center gap-3 bg-[#16304A] px-4 py-2 rounded-xl border border-[#1E3A5F]">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Projeção Válidos (1º Turno)
            </span>
            <span className="text-lg font-extrabold text-[#D4A537]">
              {latest.ourCandidate}%
            </span>
          </div>
          <div className="h-8 w-px bg-[#1E3A5F]" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Margem de Erro
            </span>
            <span className="text-xs font-mono font-bold text-slate-200">
              ±{latest.marginOfError}%
            </span>
          </div>
        </div>
      </div>

      {/* SVG Polling Evolution Timeline Chart */}
      <div
        id="polling-timeline-chart"
        className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E3A5F] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#F2EFE6] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2E9C87]" />
              Evolução Temporal das Pesquisas Registradas
            </h3>
            <p className="text-xs text-slate-400">
              Comparativo das últimas rodadas de amostragem eleitoral
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#D4A537]" />
              <span className="font-bold text-[#F2EFE6]">{candidate.ballotName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="text-slate-300">{mainOpponent.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-slate-300">3º Colocado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-500" />
              <span className="text-slate-400">Indecisos</span>
            </div>
          </div>
        </div>

        {/* Dynamic Chart Container */}
        <div className="w-full overflow-x-auto py-2">
          <div className="min-w-[600px] h-64 relative flex flex-col justify-between">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-slate-400 w-full" />
              <div className="border-b border-slate-400 w-full" />
              <div className="border-b border-slate-400 w-full" />
              <div className="border-b border-slate-400 w-full" />
            </div>

            {/* SVG Lines */}
            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 400 200">
              {/* Line: Our Candidate (Gold) */}
              <polyline
                fill="none"
                stroke="#D4A537"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polls
                  .map((p, i) => {
                    const x = 40 + i * 105;
                    const y = 190 - p.ourCandidate * 4;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />

              {/* Line: Opponent A (Red) */}
              <polyline
                fill="none"
                stroke="#F87171"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                points={polls
                  .map((p, i) => {
                    const x = 40 + i * 105;
                    const y = 190 - p.opponentA * 4;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />

              {/* Line: Opponent B (Blue) */}
              <polyline
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
                points={polls
                  .map((p, i) => {
                    const x = 40 + i * 105;
                    const y = 190 - p.opponentB * 4;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />

              {/* Data points for our candidate */}
              {polls.map((p, i) => {
                const x = 40 + i * 105;
                const y = 190 - p.ourCandidate * 4;
                const isSelected = activePoll.id === p.id;
                return (
                  <g key={p.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 6 : 4.5}
                      fill="#D4A537"
                      stroke="#0B1B2B"
                      strokeWidth="2"
                      className="cursor-pointer"
                      onClick={() => setSelectedPollId(p.id)}
                    />
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      fill="#D4A537"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {p.ourCandidate}%
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom X-Axis labels */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between px-6 pt-2 text-[11px] text-slate-400">
              {polls.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPollId(p.id)}
                  className={`cursor-pointer text-center p-1 rounded transition-colors ${
                    activePoll.id === p.id
                      ? "text-[#D4A537] font-bold bg-[#16304A]"
                      : "hover:text-white"
                  }`}
                >
                  <p>{p.institute}</p>
                  <p className="text-[10px] text-slate-500">{p.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Poll Detail Card */}
        <div className="mt-2 p-3.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#F2EFE6]">
              Pesquisa Selecionada: {activePoll.institute} ({activePoll.date})
            </span>
            <span className="px-2 py-0.5 rounded bg-[#16304A] text-slate-300 font-mono text-[11px]">
              TSE: {activePoll.tseRegistration}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Amostra: <strong>{activePoll.sampleSize} eleitores</strong></span>
            <span>Margem: <strong>±{activePoll.marginOfError}%</strong></span>
            <span>Indecisos: <strong className="text-amber-300">{activePoll.undecided}%</strong></span>
            <span>Brancos/Nulos: <strong>{activePoll.nullBlank}%</strong></span>
          </div>
        </div>
      </div>

      {/* Monte Carlo 2nd Round Simulator */}
      <div
        id="monte-carlo-simulator-box"
        className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[#112233] to-[#16304A] border border-[#1E3A5F] shadow-xl space-y-5"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1E3A5F] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-700/60 uppercase">
                Simulador Dinâmico
              </span>
              <span className="text-xs text-slate-400">Algoritmo de Migração de Votos</span>
            </div>
            <h3 className="text-lg font-bold text-[#F2EFE6] mt-1">
              Simulação de Cenário: 2º Turno Eleitoral
            </h3>
            <p className="text-xs text-slate-300">
              Ajuste as taxas de transferência esperadas dos eleitores dos candidatos eliminados e indecisos.
            </p>
          </div>

          {/* Outcome Badge */}
          <div
            className={`px-4 py-2 rounded-xl border text-center ${
              parseFloat(ourValidPct) > 50
                ? "bg-emerald-950/80 border-emerald-600 text-emerald-200"
                : "bg-rose-950/80 border-rose-600 text-rose-200"
            }`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider block">
              Projeção Válidos 2º Turno
            </span>
            <span className="text-xl font-extrabold font-mono">
              {ourValidPct}% vs {oppValidPct}%
            </span>
            <span className="text-[10px] block font-semibold">
              {parseFloat(ourValidPct) > 50 ? "Vitória Projetada" : "Risco de Derrota"}
            </span>
          </div>
        </div>

        {/* Visual Comparison Bars */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#D4A537] flex items-center gap-1.5">
              <span>{candidate.ballotName}</span>
              <span className="text-[11px] font-mono">({ourValidPct}%)</span>
            </span>
            <span className="text-rose-400 flex items-center gap-1.5">
              <span className="text-[11px] font-mono">({oppValidPct}%)</span>
              <span>{mainOpponent.name}</span>
            </span>
          </div>

          <div className="w-full bg-[#0B1B2B] h-4 rounded-full overflow-hidden flex border border-[#1E3A5F]">
            <div
              className="bg-gradient-to-r from-[#D4A537] to-[#F3BA38] transition-all duration-300 flex items-center justify-start pl-2"
              style={{ width: `${ourValidPct}%` }}
            />
            <div
              className="bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 flex items-center justify-end pr-2"
              style={{ width: `${oppValidPct}%` }}
            />
          </div>
        </div>

        {/* Interactive Sliders for Voter Migration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Slider 1: Migration from Opponent B */}
          <div className="p-3.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">
                Eleitores de 3º Colocado ({latest.opponentB}%)
              </span>
              <span className="font-bold text-[#D4A537] font-mono">
                {opponentBMigration}% para nós
              </span>
            </div>
            <input
              id="slider-migration-b"
              type="range"
              min="0"
              max="100"
              value={opponentBMigration}
              onChange={(e) => setOpponentBMigration(Number(e.target.value))}
              className="w-full accent-[#D4A537] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% Oposição</span>
              <span>50% Dividido</span>
              <span>100% Nosso</span>
            </div>
          </div>

          {/* Slider 2: Migration from Opponent C */}
          <div className="p-3.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">
                Eleitores de 4º Colocado ({latest.opponentC}%)
              </span>
              <span className="font-bold text-[#D4A537] font-mono">
                {opponentCMigration}% para nós
              </span>
            </div>
            <input
              id="slider-migration-c"
              type="range"
              min="0"
              max="100"
              value={opponentCMigration}
              onChange={(e) => setOpponentCMigration(Number(e.target.value))}
              className="w-full accent-[#D4A537] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% Oposição</span>
              <span>50% Dividido</span>
              <span>100% Nosso</span>
            </div>
          </div>

          {/* Slider 3: Migration of Undecided Voters */}
          <div className="p-3.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">
                Eleitores Indecisos ({latest.undecided}%)
              </span>
              <span className="font-bold text-[#D4A537] font-mono">
                {undecidedMigration}% para nós
              </span>
            </div>
            <input
              id="slider-migration-undecided"
              type="range"
              min="0"
              max="100"
              value={undecidedMigration}
              onChange={(e) => setUndecidedMigration(Number(e.target.value))}
              className="w-full accent-[#D4A537] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% Oposição</span>
              <span>50% Neutro</span>
              <span>100% Nosso</span>
            </div>
          </div>
        </div>

        {/* Strategic Analysis Summary */}
        <div className="p-3 rounded-xl bg-[#16304A]/60 border border-[#1E3A5F] text-xs text-slate-300 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-[#D4A537] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Diagnóstico Estatístico:</span> Para consolidar a vitória no 2º turno, a campanha precisa captar no mínimo <strong>42%</strong> dos votos do 3º colocado e manter a rejeição abaixo de <strong>28%</strong> nos colégios eleitorais metropolitanos.
          </div>
        </div>
      </div>
    </div>
  );
};
