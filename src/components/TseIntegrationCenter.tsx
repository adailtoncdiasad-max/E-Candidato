import React, { useState, useEffect } from "react";
import {
  Database,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Download,
  Search,
  Filter,
  Layers,
  Building2,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  AlertTriangle,
  Clock,
  Sparkles,
  Zap,
  Activity,
} from "lucide-react";
import {
  TSE_STRATEGIC_GROUPS,
  TSE_ORGANIZATIONS,
  getTseOverview,
  searchTseDatasets,
} from "../services/tseService";
import { TSEConnectionStatus, TSEDataset, TSEIngestionPipelineStatus } from "../types/tse";
import { CandidateProfile, SphereType } from "../types";

interface TseIntegrationCenterProps {
  candidate: CandidateProfile;
  currentSphere: SphereType;
  onNavigateToModule?: (module: string) => void;
}

export const TseIntegrationCenter: React.FC<TseIntegrationCenterProps> = ({
  candidate,
  currentSphere,
  onNavigateToModule,
}) => {
  const [connection, setConnection] = useState<TSEConnectionStatus>({
    online: true,
    endpoint: "https://dadosabertos.tse.jus.br/api/3/action",
    datasetCount: 182,
    groupCount: 12,
    orgCount: 7,
    latencyMs: 145,
    lastChecked: new Date().toISOString(),
  });

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [datasets, setDatasets] = useState<TSEDataset[]>([]);
  const [loadingDatasets, setLoadingDatasets] = useState(false);
  const [activeTab, setActiveTab] = useState<"catalog" | "architecture" | "pipeline">("catalog");

  // Ingestion Pipelines simulation matching architecture
  const [pipelines, setPipelines] = useState<TSEIngestionPipelineStatus[]>([
    {
      pipelineId: "pipe-cand-01",
      name: "Candidatos & Declarações de Bens",
      sourceGroup: "candidatos",
      targetModule: "Concorrentes & Perfil",
      frequency: "Diária (04:00 UTC)",
      lastRun: "Hoje às 04:12",
      status: "SINCRONIZADO",
      processedRecords: 462150,
    },
    {
      pipelineId: "pipe-res-02",
      name: "Resultados & Boletins de Urna",
      sourceGroup: "resultados",
      targetModule: "Histórico & Redutos",
      frequency: "Sob Demanda / Semanal",
      lastRun: "Ontem às 18:30",
      status: "SINCRONIZADO",
      processedRecords: 1845200,
    },
    {
      pipelineId: "pipe-eleit-03",
      name: "Perfil do Eleitorado & Demografia",
      sourceGroup: "eleitorado",
      targetModule: "Perfil Demográfico",
      frequency: "Mensal",
      lastRun: "10/09/2026",
      status: "SINCRONIZADO",
      processedRecords: 156000000,
    },
    {
      pipelineId: "pipe-fin-04",
      name: "Prestação de Contas (FEFC e Despesas)",
      sourceGroup: "prestacao-de-contas-eleitorais",
      targetModule: "Finanças de Campanha",
      frequency: "A cada 72h (Prazo Legal TSE)",
      lastRun: "Hoje às 02:00",
      status: "ATIVO",
      processedRecords: 341200,
    },
    {
      pipelineId: "pipe-pesq-05",
      name: "Pesquisas Registradas (PesqEle)",
      sourceGroup: "pesquisas-eleitorais",
      targetModule: "Pesquisas Preditivas",
      frequency: "Tempo Real (A cada 6 horas)",
      lastRun: "Hoje às 06:00",
      status: "SINCRONIZADO",
      processedRecords: 1240,
    },
  ]);

  // Load status from backend
  const checkStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch("/api/tse/status");
      if (res.ok) {
        const data = await res.json();
        setConnection(data);
      } else {
        const fallback = await getTseOverview();
        setConnection(fallback);
      }
    } catch {
      const fallback = await getTseOverview();
      setConnection(fallback);
    } finally {
      setLoadingStatus(false);
    }
  };

  // Search datasets from backend or fallback service
  const fetchDatasets = async (query = "", group = "") => {
    setLoadingDatasets(true);
    try {
      const groupParam = group === "todos" ? "" : group;
      const res = await fetch(`/api/tse/datasets?q=${encodeURIComponent(query)}&group=${encodeURIComponent(groupParam)}&rows=15`);
      if (res.ok) {
        const data = await res.json();
        setDatasets(data.results || []);
      } else {
        const fallback = await searchTseDatasets(query, groupParam);
        setDatasets(fallback.results);
      }
    } catch {
      const fallback = await searchTseDatasets(query, group === "todos" ? "" : group);
      setDatasets(fallback.results);
    } finally {
      setLoadingDatasets(false);
    }
  };

  useEffect(() => {
    checkStatus();
    fetchDatasets("", "todos");
  }, []);

  const handleGroupSelect = (grp: string) => {
    setSelectedGroup(grp);
    fetchDatasets(searchQuery, grp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDatasets(searchQuery, selectedGroup);
  };

  return (
    <div id="tse-integration-center" className="space-y-6">
      {/* Hero Header with Live Connection Pulse */}
      <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#112233] via-[#16304A] to-[#0E1E31] border border-[#1E3A5F] shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#2E9C87]/20 text-[#2E9C87] border border-[#2E9C87]/40 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2E9C87] animate-ping" />
                CKAN RESTful JSON API Oficial
              </span>
              <span className="text-xs text-slate-400">
                dadosabertos.tse.jus.br
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#F2EFE6] tracking-tight flex items-center gap-2.5">
              <Database className="w-7 h-7 text-[#D4A537]" />
              Conexão com a Base de Dados Abertos do TSE
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              Integração nativa com os <strong>182 conjuntos de dados</strong>, <strong>7 organizações curadoras</strong> e <strong>12 grupos temáticos</strong> do Tribunal Superior Eleitoral. Alimenta os modelos preditivos, pesquisas eleitorais e prestação de contas do E-Candidato.
            </p>
          </div>

          {/* Connection Metric Card */}
          <div className="flex items-center gap-3 bg-[#0B1B2B]/90 p-3.5 rounded-2xl border border-[#1E3A5F] shadow-lg shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#2E9C87]/20 border border-[#2E9C87] flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#2E9C87]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Status da Conexão:</span>
                <span className="text-xs font-extrabold text-[#2E9C87] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {connection.online ? "Online (Ativo)" : "Standby"}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Latência: <span className="text-[#D4A537] font-bold">{connection.latencyMs}ms</span> | Endpoints: <span className="text-white">/api/3/action</span>
              </div>
            </div>
            <button
              onClick={checkStatus}
              disabled={loadingStatus}
              className="p-2 rounded-xl bg-[#16304A] hover:bg-[#1E3A5F] text-slate-300 hover:text-white border border-[#1E3A5F] transition-all ml-2"
              title="Testar Conexão Novamente"
            >
              <RefreshCw className={`w-4 h-4 ${loadingStatus ? "animate-spin text-[#D4A537]" : ""}`} />
            </button>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#1E3A5F]/70">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B1B2B]/60 border border-[#1E3A5F]">
            <div className="w-8 h-8 rounded-lg bg-[#D4A537]/20 flex items-center justify-center text-[#D4A537] font-extrabold text-sm font-mono">
              182
            </div>
            <div>
              <div className="text-xs font-bold text-white">Conjuntos de Dados (Datasets)</div>
              <div className="text-[11px] text-slate-400">Resultados, boletins, candidatos e bens</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B1B2B]/60 border border-[#1E3A5F]">
            <div className="w-8 h-8 rounded-lg bg-[#2E9C87]/20 flex items-center justify-center text-[#2E9C87] font-extrabold text-sm font-mono">
              12
            </div>
            <div>
              <div className="text-xs font-bold text-white">Grupos Temáticos Mapeados</div>
              <div className="text-[11px] text-slate-400">Alimentação dos 10 módulos da solução</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B1B2B]/60 border border-[#1E3A5F]">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] font-extrabold text-sm font-mono">
              7
            </div>
            <div>
              <div className="text-xs font-bold text-white">Organizações Curadoras</div>
              <div className="text-[11px] text-slate-400">TSE/AGEL, ASEPA, CGE, SJD, SGP, STI, SMG</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-[#1E3A5F] bg-[#112233] rounded-xl p-1 gap-1">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === "catalog"
              ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/20"
              : "text-slate-300 hover:text-white hover:bg-[#16304A]"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Explorador de Datasets TSE (API CKAN)</span>
        </button>

        <button
          onClick={() => setActiveTab("architecture")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === "architecture"
              ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/20"
              : "text-slate-300 hover:text-white hover:bg-[#16304A]"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Mapeamento dos 12 Grupos & 7 Organizações</span>
        </button>

        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === "pipeline"
              ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/20"
              : "text-slate-300 hover:text-white hover:bg-[#16304A]"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Pipeline de Ingestão (Airflow & Pandas)</span>
        </button>
      </div>

      {/* TAB 1: DATASET SEARCH & EXPLORER */}
      {activeTab === "catalog" && (
        <div className="space-y-5">
          {/* Search & Group Filters Bar */}
          <div className="p-4 rounded-2xl bg-[#112233] border border-[#1E3A5F] space-y-3">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar datasets por palavra-chave (ex: candidatos 2024, votação seção, FEFC, perfil)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A537]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#D4A537] hover:bg-[#E5B648] text-[#0B1B2B] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Consultar API TSE</span>
              </button>
            </form>

            {/* Group Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Grupos:
              </span>
              <button
                onClick={() => handleGroupSelect("todos")}
                className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-all ${
                  selectedGroup === "todos"
                    ? "bg-[#2E9C87] text-white"
                    : "bg-[#0B1B2B] text-slate-300 hover:text-white border border-[#1E3A5F]"
                }`}
              >
                Todos ({connection.datasetCount})
              </button>
              {TSE_STRATEGIC_GROUPS.map((grp) => (
                <button
                  key={grp.name}
                  onClick={() => handleGroupSelect(grp.name)}
                  className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-all ${
                    selectedGroup === grp.name
                      ? "bg-[#2E9C87] text-white"
                      : "bg-[#0B1B2B] text-slate-300 hover:text-white border border-[#1E3A5F]"
                  }`}
                >
                  {grp.title}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>
                Exibindo <strong>{datasets.length}</strong> conjuntos de dados catalogados no TSE
              </span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Conformidade com Lei de Acesso à Informação (LAI)
              </span>
            </div>

            {loadingDatasets ? (
              <div className="p-12 text-center rounded-2xl bg-[#112233] border border-[#1E3A5F] space-y-3">
                <RefreshCw className="w-8 h-8 text-[#D4A537] animate-spin mx-auto" />
                <p className="text-sm font-semibold text-white">Consultando portal do TSE via API CKAN...</p>
                <p className="text-xs text-slate-400">Buscando metadados e URLs de arquivos oficiais</p>
              </div>
            ) : datasets.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[#112233] border border-[#1E3A5F]">
                <p className="text-sm text-slate-300">Nenhum conjunto de dados encontrado para o filtro informado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {datasets.map((dataset) => (
                  <div
                    key={dataset.id}
                    className="p-4 rounded-2xl bg-[#112233] border border-[#1E3A5F] hover:border-[#D4A537]/50 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded bg-[#D4A537]/15 text-[#D4A537] border border-[#D4A537]/30">
                          {dataset.organization?.title || "TSE"}
                        </span>
                        {dataset.metadata_modified && (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(dataset.metadata_modified).toLocaleDateString("pt-BR")}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white leading-snug">
                        {dataset.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {dataset.notes || "Dados eleitorais oficiais fornecidos pelo Tribunal Superior Eleitoral."}
                      </p>
                    </div>

                    {/* Resources list */}
                    <div className="pt-3 border-t border-[#1E3A5F] space-y-2">
                      <div className="text-[11px] font-semibold text-slate-300">
                        Arquivos e Recursos Disponíveis ({dataset.resources?.length || 0}):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {dataset.resources?.slice(0, 3).map((res) => (
                          <a
                            key={res.id}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B1B2B] hover:bg-[#16304A] text-slate-300 hover:text-white border border-[#1E3A5F] text-[11px] transition-colors"
                            title={res.name}
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5 text-[#2E9C87]" />
                            <span className="max-w-[180px] truncate">{res.name}</span>
                            <span className="text-[9px] font-bold px-1 rounded bg-[#2E9C87]/20 text-[#2E9C87]">
                              {res.format}
                            </span>
                            <Download className="w-3 h-3 text-slate-400 ml-1" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ARCHITECTURE & GROUPS MAPPING */}
      {activeTab === "architecture" && (
        <div className="space-y-6">
          {/* Group to Module Direct Mapping */}
          <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#D4A537]" />
                Mapeamento Estratégico: 12 Grupos Temáticos TSE → Módulos E-Candidato
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Conexão arquitetural demonstrando como cada categoria de dados do TSE alimenta as decisões da campanha.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {TSE_STRATEGIC_GROUPS.map((grp) => (
                <div
                  key={grp.name}
                  className="p-3.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-2 hover:border-[#2E9C87]/60 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        grp.strategicImportance === "ALTA"
                          ? "bg-red-500/20 text-red-300 border border-red-500/40"
                          : grp.strategicImportance === "MÉDIA"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-slate-500/20 text-slate-300 border border-slate-500/40"
                      }`}
                    >
                      Prioridade {grp.strategicImportance}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">/{grp.name}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{grp.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{grp.description}</p>

                  <div className="pt-2 border-t border-[#1E3A5F] flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Alimenta:</span>
                    <span className="font-bold text-[#D4A537] flex items-center gap-1">
                      {grp.mappedElectoralModule}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7 Organizations Table */}
          <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#2E9C87]" />
              As 7 Organizações Curadoras Oficiais do TSE
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TSE_ORGANIZATIONS.map((org) => (
                <div key={org.name} className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F]">
                  <div className="text-xs font-extrabold text-[#D4A537]">{org.title}</div>
                  <div className="text-xs text-slate-300 mt-1">{org.description}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-2">ID Org: {org.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DATA INGESTION PIPELINE (Airflow + Pandas) */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#2E9C87]" />
                  Pipeline Automatizado de Ingestão (Airflow & Pandas)
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Conforme recomendação de engenharia de dados da Fase 1, o pipeline realiza a extração periódica dos CSVs e ZIPs da API do TSE.
                </p>
              </div>

              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                5 Pipelines Operacionais
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1E3A5F] text-slate-400 font-semibold bg-[#0B1B2B]">
                    <th className="p-3">Nome do Pipeline</th>
                    <th className="p-3">Origem TSE (Grupo)</th>
                    <th className="p-3">Módulo de Destino</th>
                    <th className="p-3">Frequência</th>
                    <th className="p-3">Registros Processados</th>
                    <th className="p-3">Última Execução</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E3A5F]">
                  {pipelines.map((pipe) => (
                    <tr key={pipe.pipelineId} className="hover:bg-[#16304A]/50 transition-colors">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-[#D4A537]" />
                        {pipe.name}
                      </td>
                      <td className="p-3 font-mono text-slate-300">/{pipe.sourceGroup}</td>
                      <td className="p-3 font-semibold text-[#2E9C87]">{pipe.targetModule}</td>
                      <td className="p-3 text-slate-300">{pipe.frequency}</td>
                      <td className="p-3 font-mono text-white">
                        {pipe.processedRecords.toLocaleString("pt-BR")}
                      </td>
                      <td className="p-3 text-slate-400">{pipe.lastRun}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2E9C87]/20 text-[#2E9C87] border border-[#2E9C87]/40">
                          {pipe.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Technical Integration Blueprint Box */}
            <div className="mt-4 p-4 rounded-xl bg-[#07121D] border border-[#1E3A5F] font-mono text-xs text-slate-300 space-y-2">
              <div className="text-[#D4A537] font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Script de Ingestão Python (DAG Airflow / Pandas) Exemplo:
              </div>
              <pre className="text-[11px] text-slate-400 overflow-x-auto p-2 bg-[#0B1B2B] rounded border border-slate-800">
{`# Extração periódica de arquivos oficiais via CKAN API do TSE
import requests, pandas as pd

TSE_API = "https://dadosabertos.tse.jus.br/api/3/action"
response = requests.get(f"{TSE_API}/package_search?fq=groups:candidatos&rows=10", headers={"User-Agent": "E-Candidato-Pipeline"})
datasets = response.json()["result"]["results"]

for ds in datasets:
    for res in ds["resources"]:
        if res["format"] == "CSV" and "consulta_cand" in res["url"]:
            df = pd.read_csv(res["url"], sep=";", encoding="latin1")
            # Ingestão para o banco de inteligência do E-Candidato
            df.to_sql("tse_candidatos_raw", con=engine, if_exists="replace")`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
