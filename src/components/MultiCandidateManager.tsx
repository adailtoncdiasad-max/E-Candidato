import React, { useState } from "react";
import {
  Users,
  UserCheck,
  Plus,
  Search,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Vote,
  Sparkles,
  ArrowRight,
  Sliders,
  Filter,
  Award,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { ExtendedCandidateItem } from "../data/multiCandidatesData";
import { CandidateProfile, ElectoralSphere, PoliticalRole } from "../types";

interface MultiCandidateManagerProps {
  candidates: ExtendedCandidateItem[];
  activeCandidateId: string;
  onSelectActiveCandidate: (candidate: ExtendedCandidateItem) => void;
  onAddNewCandidate: (newCandidate: ExtendedCandidateItem) => void;
  onNavigateToModule: (module: any) => void;
}

export const MultiCandidateManager: React.FC<MultiCandidateManagerProps> = ({
  candidates,
  activeCandidateId,
  onSelectActiveCandidate,
  onAddNewCandidate,
  onNavigateToModule,
}) => {
  const [selectedSphere, setSelectedSphere] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form states for new candidate
  const [newName, setNewName] = useState("");
  const [newBallotName, setNewBallotName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newParty, setNewParty] = useState("");
  const [newCoalition, setNewCoalition] = useState("");
  const [newSphere, setNewSphere] = useState<ElectoralSphere>("Municipal");
  const [newRole, setNewRole] = useState<PoliticalRole>("Prefeito(a)");
  const [newLocation, setNewLocation] = useState("Salvador - BA");
  const [newTotalVoters, setNewTotalVoters] = useState<number>(1969757);
  const [newTargetVotes, setNewTargetVotes] = useState<number>(500000);
  const [newCurrentVotes, setNewCurrentVotes] = useState<number>(380000);
  const [newViabilityScore, setNewViabilityScore] = useState<number>(75);
  const [newSlogan, setNewSlogan] = useState("");
  const [newPartyColor, setNewPartyColor] = useState("#0070BA");

  const filteredCandidates = candidates.filter((cand) => {
    if (selectedSphere !== "all" && cand.sphere !== selectedSphere) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = cand.name.toLowerCase().includes(q);
      const matchBallot = cand.ballotName.toLowerCase().includes(q);
      const matchParty = cand.party.toLowerCase().includes(q);
      const matchNumber = cand.number.toLowerCase().includes(q);
      const matchLocation = cand.location.toLowerCase().includes(q);
      if (!matchName && !matchBallot && !matchParty && !matchNumber && !matchLocation) return false;
    }
    return true;
  });

  const activeCandidate = candidates.find((c) => c.id === activeCandidateId) || candidates[0];

  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBallotName.trim() || !newNumber.trim() || !newParty.trim()) return;

    const item: ExtendedCandidateItem = {
      id: `custom-cand-${Date.now()}`,
      name: newName.trim() || newBallotName.trim(),
      ballotName: newBallotName.trim().toUpperCase(),
      number: newNumber.trim(),
      party: newParty.trim().toUpperCase(),
      coalition: newCoalition.trim() || `Coligação ${newBallotName}`,
      sphere: newSphere,
      role: newRole,
      location: newLocation.trim() || "Bahia",
      totalVoters: Number(newTotalVoters) || 1000000,
      targetVotes: Number(newTargetVotes) || 500000,
      currentEstimatedVotes: Number(newCurrentVotes) || 350000,
      viabilityScore: Number(newViabilityScore) || 75,
      campaignSlogan: newSlogan.trim() || "Pelo Futuro e Pelo Trabalho!",
      partyColor: newPartyColor || "#0070BA",
      officialTseRecord: "Candidato cadastrado pela coordenação de campanha.",
      keyIssues: ["Educação Básica", "Saúde Pública", "Emprego & Renda", "Segurança Comunitária"],
    };

    onAddNewCandidate(item);
    onSelectActiveCandidate(item);
    setIsAddModalOpen(false);

    // Reset
    setNewName("");
    setNewBallotName("");
    setNewNumber("");
    setNewParty("");
    setNewCoalition("");
    setNewSlogan("");
  };

  return (
    <div id="multi-candidate-manager" className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#112233] via-[#16304A] to-[#112233] border border-[#1E3A5F] shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-[#D4A537]" />
                Comitê Central Multi-Campanhas
              </span>
              <span className="text-xs text-slate-400">
                Suporte Completo a Múltiplos Candidatos & Esferas
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#F2EFE6] tracking-tight flex items-center gap-2.5">
              <Users className="w-7 h-7 text-[#D4A537]" />
              Gestão de Múltiplos Candidatos
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Gerencie diferentes candidaturas municipais, estaduais e federais no mesmo ambiente. Alterne o candidato ativo no cockpit com um clique para atualizar previsões, eventos e propostas.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38728] hover:from-[#E5B648] hover:to-[#C49839] text-[#0B1B2B] font-bold text-xs shadow-lg shadow-[#D4A537]/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Novo Candidato</span>
          </button>
        </div>
      </div>

      {/* Active Candidate Spotlight Card */}
      {activeCandidate && (
        <div className="p-5 rounded-2xl bg-[#112233] border-2 border-[#D4A537] shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D4A537] text-[#0B1B2B] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Candidato Ativo no Cockpit de Inteligência
            </span>
            <span className="text-xs text-slate-400">
              Esfera: <strong className="text-slate-200">{activeCandidate.sphere}</strong> ({activeCandidate.role})
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-white/20"
                style={{ backgroundColor: activeCandidate.partyColor || "#D4A537" }}
              >
                {activeCandidate.number}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl md:text-2xl font-black text-[#F2EFE6]">
                    {activeCandidate.ballotName}
                  </h2>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#16304A] text-[#D4A537] border border-[#1E3A5F]">
                    {activeCandidate.party}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{activeCandidate.name}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A537]" />
                  <span>{activeCandidate.location}</span>
                  <span>•</span>
                  <span className="text-slate-300 italic">"{activeCandidate.campaignSlogan}"</span>
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-center p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F]">
                <span className="text-[10px] text-slate-400 block font-semibold">Índice Viabilidade</span>
                <span className="text-xl font-black text-[#D4A537]">
                  {activeCandidate.viabilityScore}%
                </span>
              </div>
              <div className="text-center p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F]">
                <span className="text-[10px] text-slate-400 block font-semibold">Votos Estimados</span>
                <span className="text-xl font-black text-[#2E9C87]">
                  {activeCandidate.currentEstimatedVotes.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="text-center p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F]">
                <span className="text-[10px] text-slate-400 block font-semibold">Meta de Eleição</span>
                <span className="text-xl font-black text-white">
                  {activeCandidate.targetVotes.toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar candidato por nome, número, partido ou cargo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-[#F2EFE6] focus:outline-none focus:border-[#D4A537]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Filtrar Esfera:</span>
          {["all", "Municipal", "Estadual", "Federal"].map((sphere) => (
            <button
              key={sphere}
              onClick={() => setSelectedSphere(sphere)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedSphere === sphere
                  ? "bg-[#D4A537] text-[#0B1B2B]"
                  : "bg-[#16304A] text-slate-300 hover:bg-[#1E3A5F]"
              }`}
            >
              {sphere === "all" ? "Todas" : sphere}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.map((cand) => {
          const isActive = cand.id === activeCandidateId;
          const voteProgress = Math.min(
            100,
            Math.round((cand.currentEstimatedVotes / cand.targetVotes) * 100)
          );

          return (
            <div
              key={cand.id}
              className={`p-5 rounded-2xl bg-[#112233] border transition-all flex flex-col justify-between space-y-4 shadow-lg ${
                isActive
                  ? "border-[#D4A537] shadow-[#D4A537]/10 ring-1 ring-[#D4A537]"
                  : "border-[#1E3A5F] hover:border-[#D4A537]/50"
              }`}
            >
              <div className="space-y-3">
                {/* Card Top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-black text-white"
                      style={{ backgroundColor: cand.partyColor || "#1E3A5F" }}
                    >
                      {cand.number}
                    </span>
                    <span className="text-xs font-bold text-slate-300">{cand.party}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16304A] text-[#D4A537] border border-[#1E3A5F]">
                    {cand.sphere} • {cand.role}
                  </span>
                </div>

                {/* Names */}
                <div>
                  <h3 className="text-lg font-black text-[#F2EFE6] leading-tight">
                    {cand.ballotName}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">{cand.name}</p>
                </div>

                {/* Location & Slogan */}
                <div className="space-y-1 text-xs text-slate-300">
                  <p className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A537] shrink-0" />
                    <span className="truncate">{cand.location}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 italic line-clamp-1">
                    "{cand.campaignSlogan}"
                  </p>
                </div>

                {/* Progress Bar for Votes Target */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Progresso da Meta de Votos</span>
                    <span className="font-bold text-[#D4A537]">{voteProgress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${voteProgress}%` }}
                      className="h-full bg-gradient-to-r from-[#D4A537] to-[#2E9C87] rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{cand.currentEstimatedVotes.toLocaleString("pt-BR")} est.</span>
                    <span>Meta: {cand.targetVotes.toLocaleString("pt-BR")}</span>
                  </div>
                </div>

                {/* TSE Official Record Note */}
                {cand.officialTseRecord && (
                  <p className="text-[11px] text-slate-400 p-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F]/60 line-clamp-2">
                    <strong className="text-slate-300">Base TSE:</strong> {cand.officialTseRecord}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#1E3A5F]">
                {isActive ? (
                  <div className="w-full py-2 rounded-xl bg-[#D4A537]/20 border border-[#D4A537] text-[#D4A537] font-bold text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Candidato Ativo no Cockpit</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectActiveCandidate(cand)}
                    className="w-full py-2 rounded-xl bg-[#16304A] hover:bg-[#D4A537] text-slate-200 hover:text-[#0B1B2B] font-bold text-xs border border-[#1E3A5F] hover:border-[#D4A537] flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Tornar Ativo no Cockpit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Cadastrar Novo Candidato */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#112233] border border-[#1E3A5F] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
              <h2 className="text-lg font-bold text-[#F2EFE6] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#D4A537]" />
                Cadastrar Novo Candidato na Plataforma
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-[#16304A]"
              >
                ✕ Fechar
              </button>
            </div>

            <form onSubmit={handleCreateCandidate} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nome Completo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria das Graças Silva"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nome de Urna:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: PROFESSORA GRAÇA"
                    value={newBallotName}
                    onChange={(e) => setNewBallotName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Número de Urna:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 13, 44, 555..."
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sigla do Partido:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: PT, UNIÃO, PSD..."
                    value={newParty}
                    onChange={(e) => setNewParty(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cor do Partido:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newPartyColor}
                      onChange={(e) => setNewPartyColor(e.target.value)}
                      className="w-10 h-8 rounded bg-[#0B1B2B] border border-[#1E3A5F] cursor-pointer"
                    />
                    <span className="text-slate-400 font-mono text-[11px]">{newPartyColor}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Esfera:</label>
                  <select
                    value={newSphere}
                    onChange={(e) => {
                      const sp = e.target.value as ElectoralSphere;
                      setNewSphere(sp);
                      if (sp === "Municipal") setNewRole("Prefeito(a)");
                      else if (sp === "Estadual") setNewRole("Governador(a)");
                      else setNewRole("Presidente");
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  >
                    <option value="Municipal">Municipal</option>
                    <option value="Estadual">Estadual</option>
                    <option value="Federal">Federal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cargo:</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as PoliticalRole)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  >
                    {newSphere === "Municipal" && (
                      <>
                        <option value="Prefeito(a)">Prefeito(a)</option>
                        <option value="Vereador(a)">Vereador(a)</option>
                      </>
                    )}
                    {newSphere === "Estadual" && (
                      <>
                        <option value="Governador(a)">Governador(a)</option>
                        <option value="Deputado(a) Estadual">Deputado(a) Estadual</option>
                      </>
                    )}
                    {newSphere === "Federal" && (
                      <>
                        <option value="Presidente">Presidente da República</option>
                        <option value="Senador(a)">Senador(a)</option>
                        <option value="Deputado(a) Federal">Deputado(a) Federal</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Localização / Município / UF:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Feira de Santana - BA ou Brasil"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Eleitorado Total:</label>
                  <input
                    type="number"
                    value={newTotalVoters}
                    onChange={(e) => setNewTotalVoters(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Meta de Votos:</label>
                  <input
                    type="number"
                    value={newTargetVotes}
                    onChange={(e) => setNewTargetVotes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Votos Atuais Est.:</label>
                  <input
                    type="number"
                    value={newCurrentVotes}
                    onChange={(e) => setNewCurrentVotes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Slogan de Campanha:</label>
                <input
                  type="text"
                  placeholder="Ex: Coragem para Cuidar da Nossa Gente!"
                  value={newSlogan}
                  onChange={(e) => setNewSlogan(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Coligação Partidária:</label>
                <input
                  type="text"
                  placeholder="Ex: Juntos Pela Mudança (PT, PSB, PSD, PCdoB)"
                  value={newCoalition}
                  onChange={(e) => setNewCoalition(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#1E3A5F]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#16304A] text-slate-300 font-semibold hover:bg-[#1E3A5F]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38728] text-[#0B1B2B] font-bold shadow-lg"
                >
                  Salvar e Ativar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
