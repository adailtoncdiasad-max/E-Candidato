import { ProposalSimulationRecord } from "../types";

export const INITIAL_PROPOSAL_SCENARIOS: ProposalSimulationRecord[] = [
  {
    id: "prop-scen-01",
    title: "Tarifa Zero Total aos Domingos e Feriados no Transporte Público",
    themeAxis: "Mobilidade Urbana & Economia Popular",
    detailedProposal: "Implementação de passe livre irrestrito em todos os ônibus convencionais, BRT e linhas troncais aos domingos e feriados religiosos/cívicos. Financiamento através da criação de um Fundo Municipal de Mobilidade Sustentável alimentado por taxas de grandes polos geradores de tráfego e publicidade digital nos abrigos e terminais.",
    framingTone: "Popular / Emocional",
    targetAudience: "Classes D/E, Jovens e Trabalhadores da Periferia",
    targetRegion: "Salvador e Região Metropolitana",
    candidateId: "preset-bruno-reis",
    candidateName: "Bruno Reis",
    sphere: "Municipal",
    createdAt: "2026-09-15",
    metrics: {
      overallAcceptancePct: 79,
      netVoteGainEstPct: 3.4,
      backfireRiskPct: 9,
      undecidedConversionPct: 41,
      socialBuzzScore: 88,
    },
    demographics: [
      { segment: "Jovens (16-24 anos)", favorabilityPct: 88, rejectionPct: 4, neutralPct: 8, keyDriver: "Acesso a praias, parques e eventos culturais sem custo de deslocamento." },
      { segment: "Mulheres Chefes de Família", favorabilityPct: 82, rejectionPct: 6, neutralPct: 12, keyDriver: "Economia direta na renda familiar para lazer com filhos e visitas a parentes." },
      { segment: "Classes D e E (até 2 SM)", favorabilityPct: 91, rejectionPct: 3, neutralPct: 6, keyDriver: "Justiça tarifária e alívio financeiro semanal imediato." },
      { segment: "Classe Média (B/C)", favorabilityPct: 64, rejectionPct: 18, neutralPct: 18, keyDriver: "Preocupação com custo fiscal e superlotação dos veículos." },
      { segment: "Comerciantes e Setor de Serviços", favorabilityPct: 74, rejectionPct: 12, neutralPct: 14, keyDriver: "Aumento de circulação de pessoas no comércio de rua, feiras e shoppings." },
      { segment: "Eleitorado 60+ (Idosos)", favorabilityPct: 70, rejectionPct: 10, neutralPct: 20, keyDriver: "Já possuem gratuidade por lei, mas apoiam o benefício para netos e familiares." }
    ],
    swot: {
      strengths: [
        "Altíssima ressonância nas redes sociais e apelo visual direto nos pontos de ônibus",
        "Atrai o eleitor jovem e trabalhadores informais de aplicativo",
        "Medida com precedente positivo em outras capitais (como São Paulo)",
        "Potencial de virar bandeira central nos debates e programas de TV"
      ],
      vulnerabilities: [
        "Questionamentos das concessionárias sobre a fonte contábil de subsídio",
        "Risco de superlotação e queixas sobre manutenção da frota no domingo",
        "Crítica da oposição apontando 'medida eleitoreira de véspera de eleição'"
      ],
      oppositionExpectedAttacks: [
        "Vão questionar: 'Por que não fez antes durante os 4 anos de mandato?'",
        "Vão alegar que o projeto causará aumento de IPTU ou corte em postos de saúde",
        "Concessionárias de ônibus podem ameaçar reduzir viagens nos dias úteis"
      ],
      recommendedDefense: [
        "Apresentar estudo atuarial transparente mostrando equilíbrio sem criar nenhum novo imposto",
        "Enfatizar que o transporte no domingo tem custo marginal baixo e estimula a economia local",
        "Vincular ao fortalecimento do comércio popular e lazer democrático da família baiana"
      ],
      strategicRefinements: [
        "Lançar como fase piloto de 6 meses para neutralizar acusações de irresponsabilidade fiscal",
        "Garantir reforço de 30% nas linhas troncais de praia e grandes parques",
        "Colocar os rodoviários no centro do acordo garantindo pagamento de horas e descanso"
      ]
    },
    aiAnalysisText: "A proposta possui vetor eleitoral extremamente positivo (+3.4% estimado), com baixo risco de rejeição global (9%). Funciona como escudo eficiente contra críticas de mobilidade urbana e gera alto engajamento orgânico nas periferias."
  },
  {
    id: "prop-scen-02",
    title: "Bolsa Primeiro Emprego Bahia & Isenção de Impostos para Empresas que Contratarem Jovens",
    themeAxis: "Juventude & Emprego",
    detailedProposal: "Criação de um incentivo estadual direto que subsidia 50% do salário de jovens de 18 a 24 anos no primeiro ano de contratação formal com carteira assinada, com isenção proporcional de ICMS para médias e pequenas empresas que aumentarem seu quadro juvenil em ao menos 15%. Foco prioritário em estudantes de escolas públicas estaduais e egressos de cursos técnicos.",
    framingTone: "Propositivo",
    targetAudience: "Jovens, Mães de Família e Pequenos Empresários",
    targetRegion: "Toda a Bahia (Salvador, Feira, Conquista, Ilhéus, Juazeiro, Barreiras)",
    candidateId: "preset-jeronimo",
    candidateName: "Jerônimo Rodrigues",
    sphere: "Estadual",
    createdAt: "2026-09-16",
    metrics: {
      overallAcceptancePct: 84,
      netVoteGainEstPct: 2.9,
      backfireRiskPct: 6,
      undecidedConversionPct: 37,
      socialBuzzScore: 79,
    },
    demographics: [
      { segment: "Jovens (16-24 anos)", favorabilityPct: 92, rejectionPct: 2, neutralPct: 6, keyDriver: "Quebra a barreira da 'exigência de experiência prévia' para entrar no mercado." },
      { segment: "Mães e Pais de Família", favorabilityPct: 89, rejectionPct: 3, neutralPct: 8, keyDriver: "Ansiedade com filhos ociosos ou vulneráveis à criminalidade urbana." },
      { segment: "Classes D e E", favorabilityPct: 87, rejectionPct: 4, neutralPct: 9, keyDriver: "Oportunidade real de ascensão social e renda digna dentro de casa." },
      { segment: "Pequenos e Médios Empresários", favorabilityPct: 78, rejectionPct: 8, neutralPct: 14, keyDriver: "Redução de custo de folha e mão de obra motivada." },
      { segment: "Eleitorado Universitário / Classe Média", favorabilityPct: 75, rejectionPct: 9, neutralPct: 16, keyDriver: "Apoio a programas de estágio e trainees." }
    ],
    swot: {
      strengths: [
        "Responde à maior angústia do eleitorado jovem baiano (desemprego e falta de perspectiva)",
        "Altíssima aceitação entre mães chefes de família (segmento eleitoral decisivo)",
        "Atrai apoio de associações comerciais e CDLs do interior do estado"
      ],
      vulnerabilities: [
        "Secretaria da Fazenda (Sefaz) precisa validar o teto de renúncia fiscal",
        "Risco de empresas demitirem funcionários mais velhos para contratar jovens subsidiados"
      ],
      oppositionExpectedAttacks: [
        "A oposição dirá que é cópia de programas anteriores como o Primeiro Emprego",
        "Questionarão se haverá vagas suficientes no interior do estado ou só nas grandes capitais"
      ],
      recommendedDefense: [
        "Incluir cláusula anti-substituição (empresa não pode ter demitido trabalhadores nos últimos 6 meses)",
        "Mostrar parcerias com o Senai, Senac e Universidades Estaduais para formação técnica"
      ],
      strategicRefinements: [
        "Reservar cota de 30% das vagas para o interior profundo e semiárido",
        "Adicionar bônus extra de permanência de 2 anos para empresas que efetivarem o jovem"
      ]
    },
    aiAnalysisText: "Proposta de altíssimo rendimento político-eleitoral e quase nula rejeição. Conecta as pontas da juventude e do setor produtivo, oferecendo uma resposta concreta ao debate de segurança pública pela via do trabalho."
  },
  {
    id: "prop-scen-03",
    title: "Câmeras Corporais nos Policiais & Batalhões Comunitários de Pacificação",
    themeAxis: "Segurança Pública & Direitos",
    detailedProposal: "Implantação obrigatória de câmeras corporais conectadas em tempo real nos uniformes de todas as viaturas operacionais da Polícia Militar da Bahia, associada à criação de Batalhões Comunitários de Proximidade e aumento de 25% no bônus salarial por apreensão de armas ilegais e redução de letalidade.",
    framingTone: "Técnico / Responsável",
    targetAudience: "Eleitores de Centro, Defensores de Direitos Humanos, Moradores de Comunidades",
    targetRegion: "Regiões Metropolitanas e Grandes Polos Urbanos da Bahia",
    candidateId: "preset-jeronimo",
    candidateName: "Jerônimo Rodrigues",
    sphere: "Estadual",
    createdAt: "2026-09-17",
    metrics: {
      overallAcceptancePct: 62,
      netVoteGainEstPct: 1.1,
      backfireRiskPct: 24,
      undecidedConversionPct: 22,
      socialBuzzScore: 94,
    },
    demographics: [
      { segment: "Moradores de Periferia / Comunidades", favorabilityPct: 76, rejectionPct: 12, neutralPct: 12, keyDriver: "Maior proteção contra abusos e maior transparência nas abordagens." },
      { segment: "Entidades de Direitos Humanos & Intelectuais", favorabilityPct: 91, rejectionPct: 3, neutralPct: 6, keyDriver: "Redução comprovada de mortes e valorização do procedimento padrão." },
      { segment: "Militares, Policiais e Familiares de Forças de Segurança", favorabilityPct: 34, rejectionPct: 52, neutralPct: 14, keyDriver: "Sensação de vigilância punitiva e desconfiança na cúpula da SSP." },
      { segment: "Eleitores Conservadores / Linha-Dura", favorabilityPct: 41, rejectionPct: 46, neutralPct: 13, keyDriver: "Medo de que o policial fique 'de mãos atadas' contra facções armadas." },
      { segment: "Eleitores de Centro / Moderados", favorabilityPct: 69, rejectionPct: 15, neutralPct: 16, keyDriver: "Percebem como modernização profissional baseada em evidências." }
    ],
    swot: {
      strengths: [
        "Moderniza a imagem da gestão na segurança pública e reduz tensões raciais e sociais",
        "Apoiada por dados científicos consolidados em estados pioneiros como São Paulo",
        "Protege o bom policial contra falsas acusações criminais"
      ],
      vulnerabilities: [
        "Forte resistência corporativa em associações de praças e oficiais da PM",
        "Risco de boicote tácito se não houver diálogo prévio com a tropa",
        "Tema polarizado que pode ser explorado por candidatos com discurso armamentista"
      ],
      oppositionExpectedAttacks: [
        "Vão acusar o candidato de 'desprestigiar a polícia' e 'favorecer a bandidagem'",
        "Disseminação de memes e vídeos com relatos de policiais insatisfeitos"
      ],
      recommendedDefense: [
        "Enquadrar a câmera como 'instrumento de proteção da vida do policial' contra acusações falsas",
        "Condicionar o anúncio ao aumento substancial do auxílio fardamento e diárias de operações especiais",
        "Mostrar que os vídeos provam a inocência do policial em 95% dos inquéritos"
      ],
      strategicRefinements: [
        "Evitar tom de fiscalização punitiva; adotar narrativa de 'Tecnologia para Proteção da Tropa e da Sociedade'",
        "Anunciar conjuntamente novos investimentos em viaturas blindadas e armamento de precisão"
      ]
    },
    aiAnalysisText: "Tema de alto risco de polarização (24% de risco de backfire corporativo e conservador). Não deve ser lançado de forma isolada: requer 'pacote equilibrado' com valorização salarial da tropa e viaturas blindadas para não alienar a base policial."
  },
  {
    id: "prop-scen-04",
    title: "Isenção de Imposto de Renda até R$ 5.000 com Alíquota Mínima sobre Super-Ricos",
    themeAxis: "Economia, Renda & Justiça Tributária",
    detailedProposal: "Elevação da faixa de isenção integral da tabela progressiva do IRPF de R$ 2.824 para R$ 5.000 mensais para todos os trabalhadores assalariados, servidores e autônomos, compensada pela criação de uma alíquota efetiva mínima de 12% a 15% sobre rendimentos extraordinários de pessoas físicas com ganhos superiores a R$ 1 milhão por ano (dividendos e grandes patrimônios).",
    framingTone: "Ruptura / Firme",
    targetAudience: "Classe Trabalhadora, Professores, Profissionais Liberais e Classe Média C",
    targetRegion: "Brasil Inteiro (27 Unidades da Federação)",
    candidateId: "preset-lula",
    candidateName: "Lula",
    sphere: "Federal",
    createdAt: "2026-09-17",
    metrics: {
      overallAcceptancePct: 81,
      netVoteGainEstPct: 3.8,
      backfireRiskPct: 11,
      undecidedConversionPct: 44,
      socialBuzzScore: 92,
    },
    demographics: [
      { segment: "Trabalhadores Assalariados (R$ 2.500 a R$ 6.000)", favorabilityPct: 93, rejectionPct: 3, neutralPct: 4, keyDriver: "Ganho real direto de R$ 300 a R$ 700 mensais líquidos no holerite." },
      { segment: "Classes D e E", favorabilityPct: 86, rejectionPct: 4, neutralPct: 10, keyDriver: "Sensação de justiça de que quem ganha pouco não deve ser taxado." },
      { segment: "Profissionais Liberais e Classe Média", favorabilityPct: 79, rejectionPct: 11, neutralPct: 10, keyDriver: "Alívio na despesa fixa de escolas, planos de saúde e financiamento." },
      { segment: "Mercado Financeiro / Faria Lima / Ricos", favorabilityPct: 22, rejectionPct: 68, neutralPct: 10, keyDriver: "Rejeição feroz a qualquer taxação de lucros, dividendos e fundos offshore." },
      { segment: "Aposentados e Pensionistas", favorabilityPct: 83, rejectionPct: 7, neutralPct: 10, keyDriver: "Maior parte da categoria deixará de recolher IR sobre os proventos." }
    ],
    swot: {
      strengths: [
        "Atinge no coração da classe média trabalhadora urbana, segmento onde as pesquisas apontam maior disputa",
        "Narrativa moralmente imbatível: 'quem vive de salário paga menos; quem vive de renda paga o justo'",
        "Promessa com capacidade de mobilizar sindicatos, movimentos sociais e o eleitor desiludido"
      ],
      vulnerabilities: [
        "Exige aprovação de lei complementar no Congresso Nacional, onde o lobby financeiro é forte",
        "Reação furiosa de colunistas econômicos da grande mídia alertando para 'fuga de capitais'"
      ],
      oppositionExpectedAttacks: [
        "Vão dizer que é 'populismo fiscal' e que vai gerar inflação e quebrar o teto de gastos",
        "Empresários alegarão que a tributação de dividendos desincentiva investimentos em fábricas"
      ],
      recommendedDefense: [
        "Apresentar dados comparativos da OCDE mostrando que o Brasil é um dos poucos países que não tributa dividendos",
        "Demonstrar que o dinheiro economizado pelo trabalhador vai direto para o consumo no comércio local",
        "Mostrar responsabilidade fiscal: a conta fecha matematicamente sem gerar déficit"
      ],
      strategicRefinements: [
        "Fazer uma calculadora online oficial onde o eleitor digita seu salário e vê quantos reais vai economizar por mês",
        "Garantir proteção expressa para microempresários individuais (MEI) e Simples Nacional"
      ]
    },
    aiAnalysisText: "Uma das propostas de maior tração eleitoral já testadas (+3.8% de ganho líquido de votos e 44% de conversão de indecisos). Conecta o discurso social à carteira da classe média urbana, desarmando ataques da oposição."
  },
  {
    id: "prop-scen-05",
    title: "Crédito Popular a Juro Zero para Mulheres Empreendedoras da Periferia",
    themeAxis: "Empreendedorismo Feminino & Combate à Fome",
    detailedProposal: "Linha especial de microcrédito rotativo com limite de R$ 5.000 a R$ 15.000 para mulheres chefes de família que possuem pequenos negócios (salões de beleza, costura, marmitas, artesanato, pequenos comércios de bairro). Juro zero caso as parcelas sejam pagas em dia, com carência de 6 meses e capacitação via Sebrae.",
    framingTone: "Protecionista / Social",
    targetAudience: "Mulheres, Mães Solo, Ambulantes e Pequenas Comerciantes",
    targetRegion: "Bairros periféricos e subúrbio",
    candidateId: "preset-bruno-reis",
    candidateName: "Bruno Reis",
    sphere: "Municipal",
    createdAt: "2026-09-18",
    metrics: {
      overallAcceptancePct: 86,
      netVoteGainEstPct: 3.1,
      backfireRiskPct: 5,
      undecidedConversionPct: 42,
      socialBuzzScore: 82,
    },
    demographics: [
      { segment: "Mulheres Chefes de Família", favorabilityPct: 94, rejectionPct: 1, neutralPct: 5, keyDriver: "Independência financeira e capital de giro sem agiotagem." },
      { segment: "Classes D e E", favorabilityPct: 90, rejectionPct: 3, neutralPct: 7, keyDriver: "Acesso a crédito real recusado pelos bancos tradicionais." },
      { segment: "Jovens Mulheres (18-29)", favorabilityPct: 88, rejectionPct: 3, neutralPct: 9, keyDriver: "Estímulo para abrir e formalizar negócios nas redes." },
      { segment: "Eleitorado Masculino", favorabilityPct: 77, rejectionPct: 8, neutralPct: 15, keyDriver: "Reconhecimento do papel sustentador da mulher na família." }
    ],
    swot: {
      strengths: [
        "Fideliza o eleitorado feminino, historicamente o mais cauteloso e exigente na decisão de voto",
        "Combate a agiotagem e alivia a pressão financeira nos lares periféricos",
        "Histórico de baixíssima inadimplência em programas de microcrédito feminino"
      ],
      vulnerabilities: [
        "Necessidade de fundo garantidor municipal para absorver perdas bancárias",
        "Risco de burocracia excessiva nos pontos de atendimento do Crediamigo/banco municipal"
      ],
      oppositionExpectedAttacks: [
        "Oposição tentará minimizar dizendo que R$ 5.000 é insuficiente para compras maiores",
        "Questionamentos sobre a velocidade de liberação do recurso"
      ],
      recommendedDefense: [
        "Apresentar casos de sucesso reais de mulheres que multiplicaram a renda com microcrédito",
        "Criar processo 100% digital via WhatsApp com liberação em 48 horas via PIX"
      ],
      strategicRefinements: [
        "Associar o crédito a consultoria gratuita do Sebrae para garantir sucesso do negócio",
        "Bonificar com mais limite as empreendedoras que contratarem jovens da própria comunidade"
      ]
    },
    aiAnalysisText: "Excelente impacto junto ao eleitorado feminino indeciso (+3.1% de ganho líquido). Cria vínculo de gratidão e segurança econômica na base da pirâmide."
  }
];
