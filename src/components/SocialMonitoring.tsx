import React, { useState } from "react";
import { SocialNetworkStat, CandidateProfile } from "../types";
import {
  Share2,
  TrendingUp,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Video,
  AlertTriangle,
  Sparkles,
  Flame,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface SocialMonitoringProps {
  socialStats: SocialNetworkStat[];
  candidate: CandidateProfile;
  onTriggerCrisisAI: (crisisDescription: string, platform: string) => void;
}

export const SocialMonitoring: React.FC<SocialMonitoringProps> = ({
  socialStats,
  candidate,
  onTriggerCrisisAI,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Instagram");
  const [activeCrisisInput, setActiveCrisisInput] = useState<string>(
    "Ataque desonesto com vídeo recortado fora de contexto circulando em grupos de WhatsApp sobre privatização de postos de saúde."
  );

  const currentStat =
    socialStats.find((s) => s.platform.includes(selectedPlatform)) ||
    socialStats[0];

  // Total social audience
  const totalAudience = socialStats.reduce((acc, s) => acc + s.followers, 0);

  // Platform icon helper
  const getPlatformIcon = (platform: string) => {
    if (platform.includes("Instagram")) return Instagram;
    if (platform.includes("TikTok")) return Video;
    if (platform.includes("X") || platform.includes("Twitter")) return Twitter;
    if (platform.includes("YouTube")) return Youtube;
    return MessageCircle;
  };

  return (
    <div id="social-monitoring-container" className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 uppercase">
              Monitoramento Digital
            </span>
            <span className="text-xs text-slate-400">
              Escuta Social Ativa & Análise de Sentimento em Tempo Real
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#F2EFE6] mt-1">
            Redes Sociais, Engajamento & Sentimento do Eleitor
          </h2>
          <p className="text-xs text-slate-300">
            Acompanhe o volume de menções, alcance orgânico e polarização da imagem de {candidate.ballotName}.
          </p>
        </div>

        {/* Total Reach Pill */}
        <div className="flex items-center gap-3 bg-[#16304A] px-4 py-2 rounded-xl border border-[#1E3A5F]">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Comunidade Digital Total
            </span>
            <span className="text-lg font-extrabold text-[#D4A537]">
              {totalAudience.toLocaleString("pt-BR")}
            </span>
          </div>
          <div className="h-8 w-px bg-[#1E3A5F]" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Crescimento Médio
            </span>
            <span className="text-xs font-mono font-bold text-[#2E9C87] flex items-center">
              ▲ +7.8%/sem.
            </span>
          </div>
        </div>
      </div>

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {socialStats.map((item) => {
          const Icon = getPlatformIcon(item.platform);
          const isSelected = selectedPlatform === item.platform.split(" ")[0];

          return (
            <button
              key={item.platform}
              onClick={() => setSelectedPlatform(item.platform.split(" ")[0])}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between h-28 ${
                isSelected
                  ? "bg-[#16304A] border-[#D4A537] shadow-lg shadow-[#D4A537]/15 ring-1 ring-[#D4A537]"
                  : "bg-[#112233] border-[#1E3A5F] hover:bg-[#16304A]/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#D4A537]" />
                  <span className="text-xs font-bold text-[#F2EFE6] truncate">
                    {item.platform.split(" ")[0]}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#2E9C87]">
                  +{item.weeklyGrowth}%
                </span>
              </div>

              <div>
                <span className="text-lg font-extrabold font-mono text-[#F2EFE6] block">
                  {item.followers.toLocaleString("pt-BR")}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Engaj: {item.engagementRate}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive on Selected Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Sentiment Thermometer & Top Metrics */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-5">
          <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
            <h3 className="text-base font-bold text-[#F2EFE6] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#D4A537]" />
              Painel de Sentimento: {currentStat.platform}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Impressões Top Post: {currentStat.topPostImpressions.toLocaleString("pt-BR")}
            </span>
          </div>

          {/* Sentiment Gauge Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-emerald-400 flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5" /> Positivo ({currentStat.sentiment.positive}%)
              </span>
              <span className="text-slate-400">
                Neutro ({currentStat.sentiment.neutral}%)
              </span>
              <span className="text-rose-400 flex items-center gap-1">
                <ThumbsDown className="w-3.5 h-3.5" /> Negativo ({currentStat.sentiment.negative}%)
              </span>
            </div>

            <div className="w-full bg-[#0B1B2B] h-4 rounded-full overflow-hidden flex border border-[#1E3A5F]">
              <div
                className="bg-emerald-500 transition-all duration-500"
                style={{ width: `${currentStat.sentiment.positive}%` }}
                title={`Positivo: ${currentStat.sentiment.positive}%`}
              />
              <div
                className="bg-slate-500 transition-all duration-500"
                style={{ width: `${currentStat.sentiment.neutral}%` }}
                title={`Neutro: ${currentStat.sentiment.neutral}%`}
              />
              <div
                className="bg-rose-500 transition-all duration-500"
                style={{ width: `${currentStat.sentiment.negative}%` }}
                title={`Negativo: ${currentStat.sentiment.negative}%`}
              />
            </div>
          </div>

          {/* Trending Topics & Narrative Cloud */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Narrativas e Tópicos mais Associados:
            </span>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-3 py-1 rounded-lg bg-[#D4A537]/15 border border-[#D4A537]/40 text-[#D4A537] text-xs font-bold">
                {currentStat.trendingTopic}
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs font-medium">
                #CorujãoDaSaúde
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#16304A] border border-[#1E3A5F] text-slate-200 text-xs font-medium">
                #MaceióMereceMais
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#16304A] border border-[#1E3A5F] text-slate-200 text-xs font-medium">
                #PropostasReais
              </span>
              <span className="px-3 py-1 rounded-lg bg-rose-950/60 border border-rose-700/60 text-rose-300 text-xs font-medium">
                #TaxaDeLixoNão
              </span>
            </div>
          </div>

          {/* Strategic Digital Directive */}
          <div className="p-3.5 rounded-xl bg-[#16304A]/60 border border-[#1E3A5F] text-xs text-slate-300 space-y-1">
            <span className="font-bold text-[#D4A537] block uppercase text-[11px]">
              Recomendação de Postagem para {currentStat.platform}:
            </span>
            <p>
              {currentStat.platform.includes("TikTok")
                ? "Priorizar vídeos de 45 segundos gravados nas ruas em estilo POV (ponto de vista), com cortes rápidos e áudio em alta. O gancho deve ser lançado nos primeiros 3 segundos."
                : currentStat.platform.includes("Instagram")
                ? "Publicar carrossel explicativo de 5 lâminas com contraste alto amarelo/marinho detalhando como funciona o Voucher Mãe Cidadã. Horário nobre: 12h30 ou 19h45."
                : "Manter tom institucional, compartilhar links de reportagens e responder com serenidade a ataques coordenados."}
            </p>
          </div>
        </div>

        {/* Right 5 cols: Fast Crisis & Fact-Checking Shield */}
        <div
          id="crisis-center-card"
          className="lg:col-span-5 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="border-b border-[#1E3A5F] pb-3 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#F2EFE6] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Muralha Anti-Crise & Desinformação
              </h3>
              <span className="text-[10px] uppercase font-bold text-rose-300 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800">
                Alerta Ativo
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Detectou um ataque, montagem ou notícia falsa nas redes? Cole a descrição abaixo para que o motor de IA formule uma resposta legal e comunicacional imediata.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">
                Descrição do Ataque / Boato:
              </label>
              <textarea
                value={activeCrisisInput}
                onChange={(e) => setActiveCrisisInput(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-slate-200 focus:outline-none focus:border-[#D4A537]"
                placeholder="Descreva o que estão divulgando contra o candidato..."
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onTriggerCrisisAI(activeCrisisInput, currentStat.platform)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Gerar Contra-Ataque & Defesa com IA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-slate-500 text-center block mt-1.5">
              Gera nota oficial, vídeo de 30s e roteiro para grupos de WhatsApp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
