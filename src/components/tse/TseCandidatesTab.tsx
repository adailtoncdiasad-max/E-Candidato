import React, { useState } from "react";
import {
  Search,
  Filter,
  UserCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  Briefcase,
  GraduationCap,
  MapPin,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Eye,
  X,
  BadgeCheck,
} from "lucide-react";
import { TSECandidateOfficial2026 } from "../../data/tse2026Data";

interface TseCandidatesTabProps {
  candidates: TSECandidateOfficial2026[];
  onSelectCandidate?: (candidate: TSECandidateOfficial2026) => void;
}

export const TseCandidatesTab: React.FC<TseCandidatesTabProps> = ({
  candidates = [],
  onSelectCandidate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("todos");
  const [selectedSphere, setSelectedSphere] = useState("todos");
  const [selectedCandidateModal, setSelectedCandidateModal] = useState<TSECandidateOfficial2026 | null>(null);

  // Filter logic
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.nomeUrna.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nomeCompleto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.numero.includes(searchQuery) ||
      c.siglaPartido.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nomeColigacao.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sequencialTSE.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      selectedRole === "todos" || c.cargo.toLowerCase() === selectedRole.toLowerCase();

    const matchesSphere =
      selectedSphere === "todos" || c.esfera.toLowerCase() === selectedSphere.toLowerCase();

    return matchesSearch && matchesRole && matchesSphere;
  });

  const totalDeclaredAssets = filteredCandidates.reduce(
    (acc, curr) => acc + curr.bensDeclaradosTotal,
    0
  );

  return (
    <div className="space-y-6">
      {/* 2026 Candidates Header Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Candidaturas Registradas (TSE 2026)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#D4A537]">
              {filteredCandidates.length}
            </span>
            <span className="text-xs text-slate-400">candidatos catalogados</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Patrimônio Declarado (Total SPCE)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-extrabold text-emerald-400 font-mono">
              R$ {(totalDeclaredAssets / 1000000).toFixed(1)}M
            </span>
            <span className="text-xs text-slate-400">em bens à Justiça</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Esferas em Disputa (2026)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-bold text-white">Geral / Federal & Estadual</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Status dos Registros no TSE
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">
              100% Homologados / Deferidos
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Buscar por nome, número, partido ou sequencial TSE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A537]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Cargo Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-slate-200 focus:outline-none focus:border-[#D4A537]"
          >
            <option value="todos">Todos os Cargos</option>
            <option value="Presidente">Presidente da República</option>
            <option value="Governador(a)">Governador(a) da Bahia</option>
            <option value="Senador(a)">Senador(a) (Bahia)</option>
            <option value="Prefeito(a)">Prefeito(a)</option>
          </select>

          {/* Esfera Filter */}
          <select
            value={selectedSphere}
            onChange={(e) => setSelectedSphere(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-slate-200 focus:outline-none focus:border-[#D4A537]"
          >
            <option value="todos">Todas as Esferas</option>
            <option value="Federal">Federal (Brasil)</option>
            <option value="Estadual">Estadual (Bahia)</option>
            <option value="Municipal">Municipal (Salvador)</option>
          </select>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCandidates.map((cand) => (
          <div
            key={cand.id}
            className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] hover:border-[#D4A537]/60 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              {/* Header: Number & Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-xl bg-[#16304A] border border-[#1E3A5F] overflow-hidden shrink-0 flex items-center justify-center font-mono font-bold text-white text-lg">
                    {cand.fotoUrl ? (
                      <img
                        src={cand.fotoUrl}
                        alt={cand.nomeUrna}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      cand.numero
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-bold text-white group-hover:text-[#D4A537] transition-colors">
                        {cand.nomeUrna}
                      </h4>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#16304A] text-white border border-[#1E3A5F]">
                        {cand.numero}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block line-clamp-1">
                      {cand.nomeCompleto}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                  {cand.situacaoRegistro}
                </span>
              </div>

              {/* Badges: Party, Role, Sphere */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2 py-0.5 rounded bg-[#16304A] text-slate-200 text-[11px] font-semibold border border-[#1E3A5F]">
                  {cand.siglaPartido}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0B1B2B] text-amber-300 text-[11px] font-semibold border border-amber-500/30">
                  {cand.cargo}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0B1B2B] text-slate-300 text-[11px] border border-[#1E3A5F]">
                  {cand.esfera} ({cand.uf})
                </span>
              </div>

              {/* TSE Financial & Official Stats */}
              <div className="space-y-1.5 text-xs text-slate-300 border-t border-[#1E3A5F] pt-2.5 mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Bens Declarados:</span>
                  <span className="font-mono font-bold text-emerald-300">
                    R$ {cand.bensDeclaradosTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Limite Legal de Gastos:</span>
                  <span className="font-mono font-bold text-slate-200">
                    R$ {cand.limiteGastos1T.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Sequencial TSE:</span>
                  <span className="font-mono text-slate-400">{cand.sequencialTSE}</span>
                </div>
              </div>

              {/* Coligação */}
              <div className="text-[11px] text-slate-400 bg-[#0B1B2B] p-2 rounded-lg border border-slate-800 line-clamp-2 mb-3">
                <strong className="text-slate-300">Coligação:</strong> {cand.nomeColigacao}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#1E3A5F]">
              <button
                onClick={() => setSelectedCandidateModal(cand)}
                className="flex-1 py-1.5 px-2 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                Ficha TSE
              </button>

              {onSelectCandidate && (
                <button
                  onClick={() => onSelectCandidate(cand)}
                  className="py-1.5 px-3 rounded-lg bg-[#D4A537] hover:bg-[#c3962d] text-[#0B1B2B] font-extrabold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                  title="Carregar este candidato no Cockpit da Campanha"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ativar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#112233] border border-[#1E3A5F] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedCandidateModal(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#16304A] border border-[#1E3A5F] overflow-hidden shrink-0">
                {selectedCandidateModal.fotoUrl ? (
                  <img
                    src={selectedCandidateModal.fotoUrl}
                    alt={selectedCandidateModal.nomeUrna}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono font-bold text-2xl text-white">
                    {selectedCandidateModal.numero}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedCandidateModal.nomeUrna}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 font-mono font-bold text-sm">
                    {selectedCandidateModal.numero}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    {selectedCandidateModal.situacaoRegistro}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {selectedCandidateModal.nomeCompleto}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400 mt-2">
                  <span>Partido: <strong className="text-white">{selectedCandidateModal.siglaPartido}</strong></span>
                  <span>•</span>
                  <span>Cargo: <strong className="text-amber-300">{selectedCandidateModal.cargo}</strong></span>
                  <span>•</span>
                  <span>UF: <strong className="text-white">{selectedCandidateModal.uf}</strong></span>
                </div>
              </div>
            </div>

            {/* TSE Official Data Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Número Sequencial TSE</span>
                <span className="font-mono font-bold text-white">{selectedCandidateModal.sequencialTSE}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Data de Registro no TSE</span>
                <span className="font-mono text-slate-200">{selectedCandidateModal.dataRegistroTSE}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Grau de Instrução</span>
                <span className="text-slate-200">{selectedCandidateModal.grauInstrucao}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Ocupação Declarada</span>
                <span className="text-slate-200">{selectedCandidateModal.ocupacao}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Total de Bens Declarados</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  R$ {selectedCandidateModal.bensDeclaradosTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Limite Legal de Gastos 1º Turno</span>
                <span className="font-mono font-bold text-white text-sm">
                  R$ {selectedCandidateModal.limiteGastos1T.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Coligação Completa */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Composição Partidária & Coligação
              </span>
              <div className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-slate-300">
                {selectedCandidateModal.nomeColigacao}
              </div>
            </div>

            {/* Propostas Principais do Plano de Governo */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Diretrizes do Plano de Governo (Protocolado no TSE)
              </span>
              <ul className="space-y-2">
                {selectedCandidateModal.propostasPrincipais.map((prop, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#16304A]/60 border border-[#1E3A5F] text-xs text-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4A537] shrink-0 mt-0.5" />
                    <span>{prop}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-[#1E3A5F]">
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="px-4 py-2 rounded-xl bg-[#16304A] hover:bg-[#1E3A5F] text-slate-300 hover:text-white text-xs font-semibold transition-all"
              >
                Fechar
              </button>

              {onSelectCandidate && (
                <button
                  onClick={() => {
                    onSelectCandidate(selectedCandidateModal);
                    setSelectedCandidateModal(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#D4A537] hover:bg-[#c3962d] text-[#0B1B2B] font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  Ativar no Cockpit da Campanha
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
