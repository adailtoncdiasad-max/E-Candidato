import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  SphereType,
  CandidateProfile,
  TerritoryZone,
  CriticalAlert,
  SocietalTheme,
  CampaignEvent,
  ProposalSimulationRecord,
  EventStatus,
  Volunteer,
  PushNotificationRecord,
} from "./types";
import { electionDataBySphere } from "./data/mockElectionData";
import { INITIAL_CAMPAIGN_EVENTS } from "./data/campaignEventsData";
import { INITIAL_PROPOSAL_SCENARIOS } from "./data/proposalScenariosData";
import { INITIAL_CANDIDATES_LIST, ExtendedCandidateItem } from "./data/multiCandidatesData";
import { INITIAL_VOLUNTEERS, INITIAL_PUSH_NOTIFICATIONS } from "./data/volunteersData";
import { Navbar } from "./components/Navbar";
import { Sidebar, NavModule } from "./components/Sidebar";
import { DashboardOverview } from "./components/DashboardOverview";
import { PredictivePolls } from "./components/PredictivePolls";
import { SpatialHexMap } from "./components/SpatialHexMap";
import { SocialMonitoring } from "./components/SocialMonitoring";
import { AiStrategyGenerator } from "./components/AiStrategyGenerator";
import { CompetitorComparison } from "./components/CompetitorComparison";
import { SocietalThemes } from "./components/SocietalThemes";
import { HistoricalData } from "./components/HistoricalData";
import { CampaignFinances } from "./components/CampaignFinances";
import { ElectoralQuotientSim } from "./components/ElectoralQuotientSim";
import { CandidateModal } from "./components/CandidateModal";
import { AppExportModal } from "./components/AppExportModal";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { TseIntegrationCenter } from "./components/TseIntegrationCenter";
import { CampaignCalendar } from "./components/CampaignCalendar";
import { ProposalScenarioSimulator } from "./components/ProposalScenarioSimulator";
import { MultiCandidateManager } from "./components/MultiCandidateManager";
import { VolunteersDashboard } from "./components/VolunteersDashboard";

