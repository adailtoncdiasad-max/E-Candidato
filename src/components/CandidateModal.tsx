import React, { useState } from "react";
import { CandidateProfile } from "../types";
import { X, Save, User, Award, Hash, MapPin, Target, Sparkles } from "lucide-react";
import { BAHIA_CANDIDATE_PRESETS, BahiaCandidatePreset } from "../data/bahiaElectionData";

interface CandidateModalProps {
  candidate: CandidateProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<CandidateProfile>) => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onSave,
}) => {
  const [presetCategory, setPresetCategory] = useState<string>(
    candidate.sphere === "Federal"
      ? "Federal"
      : candidate.sphere === "Estadual"
      ? "Estadual"
      : "Municipal"
  );
  const [ballotName, setBallotName] = useState(candidate.ballotName);
  const [role, setRole] = useState(candidate.role);
  const [number, setNumber] = useState(candidate.number);
  const [party, setParty] = useState(candidate.party);
  const [coalition, setCoalition] = useState(candidate.coalition);
  const [campaignSlogan, setCampaignSlogan] = useState(candidate.campaignSlogan);
  const [targetVotes, setTargetVotes] = useState(candidate.targetVotes);
  const [location, setLocation] = useState(candidate.location);
  const [validationError, setValidationError] = useState("");

  if (!isOpen) return null;

  const filteredPresets =
    presetCategory === "TODOS"
      ? BAHIA_CANDIDATE_PRESETS
      : BAHIA_CANDIDATE_PRESETS.filter((p) => p.sphere === presetCategory);

  const applyPreset = (preset: BahiaCandidatePreset) => {
    setBallotName(preset.ballotName);
    setRole(preset.role);
    setNumber(preset.number);
    setParty(preset.party);
    setCoalition(preset.coalition);
    setCampaignSlogan(preset.slogan);
    setLocation(preset.location);
    if (preset.sphere === "Federal") {
      setTargetVotes(60345999);
    } else if (preset.sphere === "Estadual") {
      setTargetVotes(4400000);
    } else {
      setTargetVotes(750000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Number.isSafeInteger(targetVotes) || targetVotes <= 0) {
      setValidationError("A meta de votos deve ser um número inteiro positivo.");
      return;
    }

    setValidationError("");
    onSave({
      ballotName,
      role,
      number,
      party,
      coalition,
      campaignSlogan,
      targetVotes,
      location,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#1E3A5F] flex items-center justify-between bg-[#16304A]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#D4A537]" />
            <h3 className="font-bold text-[#F2EFE6] text-base">
              Editar Perfil do Candidato ({candidate.sphere})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#0B1B2B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets TSE Bahia / Brasil */}
        <div className="p-3 bg-[#0B1B2B]/90 border-b border-[#1E3A5F] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#D4A537] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Carregar Candidatura Oficial TSE (1-Clique):</span>
            </div>
            {/* Category Tabs */}
            <div className="flex items-center gap-1 text-[10px]">
              {[
                { key: "Federal", label: "Presidência (Federal)" },
                { key: "Estadual", label: "Estadual (BA)" },
                { key: "Municipal", label: "Municipal (SSA)" },
                { key: "TODOS", label: "Todos" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setPresetCategory(cat.key)}
                  className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                    presetCategory === cat.key
                      ? "bg-[#D4A537] text-[#0B1B2B]"
                      : "bg-[#16304A] text-slate-300 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className="text-left p-1.5 rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] border border-[#1E3A5F] hover:border-[#D4A537]/50 transition-all text-[11px]"
              >
                <div className="font-bold text-[#F2EFE6] truncate flex items-center justify-between">
                  <span>{preset.ballotName}</span>
                  <span className="text-[10px] text-[#D4A537] font-mono">{preset.number}</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {preset.role} • {preset.party}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Nome de Urna:
              </label>
              <input
                type="text"
                value={ballotName}
                onChange={(e) => setBallotName(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Cargo Disputado:
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Número de Urna:
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-white font-mono focus:outline-none focus:border-[#D4A537]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Partido / Sigla:
              </label>
              <input
                type="text"
                value={party}
                onChange={(e) => setParty(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Localidade / Circunscrição Eleitoral:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Coligação / Federação Partidária:
            </label>
            <input
              type="text"
              value={coalition}
              onChange={(e) => setCoalition(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Slogan Oficial da Campanha:
            </label>
            <input
              type="text"
              value={campaignSlogan}
              onChange={(e) => setCampaignSlogan(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-white focus:outline-none focus:border-[#D4A537]"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Meta de Votos Nominais:
            </label>
            <input
              type="number"
              value={targetVotes}
              min={1}
              step={1}
              onChange={(e) => setTargetVotes(Number(e.target.value))}
              required
              className="w-full p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] text-white font-mono focus:outline-none focus:border-[#D4A537]"
            />
              {validationError && (
                <p className="mt-1 text-[11px] text-rose-300">{validationError}</p>
              )}
          </div>

          <div className="pt-3 border-t border-[#1E3A5F] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#0B1B2B] hover:bg-[#16304A] text-slate-300 font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#D4A537] hover:bg-[#E5B648] text-[#0B1B2B] font-bold transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
