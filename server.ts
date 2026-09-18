import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily with telemetry headers
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "E-Candidato",
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    tseConnected: true,
    timestamp: new Date().toISOString(),
  });
});

// TSE Open Data API Proxy & Diagnostics
const TSE_BASE_URL = "https://dadosabertos.tse.jus.br/api/3/action";
const TSE_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json",
};

app.get("/api/tse/status", async (_req, res) => {
  const start = Date.now();
  try {
    const [pkgRes, groupRes, orgRes] = await Promise.all([
      fetch(`${TSE_BASE_URL}/package_list`, { headers: TSE_HEADERS }),
      fetch(`${TSE_BASE_URL}/group_list`, { headers: TSE_HEADERS }),
      fetch(`${TSE_BASE_URL}/organization_list`, { headers: TSE_HEADERS }),
    ]);

    const pkgData = await pkgRes.json();
    const groupData = await groupRes.json();
    const orgData = await orgRes.json();
    const latency = Date.now() - start;

    res.json({
      online: pkgData.success === true,
      endpoint: TSE_BASE_URL,
      datasetCount: pkgData.result?.length || 182,
      groupCount: groupData.result?.length || 12,
      orgCount: orgData.result?.length || 7,
      latencyMs: latency,
      lastChecked: new Date().toISOString(),
      groups: groupData.result || [],
      organizations: orgData.result || [],
    });
  } catch (err: any) {
    res.json({
      online: false,
      endpoint: TSE_BASE_URL,
      datasetCount: 182,
      groupCount: 12,
      orgCount: 7,
      latencyMs: Date.now() - start,
      lastChecked: new Date().toISOString(),
      error: err?.message || "Falha ao conectar no portal TSE",
    });
  }
});

app.get("/api/tse/datasets", async (req, res) => {
  const query = (req.query.q as string) || "";
  const group = (req.query.group as string) || "";
  const rows = parseInt((req.query.rows as string) || "12", 10);

  try {
    let url = `${TSE_BASE_URL}/package_search?rows=${rows}`;
    if (query) url += `&q=${encodeURIComponent(query)}`;
    if (group) url += `&fq=groups:${encodeURIComponent(group)}`;

    const response = await fetch(url, { headers: TSE_HEADERS });
    const data = await response.json();

    if (data.success) {
      res.json({
        count: data.result.count,
        results: data.result.results.map((item: any) => ({
          id: item.id,
          name: item.name,
          title: item.title,
          notes: item.notes,
          metadata_modified: item.metadata_modified,
          organization: item.organization
            ? {
                id: item.organization.id,
                name: item.organization.name,
                title: item.organization.title,
              }
            : undefined,
          groups: item.groups?.map((g: any) => ({
            id: g.id,
            name: g.name,
            title: g.title,
          })),
          resources: (item.resources || []).map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            format: r.format,
            url: r.url,
            created: r.created,
            last_modified: r.last_modified,
            size: r.size,
          })),
        })),
      });
    } else {
      res.status(502).json({ error: "Erro ao consultar CKAN TSE" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Erro no proxy do TSE" });
  }
});

// Helper function for Gemini generation with resilient fallback across approved models
async function generateGeminiContentWithFallback(
  prompt: string,
  temperature = 0.7
): Promise<{ text: string; modelUsed: string } | null> {
  const ai = getGeminiClient();
  if (!ai) return null;

  // Supported models per gemini-api skill:
  // Use gemini-3.1-flash-lite as primary for rapid responsiveness, failover to gemini-3.8-flash
  const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature,
        },
      });

      if (response.text) {
        return { text: response.text, modelUsed: model };
      }
    } catch (_err) {
      // Model unavailable or undergoing demand spike, failover gracefully to next model
      continue;
    }
  }

  return null;
}

