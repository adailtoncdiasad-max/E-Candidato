// Snapshot local de demonstração para a interface das Eleições Gerais 2026.
// Não representa a base nacional atual do TSE. A fonte live é configurada no servidor.

export interface TSECandidateOfficial2026 {
  id: string;
  sequencialTSE: string;
  numero: string;
  nomeUrna: string;
  nomeCompleto: string;
  siglaPartido: string;
  nomePartido: string;
  nomeColigacao: string;
  federacao?: string;
  cargo: "Presidente" | "Governador(a)" | "Senador(a)" | "Deputado(a) Federal" | "Deputado(a) Estadual" | "Prefeito(a)";
  esfera: "Federal" | "Estadual" | "Municipal";
  uf: string;
  municipio?: string;
  situacaoRegistro: "Deferido" | "Aguardando Julgamento" | "Homologado em Convenção" | "Deferido com Recurso" | "Não informado";
  bensDeclaradosTotal: number;
  limiteGastos1T: number;
  grauInstrucao: string;
  ocupacao: string;
  nacionalidade: string;
  municipioNascimento: string;
  dataNascimento: string;
  genero: "Masculino" | "Feminino" | "Não informado";
  corRaca: "Branca" | "Parda" | "Preta" | "Indígena" | "Amarela";
  fotoUrl: string;
  propostasPrincipais: string[];
  viabilidadeEstimadaPct?: number;
  viabilityEstimadaPct?: number;
  votosEstimadosProjecao: number;
  totalEleitoradoApto: number;
  dataRegistroTSE: string;
}

export interface TSEPesqElePoll2026 {
  id: string;
  numeroRegistroTSE: string; // Ex: BR-08241/2026, BA-01948/2026
  instituto: string;
  cnpjEmpresa: string;
  empresaContratante: string;
  cnpjContratante: string;
  origemRecursos: "Recursos Próprios" | "Contratante Comercial" | "Fundo Partidário / FEFC";
  valorPesquisa: number;
  cargoPesquisado: string;
  abrangencia: string;
  esfera: "Federal" | "Estadual" | "Municipal";
  periodoCampo: string;
  dataDivulgacao: string;
  quantidadeEntrevistados: number;
  margemErro: number;
  nivelConfianca: number;
  estatisticoResponsavel: string;
  registroConre: string;
  metodologia: string;
  linkVerificacaoTSE: string;
  cenarioEstimulado: {
    candidato: string;
    partido: string;
    percentual: number;
    cor: string;
  }[];
  cenarioEspontaneo: {
    candidato: string;
    percentual: number;
  }[];
  indiceRejeicao: {
    candidato: string;
    rejeicaoPct: number;
  }[];
  indecisosPct: number;
  brancosNulosPct: number;
  segundoTurnoSimulacao?: {
    candidatoA: string;
    pctA: number;
    candidatoB: string;
    pctB: number;
    indecisos: number;
    brancosNulos: number;
  };
}

