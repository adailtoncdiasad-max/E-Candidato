import React, { useState } from "react";
import {
  Users,
  Bell,
  Send,
  UserPlus,
  Search,
  Filter,
  Award,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Flame,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Smartphone,
  Check,
  Radio,
  Clock,
  Share2,
  Volume2,
  ExternalLink,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Volunteer, PushNotificationRecord, VolunteerRole, VolunteerStatus, PushTargetAudience, PushPriority, PushCategory } from "../types";

interface VolunteersDashboardProps {
  volunteers: Volunteer[];
  onAddVolunteer: (volunteer: Volunteer) => void;
  pushNotifications: PushNotificationRecord[];
  onSendPushNotification: (notification: PushNotificationRecord) => void;
  candidateName: string;
}

export const VolunteersDashboard: React.FC<VolunteersDashboardProps> = ({
  volunteers,
  onAddVolunteer,
  pushNotifications,
  onSendPushNotification,
  candidateName,
}) => {
  const [activeTab, setActiveTab] = useState<"volunteers" | "push" | "leaderboard">("volunteers");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modals
  const [isAddVolunteerModalOpen, setIsAddVolunteerModalOpen] = useState(false);
  const [isSendPushModalOpen, setIsSendPushModalOpen] = useState(false);

  // Push Permission State
  const [pushPermission, setPushPermission] = useState<NotificationPermission>(
    typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : "default"
  );
  const [simulatedPushAlert, setSimulatedPushAlert] = useState<PushNotificationRecord | null>(null);

  // Form states for New Volunteer
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newZone, setNewZone] = useState("");
  const [newCity, setNewCity] = useState("Salvador - BA");
  const [newRole, setNewRole] = useState<VolunteerRole>("Mobilizador de Rua");
  const [newAvailability, setNewAvailability] = useState<"Integral" | "Finais de Semana" | "Noite" | "Dias Úteis">("Finais de Semana");
  const [newSkills, setNewSkills] = useState("");

  // Form states for New Push Notification
  const [newPushTitle, setNewPushTitle] = useState("");
  const [newPushBody, setNewPushBody] = useState("");
  const [newPushAudience, setNewPushAudience] = useState<PushTargetAudience>("Todos os Voluntários");
  const [newPushPriority, setNewPushPriority] = useState<PushPriority>("Urgente / Relâmpago");
  const [newPushCategory, setNewPushCategory] = useState<PushCategory>("Ato de Rua");
  const [newPushActionUrl, setNewPushActionUrl] = useState("");

  // Filter volunteers
  const filteredVolunteers = volunteers.filter((vol) => {
    if (roleFilter !== "all" && vol.role !== roleFilter) return false;
    if (statusFilter !== "all" && vol.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = vol.name.toLowerCase().includes(q);
      const matchZone = vol.zoneOrNeighborhood.toLowerCase().includes(q);
      const matchCity = vol.city.toLowerCase().includes(q);
      const matchRole = vol.role.toLowerCase().includes(q);
      if (!matchName && !matchZone && !matchCity && !matchRole) return false;
    }
    return true;
  });

  // KPI calculations
  const totalVolunteers = volunteers.length;
  const activeVolunteersCount = volunteers.filter((v) => v.status === "Ativo" || v.status === "Destaque").length;
  const totalTasks = volunteers.reduce((acc, v) => acc + v.tasksCompleted, 0);
  const totalPoints = volunteers.reduce((acc, v) => acc + v.points, 0);

  // Request browser Web Push notification permission
  const handleRequestPushPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const perm = await Notification.requestPermission();
        setPushPermission(perm);
        if (perm === "granted") {
          new Notification("E-Candidato: Notificações Ativadas!", {
            body: "Você agora receberá alertas instantâneos de mobilização da campanha.",
            icon: "/favicon.png",
          });
        }
      } catch (err) {
        console.warn("Permissão de notificação não suportada neste navegador:", err);
      }
    }
  };

  // Submit new volunteer
  const handleCreateVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim() || !newZone.trim()) return;

    const skillsArray = newSkills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const created: Volunteer = {
      id: `vol-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, ".")}@militancia.org`,
      phone: newPhone.trim(),
      zoneOrNeighborhood: newZone.trim(),
      city: newCity.trim(),
      role: newRole,
      status: "Ativo",
      tasksCompleted: 1,
      points: 100,
      joinedAt: new Date().toISOString().split("T")[0],
      skills: skillsArray.length > 0 ? skillsArray : ["Mobilização", "WhatsApp"],
      availability: newAvailability,
      badges: ["Novo Voluntário", "Bravura Cívica"],
    };

    onAddVolunteer(created);
    setIsAddVolunteerModalOpen(false);

    // Reset
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewZone("");
    setNewSkills("");
  };

  // Submit new push notification
  const handleCreatePush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPushTitle.trim() || !newPushBody.trim()) return;

    const push: PushNotificationRecord = {
      id: `push-${Date.now()}`,
      title: newPushTitle.trim(),
      body: newPushBody.trim(),
      targetAudience: newPushAudience,
      priority: newPushPriority,
      category: newPushCategory,
      actionUrl: newPushActionUrl.trim() || undefined,
      sentAt: new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }),
      status: "Enviado",
      stats: {
        sentCount: newPushAudience === "Todos os Voluntários" ? 5200 : 1350,
        openRatePct: 92.4,
        clickRatePct: 74.8,
      },
    };

    onSendPushNotification(push);
    setIsSendPushModalOpen(false);

    // Trigger local system notification if granted
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(push.title, {
          body: push.body,
          icon: "/favicon.png",
        });
      } catch (err) {
        console.log(err);
      }
    }

    // Trigger visual floating notification on screen
    setSimulatedPushAlert(push);
    setTimeout(() => {
      setSimulatedPushAlert(null);
    }, 6000);

    // Reset
    setNewPushTitle("");
    setNewPushBody("");
    setNewPushActionUrl("");
  };

  const getRoleBadgeStyle = (role: VolunteerRole) => {
    switch (role) {
      case "Líder de Zona":
        return "bg-[#D4A537]/20 text-[#D4A537] border-[#D4A537]/40";
      case "Militante Digital":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
      case "Fiscal de Urna":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "Mobilizador de Rua":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Apoio Jurídico":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "Coordenação Jovem":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      default:
        return "bg-slate-700/40 text-slate-300 border-slate-600";
    }
  };

  return (
    <div id="volunteers-dashboard-module" className="space-y-6">
      {/* Floating Interactive Push Alert Preview */}
      <AnimatePresence>
        {simulatedPushAlert && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-5 right-5 z-50 max-w-md w-full p-4 rounded-2xl bg-[#112233]/95 border-2 border-[#D4A537] shadow-2xl backdrop-blur-md text-[#F2EFE6] space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-[#D4A537] text-[#0B1B2B]">
                  <Bell className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-[#D4A537] uppercase tracking-wider">
                  Notificação Push Enviada
                </span>
              </div>
              <button
                onClick={() => setSimulatedPushAlert(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <h4 className="text-sm font-black text-white">{simulatedPushAlert.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{simulatedPushAlert.body}</p>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-[#1E3A5F]">
              <span>Público: <strong className="text-slate-200">{simulatedPushAlert.targetAudience}</strong></span>
              <span className="text-emerald-400 font-bold">Transmitido aos celulares</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#112233] via-[#16304A] to-[#112233] border border-[#1E3A5F] shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#D4A537]" />
                Militância Ativa & Engajamento
              </span>
              <span className="text-xs text-slate-400">
                Gestão Territorial de Voluntários & Alertas Push
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#F2EFE6] tracking-tight flex items-center gap-2.5">
              <Flame className="w-7 h-7 text-[#D4A537]" />
              Dashboard de Voluntários & Notificações Push
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Organização da força de trabalho voluntária por zonas e bairros, distribuição de missões eleitorais, gamificação com ranking de pontos e disparador de alertas push imediatos para celular.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleRequestPushPermission}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                pushPermission === "granted"
                  ? "bg-emerald-950/70 text-emerald-300 border border-emerald-600/50"
                  : "bg-[#16304A] hover:bg-[#1E3A5F] text-slate-200 border border-[#1E3A5F]"
              }`}
              title="Ativar recebimento de notificações push no navegador"
            >
              <Bell className="w-3.5 h-3.5 text-[#D4A537]" />
              <span>
                {pushPermission === "granted" ? "Push Ativado" : "Permitir Push"}
              </span>
            </button>

            <button
              onClick={() => setIsSendPushModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-rose-900/30 flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Disparar Push</span>
            </button>

            <button
              onClick={() => setIsAddVolunteerModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38728] hover:from-[#E5B648] hover:to-[#C49839] text-[#0B1B2B] font-bold text-xs shadow-lg shadow-[#D4A537]/20 flex items-center gap-1.5 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Novo Voluntário</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Total de Voluntários</span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#F2EFE6]">{totalVolunteers}</span>
            <span className="text-xs text-[#2E9C87] font-semibold">{activeVolunteersCount} ativos</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Tarefas de Rua Concluídas</span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#D4A537]">{totalTasks}</span>
            <span className="text-xs text-slate-400">missões cumpridas</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Alertas Push Enviados</span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-400">{pushNotifications.length}</span>
            <span className="text-xs text-slate-300 font-semibold">91.8% abertura</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Pontuação de Engajamento</span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-black text-cyan-400">{totalPoints.toLocaleString("pt-BR")}</span>
            <span className="text-xs text-slate-400">pts cívicos</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#1E3A5F] pb-3">
        <button
          onClick={() => setActiveTab("volunteers")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "volunteers"
              ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/20"
              : "bg-[#16304A] text-slate-300 hover:bg-[#1E3A5F]"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Diretório de Voluntários ({volunteers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("push")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "push"
              ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/20"
              : "bg-[#16304A] text-slate-300 hover:bg-[#1E3A5F]"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Centro de Notificações Push ({pushNotifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "leaderboard"
              ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/20"
              : "bg-[#16304A] text-slate-300 hover:bg-[#1E3A5F]"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Ranking de Mobilização</span>
        </button>
      </div>

      {/* TAB 1: Volunteers Directory */}
      {activeTab === "volunteers" && (
        <motion.div
          key="volunteers-tab"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome, bairro, cidade ou função..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-[#F2EFE6] focus:outline-none focus:border-[#D4A537]"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-slate-300 focus:outline-none focus:border-[#D4A537]"
              >
                <option value="all">Todas as Funções</option>
                <option value="Líder de Zona">Líder de Zona</option>
                <option value="Militante Digital">Militante Digital</option>
                <option value="Fiscal de Urna">Fiscal de Urna</option>
                <option value="Mobilizador de Rua">Mobilizador de Rua</option>
                <option value="Apoio Jurídico">Apoio Jurídico</option>
                <option value="Coordenação Jovem">Coordenação Jovem</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-slate-300 focus:outline-none focus:border-[#D4A537]"
              >
                <option value="all">Todos os Status</option>
                <option value="Ativo">Ativo</option>
                <option value="Destaque">Destaque</option>
                <option value="Em Treinamento">Em Treinamento</option>
                <option value="Disponível">Disponível</option>
              </select>
            </div>
          </div>

          {/* Volunteers Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVolunteers.map((vol) => (
              <motion.div
                key={vol.id}
                layout
                className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] hover:border-[#D4A537]/50 shadow-md transition-all space-y-3.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRoleBadgeStyle(vol.role)}`}>
                      {vol.role}
                    </span>
                    <h3 className="text-base font-bold text-[#F2EFE6] mt-1">{vol.name}</h3>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#D4A537]/15 text-[#D4A537] border border-[#D4A537]/30 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {vol.points} pts
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A537]" />
                    <span>{vol.zoneOrNeighborhood}, {vol.city}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-400">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{vol.phone}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Disponibilidade: <strong>{vol.availability}</strong></span>
                  </p>
                </div>

                {/* Skills tags */}
                {vol.skills && vol.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {vol.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#0B1B2B] text-slate-300 border border-[#1E3A5F]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Badges */}
                <div className="flex items-center gap-1 flex-wrap pt-1 border-t border-[#1E3A5F]">
                  {vol.badges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-700/40"
                    >
                      🏅 {badge}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-[#1E3A5F]/70 text-xs">
                  <span className="text-[11px] text-slate-400">
                    <strong className="text-white">{vol.tasksCompleted}</strong> tarefas
                  </span>

                  <a
                    href={`https://wa.me/55${vol.phone.replace(/\D/g, "")}?text=Olá ${encodeURIComponent(vol.name)}, falando da coordenação de campanha do ${encodeURIComponent(candidateName)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-bold border border-emerald-600/40 flex items-center gap-1 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB 2: Push Notifications Center */}
      {activeTab === "push" && (
        <motion.div
          key="push-tab"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#F2EFE6] flex items-center gap-2">
                <Bell className="w-5 h-5 text-rose-400" />
                Histórico & Disparo de Alertas Push em Tempo Real
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Mensagens instantâneas que chegam diretamente à tela de bloqueio dos voluntários, líderes de zona e fiscais de urna.
              </p>
            </div>

            <button
              onClick={() => setIsSendPushModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Novo Disparo Push</span>
            </button>
          </div>

          {/* List of Sent Push Notifications */}
          <div className="space-y-3">
            {pushNotifications.map((push) => (
              <motion.div
                key={push.id}
                layout
                className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-md space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E3A5F] pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                        push.priority === "Urgente / Relâmpago"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                          : push.priority === "Importante"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                          : "bg-blue-500/20 text-blue-300 border-blue-500/50"
                      }`}
                    >
                      {push.priority}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16304A] text-slate-300 border border-[#1E3A5F]">
                      {push.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0B1B2B] text-[#D4A537] border border-[#1E3A5F]">
                      Destinatários: {push.targetAudience}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono">
                    Enviado em {push.sentAt}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{push.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{push.body}</p>
                </div>

                {/* Stats Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1E3A5F] text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Aparelhos Notificados</span>
                      <strong className="text-white">{push.stats.sentCount.toLocaleString("pt-BR")}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Taxa de Abertura</span>
                      <strong className="text-emerald-400">{push.stats.openRatePct}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Cliques na Ação</span>
                      <strong className="text-cyan-400">{push.stats.clickRatePct}%</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSimulatedPushAlert(push);
                      setTimeout(() => setSimulatedPushAlert(null), 6000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] text-slate-200 text-xs font-semibold border border-[#1E3A5F] flex items-center gap-1.5 transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#D4A537]" />
                    <span>Reenviar Notificação</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB 3: Gamification Leaderboard */}
      {activeTab === "leaderboard" && (
        <motion.div
          key="leaderboard-tab"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg">
            <h2 className="text-base font-bold text-[#F2EFE6] flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-[#D4A537]" />
              Ranking de Engajamento Cívico da Militância
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Gamificação da campanha: voluntários ganham pontos por panfletagem, checagem de fake news, mobilização de grupos e presença em atos de rua.
            </p>

            <div className="space-y-3">
              {[...volunteers]
                .sort((a, b) => b.points - a.points)
                .map((vol, index) => (
                  <div
                    key={vol.id}
                    className="p-4 rounded-xl bg-[#16304A]/60 border border-[#1E3A5F] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                          index === 0
                            ? "bg-[#D4A537] text-[#0B1B2B] shadow-md shadow-[#D4A537]/30"
                            : index === 1
                            ? "bg-slate-300 text-[#0B1B2B]"
                            : index === 2
                            ? "bg-amber-700 text-white"
                            : "bg-[#0B1B2B] text-slate-400 border border-[#1E3A5F]"
                        }`}
                      >
                        {index + 1}º
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{vol.name}</h4>
                          <span className={`px-2 py-0.2 rounded text-[10px] border ${getRoleBadgeStyle(vol.role)}`}>
                            {vol.role}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {vol.zoneOrNeighborhood} • {vol.tasksCompleted} tarefas cumpridas
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-lg font-black text-[#D4A537]">{vol.points}</span>
                        <span className="text-[10px] text-slate-400 block">pontos</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Modal: Novo Voluntário */}
      {isAddVolunteerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#112233] border border-[#1E3A5F] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
              <h2 className="text-lg font-bold text-[#F2EFE6] flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#D4A537]" />
                Cadastrar Novo Voluntário / Militante
              </h2>
              <button
                onClick={() => setIsAddVolunteerModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-[#16304A]"
              >
                ✕ Fechar
              </button>
            </div>

            <form onSubmit={handleCreateVolunteer} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome Completo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Amanda Lima dos Santos"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Telefone:</label>
                  <input
                    type="text"
                    required
                    placeholder="(71) 99999-9999"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-mail (opcional):</label>
                  <input
                    type="email"
                    placeholder="voluntario@email.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Bairro / Zona Eleitoral:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Brotas / Engenho Velho"
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cidade / UF:</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Função / Perfil:</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as VolunteerRole)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  >
                    <option value="Mobilizador de Rua">Mobilizador de Rua</option>
                    <option value="Militante Digital">Militante Digital</option>
                    <option value="Fiscal de Urna">Fiscal de Urna</option>
                    <option value="Líder de Zona">Líder de Zona</option>
                    <option value="Apoio Jurídico">Apoio Jurídico</option>
                    <option value="Coordenação Jovem">Coordenação Jovem</option>
                    <option value="Comunicação & Carro de Som">Comunicação & Carro de Som</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Disponibilidade:</label>
                  <select
                    value={newAvailability}
                    onChange={(e) => setNewAvailability(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  >
                    <option value="Finais de Semana">Finais de Semana</option>
                    <option value="Integral">Integral</option>
                    <option value="Noite">Noite</option>
                    <option value="Dias Úteis">Dias Úteis</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Habilidades & Recursos (separados por vírgula):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Panfletagem, Carro Próprio, Edição de Vídeo, WhatsApp"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#1E3A5F]">
                <button
                  type="button"
                  onClick={() => setIsAddVolunteerModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#16304A] text-slate-300 font-semibold hover:bg-[#1E3A5F]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38728] text-[#0B1B2B] font-bold shadow-lg"
                >
                  Cadastrar Voluntário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Disparar Alerta Push */}
      {isSendPushModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#112233] border border-[#1E3A5F] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
              <h2 className="text-lg font-bold text-[#F2EFE6] flex items-center gap-2">
                <Send className="w-5 h-5 text-rose-400" />
                Disparar Alerta Push Imediato
              </h2>
              <button
                onClick={() => setIsSendPushModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-[#16304A]"
              >
                ✕ Fechar
              </button>
            </div>

            <form onSubmit={handleCreatePush} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Título da Notificação Push:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 🚨 URGENTE: Convocação para Caminhada no Comércio"
                  value={newPushTitle}
                  onChange={(e) => setNewPushTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Texto da Notificação:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Mensagem direta que aparecerá na tela dos voluntários..."
                  value={newPushBody}
                  onChange={(e) => setNewPushBody(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Público-Alvo do Disparo:</label>
                  <select
                    value={newPushAudience}
                    onChange={(e) => setNewPushAudience(e.target.value as PushTargetAudience)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  >
                    <option value="Todos os Voluntários">Todos os Voluntários</option>
                    <option value="Líderes de Zona">Líderes de Zona</option>
                    <option value="Fiscais de Urna">Fiscais de Urna</option>
                    <option value="Militantes Digitais">Militantes Digitais</option>
                    <option value="Mobilizadores de Rua">Mobilizadores de Rua</option>
                    <option value="Equipe Jurídica">Equipe Jurídica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nível de Prioridade:</label>
                  <select
                    value={newPushPriority}
                    onChange={(e) => setNewPushPriority(e.target.value as PushPriority)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                  >
                    <option value="Urgente / Relâmpago">Urgente / Relâmpago</option>
                    <option value="Importante">Importante</option>
                    <option value="Informativo">Informativo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Categoria:</label>
                <select
                  value={newPushCategory}
                  onChange={(e) => setNewPushCategory(e.target.value as PushCategory)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                >
                  <option value="Ato de Rua">Ato de Rua</option>
                  <option value="Contra-Fake News">Contra-Fake News (Desmentido)</option>
                  <option value="Roteiro de Debate">Roteiro de Debate / Sabatina</option>
                  <option value="Fiscalização Urna">Fiscalização de Urna</option>
                  <option value="Mobilização Geral">Mobilização Geral</option>
                  <option value="Material Digital">Material Digital / Artes</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Link de Ação ao Clicar (opcional):</label>
                <input
                  type="url"
                  placeholder="https://e-candidato.app/acao-urgente"
                  value={newPushActionUrl}
                  onChange={(e) => setNewPushActionUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#1E3A5F]">
                <button
                  type="button"
                  onClick={() => setIsSendPushModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#16304A] text-slate-300 font-semibold hover:bg-[#1E3A5F]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 text-white font-bold shadow-lg flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmitir Alerta Push</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
