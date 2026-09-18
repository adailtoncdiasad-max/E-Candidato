import React from "react";
import { CandidateProfile } from "../types";
import { History, Users, Award, BookOpen, UserCheck, Calendar } from "lucide-react";

interface HistoricalDataProps {
  candidate: CandidateProfile;
  historicalElections: {
    year: number;
    role: string;
    party: string;
    totalVotes: number;
    pctValidVotes: number;
    result: string;
    turnoutPct: number;
  }[];
  demographics: {
    gender: { male: number; female: number };
    ageGroups: { label: string; pct: number }[];
    education: { label: string; pct: number }[];
    incomeRanges: { label: string; pct: number }[];
  };
}

export const HistoricalData: React.FC<HistoricalDataProps> = ({
  candidate,
  historicalElections,
  demographics,
}) => {
  return (
    <div id="historical-data-container" className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 uppercase tracking-wide">
              Repositório Oficial
            </span>
            <span className="text-xs text-slate-400">
              Dados Abertos do Tribunal Superior Eleitoral (TSE)
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#F2EFE6] mt-1">
            Histórico Eleitoral & Perfil Demográfico do Eleitorado
          </h2>
          <p className="text-xs text-slate-300">
            Evolução de votos nominais em eleições passadas e pirâmide demográfica do colégio eleitoral.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-[#0B1B2B] text-slate-300 border border-[#1E3A5F] font-mono">
            Circunscrição: {candidate.location}
          </span>
        </div>
      </div>

      {/* Candidate Past Elections Table */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
          <h3 className="text-base font-bold text-[#F2EFE6] flex items-center gap-2">
            <History className="w-4 h-4 text-[#D4A537]" />
            Desempenho de {candidate.ballotName} em Eleições Anteriores
          </h3>
          <span className="text-xs text-slate-400">Histórico de urnas TSE</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1E3A5F] text-slate-400">
                <th className="pb-2 font-bold">Ano</th>
                <th className="pb-2 font-bold">Cargo Disputado</th>
                <th className="pb-2 font-bold">Legenda</th>
                <th className="pb-2 font-bold">Votos Nominais</th>
                <th className="pb-2 font-bold">% dos Válidos</th>
                <th className="pb-2 font-bold">Comparecimento</th>
                <th className="pb-2 font-bold">Resultado TSE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3A5F]/60">
              {(historicalElections || []).map((elec, i) => (
                <tr key={i} className="hover:bg-[#16304A]/50 transition-colors">
                  <td className="py-3 font-bold text-[#D4A537] font-mono">{elec.year}</td>
                  <td className="py-3 text-slate-200 font-semibold">{elec.role}</td>
                  <td className="py-3 text-slate-400">{elec.party}</td>
                  <td className="py-3 font-mono font-bold text-white">
                    {elec.totalVotes.toLocaleString("pt-BR")}
                  </td>
                  <td className="py-3 font-mono text-[#2E9C87] font-bold">
                    {elec.pctValidVotes}%
                  </td>
                  <td className="py-3 text-slate-300">{elec.turnoutPct}%</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                      {elec.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demographics Breakdown (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gender Distribution */}
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Distribuição por Gênero
          </span>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Feminino</span>
                <span className="font-bold text-[#D4A537]">{demographics.gender.female}%</span>
              </div>
              <div className="w-full bg-[#0B1B2B] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#D4A537] h-full rounded-full"
                  style={{ width: `${demographics.gender.female}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Masculino</span>
                <span className="font-bold text-slate-300">{demographics.gender.male}%</span>
              </div>
              <div className="w-full bg-[#0B1B2B] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-slate-500 h-full rounded-full"
                  style={{ width: `${demographics.gender.male}%` }}
                />
              </div>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 block pt-1">
            Mulheres representam a maioria do eleitorado apto.
          </span>
        </div>

        {/* Age Groups */}
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Faixa Etária
          </span>
          <div className="space-y-1.5">
            {(demographics?.ageGroups || []).map((ag) => (
              <div key={ag.label} className="flex justify-between text-xs text-slate-300">
                <span className="text-[11px]">{ag.label}</span>
                <span className="font-mono font-bold text-[#2E9C87]">{ag.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education Level */}
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Escolaridade do Eleitor
          </span>
          <div className="space-y-1.5">
            {(demographics?.education || []).map((ed) => (
              <div key={ed.label} className="flex justify-between text-xs text-slate-300">
                <span className="text-[11px] truncate max-w-[140px]">{ed.label}</span>
                <span className="font-mono font-bold text-amber-300">{ed.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Income Brackets */}
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Faixa de Renda Domiciliar
          </span>
          <div className="space-y-1.5">
            {(demographics?.incomeRanges || []).map((inc) => (
              <div key={inc.label} className="flex justify-between text-xs text-slate-300">
                <span className="text-[11px]">{inc.label}</span>
                <span className="font-mono font-bold text-slate-200">{inc.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TSE Official Link Banner */}
      <div className="p-4 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">
            Fonte Primária: <strong>TSE Open Data CKAN API</strong> (Grupos: <em>/resultados</em> e <em>/eleitorado</em>).
          </span>
        </div>
        <a
          href="https://dadosabertos.tse.jus.br/dataset"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D4A537] hover:underline font-bold flex items-center gap-1"
        >
          Consultar Catálogo de Dados Abertos TSE
          <History className="w-3.5 h-3.5 ml-1" />
        </a>
      </div>
    </div>
  );
};