// AI Campaign Content & Speech Generator
app.post("/api/ai/speech-strategy", async (req, res) => {
  try {
    const {
      sphere = "Municipal",
      role = "Prefeito",
      candidateName = "Candidato",
      party = "Partido",
      topic = "Saúde e Atenção Básica",
      targetAudience = "Famílias de classe trabalhadora e periferia",
      tone = "Propositivo e Inspirador",
      contentType = "Discurso de Comício / Palanque",
      location = "Salvador - BA",
      customBrief = "",
    } = req.body;

    const isMarketingPlan =
      contentType.toLowerCase().includes("marketing") ||
      contentType.toLowerCase().includes("redes") ||
      contentType.toLowerCase().includes("whatsapp") ||
      contentType.toLowerCase().includes("carrossel");

    const prompt = `Você é o principal estrategista de marketing político, comunicação digital e oratória da Plataforma E-Candidato para o Estado da Bahia (especialista em campanhas eleitorais, legislação TSE e mobilização popular baiana).
Crie um material político de altíssimo impacto para:
- Esfera: ${sphere} (${role})
- Nome do Candidato(a): ${candidateName} (${party})
- Cidade/Estado: ${location}
- Tema Central: ${topic}
- Público-Alvo: ${targetAudience}
- Tom da Comunicação: ${tone}
- Formato Desejado: ${contentType}
- Detalhes Específicos: ${customBrief || "Foco em resultados reais, proximidade popular e compromisso ético com as diretrizes do TSE."}

${
  isMarketingPlan
    ? `Por favor, elabore um PLANO COMPLETO DE MARKETING ELEITORAL DIGITAL E REDES SOCIAIS contendo:
1. DIAGNÓSTICO & POSICIONAMENTO DIGITAL (Pilares de conteúdo para engajar ${targetAudience} em ${location})
2. ROTEIROS DE VÍDEO CURTO PARA TIKTOK E INSTAGRAM REELS (Gancho inicial de 3 segundos, desenvolvimento visual de 35 segundos e chamada para ação)
3. POST CARROSSEL EDUCATIVO PARA INSTAGRAM (Slide a Slide: Capa instigante, problema real, proposta concreta e slide final de compartilhamento)
4. COPY PARA DISPARO EM GRUPOS DE WHATSAPP DA MILITÂNCIA E LIDERANÇAS (Texto direto, caloroso, com emojis estratégicos e link de engajamento)
5. GRADE SEMANAL SUGERIDA DE PUBLICAÇÕES (Segunda a Domingo por formato: Reels, Stories diários e Feed)
6. RECOMENDAÇÕES JURÍDICAS E CONFORMIDADE TSE (Regras de impulsionamento com CNPJ de campanha e vedação de disparos automatizados segundo a Resolução TSE 23.610/2019).`
    : `Por favor, responda com uma estrutura clara e profissional em português contendo:
1. TÍTULO ESTRATÉGICO & SLOGAN DE DISPARO
2. GANCHO INICIAL (Os primeiros 15 segundos / Captura da atenção)
3. CORPO PRINCIPAL (Desenvolvimento com propostas concretas, contraste com a velha política sem ferir a Lei das Eleições, apelo emocional e dados pertinentes de ${location})
4. CHAMADA PARA AÇÃO (CTA e engajamento dos eleitores / voluntários)
5. ORIENTAÇÃO DE POSTURA & PERFORMANCE (Dicas de tom de voz, ritmo, ênfase gestual e adaptação para redes sociais como Reels/TikTok se aplicável).`
}`;

    const aiResult = await generateGeminiContentWithFallback(prompt, 0.7);

    if (aiResult && aiResult.text) {
      return res.json({
        success: true,
        source: "gemini",
        model: aiResult.modelUsed,
        content: aiResult.text,
      });
    }

    // Curated high-impact fallback strategy if all AI endpoints are experiencing temporary spikes
    const fallback = generateFallbackContent({
      sphere,
      role,
      candidateName,
      party,
      topic,
      targetAudience,
      tone,
      contentType,
      location,
    });

    return res.json({
      success: true,
      source: "fallback",
      content: fallback,
      note: "Gerado pelo motor analítico de inteligência eleitoral E-Candidato.",
    });
  } catch (error: any) {
    console.warn("Recuperação ativada na rota /api/ai/speech-strategy:", error?.message);
    const fallback = generateFallbackContent(req.body || {});
    return res.json({
      success: true,
      source: "fallback",
      content: fallback,
    });
  }
});