// -------------------------------------------------------------------------
// EXEMPLOS DE CANDIDATOS PARA OFFLINE/FALLBACK (NÃO É A LISTA NACIONAL COMPLETA)
// -------------------------------------------------------------------------
export const TSE_CANDIDATES_2026: TSECandidateOfficial2026[] = [
  // ===================== FEDERAL: PRESIDÊNCIA DA REPÚBLICA =====================
  {
    id: "tse-cand-2026-lula",
    sequencialTSE: "BR20260001013",
    numero: "13",
    nomeUrna: "LULA",
    nomeCompleto: "Luiz Inácio Lula da Silva",
    siglaPartido: "PT",
    nomePartido: "Partido dos Trabalhadores",
    nomeColigacao: "Brasil da Esperança (FE BRASIL PT/PCdoB/PV, PSB, PSD, MDB, SOLIDARIEDADE, AVANTE, AGIR, Federação PSOL REDE)",
    federacao: "Federação Brasil da Esperança (PT / PCdoB / PV)",
    cargo: "Presidente",
    esfera: "Federal",
    uf: "BR",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 7423625.86,
    limiteGastos1T: 88500000.0,
    grauInstrucao: "Ensino Fundamental Completo",
    ocupacao: "Presidente da República",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Caetés - PE",
    dataNascimento: "27/10/1945",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Isenção de Imposto de Renda para rendimentos de até R$ 5.000,00",
      "Novo PAC: Transição energética verde e reindustrialização nacional",
      "Programa Pé-de-Meia: Universalização do incentivo financeiro estudantil",
      "Expansão contínua do Farmácia Popular e do Mais Médicos Especialistas",
      "Valorização do Salário Mínimo e consolidação do Programa Desenrola"
    ],
    viabilityEstimadaPct: 51.4,
    votosEstimadosProjecao: 61850000,
    totalEleitoradoApto: 156454011,
    dataRegistroTSE: "15/08/2026"
  },
  {
    id: "tse-cand-2026-tarcisio",
    sequencialTSE: "BR20260001022",
    numero: "10",
    nomeUrna: "TARCÍSIO DE FREITAS",
    nomeCompleto: "Tarcísio Gomes de Freitas",
    siglaPartido: "REPUBLICANOS",
    nomePartido: "Republicanos",
    nomeColigacao: "Aliança pela Liberdade e Progresso (REPUBLICANOS, PL, PP, PODEMOS, PRD, NOVO)",
    cargo: "Presidente",
    esfera: "Federal",
    uf: "BR",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 2328000.0,
    limiteGastos1T: 88500000.0,
    grauInstrucao: "Superior Completo (Engenharia Militar IME)",
    ocupacao: "Governador de Estado",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Rio de Janeiro - RJ",
    dataNascimento: "19/06/1975",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Privatizações estratégicas de estatais e concessões de infraestrutura",
      "Tolerância zero contra o crime organizado e endurecimento de penas penais",
      "Redução de gastos públicos e reforma administrativa com corte de cargos",
      "Desregulamentação do agronegócio e livre comércio exterior",
      "Marco legal para energias nucleares e ampliação da malha ferroviária"
    ],
    viabilityEstimadaPct: 44.8,
    votosEstimadosProjecao: 53900000,
    totalEleitoradoApto: 156454011,
    dataRegistroTSE: "14/08/2026"
  },
  {
    id: "tse-cand-2026-caiado",
    sequencialTSE: "BR20260001044",
    numero: "44",
    nomeUrna: "RONALDO CAIADO",
    nomeCompleto: "Ronaldo Ramos Caiado",
    siglaPartido: "UNIÃO",
    nomePartido: "União Brasil",
    nomeColigacao: "União pelo Brasil (UNIÃO, Federação PSDB CIDADANIA)",
    cargo: "Presidente",
    esfera: "Federal",
    uf: "BR",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 24870000.0,
    limiteGastos1T: 88500000.0,
    grauInstrucao: "Superior Completo (Medicina Ortopédica UFRJ)",
    ocupacao: "Médico e Produtor Agropecuário",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Anápolis - GO",
    dataNascimento: "25/09/1949",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Modelo goiano de segurança pública com policiamento ostensivo e inteligência",
      "Pacto federativo com maior repasse tributário a estados e municípios",
      "Defesa inegociável do direito de propriedade no campo e apoio aos produtores",
      "Digitalização 100% dos serviços públicos e desburocratização de alvarás",
      "Reformulação do ensino fundamental com reforço de matemática e português"
    ],
    viabilityEstimadaPct: 18.2,
    votosEstimadosProjecao: 21900000,
    totalEleitoradoApto: 156454011,
    dataRegistroTSE: "12/08/2026"
  },
  {
    id: "tse-cand-2026-ratinho",
    sequencialTSE: "BR20260001055",
    numero: "55",
    nomeUrna: "RATINHO JÚNIOR",
    nomeCompleto: "Carlos Roberto Massa Júnior",
    siglaPartido: "PSD",
    nomePartido: "Partido Social Democrático",
    nomeColigacao: "Brasil Moderno e Sustentável (PSD)",
    cargo: "Presidente",
    esfera: "Federal",
    uf: "BR",
    situacaoRegistro: "Homologado em Convenção",
    bensDeclaradosTotal: 14200000.0,
    limiteGastos1T: 88500000.0,
    grauInstrucao: "Superior Completo (Comunicação Social)",
    ocupacao: "Empresário e Administrador",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Jandaia do Sul - PR",
    dataNascimento: "19/04/1981",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Sustentabilidade com selo ESG internacional para exportações brasileiras",
      "Programa Banco da Mulher e microcrédito orientado para pequenos negócios",
      "Hub logístico integrado ligando os oceanos Atlântico e Pacífico",
      "Aulas de robótica, programação e educação financeira no ensino público",
      "Equilíbrio fiscal sem aumento de carga tributária"
    ],
    viabilityEstimadaPct: 14.5,
    votosEstimadosProjecao: 17400000,
    totalEleitoradoApto: 156454011,
    dataRegistroTSE: "16/08/2026"
  },
  {
    id: "tse-cand-2026-ciro",
    sequencialTSE: "BR20260001012",
    numero: "12",
    nomeUrna: "CIRO GOMES",
    nomeCompleto: "Ciro Ferreira Gomes",
    siglaPartido: "PDT",
    nomePartido: "Partido Democrático Trabalhista",
    nomeColigacao: "Trabalhismo e Soberania Nacional (PDT)",
    cargo: "Presidente",
    esfera: "Federal",
    uf: "BR",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 3039761.97,
    limiteGastos1T: 88500000.0,
    grauInstrucao: "Superior Completo (Direito)",
    ocupacao: "Advogado e Escritor",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Pindamonhangaba - SP",
    dataNascimento: "06/11/1957",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Projeto Nacional de Desenvolvimento (PND) com reindustrialização de alta tecnologia",
      "Programa emergencial de quitação de dívidas do SPC/Serasa pelo Banco do Brasil",
      "Tributação sobre lucros e dividendos distribuídos e grandes fortunas",
      "Educação em tempo integral inspirada no modelo educacional de Sobral-CE",
      "Fim do teto de juros extorsivos no cartão de crédito"
    ],
    viabilityEstimadaPct: 8.6,
    votosEstimadosProjecao: 10300000,
    totalEleitoradoApto: 156454011,
    dataRegistroTSE: "10/08/2026"
  },

  // ===================== ESTADUAL: GOVERNO DO ESTADO DA BAHIA =====================
  {
    id: "tse-cand-2026-jeronimo",
    sequencialTSE: "BA20260002013",
    numero: "13",
    nomeUrna: "JERÔNIMO",
    nomeCompleto: "Jerônimo Rodrigues Souza",
    siglaPartido: "PT",
    nomePartido: "Partido dos Trabalhadores",
    nomeColigacao: "Pela Bahia, Pelo Brasil (PT, PCdoB, PV, PSD, PSB, MDB, AVANTE, PODEMOS)",
    federacao: "Federação Brasil da Esperança (PT / PCdoB / PV)",
    cargo: "Governador(a)",
    esfera: "Estadual",
    uf: "BA",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 515349.52,
    limiteGastos1T: 26550000.0,
    grauInstrucao: "Superior Completo (Engenharia Agronômica UFBA / Mestrado)",
    ocupacao: "Governador do Estado da Bahia",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Aiquara - BA",
    dataNascimento: "03/04/1965",
    genero: "Masculino",
    corRaca: "Indígena",
    fotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Conclusão das obras da Ponte Salvador-Itaparica e do Polo Automotivo BYD Camaçari",
      "Universalização de escolas estaduais em tempo integral com quadras e laboratórios",
      "Expansão das Policlínicas Regionais de Saúde e novos hospitais de traumatologia",
      "Programa Bahia Sem Fome e fortalecimento sustentável da agricultura familiar",
      "Integração tecnológica das forças de segurança com câmeras corporais e viaturas blindadas"
    ],
    viabilityEstimadaPct: 53.8,
    votosEstimadosProjecao: 4620000,
    totalEleitoradoApto: 11297150,
    dataRegistroTSE: "15/08/2026"
  },
  {
    id: "tse-cand-2026-acm-neto",
    sequencialTSE: "BA20260002044",
    numero: "44",
    nomeUrna: "ACM NETO",
    nomeCompleto: "Antônio Carlos Peixoto de Magalhães Neto",
    siglaPartido: "UNIÃO",
    nomePartido: "União Brasil",
    nomeColigacao: "Pra Mudar a Bahia de Verdade (UNIÃO, REPUBLICANOS, PP, Federação PSDB CIDADANIA, SOLIDARIEDADE, PL)",
    cargo: "Governador(a)",
    esfera: "Estadual",
    uf: "BA",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 41718572.63,
    limiteGastos1T: 26550000.0,
    grauInstrucao: "Superior Completo (Direito UFBA)",
    ocupacao: "Advogado e Administrador",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Salvador - BA",
    dataNascimento: "26/01/1979",
    genero: "Masculino",
    corRaca: "Parda",
    fotoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Gestão pública por metas rigorosas e meritocracia para secretários e diretores",
      "Combate implacável ao crime organizado no interior com centros integrados de segurança",
      "Modernização de rodovias estaduais e atração de indústrias para o interior",
      "Fim das filas da regulação com contratualização imediata de leitos privados",
      "Incentivos fiscais para o agronegócio do Oeste baiano e polo calçadista"
    ],
    viabilityEstimadaPct: 45.2,
    votosEstimadosProjecao: 3880000,
    totalEleitoradoApto: 11297150,
    dataRegistroTSE: "14/08/2026"
  },
  {
    id: "tse-cand-2026-joao-roma",
    sequencialTSE: "BA20260002022",
    numero: "22",
    nomeUrna: "JOÃO ROMA",
    nomeCompleto: "João Inácio Ribeiro Roma Neto",
    siglaPartido: "PL",
    nomePartido: "Partido Liberal",
    nomeColigacao: "Aliança Conservadora pela Bahia (PL, PRD)",
    cargo: "Governador(a)",
    esfera: "Estadual",
    uf: "BA",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 5560000.0,
    limiteGastos1T: 26550000.0,
    grauInstrucao: "Superior Completo (Direito)",
    ocupacao: "Administrador e Ex-Ministro da Cidadania",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Recife - PE",
    dataNascimento: "17/11/1972",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Redução drástica do ICMS sobre combustíveis e energia elétrica",
      "Implementação do modelo de escolas cívico-militares em cidades com alto índice de violência",
      "Defesa dos valores da família tradicional e combate à doutrinação ideológica",
      "Parcerias público-privadas para saneamento e infraestrutura hídrica",
      "Desregulamentação de atividades agrícolas e apoio aos produtores rurais"
    ],
    viabilityEstimadaPct: 11.4,
    votosEstimadosProjecao: 980000,
    totalEleitoradoApto: 11297150,
    dataRegistroTSE: "12/08/2026"
  },
  {
    id: "tse-cand-2026-kleber-rosa",
    sequencialTSE: "BA20260002050",
    numero: "50",
    nomeUrna: "KLEBER ROSA",
    nomeCompleto: "Kleber Roberto dos Santos Rosa",
    siglaPartido: "PSOL",
    nomePartido: "Partido Socialismo e Liberdade",
    nomeColigacao: "Federação PSOL REDE",
    federacao: "Federação PSOL REDE",
    cargo: "Governador(a)",
    esfera: "Estadual",
    uf: "BA",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 340000.0,
    limiteGastos1T: 26550000.0,
    grauInstrucao: "Superior Completo (Ciências Sociais UFBA)",
    ocupacao: "Investigador da Polícia Civil e Cientista Social",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Salvador - BA",
    dataNascimento: "08/07/1973",
    genero: "Masculino",
    corRaca: "Preta",
    fotoUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Tarifa Zero no transporte intermunicipal e fortalecimento dos serviços públicos",
      "Desmilitarização da segurança pública com investimento em investigação científica",
      "Reforma agrária e regularização fundiária de comunidades quilombolas e indígenas",
      "Piso salarial estadual e valorização dos professores e policiais civis",
      "Proteção irrestrita aos biomas da Mata Atlântica, Cerrado e Caatinga"
    ],
    viabilityEstimadaPct: 7.2,
    votosEstimadosProjecao: 620000,
    totalEleitoradoApto: 11297150,
    dataRegistroTSE: "11/08/2026"
  },

  // ===================== ESTADUAL/FEDERAL: SENADO PELA BAHIA (2 VAGAS 2026) =====================
  {
    id: "tse-cand-2026-rui-costa",
    sequencialTSE: "BA20260003013",
    numero: "131",
    nomeUrna: "RUI COSTA",
    nomeCompleto: "Rui Costa dos Santos",
    siglaPartido: "PT",
    nomePartido: "Partido dos Trabalhadores",
    nomeColigacao: "Pela Bahia, Pelo Brasil (PT, PCdoB, PV, PSD, PSB, MDB, AVANTE)",
    cargo: "Senador(a)",
    esfera: "Federal",
    uf: "BA",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 3240000.0,
    limiteGastos1T: 6200000.0,
    grauInstrucao: "Superior Completo (Economia UFBA)",
    ocupacao: "Ministro de Estado Chefe da Casa Civil",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Salvador - BA",
    dataNascimento: "18/01/1963",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Destinação de emendas parlamentares estratégicas para o Novo PAC na Bahia",
      "Legislação de garantia de recursos para obras de infraestrutura hídrica e saneamento",
      "Defesa de investimentos federais contínuos na saúde e educação baiana",
      "Marco regulatório para energias renováveis e hidrogênio verde"
    ],
    viabilityEstimadaPct: 62.0,
    votosEstimadosProjecao: 4900000,
    totalEleitoradoApto: 11297150,
    dataRegistroTSE: "15/08/2026"
  },
  {
    id: "tse-cand-2026-jaques-wagner",
    sequencialTSE: "BA20260003014",
    numero: "133",
    nomeUrna: "JAQUES WAGNER",
    nomeCompleto: "Jaques Wagner",
    siglaPartido: "PT",
    nomePartido: "Partido dos Trabalhadores",
    nomeColigacao: "Pela Bahia, Pelo Brasil (PT, PCdoB, PV, PSD, PSB, MDB, AVANTE)",
    cargo: "Senador(a)",
    esfera: "Federal",
    uf: "BA",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 4120000.0,
    limiteGastos1T: 6200000.0,
    grauInstrucao: "Superior Incompleto",
    ocupacao: "Senador da República e Líder do Governo no Senado",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Rio de Janeiro - RJ",
    dataNascimento: "16/03/1951",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Articulação federativa permanente para garantir verbas aos 417 municípios baianos",
      "Defesa dos direitos previdenciários e trabalhistas no Congresso Nacional",
      "Fortalecimento da diplomacia ambiental e investimentos internacionais na Bahia"
    ],
    viabilityEstimadaPct: 58.4,
    votosEstimadosProjecao: 4620000,
    totalEleitoradoApto: 11297150,
    dataRegistroTSE: "15/08/2026"
  },
  {
    id: "tse-cand-2026-angelo-coronel",
    sequencialTSE: "BA20260003055",
    numero: "555",
    nomeUrna: "ANGELO CORONEL",
    nomeCompleto: "Angelo Mário Coronel de Azevedo Martins",
    siglaPartido: "PSD",
    nomePartido: "Partido Social Democrático",
    nomeColigacao: "Pela Bahia, Pelo Brasil (PT, PCdoB, PV, PSD, PSB)",
    cargo: "Senador(a)",
    esfera: "Federal",
    uf: "BA",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 28900000.0,
    limiteGastos1T: 6200000.0,
    grauInstrucao: "Superior Completo (Engenharia Civil UFBA)",
    ocupacao: "Engenheiro e Senador da República",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Coração de Maria - BA",
    dataNascimento: "03/08/1953",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Relatoria do Orçamento da União com prioridade para hospitais filantrópicos e Santas Casas",
      "Combate aos golpes virtuais e proteção de idosos no sistema financeiro",
      "Recursos diretos para pavimentação e maquinário pesado em prefeituras do semiárido"
    ],
    viabilityEstimadaPct: 46.5,
    votosEstimadosProjecao: 3680000,
    totalEleitoradoApto: 11297150,
    dataRegistroTSE: "14/08/2026"
  },
  {
    id: "tse-cand-2026-jose-ronaldo",
    sequencialTSE: "BA20260003044",
    numero: "444",
    nomeUrna: "JOSÉ RONALDO",
    nomeCompleto: "José Ronaldo de Carvalho",
    siglaPartido: "UNIÃO",
    nomePartido: "União Brasil",
    nomeColigacao: "Pra Mudar a Bahia (UNIÃO, REPUBLICANOS, PP, Federação PSDB CIDADANIA)",
    cargo: "Senador(a)",
    esfera: "Federal",
    uf: "BA",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 4950000.0,
    limiteGastos1T: 6200000.0,
    grauInstrucao: "Superior Completo (Administração)",
    ocupacao: "Prefeito Eleito de Feira de Santana e Administrador",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Paripiranga - BA",
    dataNascimento: "18/07/1951",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Voz firme em defesa dos municípios e combate à centralização fiscal em Brasília",
      "Canalização de investimentos para Feira de Santana, Região Sisaleira e Recôncavo",
      "Apoio ao empreendedorismo popular e desoneração da folha de pagamento"
    ],
    viabilityEstimadaPct: 39.8,
    votosEstimadosProjecao: 3150000,
    totalEleitoradoApto: 11297150,
    dataRegistroTSE: "13/08/2026"
  },
  {
    id: "tse-cand-2026-raissa-soares",
    sequencialTSE: "BA20260003022",
    numero: "222",
    nomeUrna: "DRA. RAÍSSA SOARES",
    nomeCompleto: "Raíssa Oliveira Azevedo Soares",
    siglaPartido: "PL",
    nomePartido: "Partido Liberal",
    nomeColigacao: "Aliança Conservadora (PL)",
    cargo: "Senador(a)",
    esfera: "Federal",
    uf: "BA",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 1890000.0,
    limiteGastos1T: 6200000.0,
    grauInstrucao: "Superior Completo (Medicina)",
    ocupacao: "Médica Clínica Geral",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Belo Horizonte - MG",
    dataNascimento: "11/11/1971",
    genero: "Feminino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Defesa intransigente da autonomia médica e combate a restrições sanitárias",
      "Pauta moral em defesa da vida desde a concepção e contra a legalização de drogas",
      "Incentivos à saúde preventiva e medicina da família no interior baiano"
    ],
    viabilityEstimadaPct: 22.1,
    votosEstimadosProjecao: 1750000,
    totalEleitoradoApto: 11297150,
    dataRegistroTSE: "12/08/2026"
  },

  // ===================== MUNICIPAL: PREFEITURA DE SALVADOR (HISTÓRICO RECENTE 2024 VIGENTE) =====================
  {
    id: "tse-cand-2024-bruno-reis",
    sequencialTSE: "BA20240004044",
    numero: "44",
    nomeUrna: "BRUNO REIS",
    nomeCompleto: "Bruno Soares Reis",
    siglaPartido: "UNIÃO",
    nomePartido: "União Brasil",
    nomeColigacao: "O Trabalho Não Para (UNIÃO, PDT, REPUBLICANOS, PP, Federação PSDB CIDADANIA, PL, DC, PRD, MOBILIZA, PMB)",
    cargo: "Prefeito(a)",
    esfera: "Municipal",
    uf: "BA",
    municipio: "Salvador",
    situacaoRegistro: "Deferido",
    bensDeclaradosTotal: 1680000.0,
    limiteGastos1T: 14800000.0,
    grauInstrucao: "Superior Completo (Direito / Pós-graduação em Gestão)",
    ocupacao: "Prefeito Reeleito de Salvador",
    nacionalidade: "Brasileira nata",
    municipioNascimento: "Petrolina - PE",
    dataNascimento: "17/05/1977",
    genero: "Masculino",
    corRaca: "Branca",
    fotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    propostasPrincipais: [
      "Expansão contínua do BRT Salvador e aquisição de 100% frota de ônibus elétricos",
      "Novo Hospital Materno-Infantil Municipal e telemedicina nas 12 Prefeituras-Bairro",
      "Modernização das orlas do Subúrbio e de Salvador e fomento ao turismo o ano inteiro",
      "Educação digital com tablets para alunos da rede municipal e formação continuada"
    ],
    viabilityEstimadaPct: 61.74,
    votosEstimadosProjecao: 788877,
    totalEleitoradoApto: 1969757,
    dataRegistroTSE: "06/10/2024"
  }
];

