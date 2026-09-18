import React from "react";
import { CampaignFinance, CandidateProfile } from "../types";
import {
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  PieChart,
  FileCheck,
  Scale,
} from "lucide-react";

interface CampaignFinancesProps {
  finances: CampaignFinance;
  candidate: CandidateProfile;
}

export const CampaignFinances: React.FC<CampaignFinancesProps> = ({
  finances,
  candidate,
}) => {
  const spendingPctUsed = Math.min(
    100,
    Math.round((finances.totalExpenses / finances.legalSpendingCap) * 100)
  );

  const remainingBudget = finances.legalSpendingCap - finances.totalExpenses;

  return (
    <div id="campaign-finances-container" className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4A537]/20 text-[#D4A537] border border-[#D4A537]/40 uppercase tracking-wide">
              Controle Orçamentário
            </span>
            <span className="text-xs text-slate-400">
              Conformidade com a Resolução TSE nº 23.607
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#F2EFE6] mt-1">
            Finanças da Campanha & Prestação de Contas (SPCE)
          </h2>
          <p className="text-xs text-slate-300">
            Acompanhe o teto legal de gastos, doações arrecadadas e auditoria preventiva para evitar impugnação.
          </p>
        </div>

        {/* Legal Cap Pill */}
        <div className="flex items-center gap-3 bg-[#16304A] px-4 py-2 rounded-xl border border-[#1E3A5F]">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Teto Legal de Gastos TSE
            </span>
            <span className="text-lg font-extrabold text-[#D4A537] font-mono">
              R$ {finances.legalSpendingCap.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Arrecadado */}
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Arrecadado</span>
          <div className="text-2xl font-extrabold text-[#2E9C87] font-mono">
            R$ {finances.totalRevenue.toLocaleString("pt-BR")}
          </div>
          <p className="text-[11px] text-slate-400">
            FEFC + Fundo Partidário + Doações Físicas
          </p>
        </div>

        {/* Card 2: Total Despesas Contratadas */}
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Despesas Executadas</span>
          <div className="text-2xl font-extrabold text-amber-300 font-mono">
            R$ {finances.totalExpenses.toLocaleString("pt-BR")}
          </div>
          <p className="text-[11px] text-slate-400">
            {spendingPctUsed}% do teto legal utilizado
          </p>
        </div>

        {/* Card 3: Saldo Disponível */}
        <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Saldo em Caixa</span>
          <div className="text-2xl font-extrabold text-[#F2EFE6] font-mono">
            R$ {(finances.totalRevenue - finances.totalExpenses).toLocaleString("pt-BR")}
          </div>
          <p className="text-[11px] text-[#2E9C87] font-semibold">
            Saldo regular para reta final
          </p>
        </div>
      </div>

      {/* Spending Cap Gauge */}
      <div className="p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-[#F2EFE6] flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-[#D4A537]" />
            Consumo do Teto Legal Máximo: R$ {finances.legalSpendingCap.toLocaleString("pt-BR")}
          </span>
          <span className="font-mono font-bold text-[#D4A537]">{spendingPctUsed}%</span>
        </div>
        <div className="w-full bg-[#0B1B2B] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#1E3A5F]">
          <div
            className="bg-gradient-to-r from-[#2E9C87] via-[#D4A537] to-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${spendingPctUsed}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Executado: R$ {finances.totalExpenses.toLocaleString("pt-BR")}</span>
          <span className="text-[#2E9C87]">
            Margem restante: R$ {remainingBudget.toLocaleString("pt-BR")}
          </span>
        </div>
      </div>

      {/* Breakdown Grid: Expenses by Category (Left) & Compliance Checklist (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Expenses Allocation */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
            <h3 className="text-sm font-bold text-[#F2EFE6] flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#D4A537]" />
              Despesas por Rubrica Orçamentária
            </h3>
            <span className="text-xs text-slate-400">Limite de Impulsionamento</span>
          </div>

          <div className="space-y-3">
            {finances.expensesByCategory.map((cat, idx) => {
              const catPct = Math.round((cat.amount / finances.totalExpenses) * 100);
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-1.5"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{cat.category}</span>
                    <span className="font-mono font-bold text-[#D4A537]">
                      R$ {cat.amount.toLocaleString("pt-BR")} ({catPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#16304A] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#D4A537] h-full rounded-full"
                      style={{ width: `${catPct}%` }}
                    />
                  </div>
                  {cat.legalLimitPct && (
                    <div className="text-[10px] text-teal-400 flex items-center justify-between">
                      <span>Limite Legal TSE: até {cat.legalLimitPct}% do teto</span>
                      <span>Enquadramento regular ({catPct}% utilizado)</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 cols: Compliance Checklist */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#112233] border border-[#1E3A5F] shadow-lg space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
              <h3 className="text-sm font-bold text-[#F2EFE6] flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#2E9C87]" />
                Checklist de Obrigações TSE
              </h3>
              <span className="text-xs text-slate-400">Auditoria</span>
            </div>

            <div className="mt-3 space-y-2.5">
              {finances.complianceChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#0B1B2B] border border-[#1E3A5F] space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white leading-snug">
                      {item.item}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ml-2 ${
                        item.status === "Concluído"
                          ? "bg-emerald-950 text-emerald-300 border-emerald-700/60"
                          : "bg-amber-950 text-amber-300 border-amber-700/60"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{item.deadline}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#16304A]/60 border border-[#1E3A5F] text-[11px] text-slate-300">
            <span className="font-bold text-white block mb-0.5">
              Aviso Contábil Importante:
            </span>
            Todas as doações recebidas via PIX ou boleto devem ter o CPF do doador conferido na Receita Federal e ser informadas à Justiça Eleitoral em até 72 horas.
          </div>
        </div>
      </div>
    </div>
  );
};
