import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Download,
  Search,
  Sparkles,
  Volume2,
  Shield,
  Video,
  Radio,
  Share2,
  Tag,
  ChevronLeft,
  ChevronRight,
  Flag,
  FileSpreadsheet,
} from "lucide-react";
import { CampaignEvent, CampaignEventType, EventPriority, EventStatus, ElectoralSphere } from "../types";

interface CampaignCalendarProps {
  events: CampaignEvent[];
  onAddEvent: (event: CampaignEvent) => void;
  onUpdateEventStatus: (eventId: string, newStatus: EventStatus) => void;
  onDeleteEvent?: (eventId: string) => void;
  currentSphere: ElectoralSphere;
  candidateName: string;
}

export const CampaignCalendar: React.FC<CampaignCalendarProps> = ({
  events,
  onAddEvent,
  onUpdateEventStatus,
  onDeleteEvent,
  currentSphere,
  candidateName,
}) => {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedSphere, setSelectedSphere] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEventForModal, setSelectedEventForModal] = useState<CampaignEvent | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form State for New Event
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<CampaignEventType>("Comício");
  const [newDate, setNewDate] = useState("2026-09-25");
  const [newTime, setNewTime] = useState("18:00");
  const [newLocation, setNewLocation] = useState("");
  const [newZone, setNewZone] = useState("");
  const [newCandidateName, setNewCandidateName] = useState(candidateName);
  const [newSphere, setNewSphere] = useState<ElectoralSphere>(currentSphere);
  const [newPriority, setNewPriority] = useState<EventPriority>("Estratégica");
  const [newEstimatedAudience, setNewEstimatedAudience] = useState<number>(5000);
  const [newDescription, setNewDescription] = useState("");
  const [newTalkingPoints, setNewTalkingPoints] = useState<string>("");
  const [newSoundStage, setNewSoundStage] = useState(true);
  const [newLiveStreaming, setNewLiveStreaming] = useState(true);
  const [newSecurity, setNewSecurity] = useState<"Padrão" | "Reforçada" | "VIP / Máxima">("Reforçada");

  // Filtering
  const filteredEvents = events.filter((evt) => {
    if (selectedSphere !== "all" && evt.sphere !== selectedSphere) return false;
    if (selectedType !== "all" && evt.type !== selectedType) return false;
    if (selectedStatus !== "all" && evt.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchLocation = evt.location.toLowerCase().includes(q);
      const matchCandidate = evt.candidateName.toLowerCase().includes(q);
      const matchZone = evt.zoneOrNeighborhood?.toLowerCase().includes(q);
      if (!matchTitle && !matchLocation && !matchCandidate && !matchZone) return false;
    }
    return true;
  });

  // KPIs
  const totalAudience = events.reduce((acc, curr) => acc + (curr.estimatedAudience || 0), 0);
  const confirmedCount = events.filter((e) => e.status === "Confirmado").length;
  const strategicCount = events.filter((e) => e.priority === "Estratégica").length;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const pointsArray = newTalkingPoints
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const event: CampaignEvent = {
      id: `evt-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      date: newDate,
      time: newTime,
      location: newLocation.trim(),
      zoneOrNeighborhood: newZone.trim() || undefined,
      candidateId: `cand-${Date.now()}`,
      candidateName: newCandidateName.trim() || candidateName,
      sphere: newSphere,
      status: "Confirmado",
      priority: newPriority,
      estimatedAudience: Number(newEstimatedAudience) || 1000,
      description: newDescription.trim() || "Ato de mobilização de campanha.",
      talkingPoints: pointsArray.length > 0 ? pointsArray : [
        "Apresentação das principais diretrizes do plano de governo",
        "Diálogo aberto com a comunidade e lideranças presentes",
        "Convocação da militância para mobilização nas redes sociais"
      ],
      logistics: {
        soundStageRequired: newSoundStage,
        securityLevel: newSecurity,
        liveStreaming: newLiveStreaming,
        tseComplianceChecked: true,
      },
    };

    onAddEvent(event);
    setIsAddModalOpen(false);
    // Reset form
    setNewTitle("");
    setNewLocation("");
    setNewZone("");
    setNewDescription("");
    setNewTalkingPoints("");
  };

  // Generate and download iCalendar (.ics)
  const handleExportICS = (evt: CampaignEvent) => {
    const cleanDate = evt.date.replace(/-/g, "");
    const cleanTime = evt.time.replace(/:/g, "") + "00";
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//E-Candidato//Agenda de Campanha Eleitoral//PT-BR",
      "BEGIN:VEVENT",
      `SUMMARY:${evt.title} (${evt.candidateName})`,
      `DESCRIPTION:${evt.description}\\n\\nEixo: ${evt.type}\\nEsfera: ${evt.sphere}\\nPúblico Estimado: ${evt.estimatedAudience.toLocaleString("pt-BR")}\\nPrioridade: ${evt.priority}`,
      `LOCATION:${evt.location}`,
      `DTSTART:${cleanDate}T${cleanTime}`,
      `DTEND:${cleanDate}T230000`,
      `STATUS:${evt.status === "Confirmado" ? "CONFIRMED" : "TENTATIVE"}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `evento-${evt.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBadgeStyleForType = (type: CampaignEventType) => {
    switch (type) {
      case "Comício":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      case "Carreata":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "Caminhada":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Sabatina / Debate":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "Gravação HGPE (Rádio/TV)":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "Reunião com Lideranças":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
      default:
        return "bg-slate-700/40 text-slate-300 border-slate-600";
    }
  };

  return (
    <div id="campaign-calendar-module" className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#112233] via-[#16304A] to-[#112233] border border-[#1E3A5F] shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40">
                Logística & Mobilização
              </span>
              <span className="text-xs text-slate-400">
                Resolução TSE nº 23.610/2019 • Atos Públicos de Rua & Mídia
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#F2EFE6] tracking-tight flex items-center gap-2.5">
              <CalendarIcon className="w-7 h-7 text-[#D4A537]" />
              Agenda & Calendário de Campanha
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Planejamento cronológico de comícios, caminhadas, sabatinas televisivas, carreatas e gravações do horário eleitoral com monitoramento de público e diretrizes de discurso.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38728] hover:from-[#E5B648] hover:to-[#C49839] text-[#0B1B2B] font-bold text-xs shadow-lg shadow-[#D4A537]/20 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Evento / Ato</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Total de Atos Agendados</span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#F2EFE6]">{events.length}</span>
            <span className="text-xs text-[#2E9C87] font-medium">{confirmedCount} confirmados</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Público Acumulado Estimado</span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#D4A537]">
              {totalAudience.toLocaleString("pt-BR")}
            </span>
            <span className="text-xs text-slate-400">eleitores</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Atos Estratégicos (Alta Prioridade)</span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-400">{strategicCount}</span>
            <span className="text-xs text-slate-400">comícios & debates TV</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Conformidade Jurídica TSE</span>
          <div className="mt-1.5 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-emerald-300">100% Notificados</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por local, bairro, ato ou candidato..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-[#F2EFE6] focus:outline-none focus:border-[#D4A537]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {/* Sphere filter */}
          <select
            value={selectedSphere}
            onChange={(e) => setSelectedSphere(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-slate-300 focus:outline-none focus:border-[#D4A537]"
          >
            <option value="all">Todas as Esferas</option>
            <option value="Municipal">Municipal</option>
            <option value="Estadual">Estadual</option>
            <option value="Federal">Federal</option>
          </select>

          {/* Type filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-slate-300 focus:outline-none focus:border-[#D4A537]"
          >
            <option value="all">Todos os Tipos de Ato</option>
            <option value="Comício">Comício</option>
            <option value="Carreata">Carreata</option>
            <option value="Caminhada">Caminhada</option>
            <option value="Sabatina / Debate">Sabatina / Debate</option>
            <option value="Gravação HGPE (Rádio/TV)">Gravação HGPE</option>
            <option value="Reunião com Lideranças">Reunião Lideranças</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-slate-300 focus:outline-none focus:border-[#D4A537]"
          >
            <option value="all">Todos os Status</option>
            <option value="Confirmado">Confirmados</option>
            <option value="Pendente">Pendentes</option>
            <option value="Realizado">Realizados</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#112233] border border-[#1E3A5F]">
            <CalendarIcon className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-300">Nenhum evento encontrado com esses filtros.</p>
            <p className="text-xs text-slate-500 mt-1">Tente ajustar a busca ou adicionar um novo ato de campanha.</p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] hover:border-[#D4A537]/50 transition-all shadow-md space-y-4"
            >
              {/* Event Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E3A5F]/70 pb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getBadgeStyleForType(evt.type)}`}>
                    {evt.type}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#16304A] text-slate-300 border border-[#1E3A5F]">
                    Esfera {evt.sphere}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/10 text-[#D4A537] border border-[#D4A537]/30">
                    {evt.candidateName}
                  </span>
                  {evt.priority === "Estratégica" && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                      <Flag className="w-3 h-3 text-rose-400" />
                      Ato Estratégico
                    </span>
                  )}
                </div>

                {/* Status Switcher & Date */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4A537] bg-[#16304A] px-2.5 py-1 rounded-lg border border-[#1E3A5F]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(evt.date + "T00:00:00").toLocaleDateString("pt-BR")} às {evt.time}</span>
                  </div>

                  <select
                    value={evt.status}
                    onChange={(e) => onUpdateEventStatus(evt.id, e.target.value as EventStatus)}
                    className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                      evt.status === "Confirmado"
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-600/50"
                        : evt.status === "Realizado"
                        ? "bg-blue-950/80 text-blue-300 border-blue-600/50"
                        : "bg-amber-950/80 text-amber-300 border-amber-600/50"
                    }`}
                  >
                    <option value="Confirmado">Confirmado</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Realizado">Realizado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Event Content & Description */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-bold text-[#F2EFE6]">{evt.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{evt.description}</p>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D4A537]" />
                    <span className="text-slate-200 font-medium">{evt.location}</span>
                  </div>
                  {evt.zoneOrNeighborhood && (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span>Região / Zona:</span>
                      <span className="text-slate-300 font-semibold">{evt.zoneOrNeighborhood}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300 font-medium">Público Estimado:</span>
                    <span className="text-emerald-300 font-bold">{evt.estimatedAudience.toLocaleString("pt-BR")} pessoas</span>
                  </div>
                </div>
              </div>

              {/* Talking Points (Roteiro do Discurso) */}
              {evt.talkingPoints && evt.talkingPoints.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#0B1B2B]/70 border border-[#1E3A5F] space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D4A537] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Eixos do Discurso & Mensagens-Chave</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-300">
                    {evt.talkingPoints.map((tp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4A537] mt-1.5 shrink-0" />
                        <span>{tp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Logistics & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
                  {evt.logistics.soundStageRequired && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#16304A] border border-[#1E3A5F]">
                      <Volume2 className="w-3 h-3 text-amber-400" /> Som & Palco
                    </span>
                  )}
                  {evt.logistics.liveStreaming && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#16304A] border border-[#1E3A5F]">
                      <Video className="w-3 h-3 text-rose-400" /> Transmissão Ao Vivo
                    </span>
                  )}
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#16304A] border border-[#1E3A5F]">
                    <Shield className="w-3 h-3 text-cyan-400" /> Segurança: {evt.logistics.securityLevel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExportICS(evt)}
                    className="px-3 py-1.5 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-slate-200 text-xs font-semibold border border-[#1E3A5F] flex items-center gap-1.5 transition-colors"
                    title="Baixar arquivo .ics para Google Calendar ou Outlook"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4A537]" />
                    <span>Adicionar à Agenda</span>
                  </button>

                  {onDeleteEvent && (
                    <button
                      onClick={() => onDeleteEvent(evt.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs border border-rose-800/40 transition-colors"
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Novo Evento */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#112233] border border-[#1E3A5F] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
              <h2 className="text-lg font-bold text-[#F2EFE6] flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#D4A537]" />
                Cadastrar Novo Ato de Campanha
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-[#16304A]"
              >
                ✕ Fechar
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Título do Evento / Ato:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Comício da Esperança no Largo do Tanque"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tipo de Evento:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as CampaignEventType)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  >
                    <option value="Comício">Comício</option>
                    <option value="Carreata">Carreata</option>
                    <option value="Caminhada">Caminhada</option>
                    <option value="Sabatina / Debate">Sabatina / Debate</option>
                    <option value="Entrevista / Coletiva">Entrevista / Coletiva</option>
                    <option value="Reunião com Lideranças">Reunião com Lideranças</option>
                    <option value="Gravação HGPE (Rádio/TV)">Gravação HGPE</option>
                    <option value="Plenária Temática">Plenária Temática</option>
                    <option value="Mutirão de Panfletagem">Mutirão de Panfletagem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Esfera Eleitoral:</label>
                  <select
                    value={newSphere}
                    onChange={(e) => setNewSphere(e.target.value as ElectoralSphere)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  >
                    <option value="Municipal">Municipal</option>
                    <option value="Estadual">Estadual</option>
                    <option value="Federal">Federal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Data:</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Horário:</label>
                  <input
                    type="time"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Público Estimado:</label>
                  <input
                    type="number"
                    value={newEstimatedAudience}
                    onChange={(e) => setNewEstimatedAudience(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Local / Endereço Completo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Praça Castro Alves, Centro, Salvador - BA"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Descrição / Contexto do Ato:</label>
                <textarea
                  rows={2}
                  placeholder="Detalhes sobre a concentração, percurso ou pauta do evento..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Eixos do Discurso / Talking Points (1 por linha):
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Proposta de gratuidade no transporte&#10;Defesa das escolas de tempo integral&#10;Contraste com a gestão anterior"
                  value={newTalkingPoints}
                  onChange={(e) => setNewTalkingPoints(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div className="flex items-center gap-4 py-2 border-t border-[#1E3A5F]">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={newSoundStage}
                    onChange={(e) => setNewSoundStage(e.target.checked)}
                    className="rounded bg-[#0B1B2B]"
                  />
                  <span>Requer Carro de Som / Palco</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={newLiveStreaming}
                    onChange={(e) => setNewLiveStreaming(e.target.checked)}
                    className="rounded bg-[#0B1B2B]"
                  />
                  <span>Transmissão em Redes Sociais</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#16304A] text-slate-300 font-semibold hover:bg-[#1E3A5F]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38728] text-[#0B1B2B] font-bold shadow-lg"
                >
                  Confirmar e Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
