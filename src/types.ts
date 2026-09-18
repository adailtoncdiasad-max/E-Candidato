export type ElectoralSphere = "Municipal" | "Estadual" | "Federal";
export type SphereType = ElectoralSphere;

export type PoliticalRole = 
  | "Prefeito(a)" 
  | "Vereador(a)" 
  | "Governador(a)" 
  | "Deputado(a) Estadual" 
  | "Deputado(a) Federal" 
  | "Senador(a)" 
  | "Presidente";

export interface CandidateProfile {
  id: string;
  name: string;
  ballotName: string;
  number: string;
  party: string;
  coalition: string;
  sphere: ElectoralSphere;
  role: PoliticalRole;
  location: string;
  totalVoters: number;
  targetVotes: number;
  currentEstimatedVotes: number;
  viabilityScore: number; // 0 to 100
  viabilityIndex?: number; // alias for 0 to 100
  photoUrl?: string;
  campaignSlogan: string;
}

export interface TerritoryZone {
  id: string;
  name: string;
  type: "Bairro" | "Zona Eleitoral" | "Região" | "Município" | "Estado / UF";
  voterCount: number;
  ourEstimatedVotes: number;
  ourVotePercentage: number;
  status: "Reduto Consolidado" | "Zona de Disputa" | "Área Neutra" | "Vulnerabilidade";
  sentimentScore: number; // 0 to 100
  priorityDemand: string;
  hexCoord: { q: number; r: number };
  leaderContact: string;
  actionRequired: string;
  ufCode?: string;
  regionMacro?: "Nordeste" | "Sudeste" | "Sul" | "Norte" | "Centro-Oeste";
  opponentEstimatedVotes?: number;
  opponentVotePercentage?: number;
}

export interface PollRecord {
  id: string;
  date: string;
  institute: string;
  tseRegistration: string;
  sampleSize: number;
  marginOfError: number;
  ourCandidate: number;
  opponentA: number;
  opponentB: number;
  opponentC: number;
  undecided: number;
  nullBlank: number;
}

export interface CompetitorData {
  id: string;
  name: string;
  party: string;
  role?: string;
  estimatedVotePct: number;
  rejectionPct?: number;
  digitalFollowers?: number;
  engagementRate?: number;
  tvTimeSecondsDaily?: number;
  campaignBudgetEst?: number;
  strengths?: string[];
  weaknesses?: string[];
  mainVulnerabilities?: string[];
  mainNarrative?: string;
  counterStrategy?: string;
  momentumTrend?: "up" | "down" | "stable" | "Subindo" | "Estável" | "Queda";
}

export interface SocialNetworkStat {
  platform: "Instagram" | "TikTok" | "X (Twitter)" | "Facebook" | "YouTube" | "WhatsApp";
  followers: number;
  weeklyGrowth: number;
  engagementRate: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topPostImpressions: number;
  trendingTopic: string;
}

export interface SocietalTheme {
  id: string;
  name: string;
  urgencyScore: number; // 1 to 100
  mentionsCount: number;
  sentimentNegative: number; // population dissatisfaction
  topDemands: string[];
  campaignProposal: string;
}

export interface CampaignFinance {
  legalSpendingCap: number;
  totalRevenue: number;
  fefcFund: number; // Fundo Eleitoral
  partyFund: number;
  donationsIndividual: number;
  ownResources: number;
  totalExpenses: number;
  expensesByCategory: {
    category: string;
    amount: number;
    legalLimitPct?: number;
  }[];
  complianceChecklist: {
    item: string;
    status: "Concluído" | "Pendente" | "Atenção";
    deadline: string;
  }[];
}

export interface CriticalAlert {
  id: string;
  type: "CRITICAL" | "WARNING" | "OPPORTUNITY" | "INFO";
  title: string;
  description: string;
  timestamp: string;
  actionLabel?: string;
  targetModule?: string;
}

// Campaign Events & Calendar Types
export type CampaignEventType =
  | "Comício"
  | "Carreata"
  | "Caminhada"
  | "Sabatina / Debate"
  | "Entrevista / Coletiva"
  | "Reunião com Lideranças"
  | "Gravação HGPE (Rádio/TV)"
  | "Plenária Temática"
  | "Mutirão de Panfletagem"
  | "Ato com Apoiadores";