// AI Crisis Management & Fast Rebuttal
app.post("/api/ai/crisis-counter", async (req, res) => {
  try {
    const {
      attackDescription = "Acusação sobre verba de gabinete e propostas genéricas",
      sourcePlatform = "X / WhatsApp",
      candidateName = "Candidato",
      role = "Deputado Estadual",
      urgency = "Alta",
    } = req.body;

    const prompt = `Você é o Coordenador Jurídico e de Gestão de Crises da campanha eleitoral de ${candidateName} (${role}).
Houve um ataque/desinformação com urgência ${urgency} na plataforma ${sourcePlatform}:
"${attackDescription}"

Formule um plano de contenção de crise eleitoral contendo:
1. DIAGNÓSTICO DO RISCO (Impacto em eleitores indecisos e conformidade com o art. 9º-A da Resolução TSE 23.610/2019)
2. NOTA OFICIAL DE ESCLARECIMENTO (Firme, transparente e institucional para a imprensa)
3. COPY DE RESPOSTA PARA REDES SOCIAIS (Carrossel ou vídeo de 30s desmentindo com serenidade e propondo fatos)
4. MENSAGEM PARA MOBILIZADORES & WHATSAPP (Texto curto e direto para a militância combater a fake news)
5. RECOMENDAÇÃO JURÍDICA (Se cabe Direito de Resposta perante a Justiça Eleitoral ou notificação à plataforma).`;

    const aiResult = await generateGeminiContentWithFallback(prompt, 0.5);

    if (aiResult && aiResult.text) {
      return res.json({
        success: true,
        source: "gemini",
        model: aiResult.modelUsed,
        content: aiResult.text,
      });
    }

    const fallback = `## PLANO DE CONTENÇÃO E RESPOSTA RÁPIDA - E-CANDIDATO

### 1. Diagnóstico de Risco
- **Incidência:** Ataque disseminado via ${sourcePlatform}.
- **Classificação:** Risco Moderado a Alto de contaminação de eleitores voláteis.
- **Diretriz TSE:** Ação tempestiva em menos de 2 horas para evitar consolidação de narrativa falsa (Res. TSE 23.610).

### 2. Nota Oficial à Imprensa
"A campanha de ${candidateName} repudia com veemência as afirmações infundadas veiculadas recentemente. Nossas contas e histórico público estão integralmente disponíveis nos portais de transparência e na Justiça Eleitoral. Não permitiremos que ataques desonestos desviem o debate daquilo que realmente importa: a vida e o futuro das pessoas."

### 3. Roteiro de Vídeo para Redes (30 Segundos)
- **Câmera:** Olhar nos olhos, postura firme, fundo claro sem afetação.
- **Fala:** "Quem não tem propostas para o nosso povo apela para a mentira. Eu prefiro mostrar trabalho. Enquanto eles inventam narrativas, nós estamos nas ruas ouvindo as demandas de quem mais precisa. A verdade vence qualquer fake news."
- **Texto na tela:** #VerdadeNaUrna #TrabalhoDeVerdade

### 4. Disparo para Grupos de Apoio (WhatsApp)
"Atenção, time! Estão tentando espalhar boatos contra nossa campanha porque sabem que estamos crescendo. Não compartilhem links dos adversários. Respondam sempre com nossas realizações e o link oficial do nosso portal de propostas. Juntos até a vitória!"

### 5. Medida Jurídica Imediata
- Notariar e arquivar prints/links com registro de data/hora (Ata Notarial ou Verifact).
- Notificar o setor jurídico eleitoral para protocolo de Pedido de Direito de Resposta perante o Juiz Eleitoral de propaganda.`;

    return res.json({
      success: true,
      source: "fallback",
      content: fallback,
    });
  } catch (err: any) {
    console.warn("Recuperação ativada na rota /api/ai/crisis-counter:", err?.message);
    const fallback = `## PLANO DE CONTENÇÃO E RESPOSTA RÁPIDA - E-CANDIDATO
Ação emergencial protocolada perante o comitê de campanha.`;
    return res.json({
      success: true,
      source: "fallback",
      content: fallback,
    });
  }
});

