import React from "react";
import {
  LayoutDashboard,
  LineChart,
  MapPin,
  Share2,
  Sparkles,
  Users2,
  HelpCircle,
  History,
  DollarSign,
  Calculator,
  ChevronRight,
  TrendingUp,
  Smartphone,
  X,
  Database,
  Calendar,
  FlaskConical,
  Users,
  BellRing,
} from "lucide-react";
import { CandidateProfile } from "../types";

export type NavModule =
  | "overview"
  | "volunteers_push"
  | "events_calendar"
  | "scenario_simulator"
  | "multi_candidates"
  | "polls"
  | "hexmap"
  | "social"
  | "ai_strategy"
  | "competitors"
  | "themes"
  | "historical"
  | "finances"
  | "quotient_sim"
  | "tse_data";

interface SidebarProps {
  currentModule?: NavModule;
  activeModule?: NavModule;
  onSelectModule: (module: NavModule) => void;
  candidate?: CandidateProfile;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
  onOpenExportModal?: () => void;
  currentSphere?: string;
  alertsCount?: number;
}

interface MenuItem {
  id: NavModule;
  label: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  activeModule,
  onSelectModule,
  candidate,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
  onOpenExportModal,
}) => {
  const selectedModule = currentModule || activeModule || "overview";
  const safeCandidate = candidate || {
    currentEstimatedVotes: 145000,
    targetVotes: 180000,
    ballotName: "Candidato",
    number: "00",
  };
  const menuItems: MenuItem[] = [
    {
      id: "overview",
      label: "Visão Geral (Cockpit)",
      icon: LayoutDashboard,
    },
    {
      id: "volunteers_push",
      label: "Voluntários & Push",
      badge: "Militância",
      badgeColor: "text-rose-300 bg-rose-950/60 border-rose-700/50",
      icon: BellRing,
    },
    {
      id: "events_calendar",
      label: "Agenda & Calendário",
      badge: "Mobilização",
      badgeColor: "text-amber-300 bg-amber-950/60 border-amber-700/50",
      icon: Calendar,
    },
    {
      id: "scenario_simulator",
      label: "Simulador de Propostas",
      badge: "Testador IA",
      badgeColor: "text-[#D4A537] bg-[#D4A537]/20 border-[#D4A537]/50",
      icon: FlaskConical,
    },
    {
      id: "multi_candidates",
      label: "Gestão Multi-Candidatos",
      badge: "Comitê",
      badgeColor: "text-cyan-300 bg-cyan-950/60 border-cyan-700/50",
      icon: Users,
    },
    {
      id: "polls",
      label: "Predição & Pesquisas",
      badge: "Monte Carlo",
      badgeColor: "text-amber-300 bg-amber-950/60 border-amber-700/50",
      icon: LineChart,
    },
    {
      id: "hexmap",
      label: "Espacialização & Território",
      badge: "Zonas",
      badgeColor: "text-teal-300 bg-teal-950/60 border-teal-700/50",
      icon: MapPin,
    },
    {
      id: "social",
      label: "Redes & Sentimento",
      badge: "Tempo Real",
      badgeColor: "text-emerald-300 bg-emerald-950/60 border-emerald-700/50",
      icon: Share2,
    },
    {
      id: "ai_strategy",
      label: "Discursos & Marketing Digital",
      badge: "Redes & Bahia",
      badgeColor: "text-[#D4A537] bg-[#D4A537]/15 border-[#D4A537]/40",
      icon: Sparkles,
    },
    {
      id: "competitors",
      label: "Comparação de Concorrentes",
      icon: Users2,
    },
    {
      id: "themes",
      label: "Temas & Demandas Sociais",
      icon: HelpCircle,
    },
    {
      id: "historical",
      label: "Histórico Eleitoral TSE",
      icon: History,
    },
    {
      id: "finances",
      label: "Finanças & Compliance TSE",
      icon: DollarSign,
    },
    {
      id: "quotient_sim",
      label: "Simulador Quociente (QE)",
      badge: "TSE 80/20",
      badgeColor: "text-blue-300 bg-blue-950/60 border-blue-700/50",
      icon: Calculator,
    },
    {
      id: "tse_data",
      label: "Base de Dados TSE (API)",
      badge: "182 Datasets",
      badgeColor: "text-emerald-300 bg-emerald-950/60 border-emerald-700/50",
      icon: Database,
    },
  ];

  const votePctReached = Math.min(
    100,
    Math.round((safeCandidate.currentEstimatedVotes / safeCandidate.targetVotes) * 100)
  );

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Módulos Estratégicos
          </span>
          {setIsMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = selectedModule === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => {
                  onSelectModule(item.id);
                  if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#16304A] text-[#F2EFE6] border border-[#D4A537]/50 shadow-sm shadow-[#D4A537]/10"
                    : "text-slate-300 hover:text-white hover:bg-[#112233]"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      active ? "text-[#D4A537]" : "text-slate-400"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge ? (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                ) : active ? (
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4A537] shrink-0" />
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 mt-4">
        {/* App Versions Button (Android & HTML) */}
        {onOpenExportModal && (
          <button
            onClick={() => {
              onOpenExportModal();
              if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            id="sidebar-export-modal-trigger"
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#2E9C87]/15 hover:bg-[#2E9C87]/25 border border-[#2E9C87]/40 text-left transition-all"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#2E9C87]" />
              <div>
                <span className="text-xs font-bold text-white block">Versões Android & HTML</span>
                <span className="text-[10px] text-emerald-300 block">Instalar App ou Baixar .HTML</span>
              </div>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#2E9C87] text-[#0B1B2B] uppercase">
              App
            </span>
          </button>
        )}

        {/* Target Votes Progress Card in Sidebar Footer */}
        <div
          id="sidebar-target-card"
          className="p-3.5 rounded-xl bg-gradient-to-b from-[#112233] to-[#16304A] border border-[#1E3A5F]"
        >
          <div className="flex items-center justify-between text-xs font-bold text-[#F2EFE6] mb-1.5">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#2E9C87]" />
              Meta de Votos
            </span>
            <span className="text-[#D4A537] font-mono">{votePctReached}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#0B1B2B] h-2 rounded-full overflow-hidden p-0.5 border border-[#1E3A5F]">
            <div
              className="bg-gradient-to-r from-[#2E9C87] to-[#D4A537] h-full rounded-full transition-all duration-500"
              style={{ width: `${votePctReached}%` }}
            />
          </div>

          <div className="mt-2 text-[11px] text-slate-300 flex justify-between">
            <span>Est: {safeCandidate.currentEstimatedVotes.toLocaleString("pt-BR")}</span>
            <span className="text-slate-400">
              Meta: {safeCandidate.targetVotes.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        id="main-sidebar"
        className="hidden lg:flex w-64 bg-[#0B1B2B] border-r border-[#1E3A5F] flex-col justify-between p-3 shrink-0"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#0B1B2B] border-r border-[#1E3A5F] p-4 flex flex-col justify-between z-10 h-full overflow-y-auto">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