export type EventStatus = "Confirmado" | "Pendente" | "Realizado" | "Cancelado";
export type EventPriority = "Alta" | "Média" | "Estratégica";

export interface CampaignEvent {
  id: string;
  title: string;
  type: CampaignEventType;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  location: string;
  zoneOrNeighborhood?: string;
  ufOrCity?: string;
  candidateId: string;
  candidateName: string;
  sphere: ElectoralSphere;
  status: EventStatus;
  priority: EventPriority;
  estimatedAudience: number;
  description: string;
  talkingPoints: string[];
  logistics: {
    soundStageRequired: boolean;
    securityLevel: "Padrão" | "Reforçada" | "VIP / Máxima";
    liveStreaming: boolean;
    tseComplianceChecked: boolean;
  };
}

// Unreleased Proposal & Unlaunched Themes Simulation Types
export interface ProposalDemographicImpact {
  segment: string; // e.g. "Jovens (16-24)", "Mulheres Chefes de Família", "Evangélicos", "Classes D/E", "Classe Média (B/C)", "Aposentados / 60+", "Trabalhadores Informais / Aplicativos", "Setor Produtivo / Comércio"
  favorabilityPct: number; // 0 to 100
  rejectionPct: number; // 0 to 100
  neutralPct: number; // 0 to 100
  keyDriver: string;
}

export interface ProposalSimulationRecord {
  id: string;
  title: string;
  themeAxis: string; // e.g. "Segurança Pública", "Saúde & Filas SUS", "Emprego & Renda", "Mobilidade Urbana", "Educação Básica", "Meio Ambiente & Clima", "Reforma Tributária / Impostos", "Juventude & Empreendedorismo", "Habitação Popular"
  detailedProposal: string;
  framingTone: "Propositivo" | "Ruptura / Firme" | "Técnico / Responsável" | "Popular / Emocional" | "Protecionista / Social";
  targetAudience: string;
  targetRegion: string;
  candidateId: string;
  candidateName: string;
  sphere: ElectoralSphere;
  createdAt: string;
  metrics: {
    overallAcceptancePct: number; // e.g. 68%
    netVoteGainEstPct: number; // e.g. +2.8%
    backfireRiskPct: number; // e.g. 14%
    undecidedConversionPct: number; // e.g. 35%
    socialBuzzScore: number; // 0 to 100
  };
  demographics: ProposalDemographicImpact[];
  swot: {
    strengths: string[];
    vulnerabilities: string[];
    oppositionExpectedAttacks: string[];
    recommendedDefense: string[];
    strategicRefinements: string[];
  };
  aiAnalysisText?: string;
}

// Volunteer & Militância Management Types
export type VolunteerRole =
  | "Líder de Zona"
  | "Militante Digital"
  | "Fiscal de Urna"
  | "Mobilizador de Rua"
  | "Apoio Jurídico"
  | "Coordenação Jovem"
  | "Comunicação & Carro de Som";

export type VolunteerStatus = "Ativo" | "Em Treinamento" | "Disponível" | "Destaque" | "Pendente";

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  zoneOrNeighborhood: string;
  city: string;
  role: VolunteerRole;
  status: VolunteerStatus;
  tasksCompleted: number;
  points: number; // Gamificação
  joinedAt: string;
  skills: string[];
  availability: "Integral" | "Finais de Semana" | "Noite" | "Dias Úteis";
  badges: string[];
  assignedCandidateId?: string;
}

// Push Notification Types
export type PushTargetAudience =
  | "Todos os Voluntários"
  | "Líderes de Zona"
  | "Fiscais de Urna"
  | "Militantes Digitais"
  | "Mobilizadores de Rua"
  | "Equipe Jurídica";

export type PushPriority = "Urgente / Relâmpago" | "Importante" | "Informativo";

export type PushCategory =
  | "Ato de Rua"
  | "Contra-Fake News"
  | "Roteiro de Debate"
  | "Fiscalização Urna"
  | "Mobilização Geral"
  | "Material Digital";

export interface PushNotificationRecord {
  id: string;
  title: string;
  body: string;
  targetAudience: PushTargetAudience;
  priority: PushPriority;
  category: PushCategory;
  actionUrl?: string;
  sentAt: string;
  status: "Enviado" | "Agendado" | "Rascunho";
  stats: {
    sentCount: number;
    openRatePct: number;
    clickRatePct: number;
  };
}


