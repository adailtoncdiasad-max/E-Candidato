import { CampaignEvent } from "../types";

export const INITIAL_CAMPAIGN_EVENTS: CampaignEvent[] = [
  // --- MUNICIPAL (Salvador) ---
  {
    id: "evt-mun-01",
    title: "Grande Comício de Abertura no Campo Grande",
    type: "Comício",
    date: "2026-09-22",
    time: "18:30",
    location: "Praça 2 de Julho (Campo Grande), Salvador - BA",
    zoneOrNeighborhood: "Campo Grande / Centro",
    ufOrCity: "Salvador - BA",
    candidateId: "preset-bruno-reis",
    candidateName: "Bruno Reis",
    sphere: "Municipal",
    status: "Confirmado",
    priority: "Estratégica",
    estimatedAudience: 18000,
    description: "Ato inaugural de mobilização com lideranças comunitárias dos 170 bairros de Salvador e vereadores da coligação.",
    talkingPoints: [
      "Avanços nas UPAs e novas policlínicas municipais",
      "Novo programa de asfalto e drenagem nos bairros periféricos",
      "Valorização dos servidores municipais e creches em tempo integral",
      "Integração do transporte público com o metrô"
    ],
    logistics: {
      soundStageRequired: true,
      securityLevel: "Reforçada",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-mun-02",
    title: "Caminhada da Vitória em Cajazeiras X e Rótula da Feirinha",
    type: "Caminhada",
    date: "2026-09-24",
    time: "09:00",
    location: "Rótula da Feirinha, Cajazeiras X, Salvador - BA",
    zoneOrNeighborhood: "Cajazeiras (Região 8)",
    ufOrCity: "Salvador - BA",
    candidateId: "preset-bruno-reis",
    candidateName: "Bruno Reis",
    sphere: "Municipal",
    status: "Confirmado",
    priority: "Alta",
    estimatedAudience: 7500,
    description: "Caminhada corpo a corpo no maior complexo habitacional da América Latina para dialogar com comerciantes e moradores.",
    talkingPoints: [
      "Ampliação de vagas no Hospital Municipal",
      "Iluminação em LED e segurança comunitária",
      "Microcrédito Salvador por Todos para ambulantes"
    ],
    logistics: {
      soundStageRequired: false,
      securityLevel: "Padrão",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-mun-03",
    title: "Sabatina dos Candidatos na Associação Comercial da Bahia (ACB)",
    type: "Sabatina / Debate",
    date: "2026-09-26",
    time: "14:00",
    location: "Sede Histórica da ACB, Comércio, Salvador - BA",
    zoneOrNeighborhood: "Comércio",
    ufOrCity: "Salvador - BA",
    candidateId: "preset-bruno-reis",
    candidateName: "Bruno Reis",
    sphere: "Municipal",
    status: "Confirmado",
    priority: "Estratégica",
    estimatedAudience: 450,
    description: "Encontro com empresários, setor de serviços e turismo para apresentar plano de atração de investimentos e simplificação fiscal.",
    talkingPoints: [
      "Desregulamentação e licenças ágeis via Salvador Digital",
      "Incentivos fiscais para o Centro Histórico e Comércio",
      "Turismo de eventos 365 dias ao ano"
    ],
    logistics: {
      soundStageRequired: false,
      securityLevel: "Padrão",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-mun-04",
    title: "Gravação de Programa Temático de Rádio e TV (HGPE)",
    type: "Gravação HGPE (Rádio/TV)",
    date: "2026-09-28",
    time: "08:00",
    location: "Estúdio Central de Produção, Rio Vermelho, Salvador - BA",
    zoneOrNeighborhood: "Rio Vermelho",
    ufOrCity: "Salvador - BA",
    candidateId: "preset-bruno-reis",
    candidateName: "Bruno Reis",
    sphere: "Municipal",
    status: "Pendente",
    priority: "Alta",
    estimatedAudience: 50,
    description: "Gravação dos blocos eleitorais sobre Mobilidade Urbana, Tarifa de Ônibus e Educação Infantil.",
    talkingPoints: [
      "Frota elétrica de ônibus e corredores BRT",
      "Merenda escolar de qualidade com nutricionistas",
      "Cartão Primeira Infância Salvador"
    ],
    logistics: {
      soundStageRequired: false,
      securityLevel: "Padrão",
      liveStreaming: false,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-mun-05",
    title: "Carreata da Liberdade ao Subúrbio Ferroviário",
    type: "Carreata",
    date: "2026-10-01",
    time: "15:30",
    location: "Concentração: Largo do Tanque até Paripe",
    zoneOrNeighborhood: "Subúrbio Ferroviário",
    ufOrCity: "Salvador - BA",
    candidateId: "preset-geraldo-jr",
    candidateName: "Geraldo Júnior",
    sphere: "Municipal",
    status: "Confirmado",
    priority: "Alta",
    estimatedAudience: 4000,
    description: "Mobilização de veículos percorrendo a Estrada da Liberdade, Calçada, Lobato, Periperi e Paripe.",
    talkingPoints: [
      "VLT do Subúrbio e conexão com o Centro",
      "Saneamento básico integral nas bacias hidrográficas",
      "Políticas de inclusão social e tarifa social"
    ],
    logistics: {
      soundStageRequired: true,
      securityLevel: "Padrão",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },

  // --- ESTADUAL (Bahia) ---
  {
    id: "evt-est-01",
    title: "Comício da Vitória do Povo em Feira de Santana",
    type: "Comício",
    date: "2026-09-23",
    time: "19:00",
    location: "Avenida Getúlio Vargas com Rua Castro Alves, Feira de Santana - BA",
    zoneOrNeighborhood: "Centro / Getúlio Vargas",
    ufOrCity: "Feira de Santana - BA",
    candidateId: "preset-jeronimo",
    candidateName: "Jerônimo Rodrigues",
    sphere: "Estadual",
    status: "Confirmado",
    priority: "Estratégica",
    estimatedAudience: 25000,
    description: "Grande ato político na segunda maior cidade da Bahia, reunindo deputados, prefeitos da região e lideranças do Portal do Sertão.",
    talkingPoints: [
      "Duplicação de rodovias estaduais e contorno de Feira",
      "Novo Hospital Geral Clériston Andrade 3",
      "Fortalecimento da Universidade Estadual de Feira de Santana (UEFS)",
      "Parceria com o Governo Federal no Minha Casa Minha Vida"
    ],
    logistics: {
      soundStageRequired: true,
      securityLevel: "VIP / Máxima",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-est-02",
    title: "Plenária Regional com Lideranças do Agronegócio no Oeste",
    type: "Plenária Temática",
    date: "2026-09-27",
    time: "10:30",
    location: "Centro de Convenções de Luís Eduardo Magalhães - BA",
    zoneOrNeighborhood: "Oeste Baiano",
    ufOrCity: "Luís Eduardo Magalhães - BA",
    candidateId: "preset-acm-neto",
    candidateName: "ACM Neto",
    sphere: "Estadual",
    status: "Confirmado",
    priority: "Estratégica",
    estimatedAudience: 1200,
    description: "Encontro estratégico com produtores de soja, milho e algodão para debater logística da FIOL, energia e segurança no campo.",
    talkingPoints: [
      "Segurança jurídica e combate a invasões de terras",
      "Desoneração do ICMS no óleo diesel para frotas agroindustriais",
      "Aceleração das licenças ambientais com o Inema ágil",
      "Conexão rodoviária entre o Oeste e o Porto de Ilhéus"
    ],
    logistics: {
      soundStageRequired: true,
      securityLevel: "Reforçada",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-est-03",
    title: "Debate dos Candidatos ao Governo da Bahia na TV Bahia (Rede Globo)",
    type: "Sabatina / Debate",
    date: "2026-10-01",
    time: "22:00",
    location: "Estúdios da Rede Bahia de Comunicação, Federação, Salvador - BA",
    zoneOrNeighborhood: "Federação",
    ufOrCity: "Salvador - BA",
    candidateId: "preset-jeronimo",
    candidateName: "Jerônimo Rodrigues",
    sphere: "Estadual",
    status: "Confirmado",
    priority: "Estratégica",
    estimatedAudience: 3500000,
    description: "Último e decisivo debate televisivo transmitido em rede estadual para os 417 municípios antes do dia da eleição.",
    talkingPoints: [
      "Balanço histórico de investimentos em colégios de tempo integral",
      "Redução consistente de índices de homicídios e reforço de viaturas",
      "Geração de empregos na indústria verde e BYD em Camaçari",
      "Equilíbrio fiscal e capacidade de investimento do Estado"
    ],
    logistics: {
      soundStageRequired: false,
      securityLevel: "VIP / Máxima",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-est-04",
    title: "Carreata Regional no Polo Petroquímico de Camaçari",
    type: "Carreata",
    date: "2026-09-29",
    time: "15:00",
    location: "Início no Centro de Camaçari até Dias d'Ávila",
    zoneOrNeighborhood: "Região Metropolitana de Salvador (RMS)",
    ufOrCity: "Camaçari - BA",
    candidateId: "preset-jeronimo",
    candidateName: "Jerônimo Rodrigues",
    sphere: "Estadual",
    status: "Confirmado",
    priority: "Alta",
    estimatedAudience: 6000,
    description: "Mobilização de veículos e trabalhadores da cadeia automotiva e petroquímica.",
    talkingPoints: [
      "Chegada da fábrica de carros elétricos BYD",
      "Cursos do Senai e qualificação tecnológica para jovens",
      "Habitação e infraestrutura na Região Metropolitana"
    ],
    logistics: {
      soundStageRequired: true,
      securityLevel: "Reforçada",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },

  // --- FEDERAL (Presidência / Nacional) ---
  {
    id: "evt-fed-01",
    title: "Comício da Esperança no Vale do Anhangabaú (São Paulo)",
    type: "Comício",
    date: "2026-09-25",
    time: "17:00",
    location: "Vale do Anhangabaú, Centro Histórico de São Paulo - SP",
    zoneOrNeighborhood: "São Paulo - SP (Sudeste)",
    ufOrCity: "São Paulo - SP",
    candidateId: "preset-lula",
    candidateName: "Lula",
    sphere: "Federal",
    status: "Confirmado",
    priority: "Estratégica",
    estimatedAudience: 90000,
    description: "Grande comício nacional de arrancada no maior colégio eleitoral do país, reunindo partidos da coligação e centrais sindicais.",
    talkingPoints: [
      "Recuperação do poder de compra do salário mínimo acima da inflação",
      "Isenção de Imposto de Renda para quem ganha até R$ 5.000",
      "Pé-de-Meia para estudantes do ensino médio e Farmácia Popular gratuita",
      "Novo PAC com R$ 1,7 trilhão em obras de ferrovias, portos e energia limpa"
    ],
    logistics: {
      soundStageRequired: true,
      securityLevel: "VIP / Máxima",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-fed-02",
    title: "Mega Motociata e Ato Pelo Bem do Brasil em Copacabana",
    type: "Carreata",
    date: "2026-09-26",
    time: "10:00",
    location: "Posto 5, Orla de Copacabana, Rio de Janeiro - RJ",
    zoneOrNeighborhood: "Rio de Janeiro - RJ (Sudeste)",
    ufOrCity: "Rio de Janeiro - RJ",
    candidateId: "preset-bolsonaro",
    candidateName: "Jair Bolsonaro",
    sphere: "Federal",
    status: "Confirmado",
    priority: "Estratégica",
    estimatedAudience: 85000,
    description: "Mobilização de motociclistas e manifestação popular na orla de Copacabana com lideranças conservadoras e religiosas.",
    talkingPoints: [
      "Defesa das liberdades individuais, da família e dos valores cristãos",
      "Redução do tamanho do Estado e desestatização de estatais",
      "Agro forte como motor do PIB e segurança jurídica",
      "Redução da maioridade penal e endurecimento contra facções"
    ],
    logistics: {
      soundStageRequired: true,
      securityLevel: "VIP / Máxima",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-fed-03",
    title: "Grande Encontro com o Povo Nordestino na Fonte Nova (Salvador)",
    type: "Comício",
    date: "2026-09-29",
    time: "18:00",
    location: "Arena Fonte Nova, Nazaré, Salvador - BA",
    zoneOrNeighborhood: "Salvador - BA (Nordeste)",
    ufOrCity: "Salvador - BA",
    candidateId: "preset-lula",
    candidateName: "Lula",
    sphere: "Federal",
    status: "Confirmado",
    priority: "Estratégica",
    estimatedAudience: 45000,
    description: "Ato no estado decisivo do Nordeste, reafirmando o compromisso com os programas sociais, transposição e energia solar/eólica.",
    talkingPoints: [
      "Bolsa Família com adicional de R$ 150 por criança",
      "Desenrola Brasil e combate ao endividamento das famílias",
      "Universidades Federais e Institutos Federais no interior do Nordeste",
      "Defesa irredutível da democracia e soberania nacional"
    ],
    logistics: {
      soundStageRequired: true,
      securityLevel: "VIP / Máxima",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  },
  {
    id: "evt-fed-04",
    title: "Debate Presidencial Final em Rede Nacional de Televisão",
    type: "Sabatina / Debate",
    date: "2026-10-02",
    time: "22:30",
    location: "Estúdios Globo, Jacarepaguá, Rio de Janeiro - RJ",
    zoneOrNeighborhood: "Nacional (Transmissão em todas as 27 UFs)",
    ufOrCity: "Rio de Janeiro - RJ",
    candidateId: "preset-lula",
    candidateName: "Lula",
    sphere: "Federal",
    status: "Confirmado",
    priority: "Estratégica",
    estimatedAudience: 42000000,
    description: "O mais assistido confronto direto antes do 1º Turno entre todos os candidatos à Presidência da República.",
    talkingPoints: [
      "Comparação dos legados de emprego, inflação controlada e combate à fome",
      "Propostas para a saúde e mutirão de cirurgias eletivas",
      "Sustentabilidade amazônica e protagonismo diplomático internacional",
      "União do país contra a violência política e o ódio"
    ],
    logistics: {
      soundStageRequired: false,
      securityLevel: "VIP / Máxima",
      liveStreaming: true,
      tseComplianceChecked: true
    }
  }
];
