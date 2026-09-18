import React, { useState } from "react";
import {
  Vote,
  ShieldCheck,
  Bell,
  Sparkles,
  MapPin,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  X,
  SlidersHorizontal,
  Menu,
  Smartphone,
  Database,
  Users,
} from "lucide-react";
import { CandidateProfile, ElectoralSphere, CriticalAlert } from "../types";
import { PWAInstallButton } from "./PWAInstallButton";

interface NavbarProps {
  currentSphere: ElectoralSphere;
  onSelectSphere?: (sphere: ElectoralSphere) => void;
  onSphereChange?: (sphere: ElectoralSphere) => void;
  candidate: CandidateProfile;
  alerts: CriticalAlert[];
  onOpenAlertAction: (alert: CriticalAlert) => void;
  onEditCandidate?: () => void;
  onOpenCandidateModal?: () => void;
  onOpenExportModal?: () => void;
  onToggleMobileMenu?: () => void;
  onOpenTseData?: () => void;
  onOpenMultiCandidates?: () => void;
  onOpenVolunteersPush?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSphere,
  onSelectSphere,
  onSphereChange,
  candidate,
  alerts,
  onOpenAlertAction,
  onEditCandidate,
  onOpenCandidateModal,
  onOpenExportModal,
  onToggleMobileMenu,
  onOpenTseData,
  onOpenMultiCandidates,
  onOpenVolunteersPush,
}) => {
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);

  const handleSphereClick = (sphere: ElectoralSphere) => {
    if (onSelectSphere) onSelectSphere(sphere);
    if (onSphereChange) onSphereChange(sphere);
  };

  const handleEditClick = () => {
    if (onEditCandidate) onEditCandidate();
    if (onOpenCandidateModal) onOpenCandidateModal();
  };

  const spheres: ElectoralSphere[] = ["Municipal", "Estadual", "Federal"];

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-[#0B1B2B]/95 backdrop-blur border-b border-[#1E3A5F] px-4 lg:px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand / Title & Mobile Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            {onToggleMobileMenu && (
              <button
                onClick={onToggleMobileMenu}
                id="mobile-menu-hamburger"
                className="lg:hidden p-2 rounded-xl bg-[#16304A] text-[#F2EFE6] border border-[#1E3A5F]"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-5 h-5 text-[#D4A537]" />
              </button>
            )}

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A537] to-[#996515] p-0.5 flex items-center justify-center shadow-lg shadow-[#D4A537]/20">
              <div className="w-full h-full bg-[#0B1B2B] rounded-[10px] flex items-center justify-center">
                <Vote className="w-5 h-5 text-[#D4A537]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#F2EFE6] font-['Cinzel']">
                  E-CANDIDATO
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40">
                  Eleições 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>Inteligência Eleitoral & Estratégia</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2E9C87]"></span>
                <span className="text-[#2E9C87] font-medium text-[11px]">Base TSE Bahia</span>
              </p>
            </div>
          </div>

          {/* Mobile shortcuts */}
          <div className="md:hidden flex items-center gap-2">
            {onOpenExportModal && (
              <button
                onClick={onOpenExportModal}
                id="mobile-export-btn"
                className="p-2 rounded-lg bg-[#2E9C87]/20 text-[#2E9C87] border border-[#2E9C87]/40"
                title="Versão Android e HTML"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            )}
            <button
              id="mobile-alerts-toggle"
              onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
              className="relative p-2 rounded-lg bg-[#16304A] text-[#F2EFE6] border border-[#1E3A5F]"
              aria-label="Alertas da campanha"
            >
              <Bell className="w-4 h-4 text-[#D4A537]" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sphere Switcher, Candidate Badge & Android/HTML Export */}
        <div className="flex items-center flex-wrap justify-center gap-3 w-full md:w-auto">
          {/* Sphere Buttons */}
          <div
            id="sphere-switcher-group"
            className="flex items-center p-1 bg-[#112233] border border-[#1E3A5F] rounded-xl shadow-inner"
          >
            {spheres.map((sphere) => {
              const active = currentSphere === sphere;
              return (
                <button
                  key={sphere}
                  id={`btn-sphere-${sphere.toLowerCase()}`}
                  onClick={() => handleSphereClick(sphere)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    active
                      ? "bg-[#D4A537] text-[#0B1B2B] font-bold shadow-md shadow-[#D4A537]/20"
                      : "text-slate-300 hover:text-white hover:bg-[#16304A]"
                  }`}
                >
                  {sphere}
                </button>
              );
            })}
          </div>

          {/* Active Candidate Badge */}
          <div
            id="candidate-badge-button"
            onClick={handleEditClick}
            className="group cursor-pointer flex items-center gap-3 px-3 py-1.5 bg-[#16304A] hover:bg-[#1C3B5E] border border-[#1E3A5F] hover:border-[#D4A537]/50 rounded-xl transition-all"
            title="Clique para editar dados do candidato"
          >
            <div className="w-7 h-7 rounded-full bg-[#D4A537]/20 border border-[#D4A537] text-[#D4A537] font-extrabold text-xs flex items-center justify-center">
              {candidate.number}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#F2EFE6] leading-tight">
                  {candidate.ballotName}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#0B1B2B] text-slate-300 border border-[#1E3A5F]">
                  {candidate.party}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#D4A537]" />
                <span>{candidate.location}</span>
                <span>•</span>
                <span className="text-[#2E9C87] font-semibold">{candidate.role}</span>
              </div>
            </div>
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#D4A537] transition-colors ml-1" />
          </div>

          {/* Multi-Candidates Quick Switcher Button */}
          {onOpenMultiCandidates && (
            <button
              onClick={onOpenMultiCandidates}
              id="header-multi-candidates-btn"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#112233] hover:bg-[#16304A] text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 text-xs font-bold transition-all shadow-sm"
              title="Acessar Gestão de Múltiplos Candidatos & Campanhas"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multi-Candidatos</span>
            </button>
          )}

          {/* Volunteers & Push Button */}
          {onOpenVolunteersPush && (
            <button
              onClick={onOpenVolunteersPush}
              id="header-volunteers-push-btn"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#112233] hover:bg-[#16304A] text-rose-300 hover:text-rose-200 border border-rose-500/40 text-xs font-bold transition-all shadow-sm"
              title="Acessar Gestão de Voluntários & Disparos de Alertas Push"
            >
              <Bell className="w-3.5 h-3.5 text-rose-400" />
              <span>Voluntários & Push</span>
            </button>
          )}

          {/* Android & HTML Versions Trigger Button */}
          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              id="header-export-btn"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2E9C87]/20 hover:bg-[#2E9C87]/30 text-[#2E9C87] hover:text-emerald-300 border border-[#2E9C87]/40 text-xs font-bold transition-all shadow-sm shadow-[#2E9C87]/10"
              title="Gerar Versões Android e HTML"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android & HTML</span>
            </button>
          )}

          {/* TSE Direct Connection Button */}
          {onOpenTseData && (
            <button
              onClick={onOpenTseData}
              id="header-tse-btn"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1B2B] hover:bg-[#16304A] text-[#D4A537] hover:text-amber-300 border border-[#D4A537]/40 text-xs font-bold transition-all shadow-sm"
              title="Acessar Base de Dados Abertos do TSE (CKAN API)"
            >
              <Database className="w-3.5 h-3.5 text-[#D4A537]" />
              <span>Base TSE</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </button>
          )}

          {/* Alerts Bell (Desktop) */}
          <div className="relative hidden md:block">
            <button
              id="desktop-alerts-toggle"
              onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
              className="relative p-2 rounded-xl bg-[#16304A] hover:bg-[#1C3B5E] text-[#F2EFE6] border border-[#1E3A5F] hover:border-[#D4A537]/40 transition-colors"
              aria-label="Alertas da campanha"
            >
              <Bell className="w-4 h-4 text-[#D4A537]" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {alerts.length}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {showAlertsDropdown && (
              <div
                id="alerts-dropdown-panel"
                className="absolute right-0 mt-2 w-80 md:w-96 bg-[#112233] border border-[#1E3A5F] rounded-2xl shadow-2xl z-50 p-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#1E3A5F]">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#D4A537]" />
                    <span className="font-bold text-sm text-[#F2EFE6]">
                      Radar de Alertas Eleitorais
                    </span>
                  </div>
                  <button
                    onClick={() => setShowAlertsDropdown(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-xl border text-xs ${
                        alert.type === "CRITICAL"
                          ? "bg-rose-950/40 border-rose-800/60 text-rose-200"
                          : alert.type === "OPPORTUNITY"
                          ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-200"
                          : "bg-amber-950/40 border-amber-800/60 text-amber-200"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {alert.type === "CRITICAL" ? (
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        ) : alert.type === "OPPORTUNITY" ? (
                          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-bold text-white leading-snug">{alert.title}</p>
                          <p className="mt-1 text-[11px] opacity-90">{alert.description}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                            {alert.actionLabel && (
                              <button
                                onClick={() => {
                                  setShowAlertsDropdown(false);
                                  onOpenAlertAction(alert);
                                }}
                                className="px-2 py-0.5 rounded bg-[#0B1B2B] hover:bg-[#D4A537] hover:text-[#0B1B2B] text-[#D4A537] font-semibold text-[10px] border border-[#1E3A5F] transition-colors"
                              >
                                {alert.actionLabel} →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