export default function App() {
  const [currentSphere, setCurrentSphere] = useState<SphereType>("Municipal");
  const [currentModule, setCurrentModule] = useState<NavModule>("overview");

  // Dynamic campaign data by sphere
  const [datasets, setDatasets] = useState(electionDataBySphere);
  const currentData = datasets[currentSphere];

  // Multi-Candidate List State
  const [candidatesList, setCandidatesList] = useState<ExtendedCandidateItem[]>(INITIAL_CANDIDATES_LIST);
  const [activeCandidateId, setActiveCandidateId] = useState<string>("cand-bruno-reis");

  // Campaign Events State
  const [campaignEvents, setCampaignEvents] = useState<CampaignEvent[]>(INITIAL_CAMPAIGN_EVENTS);

  // Proposal Simulation Scenarios State
  const [proposalScenarios, setProposalScenarios] = useState<ProposalSimulationRecord[]>(INITIAL_PROPOSAL_SCENARIOS);

  // Volunteers & Push Notifications State
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [pushNotifications, setPushNotifications] = useState<PushNotificationRecord[]>(INITIAL_PUSH_NOTIFICATIONS);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Candidate edit modal
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState<boolean>(false);

  // Android & HTML Export modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // AI Generator prefilled state
  const [aiInitialState, setAiInitialState] = useState<{
    topic: string;
    location: string;
    format: string;
    brief: string;
  }>({
    topic: "Saúde & Atendimento Básico",
    location: currentData.candidate.location,
    format: "Discurso de Comício / Palanque",
    brief: "",
  });

  // Handle sphere change
  const handleSphereChange = (sphere: SphereType) => {
    setCurrentSphere(sphere);
    setAiInitialState((prev) => ({
      ...prev,
      location: datasets[sphere].candidate.location,
    }));
  };

  // Update candidate profile
  const handleSaveCandidate = (updated: Partial<CandidateProfile>) => {
    setDatasets((prev) => ({
      ...prev,
      [currentSphere]: {
        ...prev[currentSphere],
        candidate: {
          ...prev[currentSphere].candidate,
          ...updated,
        },
      },
    }));
  };

  // Switch Active Candidate from MultiCandidateManager
  const handleSelectActiveCandidate = (cand: ExtendedCandidateItem) => {
    setActiveCandidateId(cand.id);
    setCurrentSphere(cand.sphere);
    setDatasets((prev) => ({
      ...prev,
      [cand.sphere]: {
        ...prev[cand.sphere],
        candidate: {
          ...prev[cand.sphere].candidate,
          id: cand.id,
          name: cand.name,
          ballotName: cand.ballotName,
          number: cand.number,
          party: cand.party,
          coalition: cand.coalition,
          sphere: cand.sphere,
          role: cand.role,
          location: cand.location,
          totalVoters: cand.totalVoters,
          targetVotes: cand.targetVotes,
          currentEstimatedVotes: cand.currentEstimatedVotes,
          viabilityScore: cand.viabilityScore,
          campaignSlogan: cand.campaignSlogan,
        },
      },
    }));
  };

  // Add new candidate to collection
  const handleAddNewCandidate = (newCand: ExtendedCandidateItem) => {
    setCandidatesList((prev) => [newCand, ...prev]);
  };

  // Campaign Event Handlers
  const handleAddCampaignEvent = (newEvent: CampaignEvent) => {
    setCampaignEvents((prev) => [newEvent, ...prev]);
  };

  const handleUpdateEventStatus = (eventId: string, newStatus: EventStatus) => {
    setCampaignEvents((prev) =>
      prev.map((evt) => (evt.id === eventId ? { ...evt, status: newStatus } : evt))
    );
  };

  const handleDeleteEvent = (eventId: string) => {
    setCampaignEvents((prev) => prev.filter((evt) => evt.id !== eventId));
  };

  // Proposal Simulator Handler
  const handleSaveProposalScenario = (newScenario: ProposalSimulationRecord) => {
    setProposalScenarios((prev) => [newScenario, ...prev]);
  };

  // Volunteer & Militância Handlers
  const handleAddVolunteer = (newVolunteer: Volunteer) => {
    setVolunteers((prev) => [newVolunteer, ...prev]);
  };

  const handleSendPushNotification = (newPush: PushNotificationRecord) => {
    setPushNotifications((prev) => [newPush, ...prev]);
  };

  // Quick Action: Territorial AI trigger
  const handleNavigateToAIWithZone = (zone: TerritoryZone) => {
    setAiInitialState({
      topic: zone.priorityDemand,
      location: `${zone.name} (${zone.type})`,
      format: "Discurso de Comício / Palanque",
      brief: `Enfatizar a demanda local prioritária: "${zone.priorityDemand}". Citar a ação necessária de campanha: "${zone.actionRequired}". Dialogar com o eleitorado local de ${zone.name}.`,
    });
    setCurrentModule("ai_strategy");
  };

  // Quick Action: Crisis AI trigger
  const handleTriggerCrisisAI = (crisisDescription: string, platform: string) => {
    setAiInitialState({
      topic: "Resposta a Desinformação e Boato",
      location: currentData.candidate.location,
      format: "Resposta a Ataque / Nota de Desmentido",
      brief: `Ataque detectado na plataforma ${platform}: "${crisisDescription}". Formular uma nota contundente, serena e baseada na verdade, orientando a militância e acionando o departamento jurídico.`,
    });
    setCurrentModule("ai_strategy");
  };

  // Quick Action: Debate AI trigger
  const handleTriggerDebateStrategy = (opponentName: string, weakness: string) => {
    setAiInitialState({
      topic: "Confronto Direto em Debate / Sabatina",
      location: currentData.candidate.location,
      format: "Discurso de Comício / Palanque",
      brief: `Adversário: ${opponentName}. Ponto fraco a explorar com serenidade e propostas: "${weakness}". Contrastar o histórico de realizações de ${currentData.candidate.ballotName} com a inação do adversário.`,
    });
    setCurrentModule("ai_strategy");
  };

  // Quick Action: Societal Theme AI trigger
  const handleGenerateThemeProposal = (theme: SocietalTheme) => {
    setAiInitialState({
      topic: theme.name,
      location: currentData.candidate.location,
      format: "Post Carrossel Educativo para Instagram",
      brief: `Proposta oficial: "${theme.campaignProposal}". Queixas populares a sanar: ${theme.topDemands.join(
        ", "
      )}. Tom positivo, focado em soluções concretas.`,
    });
    setCurrentModule("ai_strategy");
  };

  // Quick Action: Open Alert
  const handleOpenAlertAction = (alert: CriticalAlert) => {
    if (alert.type === "CRITICAL") {
      handleTriggerCrisisAI(alert.description, "Redes Sociais");
    } else if (alert.type === "OPPORTUNITY") {
      setCurrentModule("hexmap");
    } else {
      setCurrentModule("polls");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1B2B] text-[#F2EFE6] font-sans antialiased flex flex-col selection:bg-[#D4A537] selection:text-[#0B1B2B]">
      {/* Top Navigation Bar */}
      <Navbar
        currentSphere={currentSphere}
        onSphereChange={handleSphereChange}
        alerts={currentData.alerts}
        candidate={currentData.candidate}
        onOpenAlertAction={handleOpenAlertAction}
        onOpenCandidateModal={() => setIsCandidateModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onOpenTseData={() => setCurrentModule("tse_data")}
        onOpenMultiCandidates={() => setCurrentModule("multi_candidates")}
        onOpenVolunteersPush={() => setCurrentModule("volunteers_push")}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Module Sidebar */}
        <Sidebar
          currentModule={currentModule}
          onSelectModule={setCurrentModule}
          candidate={currentData.candidate}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          currentSphere={currentSphere}
          alertsCount={currentData.alerts.length}
          onOpenExportModal={() => setIsExportModalOpen(true)}
        />

        {/* Dynamic Main Content Area with Motion Route Transitions */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModule}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full"
            >
              {currentModule === "overview" && (
                <DashboardOverview
                  candidate={currentData.candidate}
                  territories={currentData.territories}
                  polls={currentData.polls}
                  socialStats={currentData.socialStats}
                  alerts={currentData.alerts}
                  onNavigate={setCurrentModule}
                  onOpenAlertAction={handleOpenAlertAction}
                />
              )}

              {currentModule === "volunteers_push" && (
                <VolunteersDashboard
                  volunteers={volunteers}
                  onAddVolunteer={handleAddVolunteer}
                  pushNotifications={pushNotifications}
                  onSendPushNotification={handleSendPushNotification}
                  candidateName={currentData.candidate.ballotName}
                />
              )}

              {currentModule === "polls" && (
                <PredictivePolls
                  polls={currentData.polls}
                  candidate={currentData.candidate}
                  competitors={currentData.competitors}
                />
              )}

              {currentModule === "hexmap" && (
                <SpatialHexMap
                  territories={currentData.territories}
                  candidate={currentData.candidate}
                  onNavigateToAIWithZone={handleNavigateToAIWithZone}
                />
              )}

              {currentModule === "social" && (
                <SocialMonitoring
                  socialStats={currentData.socialStats}
                  candidate={currentData.candidate}
                  onTriggerCrisisAI={handleTriggerCrisisAI}
                />
              )}

              {currentModule === "ai_strategy" && (
                <AiStrategyGenerator
                  candidate={currentData.candidate}
                  initialTopic={aiInitialState.topic}
                  initialLocation={aiInitialState.location}
                  initialFormat={aiInitialState.format}
                  initialBrief={aiInitialState.brief}
                />
              )}

              {currentModule === "events_calendar" && (
                <CampaignCalendar
                  events={campaignEvents}
                  onAddEvent={handleAddCampaignEvent}
                  onUpdateEventStatus={handleUpdateEventStatus}
                  onDeleteEvent={handleDeleteEvent}
                  currentSphere={currentSphere}
                  candidateName={currentData.candidate.ballotName}
                />
              )}

              {currentModule === "scenario_simulator" && (
                <ProposalScenarioSimulator
                  proposals={proposalScenarios}
                  onSaveProposal={handleSaveProposalScenario}
                  candidate={currentData.candidate}
                  currentSphere={currentSphere}
                />
              )}

              {currentModule === "multi_candidates" && (
                <MultiCandidateManager
                  candidates={candidatesList}
                  activeCandidateId={activeCandidateId}
                  onSelectActiveCandidate={handleSelectActiveCandidate}
                  onAddNewCandidate={handleAddNewCandidate}
                  onNavigateToModule={(mod) => setCurrentModule(mod as NavModule)}
                />
              )}

              {currentModule === "competitors" && (
                <CompetitorComparison
                  candidate={currentData.candidate}
                  competitors={currentData.competitors}
                  onTriggerDebateStrategy={handleTriggerDebateStrategy}
                />
              )}

              {currentModule === "themes" && (
                <SocietalThemes
                  themes={currentData.themes}
                  candidate={currentData.candidate}
                  onGenerateThemeProposal={handleGenerateThemeProposal}
                />
              )}

              {currentModule === "historical" && (
                <HistoricalData
                  candidate={currentData.candidate}
                  historicalElections={currentData.historicalElections}
                  demographics={currentData.demographics}
                />
              )}

              {currentModule === "finances" && (
                <CampaignFinances
                  finances={currentData.finances}
                  candidate={currentData.candidate}
                />
              )}

              {currentModule === "quotient_sim" && (
                <ElectoralQuotientSim candidate={currentData.candidate} />
              )}

              {currentModule === "tse_data" && (
                <TseIntegrationCenter
                  candidate={currentData.candidate}
                  currentSphere={currentSphere}
                  onNavigateToModule={(mod) => setCurrentModule(mod as NavModule)}
                  onSelectCandidate={(cand) => handleSelectActiveCandidate(cand)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Candidate Profile Editor Modal */}
      <CandidateModal
        candidate={currentData.candidate}
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
        onSave={handleSaveCandidate}
      />

      {/* Android & Standalone HTML Versions Export Center Modal */}
      <AppExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        candidate={currentData.candidate}
        currentSphere={currentSphere}
      />

      {/* PWA Offline Network Indicator */}
      <OfflineIndicator />
    </div>
  );
}
