import React from "react";
import {
  CandidateProfile,
  TerritoryZone,
  PollRecord,
  SocialNetworkStat,
  CriticalAlert,
} from "../types";
import {
  Award,
  TrendingUp,
  Users,
  MapPin,
  Flame,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Shield,
  ChevronRight,
  Send,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { NavModule } from "./Sidebar";

interface DashboardOverviewProps {
  candidate: CandidateProfile;
  territories: TerritoryZone[];
  polls: PollRecord[];
  socialStats: SocialNetworkStat[];
  alerts: CriticalAlert[];
  onNavigate: (module: NavModule) => void;
  onOpenAlertAction: (alert: CriticalAlert) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  candidate,
  territories,
  polls,
  socialStats,
  alerts,
  onNavigate,
  onOpenAlertAction,
}) => {
  const latestPoll = polls[polls.length - 1] || null;
  const previousPoll = polls.length > 1 ? polls[polls.length - 2] : null;

  const pollDelta =
    latestPoll && previousPoll
      ? (latestPoll.ourCandidate - previousPoll.ourCandidate).toFixed(1)
      : "+2.5";

  // Calculate consolidated vs battleground vs vulnerable territories
  const consolidatedCount = territories.filter(
    (t) => t.status === "Reduto Consolidado"
  ).length;
  const disputeCount = territories.filter(
    (t) => t.status === "Zona de Disputa"
  ).length;
  const vulnerableCount = territories.filter(
    (t) => t.status === "Vulnerabilidade" || t.status === "Área Neutra"
  ).length;

  // Average social sentiment
  const totalPositiveSentiment = Math.round(
    socialStats.reduce((acc, s) => acc + s.sentiment.positive, 0) /
      (socialStats.length || 1)
  );

  return (
    <div id="dashboard-overview-container" className="space-y-6">
      {/* Top Banner: Candidate Viability & Core Numbers */}
      <div
        id="overview-hero-card"
        className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#112233] via-[#16304A] to-[#112233] border border-[#1E3A5F] shadow-xl relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A537]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 uppercase tracking-wide">
                Índice E-Candidato
              </span>
              <span className="text-xs text-slate-400">
                Esfera {candidate.sphere} • {candidate.location}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#F2EFE6] tracking-tight">
              Cockpit de Inteligência: {candidate.ballotName}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              {candidate.campaignSlogan}
            </p>
          </div>

          {/* Viability Gauge Score */}
          <div
            id="viability-score-box"
            className="flex items-center gap-4 bg-[#0B1B2B]/80 px-5 py-3 rounded-2xl border border-[#D4A537]/30 shadow-lg"
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Circular SVG Ring */}
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#D4A537]"
                  strokeDasharray={`${candidate.viabilityScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-[#F2EFE6]">
                  {candidate.viabilityScore}%
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-[#D4A537] uppercase tracking-wider">
                Viabilidade Eleitoral
              </div>
              <div className="text-xs text-slate-300">
                Alta probabilidade de vitória
              </div>
              <div className="text-[11px] text-[#2E9C87] font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>Evolução contínua no tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Quantitative Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Intenção de Voto */}
        <div
          id="metric-card-polling"
          onClick={() => onNavigate("polls")}
          className="cursor-pointer p-4 rounded-xl bg-[#112233] hover:bg-[#16304A] border border-[#1E3A5F] hover:border-[#D4A537]/50 transition-all shadow-md group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Intenção de Voto (Pesquisas)</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#D4A537]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-[#F2EFE6]">
              {latestPoll ? `${latestPoll.ourCandidate}%` : "37.1%"}
            </span>
            <span className="text-xs font-bold text-[#2E9C87] flex items-center">
              ▲ {pollDelta}%
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            {latestPoll ? `${latestPoll.institute} (${latestPoll.date})` : "Consolidado TSE"}
          </div>
        </div>

        {/* Metric 2: Estimativa Nominal de Votos */}
        <div
          id="metric-card-estimated-votes"
          onClick={() => onNavigate("quotient_sim")}
          className="cursor-pointer p-4 rounded-xl bg-[#112233] hover:bg-[#16304A] border border-[#1E3A5F] hover:border-[#D4A537]/50 transition-all shadow-md group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Votos Projetados na Urna</span>
            <Users className="w-4 h-4 text-slate-500 group-hover:text-[#D4A537]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-[#D4A537]">
              {candidate.currentEstimatedVotes.toLocaleString("pt-BR")}
            </span>
            <span className="text-[11px] text-slate-400">votos</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Meta: {candidate.targetVotes.toLocaleString("pt-BR")} votos
          </div>
        </div>

        {/* Metric 3: Cobertura Territorial */}
        <div
          id="metric-card-territory"
          onClick={() => onNavigate("hexmap")}
          className="cursor-pointer p-4 rounded-xl bg-[#112233] hover:bg-[#16304A] border border-[#1E3A5F] hover:border-[#D4A537]/50 transition-all shadow-md group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Território & Redutos</span>
            <MapPin className="w-4 h-4 text-slate-500 group-hover:text-[#2E9C87]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-[#2E9C87]">
              {consolidatedCount}
            </span>
            <span className="text-xs text-slate-300">redutos firmes</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-300">
            {disputeCount} zonas em disputa prioritária
          </div>
        </div>

        {/* Metric 4: Sentimento Digital */}
        <div
          id="metric-card-sentiment"
          onClick={() => onNavigate("social")}
          className="cursor-pointer p-4 rounded-xl bg-[#112233] hover:bg-[#16304A] border border-[#1E3A5F] hover:border-[#D4A537]/50 transition-all shadow-md group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Sentimento nas Redes</span>
            <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-[#D4A537]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-[#F2EFE6]">
              {totalPositiveSentiment}%
            </span>
            <span className="text-xs text-[#2E9C87] font-semibold">positivo</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Monitorando Instagram, TikTok, X e WhatsApp
          </div>
        </div>
      </div>

      {/* Main Grid: Priority Street Tactics & Live Alert Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Tactical Action Plan for Street and Mobilization */}
        <div
          id="tactical-actions-panel"
          className="lg:col-span-2 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#F2EFE6] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4A537]" />
                Orientações Táticas de Campo (Hoje)
              </h2>
              <p className="text-xs text-slate-400">
                Ações imediatas geradas com base em dados de pesquisas e calor territorial
              </p>
            </div>
            <button
              onClick={() => onNavigate("ai_strategy")}
              className="px-3 py-1.5 rounded-lg bg-[#D4A537]/15 hover:bg-[#D4A537]/25 text-[#D4A537] text-xs font-bold border border-[#D4A537]/30 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3 h-3" />
              <span>Criar Discurso com IA</span>
            </button>
          </div>

          <div className="space-y-3">
            {territories.slice(0, 3).map((zone) => (
              <div
                key={zone.id}
                className="p-3.5 rounded-xl bg-[#16304A]/70 border border-[#1E3A5F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#F2EFE6]">
                      {zone.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        zone.status === "Reduto Consolidado"
                          ? "bg-emerald-950 text-emerald-300 border-emerald-700/60"
                          : zone.status === "Zona de Disputa"
                          ? "bg-amber-950 text-amber-300 border-amber-700/60"
                          : "bg-blue-950 text-blue-300 border-blue-700/60"
                      }`}
                    >
                      {zone.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {zone.ourVotePercentage}% dos votos
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="text-[#D4A537] font-semibold">Demanda Central:</span>{" "}
                    {zone.priorityDemand}
                  </p>
                  <p className="text-xs text-slate-400">
                    <span className="text-slate-300 font-semibold">Ação Tática:</span>{" "}
                    {zone.actionRequired}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate("hexmap")}
                  className="px-3 py-1.5 rounded-lg bg-[#0B1B2B] hover:bg-[#1E3A5F] text-xs text-[#F2EFE6] font-semibold border border-[#1E3A5F] transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Ver Zona</span>
                  <ChevronRight className="w-3 h-3 text-[#D4A537]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Live Critical Alerts Feed */}
        <div
          id="alerts-feed-panel"
          className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
              <h2 className="text-base font-bold text-[#F2EFE6] flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                Alertas da Campanha
              </h2>
              <span className="text-xs text-slate-400">{alerts.length} ativos</span>
            </div>

            <div className="mt-3 space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-xl border text-xs ${
                    alert.type === "CRITICAL"
                      ? "bg-rose-950/30 border-rose-800/50 text-rose-200"
                      : alert.type === "OPPORTUNITY"
                      ? "bg-emerald-950/30 border-emerald-800/50 text-emerald-200"
                      : "bg-amber-950/30 border-amber-800/50 text-amber-200"
                  }`}
                >
                  <p className="font-bold text-white leading-snug">{alert.title}</p>
                  <p className="mt-1 text-[11px] opacity-90">{alert.description}</p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                    {alert.actionLabel && (
                      <button
                        onClick={() => onOpenAlertAction(alert)}
                        className="px-2.5 py-1 rounded bg-[#0B1B2B] hover:bg-[#D4A537] hover:text-[#0B1B2B] text-[#D4A537] font-bold text-[10px] border border-[#1E3A5F] transition-all"
                      >
                        {alert.actionLabel} →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Legal Safety Badge */}
          <div className="mt-4 p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#2E9C87] shrink-0" />
            <div className="text-[11px] text-slate-300">
              <span className="font-bold text-white">Compliance Eleitoral:</span> Todas as
              projeções seguem os parâmetros da Res. TSE nº 23.610 e art. 109 do Código Eleitoral.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
