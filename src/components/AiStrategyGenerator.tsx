import React, { useState } from "react";
import { CandidateProfile, TerritoryZone } from "../types";
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Maximize2,
  RefreshCw,
  Send,
  Sliders,
  Shield,
  FileText,
  Volume2,
  Video,
  Share2,
  MessageSquare,
} from "lucide-react";

interface AiStrategyGeneratorProps {
  candidate: CandidateProfile;
  initialTopic?: string;
  initialLocation?: string;
  initialFormat?: string;
  initialBrief?: string;
}

export const AiStrategyGenerator: React.FC<AiStrategyGeneratorProps> = ({
  candidate,
  initialTopic = "Saúde e Atendimento Básico",
  initialLocation = candidate.location,
  initialFormat = "Discurso de Comício / Palanque",
  initialBrief = "",
}) => {
  // Form state
  const [contentType, setContentType] = useState<string>(initialFormat);
  const [topic, setTopic] = useState<string>(initialTopic);
  const [targetAudience, setTargetAudience] = useState<string>(
    "Famílias de baixa renda e mães trabalhadoras da periferia"
  );
  const [tone, setTone] = useState<string>("Propositivo e Inspirador");
  const [location, setLocation] = useState<string>(initialLocation);
  const [customBrief, setCustomBrief] = useState<string>(initialBrief);

  // Generation status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<string>("");
  const [generationSource, setGenerationSource] = useState<string>("");
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [teleprompterMode, setTeleprompterMode] = useState<boolean>(false);

  // Content type formats
  const formatOptions = [
    { label: "Plano Completo de Marketing para Redes Sociais (Instagram, TikTok & WhatsApp)", icon: Share2 },
    { label: "Discurso de Comício / Palanque", icon: Volume2 },
    { label: "Roteiro Vídeo Curto (TikTok / Reels 45s)", icon: Video },
    { label: "Post Carrossel Educativo para Instagram", icon: Share2 },
    { label: "Disparo Estratégico para WhatsApp da Militância", icon: MessageSquare },
    { label: "Roteiro para Rádio e TV (Horário Eleitoral)", icon: FileText },
    { label: "Resposta a Ataque / Nota de Desmentido", icon: Shield },
    { label: "Proposta Detalhada de Plano de Governo", icon: Sparkles },
  ];

  const topicOptions = [
    "Transporte Coletivo & Integração Metrô/BRT/Ônibus",
    "Saúde Básica & Fila Única da Regulação Estadual",
    "Educação & Vagas em Creches em Tempo Integral",
    "Contenção de Encostas Geotécnicas & Defesa Civil",
    "Segurança Pública & Policiamento Comunitário",
    "Emprego, Turismo Cultural & Apoio ao Comércio Popular",
    "Habitação de Interesse Social & Saneamento",
    "Juventude, Tecnologia & Polo Salvador Tech",
  ];

  const bahiaTopicPresets = [
    {
      title: "Transporte Salvador (Metrô/BRT)",
      topic: "Transporte Coletivo & Integração Metrô/BRT/Ônibus",
      location: "Salvador - BA (Estação Pirajá e Lapa)",
      format: "Plano Completo de Marketing para Redes Sociais (Instagram, TikTok & WhatsApp)",
      brief: "Destacar a tarifa integrada, ampliação das faixas exclusivas do BRT e nova frota climatizada.",
    },
    {
      title: "Saúde & Fila de Regulação Bahia",
      topic: "Saúde Básica & Fila Única da Regulação Estadual",
      location: "Salvador e Interior da Bahia",
      format: "Discurso de Comício / Palanque",
      brief: "Abordar com firmeza e sensibilidade a urgência de zerar a fila de exames e cirurgias reguladas.",
    },
    {
      title: "Encostas & Drenagem Salvador",
      topic: "Contenção de Encostas Geotécnicas & Defesa Civil",
      location: "Salvador - BA (Brotas, Pau da Lima e Cajazeiras)",
      format: "Roteiro Vídeo Curto (TikTok / Reels 45s)",
      brief: "Gravar no local de uma encosta já protegida com geomanta, mostrando o trabalho prático que salva vidas.",
    },
    {
      title: "WhatsApp da Militância (Bahia)",
      topic: "Emprego, Turismo Cultural & Apoio ao Comércio Popular",
      location: "Salvador - BA",
      format: "Disparo Estratégico para WhatsApp da Militância",
      brief: "Mensagem calorosa e mobilizadora convocando os líderes comunitários para a grande caminhada.",
    },
  ];

  const audienceOptions = [
    "Famílias trabalhadoras e periferia",
    "Jovens estudantes e universitários",
    "Mulheres e mães chefes de família",
    "Comerciantes e pequenos empresários",
    "Servidores públicos e professores",
    "Idosos e aposentados",
  ];

  const toneOptions = [
    "Propositivo e Inspirador",
    "Firme e Combativo",
    "Emocional e Humano",
    "Técnico e Seguro",
    "Popular e Próximo das Ruas",
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setHasCopied(false);

    try {
      const response = await fetch("/api/ai/speech-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sphere: candidate.sphere,
          role: candidate.role,
          candidateName: candidate.ballotName,
          party: candidate.party,
          topic,
          targetAudience,
          tone,
          contentType,
          location,
          customBrief,
        }),
      });

      const data = await response.json();
      if (data.content) {
        setGeneratedResult(data.content);
        setGenerationSource(data.source || "gemini");
      } else {
        setGeneratedResult("Falha ao receber conteúdo da IA.");
      }
    } catch (err: any) {
      console.error(err);
      setGeneratedResult(
        "Erro de conexão com o servidor. Verifique a conexão e tente novamente."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!generatedResult) return;
    const blob = new Blob([generatedResult], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `E-Candidato_${candidate.ballotName}_${topic.replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="ai-strategy-generator-container" className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Motor de IA Eleitoral
            </span>
            <span className="text-xs text-slate-400">
              Personalizado para {candidate.role} ({candidate.sphere})
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#F2EFE6] mt-1">
            Gerador de Estratégias, Discursos & Materiais de Engajamento
          </h2>
          <p className="text-xs text-slate-300">
            Formule discursos comoventes, roteiros virais e notas de esclarecimento com diretrizes de conformidade jurídica do TSE.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-[#0B1B2B] text-slate-300 border border-[#1E3A5F] flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#2E9C87] animate-pulse" />
            Gemini 3.8 Flash Ativo
          </span>
        </div>
      </div>

      {/* Bahia Quick Strategic Topics */}
      <div className="p-3 bg-[#0B1B2B] rounded-xl border border-[#1E3A5F] flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#D4A537] font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pautas Bahia (1-Clique):</span>
        </span>
        {bahiaTopicPresets.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setTopic(p.topic);
              setLocation(p.location);
              setContentType(p.format);
              setCustomBrief(p.brief);
            }}
            className="px-2.5 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[11px] font-semibold text-slate-200 border border-[#1E3A5F] hover:border-[#D4A537]/50 transition-all"
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Main Grid: Form Controls (Left) & Result Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 cols: Strategic Configuration */}
        <div
          id="ai-form-card"
          className="lg:col-span-5 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
            <h3 className="text-sm font-bold text-[#F2EFE6] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#D4A537]" />
              Parâmetros Estruturais
            </h3>
            <span className="text-[11px] text-slate-400">Personalização Total</span>
          </div>

          {/* Formato / Content Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Formato do Material Político:
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {formatOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = contentType === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => setContentType(opt.label)}
                    className={`px-3 py-2 rounded-xl text-left text-xs font-semibold border flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? "bg-[#D4A537] text-[#0B1B2B] font-bold border-[#D4A537] shadow-sm"
                        : "bg-[#0B1B2B] text-slate-300 hover:text-white border-[#1E3A5F]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Eixo Temático */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Eixo Temático Central:
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-[#F2EFE6] focus:outline-none focus:border-[#D4A537]"
            >
              {topicOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Público-Alvo */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Público Prioritário:
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-[#F2EFE6] focus:outline-none focus:border-[#D4A537]"
            >
              {audienceOptions.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Tom do Discurso */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Tom e Postura da Oratória:
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-[#F2EFE6] focus:outline-none focus:border-[#D4A537]"
            >
              {toneOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Território / Bairro */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Território ou Bairro do Evento:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-[#F2EFE6] focus:outline-none focus:border-[#D4A537]"
              placeholder="Ex: Maceió - AL, Bairro Benedito Bentes..."
            />
          </div>

          {/* Instruções Adicionais */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Instruções Específicas da Campanha (Opcional):
            </label>
            <textarea
              rows={2}
              value={customBrief}
              onChange={(e) => setCustomBrief(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-xs text-slate-200 focus:outline-none focus:border-[#D4A537]"
              placeholder="Ex: Mencionar a liderança comunitária Seu Jorge, destacar compromisso com o hospital infantil..."
            />
          </div>

          {/* Submit Button */}
          <button
            id="btn-trigger-ai-strategy"
            disabled={isGenerating}
            onClick={handleGenerate}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4A537] via-[#F3BA38] to-[#D4A537] hover:brightness-110 text-[#0B1B2B] font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#D4A537]/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#0B1B2B]" />
                <span>Processando Inteligência Eleitoral...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar Peça Eleitoral com IA</span>
              </>
            )}
          </button>
        </div>

        {/* Right 7 cols: Generated Result & Teleprompter */}
        <div
          id="ai-output-panel"
          className="lg:col-span-7 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4A537]" />
                <span className="font-bold text-sm text-[#F2EFE6]">
                  Material Gerado para a Campanha
                </span>
                {generationSource && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#16304A] text-slate-300 border border-[#1E3A5F]">
                    {generationSource === "gemini" ? "Gemini Neural" : "Motor Estratégico"}
                  </span>
                )}
              </div>

              {/* Tools: Copy, Teleprompter, Download */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTeleprompterMode(!teleprompterMode)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                    teleprompterMode
                      ? "bg-[#D4A537] text-[#0B1B2B] border-[#D4A537]"
                      : "bg-[#0B1B2B] text-slate-300 border-[#1E3A5F] hover:text-white"
                  }`}
                  title="Modo Teleprompter de Leitura"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Teleprompter</span>
                </button>

                <button
                  onClick={handleCopy}
                  disabled={!generatedResult}
                  className="p-1.5 rounded-lg bg-[#0B1B2B] hover:bg-[#16304A] text-slate-300 hover:text-white border border-[#1E3A5F] text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-40"
                  title="Copiar texto"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2E9C87]" />
                      <span className="text-[#2E9C87]">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copiar</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadTxt}
                  disabled={!generatedResult}
                  className="p-1.5 rounded-lg bg-[#0B1B2B] hover:bg-[#16304A] text-slate-300 hover:text-white border border-[#1E3A5F] text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-40"
                  title="Baixar em formato TXT"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Exportar</span>
                </button>
              </div>
            </div>

            {/* Generated Text Screen */}
            <div
              className={`p-4 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] min-h-[420px] max-h-[560px] overflow-y-auto leading-relaxed transition-all ${
                teleprompterMode
                  ? "text-lg md:text-xl font-medium text-amber-200 leading-loose"
                  : "text-xs md:text-sm text-slate-200"
              }`}
            >
              {isGenerating ? (
                <div className="h-96 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-[#1E3A5F] border-t-[#D4A537] animate-spin" />
                  <div>
                    <p className="font-bold text-[#F2EFE6] text-sm">
                      Conectando ao Modelo Gemini 3.8 Flash...
                    </p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">
                      Sintetizando demandas de {location}, estruturando ganchos retóricos e validando conformidade eleitoral.
                    </p>
                  </div>
                </div>
              ) : generatedResult ? (
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {generatedResult}
                </div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center space-y-3 text-center p-6 text-slate-500">
                  <Sparkles className="w-10 h-10 text-[#D4A537]/50" />
                  <p className="text-sm font-semibold text-slate-300">
                    Nenhum material gerado ainda nesta sessão.
                  </p>
                  <p className="text-xs text-slate-400 max-w-md">
                    Selecione o formato desejado, o tema prioritário e o tom do candidato nos controles ao lado e clique em <strong>"Gerar Peça Eleitoral com IA"</strong>.
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="mt-2 px-4 py-2 rounded-xl bg-[#D4A537]/20 hover:bg-[#D4A537]/30 text-[#D4A537] text-xs font-bold border border-[#D4A537]/40 transition-colors"
                  >
                    Gerar Discurso Padrão Imediato
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* TSE Disclaimer */}
          <div className="p-3 rounded-xl bg-[#16304A]/60 border border-[#1E3A5F] text-[11px] text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#2E9C87]" />
              Orientação TSE: Todos os materiais devem exibir a legenda partidária e o CNPJ de campanha.
            </span>
            <span className="font-mono text-[10px] text-[#D4A537]">
              {candidate.party} • Nº {candidate.number}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
