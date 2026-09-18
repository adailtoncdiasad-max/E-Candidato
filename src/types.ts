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
