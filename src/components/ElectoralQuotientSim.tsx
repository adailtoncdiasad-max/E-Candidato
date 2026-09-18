import React, { useState } from "react";
import { CandidateProfile } from "../types";
import {
  Calculator,
  Scale,
  Award,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

interface ElectoralQuotientSimProps {
  candidate: CandidateProfile;
}

export const ElectoralQuotientSim: React.FC<ElectoralQuotientSimProps> = ({
  candidate,
}) => {
  // Configurable inputs for proportional election (Base Oficial TSE Bahia)
  const [totalValidVotes, setTotalValidVotes] = useState<number>(
    candidate.sphere === "Municipal"
      ? 1280000 // Total votos válidos Salvador 2024
      : candidate.sphere === "Estadual"
      ? 7840000 // Total votos válidos ALBA Bahia 2022
      : 7720000 // Total votos válidos Bancada Federal BA
  );
  const [totalSeats, setTotalSeats] = useState<number>(
    candidate.sphere === "Municipal"
      ? 43 // 43 vereadores em Salvador
      : candidate.sphere === "Estadual"
      ? 63 // 63 deputados na ALBA
      : 39 // 39 deputados federais da Bahia
  );
  const [partyVotes, setPartyVotes] = useState<number>(
    candidate.sphere === "Municipal"
      ? 125000
      : candidate.sphere === "Estadual"
      ? 480000
      : 620000
  );
  const [candidateVotes, setCandidateVotes] = useState<number>(
    candidate.sphere === "Municipal"
      ? 32500
      : candidate.sphere === "Estadual"
      ? 95000
      : 145000
  );

  const setBahiaPreset = (type: "salvador" | "alba" | "federal" | "feira" | "brasil") => {
    if (type === "salvador") {
      setTotalValidVotes(1280000);
      setTotalSeats(43);
      setPartyVotes(135000);
      setCandidateVotes(32500);
    } else if (type === "alba") {
      setTotalValidVotes(7840000);
      setTotalSeats(63);
      setPartyVotes(480000);
      setCandidateVotes(95000);
    } else if (type === "federal") {
      setTotalValidVotes(7720000);
      setTotalSeats(39);
      setPartyVotes(620000);
      setCandidateVotes(145000);
    } else if (type === "feira") {
      setTotalValidVotes(315000);
      setTotalSeats(21);
      setPartyVotes(45000);
      setCandidateVotes(16000);
    } else if (type === "brasil") {
      setTotalValidVotes(109500000);
      setTotalSeats(513);
      setPartyVotes(13500000);
      setCandidateVotes(350000);
    }
  };

  // Math: Quociente Eleitoral (QE)
  const qe = Math.round(totalValidVotes / Math.max(1, totalSeats));

  // Math: Quociente Partidário (QP) = vagas diretas
  const qp = Math.floor(partyVotes / Math.max(1, qe));

  // Cláusula de Desempenho Individual (10% do QE)
  const barrier10Pct = Math.round(qe * 0.1);

  // Cláusula de Sobras (80% QE para legenda, 20% QE para candidato)
  const party80Pct = Math.round(qe * 0.8);
  const candidate20Pct = Math.round(qe * 0.2);

  const qualifiesDirect = candidateVotes >= barrier10Pct && qp > 0;
  const qualifiesSobras =
    partyVotes >= party80Pct && candidateVotes >= candidate20Pct;

  return (
    <div id="electoral-quotient-sim-container" className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-700/60 uppercase">
              Cálculo Oficial TSE Bahia
            </span>
            <span className="text-xs text-slate-400">
              Art. 106 a 109 do Código Eleitoral & Res. TSE 23.677
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#F2EFE6] mt-1">
            Simulador de Quociente Eleitoral & Distribuição de Sobras
          </h2>
          <p className="text-xs text-slate-300">
            Calcule o número de cadeiras diretas (QP), a cláusula de barreira individual (10%) e as sobras eleitorais (80/20) com parâmetros oficiais da Bahia.
          </p>
        </div>

        {/* QE Indicator Pill */}
        <div className="flex items-center gap-3 bg-[#16304A] px-4 py-2 rounded-xl border border-[#1E3A5F]">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Quociente Eleitoral (QE)
            </span>
            <span className="text-lg font-extrabold text-[#D4A537] font-mono">
              {qe.toLocaleString("pt-BR")} votos
            </span>
          </div>
        </div>
      </div>

      {/* Bahia Quick Presets Toolbar */}
      <div className="p-3 bg-[#0B1B2B] rounded-xl border border-[#1E3A5F] flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#D4A537] font-bold">Cenários Reais da Bahia:</span>
        <button
          type="button"
          onClick={() => setBahiaPreset("salvador")}
          className="px-3 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[11px] font-semibold text-slate-200 border border-[#1E3A5F]"
        >
          Câmara Salvador (43 Vagas • QE ~ 29.767)
        </button>
        <button
          type="button"
          onClick={() => setBahiaPreset("alba")}
          className="px-3 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[11px] font-semibold text-slate-200 border border-[#1E3A5F]"
        >
          ALBA Bahia (63 Vagas • QE ~ 124.444)
        </button>
        <button
          type="button"
          onClick={() => setBahiaPreset("brasil")}
          className="px-3 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[11px] font-semibold text-[#D4A537] border border-[#D4A537]/40"
        >
          Câmara dos Deputados (513 Vagas • Brasil)
        </button>
        <button
          type="button"
          onClick={() => setBahiaPreset("federal")}
          className="px-3 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[11px] font-semibold text-slate-200 border border-[#1E3A5F]"
        >
          Bancada Bahia (39 Vagas • QE ~ 197.948)
        </button>
        <button
          type="button"
          onClick={() => setBahiaPreset("feira")}
          className="px-3 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[11px] font-semibold text-slate-200 border border-[#1E3A5F]"
        >
          Câmara Feira de Santana (21 Vagas • QE ~ 15.000)
        </button>
      </div>

      {/* Main Grid: Live Calculator Inputs (Left) & Legal Verdict (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 cols: Sliders / Numeric Inputs */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
            <h3 className="text-sm font-bold text-[#F2EFE6] flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#D4A537]" />
              Parâmetros da Eleição Proporcional
            </h3>
            <span className="text-xs text-slate-400">Ajuste os valores</span>
          </div>

          {/* Input 1: Votos Válidos Totais */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">
                Total de Votos Válidos no Colégio Eleitoral:
              </label>
              <span className="font-mono font-bold text-[#D4A537]">
                {totalValidVotes.toLocaleString("pt-BR")}
              </span>
            </div>
            <input
              type="number"
              value={totalValidVotes}
              onChange={(e) => setTotalValidVotes(Math.max(1, Number(e.target.value)))}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs font-mono text-white focus:outline-none focus:border-[#D4A537]"
            />
          </div>

          {/* Input 2: Total de Cadeiras em Disputa */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">
                Número Total de Cadeiras em Disputa (Vagas):
              </label>
              <span className="font-mono font-bold text-[#D4A537]">
                {totalSeats} vagas
              </span>
            </div>
            <input
              type="number"
              value={totalSeats}
              onChange={(e) => setTotalSeats(Math.max(1, Number(e.target.value)))}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs font-mono text-white focus:outline-none focus:border-[#D4A537]"
            />
          </div>

          {/* Input 3: Votos da Legenda / Federação */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">
                Votação Total da nossa Legenda / Federação:
              </label>
              <span className="font-mono font-bold text-[#2E9C87]">
                {partyVotes.toLocaleString("pt-BR")} votos
              </span>
            </div>
            <input
              type="number"
              value={partyVotes}
              onChange={(e) => setPartyVotes(Math.max(0, Number(e.target.value)))}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs font-mono text-white focus:outline-none focus:border-[#D4A537]"
            />
          </div>

          {/* Input 4: Votos Nominais do Candidato */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">
                Votos Nominais Estimados de {candidate.ballotName}:
              </label>
              <span className="font-mono font-bold text-[#D4A537]">
                {candidateVotes.toLocaleString("pt-BR")} votos
              </span>
            </div>
            <input
              type="number"
              value={candidateVotes}
              onChange={(e) => setCandidateVotes(Math.max(0, Number(e.target.value)))}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs font-mono text-white focus:outline-none focus:border-[#D4A537]"
            />
          </div>
        </div>

        {/* Right 6 cols: Legal Breakdown & Status */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#1E3A5F] pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F2EFE6] flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#D4A537]" />
                Resultado da Simulação do Sistema Proporcional
              </h3>
              <span className="text-xs font-mono text-slate-400">
                QP = {qp} vagas
              </span>
            </div>

            {/* Verdict Box */}
            <div
              className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                qualifiesDirect
                  ? "bg-emerald-950/40 border-emerald-500 text-emerald-100"
                  : qualifiesSobras
                  ? "bg-amber-950/40 border-amber-500 text-amber-100"
                  : "bg-rose-950/40 border-rose-500 text-rose-100"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {qualifiesDirect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Eleição Direta Projetada pelo Quociente Partidário!</span>
                  </>
                ) : qualifiesSobras ? (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Disputa de Sobras Eleitorais (Critério 80/20 do TSE)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>Abaixo da Cláusula de Barreira ou sem vagas na Legenda</span>
                  </>
                )}
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed">
                {qualifiesDirect
                  ? `Sua federação conquista ${qp} vaga(s) direta(s). Sua votação nominal de ${candidateVotes.toLocaleString(
                      "pt-BR"
                    )} votos supera com folga a exigência mínima de 10% do QE (${barrier10Pct.toLocaleString(
                      "pt-BR"
                    )}).`
                  : qualifiesSobras
                  ? `Sua federação atinge ${partyVotes.toLocaleString(
                      "pt-BR"
                    )} votos (supera 80% do QE: ${party80Pct.toLocaleString(
                      "pt-BR"
                    )}), e você atinge a cláusula de 20% nominal (${candidate20Pct.toLocaleString(
                      "pt-BR"
                    )}). Você disputa a sobra das vagas remanescentes!`
                  : `Para se habilitar, o candidato precisa de no mínimo ${candidate20Pct.toLocaleString(
                      "pt-BR"
                    )} votos nominais (20% do QE) e a legenda atingir ${party80Pct.toLocaleString(
                      "pt-BR"
                    )} votos.`}
              </p>
            </div>

            {/* Criteria Checklist */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] flex justify-between items-center">
                <span className="text-slate-300">
                  Cadeiras Diretas Conquistadas (QP):
                </span>
                <span className="font-mono font-bold text-lg text-[#D4A537]">
                  {qp} {qp === 1 ? "cadeira" : "cadeiras"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] flex justify-between items-center">
                <span className="text-slate-300">
                  Cláusula 10% do QE (Votação Nominal Mínima):
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {barrier10Pct.toLocaleString("pt-BR")} votos
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] flex justify-between items-center">
                <span className="text-slate-300">
                  Exigência de 80% do QE pela Legenda (Sobras):
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {party80Pct.toLocaleString("pt-BR")} votos
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] flex justify-between items-center">
                <span className="text-slate-300">
                  Exigência de 20% do QE pelo Candidato (Sobras):
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {candidate20Pct.toLocaleString("pt-BR")} votos
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#16304A]/60 border border-[#1E3A5F] text-[11px] text-slate-400">
            A Lei nº 14.211/2021 estabeleceu que apenas os partidos que obtiverem ao menos 80% do QE e os candidatos que tenham obtido votos em número igual ou superior a 20% do QE participam da distribuição das sobras.
          </div>
        </div>
      </div>
    </div>
  );
};
