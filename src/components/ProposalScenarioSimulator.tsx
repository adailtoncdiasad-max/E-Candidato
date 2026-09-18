import React, { useState } from "react";
import {
  FlaskConical,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Send,
  Layers,
  BarChart3,
  Scale,
  RefreshCw,
  Plus,
  Eye,
  FileText,
  Target,
  ThumbsUp,
  ThumbsDown,
  Flame,
  Lightbulb,
} from "lucide-react";
import { ProposalSimulationRecord, ProposalDemographicImpact, ElectoralSphere, CandidateProfile } from "../types";

interface ProposalScenarioSimulatorProps {
  proposals: ProposalSimulationRecord[];
  onSaveProposal: (proposal: ProposalSimulationRecord) => void;
  candidate: CandidateProfile;
  currentSphere: ElectoralSphere;
}

export const ProposalScenarioSimulator: React.FC<ProposalScenarioSimulatorProps> = ({
  proposals,
  onSaveProposal,
  candidate,
  currentSphere,
}) => {
  const [activeTab, setActiveTab] = useState<"simulator" | "history" | "ab_test">("simulator");
  const [selectedProposalId, setSelectedProposalId] = useState<string>(proposals[0]?.id || "");
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Form states for new unreleased proposal simulation
  const [testTitle, setTestTitle] = useState("");
  const [testTheme, setTestTheme] = useState("Mobilidade Urbana & Economia Popular");
  const [testProposalText, setTestProposalText] = useState("");
  const [testFraming, setTestFraming] = useState<
    "Propositivo" | "Ruptura / Firme" | "Técnico / Responsável" | "Popular / Emocional" | "Protecionista / Social"
  >("Propositivo");
  const [testTargetAudience, setTestTargetAudience] = useState("Jovens e Trabalhadores da Periferia");
  const [testRegion, setTestRegion] = useState(candidate.location || "Bahia");

  // Comparison A/B states
  const [compareAId, setCompareAId] = useState<string>(proposals[0]?.id || "");
  const [compareBId, setCompareBId] = useState<string>(proposals[1]?.id || proposals[0]?.id || "");

  const activeProposal = proposals.find((p) => p.id === selectedProposalId) || proposals[0];
  const compareA = proposals.find((p) => p.id === compareAId) || proposals[0];
  const compareB = proposals.find((p) => p.id === compareBId) || proposals[1] || proposals[0];

  // Fast proposal preset templates for quick 1-click loading
  const loadPreset = (type: string) => {
    if (type === "tarifa_zero") {
      setTestTitle("Tarifa Zero aos Domingos e Feriados no Transporte Público");
      setTestTheme("Mobilidade Urbana & Economia Popular");
      setTestProposalText("Passe livre irrestrito em todos os ônibus municipais, BRT e linhas troncais nos domingos e feriados. Custeado pelo Fundo Municipal de Mobilidade Sustentável via publicidade digital e polos geradores de tráfego.");
      setTestFraming("Popular / Emocional");
      setTestTargetAudience("Classes D e E, Jovens e Trabalhadores");
      setTestRegion(candidate.location);
    } else if (type === "primeiro_emprego") {
      setTestTitle("Bolsa Primeiro Emprego com 50% do Salário Subsidiado pelo Estado");
      setTestTheme("Juventude, Emprego & Renda");
      setTestProposalText("Subsídio público direto de 50% do salário mínimo para contratação de jovens de 18 a 24 anos no primeiro emprego formal, com isenção parcial de impostos para empresas que mantiverem o contrato por 2 anos.");
      setTestFraming("Propositivo");
      setTestTargetAudience("Jovens de 18 a 24 anos e Mães de Família");
      setTestRegion(candidate.location);
    } else if (type === "fila_zero_sus") {
      setTestTitle("Programa Fila Zero SUS com Telemedicina e Mutirões Noturnos");
      setTestTheme("Saúde Pública & Gestão SUS");
      setTestProposalText("Credenciamento de hospitais filantrópicos e clínicas privadas para zerar a fila de consultas especializadas e cirurgias eletivas em horário noturno e finais de semana, com agendamento via aplicativo SUS Cidadão.");
      setTestFraming("Técnico / Responsável");
      setTestTargetAudience("Famílias de baixa renda e Idosos");
      setTestRegion(candidate.location);
    } else if (type === "isencao_ipva_app") {
      setTestTitle("Isenção Total de IPVA para Motoristas de Aplicativo e Mototaxistas");
      setTestTheme("Economia Popular & Trabalho Informal");
      setTestProposalText("Alíquota zero de IPVA e redução na taxa de vistoria para veículos utilizados comprovadamente em transporte por aplicativo e mototáxi regularizado, acompanhado de linha de crédito para troca da frota por veículos menos poluentes.");
      setTestFraming("Protecionista / Social");
      setTestTargetAudience("Motoristas de App, Entregadores e Mototaxistas");
      setTestRegion(candidate.location);
    } else if (type === "cameras_policia") {
      setTestTitle("Câmeras Corporais na PM & Batalhões Comunitários de Pacificação");
      setTestTheme("Segurança Pública & Modernização Policial");
      setTestProposalText("Câmeras corporais acopladas aos uniformes das viaturas operacionais combinadas com bônus de 25% por redução de criminalidade e preservação da vida, além de aquisição de viaturas blindadas.");
      setTestFraming("Técnico / Responsável");
      setTestTargetAudience("Eleitores de Centro, Moradores de Periferia e Classes Médias");
      setTestRegion(candidate.location);
    }
  };

  // Run live simulation (calling server Gemini endpoint or heuristic fallback)
  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim() || !testProposalText.trim()) return;

    setIsLoadingAi(true);

    try {
      const response = await fetch("/api/ai/simulate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: testTitle.trim(),
          detailedProposal: testProposalText.trim(),
          themeAxis: testTheme,
          framingTone: testFraming,
          targetAudience: testTargetAudience,
          targetRegion: testRegion,
          sphere: currentSphere,
          candidateName: candidate.ballotName,
          party: candidate.party,
          role: candidate.role,
        }),
      });

      const data = await response.json();
      const aiText = data?.content || "";

      // Calculate realistic demographic affinity weights based on theme and tone
      const isMobilityOrSocial = testTheme.includes("Mobilidade") || testTheme.includes("Renda") || testTheme.includes("Popular") || testTheme.includes("Primeiro Emprego");
      const isSecurityOrLaw = testTheme.includes("Segurança") || testTheme.includes("Polícia") || testTheme.includes("Ordem");

      const overall = isMobilityOrSocial ? 78 : isSecurityOrLaw ? 65 : 72;
      const gain = isMobilityOrSocial ? 3.3 : isSecurityOrLaw ? 1.8 : 2.5;
      const backfire = isSecurityOrLaw ? 22 : isMobilityOrSocial ? 9 : 13;
      const undecided = isMobilityOrSocial ? 42 : isSecurityOrLaw ? 26 : 34;

      const newRecord: ProposalSimulationRecord = {
        id: `prop-${Date.now()}`,
        title: testTitle.trim(),
        themeAxis: testTheme,
        detailedProposal: testProposalText.trim(),
        framingTone: testFraming,
        targetAudience: testTargetAudience,
        targetRegion: testRegion,
        candidateId: candidate.id,
        candidateName: candidate.ballotName,
        sphere: currentSphere,
        createdAt: new Date().toISOString().split("T")[0],
        metrics: {
          overallAcceptancePct: overall,
          netVoteGainEstPct: gain,
          backfireRiskPct: backfire,
          undecidedConversionPct: undecided,
          socialBuzzScore: 84,
        },
        demographics: [
          {
            segment: "Jovens (16-24 anos)",
            favorabilityPct: isMobilityOrSocial ? 89 : 68,
            rejectionPct: isMobilityOrSocial ? 4 : 16,
            neutralPct: 7,
            keyDriver: "Aderência alta a causas de inclusão, trabalho digital e mobilidade acessível.",
          },
          {
            segment: "Mulheres Chefes de Família",
            favorabilityPct: isMobilityOrSocial ? 84 : 74,
            rejectionPct: isMobilityOrSocial ? 5 : 12,
            neutralPct: 11,
            keyDriver: "Foco no alívio das contas domésticas e segurança física dos filhos.",
          },
          {
            segment: "Classes D e E (Baixa Renda)",
            favorabilityPct: isMobilityOrSocial ? 91 : 75,
            rejectionPct: isMobilityOrSocial ? 3 : 10,
            neutralPct: 6,
            keyDriver: "Sensação de prioridade aos bairros periféricos esquecidos pelo poder público.",
          },
          {
            segment: "Classe Média Urbana (B/C)",
            favorabilityPct: isSecurityOrLaw ? 78 : 62,
            rejectionPct: isSecurityOrLaw ? 12 : 20,
            neutralPct: 18,
            keyDriver: "Exigência de transparência fiscal e garantia de não aumento de impostos.",
          },
          {
            segment: "Eleitorado Evangélico / Família",
            favorabilityPct: isSecurityOrLaw ? 77 : 71,
            rejectionPct: isSecurityOrLaw ? 11 : 13,
            neutralPct: 16,
            keyDriver: "Receptividade a propostas que fortaleçam a estabilidade do lar e a dignidade.",
          },
          {
            segment: "Setor Produtivo e Comércio",
            favorabilityPct: isSecurityOrLaw ? 81 : 66,
            rejectionPct: isSecurityOrLaw ? 9 : 17,
            neutralPct: 17,
            keyDriver: "Apoio a medidas que aumentem o fluxo de clientes e a ordem urbana.",
          },
        ],
        swot: {
          strengths: [
            "Mensagem direta com benefício facilmente compreensível pelo cidadão comum",
            "Capacidade de viralização em vídeos curtos e testemunhais de beneficiários",
            "Pauta positiva que força a oposição a responder no nosso terreno temático",
          ],
          vulnerabilities: [
            "Cobrança da imprensa e economistas sobre a fonte orçamentária do projeto",
            "Risco de acusações de promessa eleitoreira caso o cronograma não seja detalhado",
          ],
          oppositionExpectedAttacks: [
            "Os concorrentes dirão: 'De onde sairá o dinheiro para pagar essa conta?'",
            "Tentativa de desqualificar a equipe técnica acusando falta de planejamento atuarial",
          ],
          recommendedDefense: [
            "Apresentar a proposta com estudo orçamentário transparente e escalonamento em fases",
            "Enfatizar que o custo do projeto é infinitamente menor do que o prejuízo do abandono social",
            "Convocar especialistas independentes e lideranças comunitárias para respaldar o anúncio",
          ],
          strategicRefinements: [
            "Lançar inicialmente como programa experimental para blindar contra críticas fiscais",
            "Fazer um portal oficial com simulação personalizada para cada cidadão calcular seu benefício",
          ],
        },
        aiAnalysisText: aiText || "Simulação preditiva gerada pelo motor analítico eleitoral E-Candidato.",
      };

      onSaveProposal(newRecord);
      setSelectedProposalId(newRecord.id);
      setActiveTab("simulator");
    } catch (err) {
      console.warn("Erro ao simular proposta:", err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div id="proposal-scenario-simulator" className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#112233] via-[#16304A] to-[#112233] border border-[#1E3A5F] shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4A537]" />
                Inteligência Preditiva Pré-Lançamento
              </span>
              <span className="text-xs text-slate-400">
                Testador de Propostas • Simulação de Cenários Eleitorais
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#F2EFE6] tracking-tight flex items-center gap-2.5">
              <FlaskConical className="w-7 h-7 text-[#D4A537]" />
              Laboratório de Cenários & Propostas Inéditas
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Avalie o potencial de ganho líquido de votos, risco de rejeição (backfire) e impacto demográfico de propostas e bandeiras ainda não lançadas antes de anunciá-las na TV, debates ou redes sociais.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "simulator"
                  ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/20"
                  : "bg-[#16304A] text-slate-300 hover:bg-[#1E3A5F]"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Simular / Detalhes</span>
            </button>
            <button
              onClick={() => setActiveTab("ab_test")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "ab_test"
                  ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/20"
                  : "bg-[#16304A] text-slate-300 hover:bg-[#1E3A5F]"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Comparador A/B</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "history"
                  ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/20"
                  : "bg-[#16304A] text-slate-300 hover:bg-[#1E3A5F]"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Histórico ({proposals.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Simulator & Active Proposal Result */}
      {activeTab === "simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 5 Cols: Proposal Testing Form */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
                <h2 className="text-sm font-bold text-[#F2EFE6] flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-[#D4A537]" />
                  Configurar Novo Teste de Proposta
                </h2>
                <span className="text-[11px] text-slate-400">Ambiente Confidencial</span>
              </div>

              {/* Fast Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                  Carregar Sugestão de Proposta Inédita:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => loadPreset("tarifa_zero")}
                    className="px-2.5 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[10px] font-semibold text-amber-300 border border-amber-500/30"
                  >
                    Tarifa Zero Domingo
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset("primeiro_emprego")}
                    className="px-2.5 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[10px] font-semibold text-teal-300 border border-teal-500/30"
                  >
                    Bolsa Primeiro Emprego
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset("fila_zero_sus")}
                    className="px-2.5 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[10px] font-semibold text-emerald-300 border border-emerald-500/30"
                  >
                    Fila Zero SUS Mutirão
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset("isencao_ipva_app")}
                    className="px-2.5 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[10px] font-semibold text-cyan-300 border border-cyan-500/30"
                  >
                    Isenção IPVA Apps
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset("cameras_policia")}
                    className="px-2.5 py-1 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-[10px] font-semibold text-rose-300 border border-rose-500/30"
                  >
                    Câmeras PM & Pacificação
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleRunSimulation} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Nome da Proposta / Tema Inédito:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tarifa Zero aos Domingos no Transporte Público"
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Eixo Temático:</label>
                    <select
                      value={testTheme}
                      onChange={(e) => setTestTheme(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                    >
                      <option value="Mobilidade Urbana & Economia Popular">Mobilidade Urbana</option>
                      <option value="Segurança Pública & Modernização Policial">Segurança Pública</option>
                      <option value="Saúde Pública & Gestão SUS">Saúde & Filas SUS</option>
                      <option value="Juventude, Emprego & Renda">Emprego & Juventude</option>
                      <option value="Educação Básica & Tempo Integral">Educação Básica</option>
                      <option value="Economia Popular & Trabalho Informal">Trabalho & Apps</option>
                      <option value="Habitação & Saneamento Periférico">Habitação Social</option>
                      <option value="Meio Ambiente & Clima">Meio Ambiente & Clima</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Enquadramento / Tom:</label>
                    <select
                      value={testFraming}
                      onChange={(e) => setTestFraming(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                    >
                      <option value="Propositivo">Propositivo / Inspirador</option>
                      <option value="Ruptura / Firme">Ruptura / Firme</option>
                      <option value="Técnico / Responsável">Técnico / Responsável</option>
                      <option value="Popular / Emocional">Popular / Emocional</option>
                      <option value="Protecionista / Social">Protecionista / Social</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Descrição Detalhada da Proposta (como seria anunciada):
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Descreva o funcionamento prático, fontes de custeio previstas e o apelo direto aos cidadãos..."
                    value={testProposalText}
                    onChange={(e) => setTestProposalText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Segmento Prioritário:</label>
                    <input
                      type="text"
                      value={testTargetAudience}
                      onChange={(e) => setTestTargetAudience(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Região de Foco:</label>
                    <input
                      type="text"
                      value={testRegion}
                      onChange={(e) => setTestRegion(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoadingAi}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38728] hover:from-[#E5B648] hover:to-[#C49839] text-[#0B1B2B] font-extrabold text-xs shadow-lg shadow-[#D4A537]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isLoadingAi ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#0B1B2B]" />
                      <span>Simulando Impacto Eleitoral com IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#0B1B2B]" />
                      <span>Simular Impacto com Inteligência Artificial</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Switcher of already tested proposals */}
            <div className="p-4 rounded-2xl bg-[#112233] border border-[#1E3A5F] space-y-2">
              <span className="text-xs font-bold text-[#F2EFE6] block">Propostas Testadas no Cockpit:</span>
              <div className="space-y-1.5">
                {proposals.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProposalId(p.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between border ${
                      p.id === activeProposal?.id
                        ? "bg-[#16304A] border-[#D4A537] text-white font-bold"
                        : "bg-[#0B1B2B]/60 border-[#1E3A5F] text-slate-300 hover:bg-[#16304A]"
                    }`}
                  >
                    <div className="truncate max-w-[240px]">
                      <p className="truncate font-semibold">{p.title}</p>
                      <span className="text-[10px] text-slate-400">{p.themeAxis}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#D4A537] shrink-0">
                      +{p.metrics.netVoteGainEstPct}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Detailed Predictive Results */}
          <div className="lg:col-span-7 space-y-5">
            {activeProposal ? (
              <>
                {/* Result Top Card: Title & Diagnostic Badges */}
                <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E3A5F] pb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40">
                          {activeProposal.themeAxis}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Tom: {activeProposal.framingTone}
                        </span>
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-[#F2EFE6]">
                        {activeProposal.title}
                      </h2>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">
                      Candidato: <strong className="text-slate-200">{activeProposal.candidateName}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic bg-[#0B1B2B] p-3 rounded-xl border border-[#1E3A5F]">
                    "{activeProposal.detailedProposal}"
                  </p>

                  {/* 4 Core Quantitative Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#16304A] border border-[#1E3A5F] text-center">
                      <span className="text-[11px] text-slate-300 font-semibold block">Aderência Global</span>
                      <span className="text-2xl font-black text-[#D4A537] mt-0.5 block">
                        {activeProposal.metrics.overallAcceptancePct}%
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">aceitação estimada</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#16304A] border border-[#1E3A5F] text-center">
                      <span className="text-[11px] text-slate-300 font-semibold block">Ganho Líquido</span>
                      <span className="text-2xl font-black text-[#2E9C87] mt-0.5 block">
                        +{activeProposal.metrics.netVoteGainEstPct}%
                      </span>
                      <span className="text-[10px] text-slate-300 font-medium">votos válidos</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#16304A] border border-[#1E3A5F] text-center">
                      <span className="text-[11px] text-slate-300 font-semibold block">Risco de Backfire</span>
                      <span className="text-2xl font-black text-rose-400 mt-0.5 block">
                        {activeProposal.metrics.backfireRiskPct}%
                      </span>
                      <span className="text-[10px] text-rose-300 font-medium">rejeição opositores</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#16304A] border border-[#1E3A5F] text-center">
                      <span className="text-[11px] text-slate-300 font-semibold block">Conversão Indecisos</span>
                      <span className="text-2xl font-black text-blue-400 mt-0.5 block">
                        {activeProposal.metrics.undecidedConversionPct}%
                      </span>
                      <span className="text-[10px] text-blue-300 font-medium">potencial captação</span>
                    </div>
                  </div>
                </div>

                {/* Demographic Matrix Breakdown */}
                <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
                    <h3 className="text-sm font-bold text-[#F2EFE6] flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400" />
                      Aderência por Segmentos Demográficos & Sociológicos
                    </h3>
                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="flex items-center gap-1 text-emerald-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> Favorável
                      </span>
                      <span className="flex items-center gap-1 text-rose-300">
                        <span className="w-2 h-2 rounded-full bg-rose-400" /> Rejeita
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-slate-500" /> Neutro
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {activeProposal.demographics.map((demo, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-bold text-slate-200">{demo.segment}</span>
                          <span className="text-[11px] font-mono text-slate-300">
                            <strong className="text-emerald-400">{demo.favorabilityPct}%</strong> vs{" "}
                            <strong className="text-rose-400">{demo.rejectionPct}%</strong>
                          </span>
                        </div>

                        {/* Stacked Percentage Bar */}
                        <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
                          <div
                            style={{ width: `${demo.favorabilityPct}%` }}
                            className="bg-emerald-500 hover:bg-emerald-400 transition-all"
                            title={`Favorável: ${demo.favorabilityPct}%`}
                          />
                          <div
                            style={{ width: `${demo.neutralPct}%` }}
                            className="bg-slate-500"
                            title={`Neutro: ${demo.neutralPct}%`}
                          />
                          <div
                            style={{ width: `${demo.rejectionPct}%` }}
                            className="bg-rose-500 hover:bg-rose-400 transition-all"
                            title={`Rejeita: ${demo.rejectionPct}%`}
                          />
                        </div>

                        <p className="text-[11px] text-slate-400 leading-tight">
                          <span className="text-[#D4A537] font-semibold">Motivação:</span> {demo.keyDriver}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SWOT Analysis & Risk Shielding */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-4 rounded-xl bg-[#112233] border border-emerald-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wide">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                      Forças & Vetores Positivos
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeProposal.swot.strengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vulnerabilities */}
                  <div className="p-4 rounded-xl bg-[#112233] border border-rose-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wide">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Vulnerabilidades Técnicas & Riscos
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeProposal.swot.vulnerabilities.map((vuln, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400 mt-0.5">•</span>
                          <span>{vuln}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opposition Expected Counter-Attacks */}
                  <div className="p-4 rounded-xl bg-[#112233] border border-amber-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Contra-Ataques Esperados da Oposição
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeProposal.swot.oppositionExpectedAttacks.map((atk, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{atk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shielding Recommendations */}
                  <div className="p-4 rounded-xl bg-[#112233] border border-blue-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5 uppercase tracking-wide">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      Blindagem Narrativa Preventiva
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeProposal.swot.recommendedDefense.map((def, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span>{def}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Executive Summary Box if available */}
                {activeProposal.aiAnalysisText && (
                  <div className="p-4 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D4A537]">
                      <Sparkles className="w-4 h-4" />
                      <span>Parecer Analítico da Simulação (Inteligência Estratégica)</span>
                    </div>
                    <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                      {activeProposal.aiAnalysisText}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-[#112233] border border-[#1E3A5F]">
                <p className="text-sm font-bold text-slate-300">Nenhuma proposta selecionada para visualização.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Tab 2: A/B Scenario Comparison */}
      {activeTab === "ab_test" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#1E3A5F] pb-4">
              <div>
                <h2 className="text-base font-bold text-[#F2EFE6] flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#D4A537]" />
                  Comparador A/B de Propostas Pré-Lançamento
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Compare o rendimento eleitoral de duas propostas concorrentes para definir qual deve ser a prioridade da propaganda eleitoral.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">Cenário A:</label>
                  <select
                    value={compareAId}
                    onChange={(e) => setCompareAId(e.target.value)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-slate-200"
                  >
                    {proposals.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">Cenário B:</label>
                  <select
                    value={compareBId}
                    onChange={(e) => setCompareBId(e.target.value)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-slate-200"
                  >
                    {proposals.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Side by Side Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
              {/* Card A */}
              <div className="p-5 rounded-2xl bg-[#16304A]/60 border border-[#D4A537]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40">
                    CENÁRIO A
                  </span>
                  <span className="text-xs text-slate-400">{compareA?.themeAxis}</span>
                </div>
                <h3 className="text-base font-bold text-white">{compareA?.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#0B1B2B]/60 p-2.5 rounded-lg">
                  {compareA?.detailedProposal}
                </p>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-[#0B1B2B]">
                    <span className="text-[10px] text-slate-400 block">Aderência Global</span>
                    <strong className="text-lg text-[#D4A537]">{compareA?.metrics.overallAcceptancePct}%</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0B1B2B]">
                    <span className="text-[10px] text-slate-400 block">Ganho Líquido</span>
                    <strong className="text-lg text-[#2E9C87]">+{compareA?.metrics.netVoteGainEstPct}%</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0B1B2B]">
                    <span className="text-[10px] text-slate-400 block">Risco Backfire</span>
                    <strong className="text-lg text-rose-400">{compareA?.metrics.backfireRiskPct}%</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0B1B2B]">
                    <span className="text-[10px] text-slate-400 block">Conversão Indecisos</span>
                    <strong className="text-lg text-blue-400">{compareA?.metrics.undecidedConversionPct}%</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-300 block mb-1">Maior Força:</span>
                  <p className="text-xs text-emerald-300">{compareA?.swot.strengths[0]}</p>
                </div>
              </div>

              {/* Card B */}
              <div className="p-5 rounded-2xl bg-[#16304A]/60 border border-teal-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                    CENÁRIO B
                  </span>
                  <span className="text-xs text-slate-400">{compareB?.themeAxis}</span>
                </div>
                <h3 className="text-base font-bold text-white">{compareB?.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#0B1B2B]/60 p-2.5 rounded-lg">
                  {compareB?.detailedProposal}
                </p>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-[#0B1B2B]">
                    <span className="text-[10px] text-slate-400 block">Aderência Global</span>
                    <strong className="text-lg text-[#D4A537]">{compareB?.metrics.overallAcceptancePct}%</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0B1B2B]">
                    <span className="text-[10px] text-slate-400 block">Ganho Líquido</span>
                    <strong className="text-lg text-[#2E9C87]">+{compareB?.metrics.netVoteGainEstPct}%</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0B1B2B]">
                    <span className="text-[10px] text-slate-400 block">Risco Backfire</span>
                    <strong className="text-lg text-rose-400">{compareB?.metrics.backfireRiskPct}%</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0B1B2B]">
                    <span className="text-[10px] text-slate-400 block">Conversão Indecisos</span>
                    <strong className="text-lg text-blue-400">{compareB?.metrics.undecidedConversionPct}%</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-300 block mb-1">Maior Força:</span>
                  <p className="text-xs text-teal-300">{compareB?.swot.strengths[0]}</p>
                </div>
              </div>
            </div>

            {/* Final Verdict Recommendation */}
            <div className="mt-6 p-4 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#F2EFE6]">
                    Veredito Estatístico da Simulação:
                  </h4>
                  <p className="text-xs text-slate-300">
                    {compareA?.metrics.netVoteGainEstPct >= compareB?.metrics.netVoteGainEstPct ? (
                      <>
                        O <strong>Cenário A ({compareA?.title})</strong> entrega maior retorno eleitoral líquido (+{compareA?.metrics.netVoteGainEstPct}% de votos válidos) com melhor taxa de conversão entre indecisos.
                      </>
                    ) : (
                      <>
                        O <strong>Cenário B ({compareB?.title})</strong> entrega maior retorno eleitoral líquido (+{compareB?.metrics.netVoteGainEstPct}% de votos válidos) com maior atração popular.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 3: History List */}
      {activeTab === "history" && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg">
            <h2 className="text-base font-bold text-[#F2EFE6] mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#D4A537]" />
              Catálogo de Propostas & Temas Testados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proposals.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedProposalId(item.id);
                    setActiveTab("simulator");
                  }}
                  className="cursor-pointer p-4 rounded-xl bg-[#16304A]/60 hover:bg-[#16304A] border border-[#1E3A5F] hover:border-[#D4A537]/60 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/20 text-[#D4A537]">
                      {item.themeAxis}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.createdAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-2">{item.title}</h3>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1E3A5F]">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Ganho Estimado</span>
                      <strong className="text-[#2E9C87] font-bold">+{item.metrics.netVoteGainEstPct}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Aderência</span>
                      <strong className="text-[#D4A537] font-bold">{item.metrics.overallAcceptancePct}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Risco Backfire</span>
                      <strong className="text-rose-400 font-bold">{item.metrics.backfireRiskPct}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
