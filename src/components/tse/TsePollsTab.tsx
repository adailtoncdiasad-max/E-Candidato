import React, { useState } from "react";
import {
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Building2,
  ExternalLink,
  ShieldCheck,
  Percent,
  Sliders,
  AlertCircle,
  FileCheck,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { TSEPesqElePoll2026 } from "../../data/tse2026Data";

interface TsePollsTabProps {
  polls: TSEPesqElePoll2026[];
  onNavigateToPredictivePolls?: () => void;
}

export const TsePollsTab: React.FC<TsePollsTabProps> = ({
  polls = [],
  onNavigateToPredictivePolls,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSphere, setSelectedSphere] = useState("todos");
  const [expandedPollId, setExpandedPollId] = useState<string | null>(polls[0]?.id || null);

  const filteredPolls = polls.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.numeroRegistroTSE.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.instituto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.empresaContratante.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cargoPesquisado.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.estatisticoResponsavel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.registroConre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSphere =
      selectedSphere === "todos" || p.esfera.toLowerCase() === selectedSphere.toLowerCase();

    return matchesSearch && matchesSphere;
  });

  const totalInterviewed = filteredPolls.reduce(
    (acc, curr) => acc + curr.quantidadeEntrevistados,
    0
  );

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Pesquisas Registradas no TSE
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#D4A537]">
              {filteredPolls.length}
            </span>
            <span className="text-xs text-slate-400">registros oficiais ativos</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Eleitores Amostrados
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-extrabold text-emerald-400 font-mono">
              {totalInterviewed.toLocaleString("pt-BR")}
            </span>
            <span className="text-xs text-slate-400">entrevistas validadas</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Margem de Erro Média
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-extrabold text-white font-mono">±2.2%</span>
            <span className="text-xs text-slate-400">Intervalo de Confiança 95%</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Institutos Certificados
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base font-bold text-slate-200">
              Quaest, Datafolha, Atlas, RTBD
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Buscar por nº de registro (ex: BR-08241), instituto, CONRE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A537]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedSphere}
            onChange={(e) => setSelectedSphere(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-slate-200 focus:outline-none focus:border-[#D4A537]"
          >
            <option value="todos">Todas as Esferas</option>
            <option value="Federal">Pesquisas Nacionais (Presidência)</option>
            <option value="Estadual">Pesquisas Bahia (Governo & Senado)</option>
          </select>
        </div>
      </div>

      {/* Poll Cards List */}
      <div className="space-y-4">
        {filteredPolls.map((poll) => {
          const isExpanded = expandedPollId === poll.id;
          return (
            <div
              key={poll.id}
              className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] hover:border-[#1E3A5F]/80 transition-all space-y-4 shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#1E3A5F] pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-extrabold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Registro TSE: {poll.numeroRegistroTSE}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      PesqEle Oficial
                    </span>
                    <span className="text-xs text-slate-400">
                      Divulgação: <strong className="text-slate-200">{poll.dataDivulgacao}</strong>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-1.5">
                    {poll.instituto} — {poll.cargoPesquisado}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Contratante: <strong className="text-slate-300">{poll.empresaContratante}</strong> ({poll.cnpjContratante})
                  </p>
                </div>

                {/* Quick Parameters */}
                <div className="flex items-center gap-3 bg-[#0B1B2B] px-4 py-2 rounded-xl border border-[#1E3A5F] shrink-0 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Amostra
                    </span>
                    <span className="font-mono font-bold text-white">
                      {poll.quantidadeEntrevistados}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-[#1E3A5F]" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Margem
                    </span>
                    <span className="font-mono font-bold text-[#D4A537]">
                      ±{poll.margemErro}%
                    </span>
                  </div>
                  <div className="h-6 w-px bg-[#1E3A5F]" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Confiança
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {poll.nivelConfianca}%
                    </span>
                  </div>
                  <button
                    onClick={() => setExpandedPollId(isExpanded ? null : poll.id)}
                    className="p-1.5 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-slate-300 hover:text-white transition-all ml-1"
                    title={isExpanded ? "Recolher detalhes" : "Expandir detalhes"}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Stimulated Chart Bars */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Cenário Estimulado (1º Turno)
                </span>
                <div className="space-y-2">
                  {poll.cenarioEstimulado.map((cand, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-200">
                          {cand.candidato}
                        </span>
                        <span className="font-mono font-bold text-white">
                          {cand.percentual.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-[#0B1B2B] h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${cand.percentual}%`,
                            backgroundColor: cand.cor || "#D4A537",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>Indecisos / Não Sabe: <strong className="text-amber-300">{poll.indecisosPct}%</strong></span>
                  <span>•</span>
                  <span>Brancos / Nulos: <strong className="text-slate-300">{poll.brancosNulosPct}%</strong></span>
                </div>
              </div>

              {/* Expanded Technical Details */}
              {isExpanded && (
                <div className="pt-4 border-t border-[#1E3A5F] space-y-4">
                  {/* Second round projection if present */}
                  {poll.segundoTurnoSimulacao && (
                    <div className="p-4 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-2">
                      <span className="text-xs font-bold text-[#D4A537] uppercase tracking-wider block">
                        Simulação Oficial de 2º Turno (PesqEle)
                      </span>
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-white">
                          {poll.segundoTurnoSimulacao.candidatoA}:{" "}
                          <strong className="text-[#D4A537]">{poll.segundoTurnoSimulacao.pctA}%</strong>
                        </span>
                        <span className="text-slate-400">vs</span>
                        <span className="text-white">
                          {poll.segundoTurnoSimulacao.candidatoB}:{" "}
                          <strong className="text-rose-400">{poll.segundoTurnoSimulacao.pctB}%</strong>
                        </span>
                      </div>
                      <div className="w-full bg-[#112233] h-3 rounded-full overflow-hidden flex border border-slate-800">
                        <div
                          className="bg-[#D4A537] h-full transition-all"
                          style={{ width: `${poll.segundoTurnoSimulacao.pctA}%` }}
                        />
                        <div
                          className="bg-rose-500 h-full transition-all"
                          style={{ width: `${poll.segundoTurnoSimulacao.pctB}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Rejection Rate */}
                  {poll.indiceRejeicao && poll.indiceRejeicao.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-2">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                        Índice de Rejeição ("Não votaria de jeito nenhum")
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {poll.indiceRejeicao.map((rej, i) => (
                          <div key={i} className="p-2 rounded bg-[#112233] border border-slate-800 text-xs">
                            <span className="text-slate-300 block line-clamp-1">{rej.candidato}</span>
                            <span className="font-mono font-bold text-rose-400 text-sm">
                              {rej.rejeicaoPct}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Methodology & Statistical Responsibility */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F]">
                      <span className="text-[11px] text-slate-400 block font-bold uppercase mb-1">
                        Estatístico Responsável & CONRE
                      </span>
                      <div className="font-semibold text-white">{poll.estatisticoResponsavel}</div>
                      <div className="text-amber-300 font-mono text-[11px] mt-0.5">
                        {poll.registroConre}
                      </div>
                      <div className="text-slate-400 text-[11px] mt-2">
                        Período de Campo: <strong className="text-white">{poll.periodoCampo}</strong>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Custo Declarado: <strong className="text-emerald-400 font-mono">R$ {poll.valorPesquisa.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F]">
                      <span className="text-[11px] text-slate-400 block font-bold uppercase mb-1">
                        Metodologia de Amostragem
                      </span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {poll.metodologia}
                      </p>
                    </div>
                  </div>

                  {/* Links & Navigation Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <a
                      href={poll.linkVerificacaoTSE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#D4A537] hover:underline flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Ver espelho de registro no portal PesqEle do TSE
                    </a>

                    {onNavigateToPredictivePolls && (
                      <button
                        onClick={onNavigateToPredictivePolls}
                        className="py-1.5 px-3 rounded-xl bg-[#16304A] hover:bg-[#1E3A5F] text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-[#1E3A5F]"
                      >
                        <Sliders className="w-3.5 h-3.5 text-[#2E9C87]" />
                        Simular Cenários no Módulo Preditivo
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
