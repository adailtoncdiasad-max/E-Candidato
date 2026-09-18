import React, { useState } from "react";
import { TerritoryZone, CandidateProfile } from "../types";
import {
  MapPin,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Users,
  Sparkles,
  Phone,
  Compass,
  ArrowRight,
  ShieldCheck,
  Search,
  Layers,
} from "lucide-react";

interface SpatialHexMapProps {
  territories: TerritoryZone[];
  candidate: CandidateProfile;
  onNavigateToAIWithZone: (zone: TerritoryZone) => void;
}

export const SpatialHexMap: React.FC<SpatialHexMapProps> = ({
  territories = [],
  candidate,
  onNavigateToAIWithZone,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(
    territories[0]?.id || ""
  );
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");
  const [regionFilter, setRegionFilter] = useState<string>("TODAS");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Check if current dataset has macro-regions (Federal/Presidencial 27 UFs)
  const hasMacroRegions = territories.some((t) => !!t.regionMacro);

  // Filter territories
  const filteredTerritories = territories.filter((t) => {
    const matchesStatus =
      statusFilter === "TODOS" || t.status === statusFilter;
    const matchesRegion =
      regionFilter === "TODAS" || t.regionMacro === regionFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.ufCode && t.ufCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.priorityDemand && t.priorityDemand.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesRegion && matchesSearch;
  });

  const selectedZone =
    territories.find((t) => t.id === selectedZoneId) ||
    filteredTerritories[0] ||
    territories[0] ||
    null;

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Reduto Consolidado":
        return {
          bg: "bg-emerald-950/80",
          border: "border-emerald-500",
          text: "text-emerald-300",
          hexFill: "#065F46",
          hexStroke: "#10B981",
        };
      case "Zona de Disputa":
        return {
          bg: "bg-amber-950/80",
          border: "border-amber-500",
          text: "text-amber-300",
          hexFill: "#78350F",
          hexStroke: "#F59E0B",
        };
      case "Vulnerabilidade":
        return {
          bg: "bg-rose-950/80",
          border: "border-rose-500",
          text: "text-rose-300",
          hexFill: "#881337",
          hexStroke: "#F43F5E",
        };
      default:
        return {
          bg: "bg-slate-900/80",
          border: "border-slate-600",
          text: "text-slate-300",
          hexFill: "#1E293B",
          hexStroke: "#64748B",
        };
    }
  };

  return (
    <div id="spatial-hexmap-container" className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-700/60 uppercase">
              {hasMacroRegions ? "Mapa Nacional das 27 UFs" : "Espacialização Eleitoral"}
            </span>
            <span className="text-xs text-slate-400">
              {hasMacroRegions
                ? "Base Oficial TSE: Eleitorado e Votação nas 27 Unidades da Federação"
                : "Mapeamento de Zonas, Bairros e Densidade de Votos"}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#F2EFE6] mt-1">
            {hasMacroRegions
              ? `Colégio Eleitoral Presidencial: ${candidate.ballotName}`
              : "Mapa Territorial de Calor & Redutos"}
          </h2>
          <p className="text-xs text-slate-300">
            {hasMacroRegions
              ? "Acompanhamento estado a estado: votos apurados no 2º turno pelo TSE, margem de vitória e demandas prioritárias de cada Unidade da Federação."
              : "Identifique onde a eleição está ganha, onde é preciso virar votos e onde agir contra a abstenção."}
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center flex-wrap gap-2">
          {["TODOS", "Reduto Consolidado", "Zona de Disputa", "Vulnerabilidade"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === status
                    ? "bg-[#D4A537] text-[#0B1B2B] font-bold shadow-md shadow-[#D4A537]/20"
                    : "bg-[#16304A] text-slate-300 hover:text-white border border-[#1E3A5F]"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Secondary Bar for 27 UFs: Macro-region pills & Search */}
      {hasMacroRegions && (
        <div className="p-3.5 rounded-xl bg-[#16304A]/70 border border-[#1E3A5F] flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Region Tabs */}
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#D4A537]" /> Regiões:
            </span>
            {["TODAS", "Nordeste", "Sudeste", "Sul", "Centro-Oeste", "Norte"].map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  regionFilter === reg
                    ? "bg-[#D4A537] text-[#0B1B2B] font-bold"
                    : "bg-[#0B1B2B] text-slate-300 hover:text-white border border-[#1E3A5F]"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar UF (ex: SP, BA, MG, RJ)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4A537]"
            />
          </div>
        </div>
      )}

      {/* Main Grid: Interactive Hex Map (Left) & Zone Tactical Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Hexagonal / Territorial Canvas */}
        <div
          id="hex-canvas-card"
          className="lg:col-span-7 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
            <span className="text-sm font-bold text-[#F2EFE6] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#D4A537]" />
              {hasMacroRegions
                ? `Unidades da Federação Mapeadas (${filteredTerritories.length} de ${territories.length} UFs)`
                : `Zonas Eleitorais & Bairros Mapeados (${filteredTerritories.length})`}
            </span>
            <span className="text-[11px] text-slate-400">
              Clique em uma UF para ver detalhes
            </span>
          </div>

          {/* Territories Visual Grid with scroll container */}
          <div className="p-4 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] max-h-[520px] overflow-y-auto relative">
            {/* Background coordinate lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1E3A5F_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-3 z-10 py-1 relative">
              {filteredTerritories.map((zone) => {
                const colors = getStatusColor(zone.status);
                const isSelected = selectedZone?.id === zone.id;

                return (
                  <button
                    key={zone.id}
                    id={`zone-node-${zone.id}`}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`relative p-3 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between min-h-[135px] ${
                      isSelected
                        ? "ring-2 ring-[#D4A537] shadow-lg shadow-[#D4A537]/20 scale-105 z-20 bg-[#16304A]"
                        : "hover:scale-102 bg-[#112233]/90"
                    } ${colors.border}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        {zone.ufCode ? (
                          <span className="text-xs font-black px-1.5 py-0.5 rounded bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 font-mono">
                            {zone.ufCode}
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-400">
                            {zone.type}
                          </span>
                        )}
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: colors.hexStroke }}
                        />
                      </div>
                      <h4 className="text-xs font-bold text-[#F2EFE6] leading-tight line-clamp-2">
                        {zone.name}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-[#1E3A5F]/60">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-extrabold font-mono text-[#D4A537]">
                          {zone.ourVotePercentage}%
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {zone.ourEstimatedVotes.toLocaleString("pt-BR")} v.
                        </span>
                      </div>
                      {zone.opponentVotePercentage !== undefined && (
                        <div className="text-[10px] text-slate-400 flex items-center justify-between mt-0.5 font-mono">
                          <span>Oposição:</span>
                          <span className="text-slate-300 font-semibold">{zone.opponentVotePercentage}%</span>
                        </div>
                      )}
                      <span className="text-[9px] text-slate-400 block truncate mt-0.5">
                        {zone.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map Legend */}
          <div className="flex items-center justify-center flex-wrap gap-4 text-xs pt-1 text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Reduto Consolidado (50%+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Zona de Disputa (40-49%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>Vulnerabilidade (&lt;40%)</span>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Zone Tactical Dossier */}
        {selectedZone ? (
          <div
            id="zone-dossier-panel"
            className="lg:col-span-5 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="border-b border-[#1E3A5F] pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    {selectedZone.ufCode && (
                      <span className="px-2 py-0.5 rounded bg-[#D4A537] text-[#0B1B2B] font-extrabold text-[10px]">
                        {selectedZone.ufCode}
                      </span>
                    )}
                    Dossiê Eleitoral TSE
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      getStatusColor(selectedZone.status).bg
                    } ${getStatusColor(selectedZone.status).text} ${
                      getStatusColor(selectedZone.status).border
                    }`}
                  >
                    {selectedZone.status}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#F2EFE6] mt-1">
                  {selectedZone.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedZone.type} com {selectedZone.voterCount.toLocaleString("pt-BR")} eleitores aptos no TSE
                </p>
              </div>

              {/* Voting Metrics in Selected Zone: Our vs Opponent */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Votos {candidate.ballotName}
                  </span>
                  <span className="text-lg font-extrabold text-[#D4A537]">
                    {selectedZone.ourEstimatedVotes.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-[11px] text-[#2E9C87] font-semibold block">
                    {selectedZone.ourVotePercentage}% dos válidos
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {selectedZone.opponentEstimatedVotes !== undefined
                      ? "Votos Oposição (Bolsonaro)"
                      : "Índice de Sentimento"}
                  </span>
                  <span className="text-lg font-extrabold text-slate-200">
                    {selectedZone.opponentEstimatedVotes !== undefined
                      ? selectedZone.opponentEstimatedVotes.toLocaleString("pt-BR")
                      : `${selectedZone.sentimentScore}/100`}
                  </span>
                  <span className="text-[11px] text-amber-400 font-semibold block">
                    {selectedZone.opponentVotePercentage !== undefined
                      ? `${selectedZone.opponentVotePercentage}% dos válidos`
                      : "Aprovação comunitária"}
                  </span>
                </div>
              </div>

              {/* Priority Demand */}
              <div className="p-3.5 rounded-xl bg-[#16304A]/60 border border-[#1E3A5F] space-y-1">
                <span className="text-[11px] font-bold uppercase text-[#D4A537] block">
                  Demanda Regional Prioritária da População:
                </span>
                <p className="text-xs text-slate-200 font-medium">
                  "{selectedZone.priorityDemand}"
                </p>
              </div>

              {/* Recommended Action */}
              <div className="p-3.5 rounded-xl bg-[#16304A]/60 border border-[#1E3A5F] space-y-1">
                <span className="text-[11px] font-bold uppercase text-[#2E9C87] block">
                  Ação Estratégica Recomendada:
                </span>
                <p className="text-xs text-slate-200">
                  {selectedZone.actionRequired}
                </p>
              </div>

              {/* Key Political Contact */}
              <div className="p-3.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4A537]/20 border border-[#D4A537] flex items-center justify-center text-[#D4A537] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Articulação Política Local:
                  </span>
                  <span className="font-semibold text-white">
                    {selectedZone.leaderContact}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button: Generate Speech for this Territory */}
            <div className="pt-2">
              <button
                id="btn-generate-speech-for-zone"
                onClick={() => onNavigateToAIWithZone(selectedZone)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38520] hover:from-[#E5B648] hover:to-[#C49630] text-[#0B1B2B] font-extrabold text-xs tracking-wide uppercase transition-all shadow-lg shadow-[#D4A537]/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Gerar Discurso Direcionado para {selectedZone.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