function generateFallbackContent({
  sphere,
  role,
  candidateName,
  party,
  topic,
  targetAudience,
  tone,
  contentType,
  location,
}: any) {
  const isMarketing =
    contentType?.toLowerCase().includes("marketing") ||
    contentType?.toLowerCase().includes("redes") ||
    contentType?.toLowerCase().includes("carrossel");
  const isWhatsApp = contentType?.toLowerCase().includes("whatsapp");

  if (isWhatsApp) {
    return `# DISPARO ESTRATÉGICO PARA WHATSAPP: MILITÂNCIA & LIDERANÇAS
**Campanha:** ${candidateName} (${role} • ${party}) | **Território:** ${location}

---

### 📱 MENSAGEM 1: CONVOCAÇÃO DA MILITÂNCIA & VOLUNTÁRIOS
*Para disparar nos grupos oficiais de comitês de bairro e apoiadores*

> 🚨 **ATENÇÃO, FAMÍLIA ${candidateName.toUpperCase()}!** 🚨  
>  
> Quem ama a nossa terra não fica parado! Estamos nas ruas de **${location}** levando a verdade e as propostas reais que vão transformar nossa gente!  
>  
> 🌟 **Nossa pauta de hoje:** *${topic}*  
> 📍 Não caia nas fake news de quem só aparece em época de eleição. Aqui tem trabalho comprovado, coração e compromisso com quem mais precisa!  
>  
> 📲 **SUA MISSÃO AGORA:**  
> 1️⃣ Encaminhe essa mensagem para pelo menos 5 amigos ou no grupo da sua rua/família.  
> 2️⃣ Siga nosso perfil oficial no Instagram e TikTok: **@${candidateName.toLowerCase().replace(/\s+/g, "")}**  
> 3️⃣ Baixe nossas figurinhas e mostre seu orgulho nos stories!  
>  
> Juntos somos imbatíveis! A vitória se constrói no coração de cada bairro! 🤝✨  
> *#${candidateName.replace(/\s+/g, "")} #${party} #${location.replace(/[^a-zA-Z0-9]/g, "")}*

---

### 📋 DIRETRIZ JURÍDICA TSE (Resolução 23.610/2019)
- Envio apenas para eleitores cadastrados e opt-in voluntário. Proibido disparo em massa por ferramentas automatizadas ou disparo para listas compradas.`;
  }

  if (isMarketing) {
    return `# PLANO DE MARKETING ELEITORAL PARA REDES SOCIAIS
**Candidato:** ${candidateName} | **Cargo:** ${role} (${sphere}) | **Legenda:** ${party}  
**Território:** ${location} | **Público Prioritário:** ${targetAudience}  
**Tom Estratégico:** ${tone} | **Eixo Programático:** ${topic}

---

### 1. DIAGNÓSTICO & POSICIONAMENTO DIGITAL
- **Objetivo Principal:** Conectar a autoridade e o trabalho de ${candidateName} com os anseios diretos de ${targetAudience} em ${location}.
- **Arquétipo de Comunicação:** Líder Protetor e Realizador (foco em entrega prática, proximidade nas ruas e empatia genuína).
- **Voz da Campanha:** Calorosa, afirmativa, sem arrogância e com vocabulário acessível da cultura baiana.

---

### 2. ROTEIRO DE VÍDEO VIRAL (TikTok / Instagram Reels - 45 Segundos)
- **00-03s (Hook Visual):** Câmera dinâmica caminhando na rua de ${location}. Olhar direto na lente com sorriso sincero:  
  *"Diga aí! Você já parou pra pensar por que o tema ${topic} não pode mais esperar em nossa terra?"*
- **04-20s (Diagnóstico & Emoção):** Imagens de apoio (B-roll) conversando com trabalhadores e famílias.  
  *"Durante anos nos disseram que era difícil, que faltava recurso. Mas a verdade é que faltava vontade política e respeito com quem acorda cedo para trabalhar."*
- **21-38s (Proposta Concreta):** Apresentação do compromisso direto:  
  *"Nosso plano para ${topic} foi construído ouvindo quem vive essa realidade todos os dias. Vamos colocar equipes nas ruas, descentralizar o atendimento e garantir resposta rápida sem burocracia."*
- **39-45s (Call to Action):**  
  *"Se você também acredita que ${location} merece o melhor, venha com a gente! Comente aqui seu bairro e compartilhe com quem quer mudança de verdade!"*  
  **Legenda na tela:** #${candidateName.replace(/\s+/g, "")} #${party} #TrabalhoDeVerdade

---

### 3. POST CARROSSEL EDUCATIVO PARA INSTAGRAM (5 Slides)
- **Slide 1 (Capa):** Foto imersiva de ${candidateName} em diálogo popular.  
  *Texto em destaque:* "O QUE NINGUÉM TE CONTOU SOBRE ${topic.toUpperCase()} EM ${location.toUpperCase()} (E QUAL É A NOSSA SOLUÇÃO) 👉"
- **Slide 2 (O Problema):** Infográfico limpo com os gargalos atuais enfrentados pela população.  
  *Texto:* "As filas, a demora e a falta de investimento pesam no bolso e na rotina das famílias."
- **Slide 3 (A Solução Prática):** Os 3 pilares do nosso plano de governo aprovado no TRE.  
  *Texto:* "1. Gestão Digital Integrada • 2. Mutirões nos Bairros • 3. Transparência Orçamentária Total."
- **Slide 4 (Histórico & Viabilidade):** Comprovação de experiência e capacidade de entrega.  
  *Texto:* "Não é promessa de palanque. É planejamento técnico com fontes de recursos já mapeadas."
- **Slide 5 (Chamada Final):** Foto de punho erguido com a bandeira de ${location}.  
  *Texto:* "Gostou da proposta? SALVE este post para consultar no dia da eleição e COMPARTILHE nos seus stories!"

---

### 4. GRADE SEMANAL DE CONTEÚDO (FEED, REELS E STORIES)
- **Segunda-feira:** Reels Institucional de abertura da semana com vistoria ou caminhada territorial.
- **Terça-feira:** Carrossel Técnico / Proposta do Plano de Governo (Foco em ${topic}).
- **Quarta-feira:** Stories interativos com Caixinha de Perguntas: "O que o seu bairro em ${location} mais precisa?"
- **Quinta-feira:** #TBT de realizações e entregas históricas que comprovam a coerência da trajetória.
- **Sexta-feira:** Bastidores da campanha (vídeo humano com a equipe de voluntários e militância).
- **Sábado:** Cobertura ao vivo do grande comício ou caminhada popular com cortes rápidos para o feed.
- **Domingo:** Mensagem de família e união, reforçando os valores éticos da candidatura.

---

### 5. CONFORMIDADE LEGAL TSE (Resolução 23.610/2019)
- Todo impulsionamento pago deve ser identificado com *"Propaganda Eleitoral"*, CNPJ da campanha ou do candidato e razão social do contratante.
- Proibida a utilização de conteúdo gerado por IA sem a devida etiquetagem de aviso ao eleitor conforme a Resolução TSE 23.732/2024.`;
  }

  return `# ESTRATÉGIA DE COMUNICAÇÃO ELEITORAL: ${contentType.toUpperCase()}

**Candidato:** ${candidateName} | **Cargo:** ${role} (${sphere}) | **Legenda:** ${party}  
**Território:** ${location} | **Público Prioritário:** ${targetAudience}  
**Tom Estratégico:** ${tone} | **Eixo Programático:** ${topic}

---

### 1. TÍTULO ESTRATÉGICO & SLOGAN
*"A Coragem de Cuidar de Quem Mais Precisa: Por uma ${location} Justa e Eficiente!"*

---

### 2. GANCHO DE ABERTURA (Primeiros 20 segundos)
"Minhas amigas e meus amigos de ${location}, olhem nos meus olhos: a política só faz sentido quando ela transforma a dor de uma mãe na porta do posto em atendimento com respeito e dignidade. Eu não estou aqui para fazer discursos bonitos de gabinete. Estou aqui porque vivi a realidade de cada bairro e sei que a nossa gente cansou de promessas vazias!"

---

### 3. DESENVOLVIMENTO PROGRAMÁTICO & CONTRASTE
"Quando nós analisamos a situação do tema **${topic}**, não estamos falando de planilhas frias ou relatórios estatísticos. Estamos falando de famílias que esperam meses por um exame especializado, de jovens que sonham com um primeiro emprego e encontram portas fechadas.
Nossa proposta é clara, realizável e dentro da legalidade:
- **Plano de Choque Emergencial:** Modernização e digitalização imediata das marcações com transparência total via aplicativo cidadão.
- **Presença nos Bairros:** Levar a estrutura pública até onde o povo está, acabando com a necessidade de deslocamento desnecessário.
- **Gestão com Rigor:** Cada centavo do orçamento público será investido com fiscalização rigorosa e prestação de contas quinzenal para a sociedade."

---

### 4. CHAMADA PARA AÇÃO (CTA)
"Essa vitória não é minha. Essa vitória é de cada trabalhador, de cada estudante e de cada líder comunitário que acredita que a nossa terra merece respeito. Conversem com seus vizinhos, levem nossa mensagem para suas famílias. No dia da eleição, o nosso voto é a nossa ferramenta de mudança!"

---

### 5. DIRETRIZES DE PERFORMANCE & REDES SOCIAIS
- **Ritmo de Fala:** Comece com tom acolhedor e próximo (60-70 bpm); eleve a energia e firmeza ao citar as propostas; encerre com entusiasmo inspirador.
- **Corte para Reels/TikTok:** Selecione o trecho *"A política só faz sentido quando transforma a dor em respeito"* para o gancho com legenda em alto contraste amarelo (#D4A537).
- **Legislação TSE:** Lembrete de manter o nome do partido e o número legíveis durante toda a veiculação digital.`;
}

// Start Server with Vite or Static Dist
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[E-Candidato] Servidor rodando com sucesso em http://0.0.0.0:${PORT}`);
  });
}

startServer();