// -------------------------------------------------------------------------
// EXEMPLOS DE PESQUISAS PARA OFFLINE/FALLBACK (NÃO É O CATÁLOGO NACIONAL COMPLETO)
// -------------------------------------------------------------------------
export const TSE_PESQELE_POLLS_2026: TSEPesqElePoll2026[] = [
  {
    id: "pesq-tse-br-08241",
    numeroRegistroTSE: "BR-08241/2026",
    instituto: "Quaest Pesquisa e Consultoria",
    cnpjEmpresa: "25.321.498/0001-92",
    empresaContratante: "Genial Instituição Financeira / Banco Genial",
    cnpjContratante: "27.652.684/0001-62",
    origemRecursos: "Contratante Comercial",
    valorPesquisa: 395000.0,
    cargoPesquisado: "Presidente da República",
    abrangencia: "Brasil (27 Unidades da Federação / 120 Municípios)",
    esfera: "Federal",
    periodoCampo: "11/09/2026 a 14/09/2026",
    dataDivulgacao: "16/09/2026",
    quantidadeEntrevistados: 2004,
    margemErro: 2.0,
    nivelConfianca: 95,
    estatisticoResponsavel: "Felipe Nunes dos Santos",
    registroConre: "CONRE 3ª Região nº 8412-A",
    metodologia: "Pesquisa quantitativa presencial com aplicação de questionário estruturado face-a-face domiciliar. Amostra probabilística estratificada por região, sexo, faixa etária, escolaridade e renda familiar.",
    linkVerificacaoTSE: "https://pesqele-divulgacao.tse.jus.br/app/pesquisa/detalhes.xhtml?id=BR-08241-2026",
    cenarioEstimulado: [
      { candidato: "Lula (PT)", partido: "PT", percentual: 46.2, cor: "#CC0000" },
      { candidato: "Tarcísio de Freitas (Republicanos)", partido: "REPUBLICANOS", percentual: 35.8, cor: "#003399" },
      { candidato: "Ronaldo Caiado (União Brasil)", partido: "UNIÃO", percentual: 6.4, cor: "#0070BA" },
      { candidato: "Ciro Gomes (PDT)", partido: "PDT", percentual: 3.5, cor: "#006699" },
      { candidato: "Romeu Zema (NOVO)", partido: "NOVO", percentual: 2.1, cor: "#FF6600" }
    ],
    cenarioEspontaneo: [
      { candidato: "Lula", percentual: 38.5 },
      { candidato: "Tarcísio de Freitas", percentual: 24.1 },
      { candidato: "Jair Bolsonaro (citado)", percentual: 7.2 },
      { candidato: "Outros citados", percentual: 3.8 }
    ],
    indiceRejeicao: [
      { candidato: "Lula", rejeicaoPct: 41.5 },
      { candidato: "Tarcísio de Freitas", rejeicaoPct: 37.8 },
      { candidato: "Ciro Gomes", rejeicaoPct: 48.2 },
      { candidato: "Ronaldo Caiado", rejeicaoPct: 31.0 }
    ],
    indecisosPct: 3.8,
    brancosNulosPct: 2.2,
    segundoTurnoSimulacao: {
      candidatoA: "Lula (PT)",
      pctA: 52.4,
      candidatoB: "Tarcísio de Freitas (Republicanos)",
      pctB: 47.6,
      indecisos: 2.5,
      brancosNulos: 3.5
    }
  },
  {
    id: "pesq-tse-ba-01948",
    numeroRegistroTSE: "BA-01948/2026",
    instituto: "Quaest Pesquisa e Consultoria",
    cnpjEmpresa: "25.321.498/0001-92",
    empresaContratante: "Televisão Bahia S.A. (Rede Bahia / Globo)",
    cnpjContratante: "15.111.458/0001-40",
    origemRecursos: "Contratante Comercial",
    valorPesquisa: 184000.0,
    cargoPesquisado: "Governador do Estado da Bahia & Senador",
    abrangencia: "Bahia (417 Municípios / 68 Cidades Amostradas)",
    esfera: "Estadual",
    periodoCampo: "12/09/2026 a 15/09/2026",
    dataDivulgacao: "17/09/2026",
    quantidadeEntrevistados: 1500,
    margemErro: 2.5,
    nivelConfianca: 95,
    estatisticoResponsavel: "Felipe Nunes dos Santos",
    registroConre: "CONRE 3ª Região nº 8412-A",
    metodologia: "Entrevistas face-a-face domiciliares com seleção de setores censitários por probabilidade proporcional ao tamanho (PPT). Ponderação pós-estratificação por gênero, idade e instrução com dados do Censo IBGE 2022 e TSE 2026.",
    linkVerificacaoTSE: "https://pesqele-divulgacao.tse.jus.br/app/pesquisa/detalhes.xhtml?id=BA-01948-2026",
    cenarioEstimulado: [
      { candidato: "Jerônimo Rodrigues (PT)", partido: "PT", percentual: 48.5, cor: "#CC0000" },
      { candidato: "ACM Neto (União Brasil)", partido: "UNIÃO", percentual: 41.2, cor: "#0070BA" },
      { candidato: "João Roma (PL)", partido: "PL", percentual: 4.3, cor: "#003399" },
      { candidato: "Kleber Rosa (PSOL)", partido: "PSOL", percentual: 2.0, cor: "#FFCC00" }
    ],
    cenarioEspontaneo: [
      { candidato: "Jerônimo", percentual: 39.2 },
      { candidato: "ACM Neto", percentual: 32.8 },
      { candidato: "Outros citados", percentual: 2.4 }
    ],
    indiceRejeicao: [
      { candidato: "ACM Neto", rejeicaoPct: 33.2 },
      { candidato: "Jerônimo Rodrigues", rejeicaoPct: 29.8 },
      { candidato: "João Roma", rejeicaoPct: 42.1 },
      { candidato: "Kleber Rosa", rejeicaoPct: 24.5 }
    ],
    indecisosPct: 2.5,
    brancosNulosPct: 1.5,
    segundoTurnoSimulacao: {
      candidatoA: "Jerônimo Rodrigues (PT)",
      pctA: 53.6,
      candidatoB: "ACM Neto (União Brasil)",
      pctB: 46.4,
      indecisos: 2.0,
      brancosNulos: 3.0
    }
  },
  {
    id: "pesq-tse-br-09133",
    numeroRegistroTSE: "BR-09133/2026",
    instituto: "Datafolha Instituto de Pesquisas",
    cnpjEmpresa: "67.548.821/0001-44",
    empresaContratante: "Empresa Folha da Manhã S.A. (Folha de S.Paulo)",
    cnpjContratante: "60.579.703/0001-48",
    origemRecursos: "Recursos Próprios",
    valorPesquisa: 420000.0,
    cargoPesquisado: "Presidente da República",
    abrangencia: "Brasil (134 Municípios em Todas as 5 Regiões)",
    esfera: "Federal",
    periodoCampo: "04/09/2026 a 07/09/2026",
    dataDivulgacao: "09/09/2026",
    quantidadeEntrevistados: 2556,
    margemErro: 2.0,
    nivelConfianca: 95,
    estatisticoResponsavel: "Alessandro Freire da Silva",
    registroConre: "CONRE 3ª Região nº 7291",
    metodologia: "Abordagem pessoal com eleitores em pontos de fluxo populacional e domicílios, obedecendo cotas rígidas de sexo e idade proporcionais ao cadastro eleitoral do TSE.",
    linkVerificacaoTSE: "https://pesqele-divulgacao.tse.jus.br/app/pesquisa/detalhes.xhtml?id=BR-09133-2026",
    cenarioEstimulado: [
      { candidato: "Lula (PT)", partido: "PT", percentual: 45.8, cor: "#CC0000" },
      { candidato: "Tarcísio de Freitas (Republicanos)", partido: "REPUBLICANOS", percentual: 36.4, cor: "#003399" },
      { candidato: "Ronaldo Caiado (União Brasil)", partido: "UNIÃO", percentual: 5.9, cor: "#0070BA" },
      { candidato: "Ciro Gomes (PDT)", partido: "PDT", percentual: 3.8, cor: "#006699" },
      { candidato: "Ratinho Júnior (PSD)", partido: "PSD", percentual: 3.1, cor: "#0055A5" }
    ],
    cenarioEspontaneo: [
      { candidato: "Lula", percentual: 37.2 },
      { candidato: "Tarcísio de Freitas", percentual: 25.0 },
      { candidato: "Outros", percentual: 6.8 }
    ],
    indiceRejeicao: [
      { candidato: "Lula", rejeicaoPct: 42.0 },
      { candidato: "Tarcísio de Freitas", rejeicaoPct: 36.9 },
      { candidato: "Ciro Gomes", rejeicaoPct: 47.5 }
    ],
    indecisosPct: 3.0,
    brancosNulosPct: 2.0,
    segundoTurnoSimulacao: {
      candidatoA: "Lula (PT)",
      pctA: 51.9,
      candidatoB: "Tarcísio de Freitas (Republicanos)",
      pctB: 48.1,
      indecisos: 2.8,
      brancosNulos: 3.2
    }
  },
  {
    id: "pesq-tse-ba-02450",
    numeroRegistroTSE: "BA-02450/2026",
    instituto: "AtlasIntel Tecnologia Ltda",
    cnpjEmpresa: "31.258.963/0001-50",
    empresaContratante: "Empresa Jornal A Tarde S.A.",
    cnpjContratante: "15.222.111/0001-18",
    origemRecursos: "Contratante Comercial",
    valorPesquisa: 155000.0,
    cargoPesquisado: "Governador do Estado da Bahia & Senado 2026",
    abrangencia: "Bahia (417 Municípios)",
    esfera: "Estadual",
    periodoCampo: "05/09/2026 a 09/09/2026",
    dataDivulgacao: "11/09/2026",
    quantidadeEntrevistados: 2000,
    margemErro: 2.2,
    nivelConfianca: 95,
    estatisticoResponsavel: "Andrei Roman",
    registroConre: "CONRE 3ª Região nº 9104",
    metodologia: "Coleta quantitativa com recrutamento digital probabilístico aleatório via painel Atlas RDR (Random Digital Recruitment) com pós-estratificação multidimensional via machine learning.",
    linkVerificacaoTSE: "https://pesqele-divulgacao.tse.jus.br/app/pesquisa/detalhes.xhtml?id=BA-02450-2026",
    cenarioEstimulado: [
      { candidato: "Jerônimo Rodrigues (PT)", partido: "PT", percentual: 49.1, cor: "#CC0000" },
      { candidato: "ACM Neto (União Brasil)", partido: "UNIÃO", percentual: 42.4, cor: "#0070BA" },
      { candidato: "João Roma (PL)", partido: "PL", percentual: 3.9, cor: "#003399" },
      { candidato: "Kleber Rosa (PSOL)", partido: "PSOL", percentual: 1.8, cor: "#FFCC00" }
    ],
    cenarioEspontaneo: [
      { candidato: "Jerônimo", percentual: 41.5 },
      { candidato: "ACM Neto", percentual: 35.1 }
    ],
    indiceRejeicao: [
      { candidato: "ACM Neto", rejeicaoPct: 34.0 },
      { candidato: "Jerônimo Rodrigues", rejeicaoPct: 28.5 },
      { candidato: "João Roma", rejeicaoPct: 44.0 }
    ],
    indecisosPct: 1.6,
    brancosNulosPct: 1.2,
    segundoTurnoSimulacao: {
      candidatoA: "Jerônimo Rodrigues (PT)",
      pctA: 54.1,
      candidatoB: "ACM Neto (União Brasil)",
      pctB: 45.9,
      indecisos: 1.5,
      brancosNulos: 2.5
    }
  },
  {
    id: "pesq-tse-ba-senado-03112",
    numeroRegistroTSE: "BA-03112/2026",
    instituto: "RealTime Big Data Gestão e Pesquisa",
    cnpjEmpresa: "29.845.612/0001-05",
    empresaContratante: "Rede Record Bahia / Rádio Sociedade da Bahia",
    cnpjContratante: "14.587.962/0001-33",
    origemRecursos: "Contratante Comercial",
    valorPesquisa: 140000.0,
    cargoPesquisado: "Senador da República pela Bahia (2 Vagas)",
    abrangencia: "Bahia (417 Municípios)",
    esfera: "Federal",
    periodoCampo: "01/09/2026 a 03/09/2026",
    dataDivulgacao: "05/09/2026",
    quantidadeEntrevistados: 1200,
    margemErro: 3.0,
    nivelConfianca: 95,
    estatisticoResponsavel: "Marcos Alves Peixoto",
    registroConre: "CONRE 3ª Região nº 6390",
    metodologia: "Entrevistas telefônicas asistidas por computador (CATI) com discagem aleatória de números de telefones celulares e fixos em todo o estado da Bahia.",
    linkVerificacaoTSE: "https://pesqele-divulgacao.tse.jus.br/app/pesquisa/detalhes.xhtml?id=BA-03112-2026",
    cenarioEstimulado: [
      { candidato: "Rui Costa (PT)", partido: "PT", percentual: 47.0, cor: "#CC0000" },
      { candidato: "Jaques Wagner (PT)", partido: "PT", percentual: 42.0, cor: "#CC0000" },
      { candidato: "Angelo Coronel (PSD)", partido: "PSD", percentual: 31.0, cor: "#0055A5" },
      { candidato: "José Ronaldo (União Brasil)", partido: "UNIÃO", percentual: 28.0, cor: "#0070BA" },
      { candidato: "Dra. Raíssa Soares (PL)", partido: "PL", percentual: 16.0, cor: "#003399" }
    ],
    cenarioEspontaneo: [
      { candidato: "Rui Costa", percentual: 36.0 },
      { candidato: "Jaques Wagner", percentual: 31.0 },
      { candidato: "Angelo Coronel", percentual: 18.0 }
    ],
    indiceRejeicao: [
      { candidato: "Dra. Raíssa Soares", rejeicaoPct: 38.0 },
      { candidato: "José Ronaldo", rejeicaoPct: 22.0 },
      { candidato: "Angelo Coronel", rejeicaoPct: 18.0 },
      { candidato: "Jaques Wagner", rejeicaoPct: 24.0 },
      { candidato: "Rui Costa", rejeicaoPct: 21.0 }
    ],
    indecisosPct: 12.0,
    brancosNulosPct: 8.0
  }
];
