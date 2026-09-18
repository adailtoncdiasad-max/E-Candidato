import React, { useState } from "react";
import { SocietalTheme, CandidateProfile } from "../types";
import {
  HelpCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Users,
} from "lucide-react";

interface SocietalThemesProps {
  themes: SocietalTheme[];
  candidate: CandidateProfile;
  onGenerateThemeProposal: (theme: SocietalTheme) => void;
}

export const SocietalThemes: React.FC<SocietalThemesProps> = ({
  themes = [],
  candidate,
  onGenerateThemeProposal,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(
    themes[0]?.id || ""
  );

  const selectedTheme =
    themes.find((t) => t.id === selectedThemeId) ||
    themes[0] ||
    null;

  return (
    <div id="societal-themes-container" className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 uppercase tracking-wide">
              Voz da Sociedade
            </span>
            <span className="text-xs text-slate-400">
              Demandas Cidadãs, Cobranças & Soluções Programáticas
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#F2EFE6] mt-1">
            Temas Prioritários & Análise de Reclamações
          </h2>
          <p className="text-xs text-slate-300">
            Saiba onde a população mais sofre e como posicionar a proposta de governo de {candidate.ballotName}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {themes.length} eixos programáticos mapeados
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 cols: Themes List */}
        <div className="lg:col-span-5 space-y-3">
          {themes.map((theme) => {
            const isSelected = selectedTheme?.id === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all space-y-2 ${
                  isSelected
                    ? "bg-[#16304A] border-[#D4A537] shadow-lg shadow-[#D4A537]/15 ring-1 ring-[#D4A537]"
                    : "bg-[#112233] border-[#1E3A5F] hover:bg-[#16304A]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#F2EFE6]">{theme.name}</h4>
                  <span className="text-[11px] font-mono font-bold text-rose-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    Urgência: {theme.urgencyScore}%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Insatisfação Popular:</span>
                    <span className="text-rose-400 font-bold">{theme.sentimentNegative}%</span>
                  </div>
                  <div className="w-full bg-[#0B1B2B] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full"
                      style={{ width: `${theme.sentimentNegative}%` }}
                    />
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex justify-between pt-1">
                  <span>{theme.mentionsCount.toLocaleString("pt-BR")} menções</span>
                  <span className="text-[#D4A537]">Ver detalhes →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 7 cols: Detailed Proposal & Citizen Complaints */}
        {selectedTheme && (
          <div className="lg:col-span-7 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-[#1E3A5F] pb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Eixo Temático Selecionado
                </span>
                <h3 className="text-xl font-bold text-[#F2EFE6] mt-0.5">
                  {selectedTheme.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Índice de Urgência Social: <strong>{selectedTheme.urgencyScore}/100</strong> • Volume de Reclamações: <strong>{selectedTheme.mentionsCount.toLocaleString("pt-BR")}</strong>
                </p>
              </div>

              {/* Top Citizen Demands / Dores da População */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Principais Queixas e Dores da População:
                </span>
                <div className="space-y-2">
                  {(selectedTheme.topDemands || []).map((demand, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-100 flex items-start gap-2.5"
                    >
                      <span className="w-4 h-4 rounded-full bg-rose-900/60 text-rose-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{demand}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Campaign Proposal */}
              <div className="p-4 rounded-xl bg-[#0B1B2B] border border-[#2E9C87]/40 space-y-2">
                <span className="text-xs font-bold text-[#2E9C87] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Proposta Oficial da Campanha ({candidate.ballotName}):
                </span>
                <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">
                  "{selectedTheme.campaignProposal}"
                </p>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-2">
              <button
                onClick={() => onGenerateThemeProposal(selectedTheme)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38520] hover:brightness-110 text-[#0B1B2B] font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#D4A537]/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Gerar Peça Publicitária & Discurso sobre {selectedTheme.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
