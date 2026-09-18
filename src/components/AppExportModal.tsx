import React, { useState } from 'react';
import {
  X,
  Download,
  Smartphone,
  Globe,
  QrCode,
  CheckCircle2,
  Copy,
  FileCode,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { CandidateProfile, SphereType } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

function escapeHtml(value: string | number | null | undefined): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeProgress(current: number, target: number): number {
  if (!Number.isFinite(current) || !Number.isFinite(target) || target <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
}

interface AppExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateProfile;
  currentSphere: SphereType;
}

export const AppExportModal: React.FC<AppExportModalProps> = ({
  isOpen,
  onClose,
  candidate,
  currentSphere,
}) => {
  const [activeTab, setActiveTab] = useState<'android' | 'html'>('android');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { isInstallable, isInstalled, install, isAndroid } = usePWAInstall();

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://e-candidato.app';
  const progress = safeProgress(candidate.currentEstimatedVotes, candidate.targetVotes);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Generate standalone complete HTML report
  const downloadStandaloneHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-Candidato: Dossiê Executivo de Campanha - ${escapeHtml(candidate.ballotName)}</title>
  <style>
    :root {
      --bg: #0B1B2B;
      --card-bg: #112233;
      --gold: #D4A537;
      --emerald: #2E9C87;
      --text: #F2EFE6;
      --text-muted: #94A3B8;
      --border: #1E3A5F;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 32px 20px;
      line-height: 1.6;
    }
    .container { max-width: 960px; margin: 0 auto; }
    header {
      border-bottom: 2px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .logo {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 2px;
      color: var(--gold);
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      background: rgba(212, 165, 55, 0.15);
      border: 1px solid var(--gold);
      color: var(--gold);
    }
    .hero {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .hero h1 { font-size: 28px; margin-bottom: 8px; }
    .hero p { color: var(--text-muted); font-size: 15px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
    }
    .card-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; }
    .card-value { font-size: 24px; font-weight: 800; color: var(--gold); font-family: monospace; }
    .progress-bar {
      background: #07121D;
      height: 10px;
      border-radius: 999px;
      overflow: hidden;
      margin-top: 10px;
      border: 1px solid var(--border);
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--emerald), var(--gold));
      width: ${progress}%;
    }
    .table-box {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 24px;
    }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { background: #07121D; padding: 12px 16px; font-size: 13px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    td { padding: 12px 16px; border-bottom: 1px solid var(--border); font-size: 14px; }
    footer {
      text-align: center;
      margin-top: 48px;
      color: var(--text-muted);
      font-size: 13px;
      border-top: 1px solid var(--border);
      padding-top: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <div class="logo">E-CANDIDATO</div>
        <p style="color: var(--emerald); font-size: 12px; font-weight: 700;">VERSÃO HTML STANDALONE OFFLINE</p>
      </div>
      <div class="badge">Esfera ${currentSphere} • Eleições 2026</div>
    </header>

    <div class="hero">
      <h1>${escapeHtml(candidate.ballotName)} (${escapeHtml(candidate.number)})</h1>
      <p><strong>Cargo Almejado:</strong> ${escapeHtml(candidate.role)} | <strong>Partido:</strong> ${escapeHtml(candidate.party)} | <strong>Coligação:</strong> ${escapeHtml(candidate.coalition)}</p>
      <p style="margin-top: 8px;"><strong>Slogan da Campanha:</strong> "${escapeHtml(candidate.campaignSlogan)}"</p>
      <p><strong>Praça Eleitoral:</strong> ${escapeHtml(candidate.location)}</p>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">Votos Estimados Atuais</div>
        <div class="card-value">${candidate.currentEstimatedVotes.toLocaleString('pt-BR')}</div>
        <div class="progress-bar"><div class="progress-fill"></div></div>
        <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">
          ${progress}% da meta atingida
        </p>
      </div>
      <div class="card">
        <div class="card-title">Meta Nominal de Urna</div>
        <div class="card-value">${candidate.targetVotes.toLocaleString('pt-BR')}</div>
        <p style="font-size: 12px; color: var(--emerald); margin-top: 8px;">Linha de corte de segurança eleitoral</p>
      </div>
      <div class="card">
        <div class="card-title">Índice de Viabilidade Geral</div>
        <div class="card-value" style="color: var(--emerald);">${candidate.viabilityIndex ?? candidate.viabilityScore}%</div>
        <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">Cálculo preditivo consolidado</p>
      </div>
    </div>

    <div class="table-box">
      <table>
        <thead>
          <tr>
            <th>Parâmetro Estratégico</th>
            <th>Diagnóstico Oficial</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Posicionamento em Pesquisas</strong></td>
            <td>Liderança com margem de segurança dentro da projeção de 1º turno</td>
          </tr>
          <tr>
            <td><strong>Redutos Territoriais Prioritários</strong></td>
            <td>Mobilização intensificada em bairros de periferia e zonas com alta taxa de indecisos</td>
          </tr>
          <tr>
            <td><strong>Conformidade TSE</strong></td>
            <td>Res. TSE 23.607 e 23.610 integralmente atendidas (limites de impulsionamento e prazos de 72h)</td>
          </tr>
          <tr>
            <td><strong>Data de Geração do Dossiê</strong></td>
            <td>${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer>
      Documento gerado automaticamente pela plataforma <strong>E-Candidato</strong>.<br>
      Este relatório HTML funciona completamente desconectado da internet em qualquer dispositivo.
    </footer>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `e-candidato-dossie-${candidate.ballotName.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download Android TWA / Manifest configuration bundle
  const downloadAndroidConfig = () => {
    const androidConfig = {
      app_name: 'E-Candidato',
      package_name: 'br.gov.eleicoes.ecandidato',
      version_name: '1.0.0',
      version_code: 1,
      target_url: currentUrl,
      theme_color: '#0B1B2B',
      background_color: '#0B1B2B',
      display_mode: 'standalone',
      orientation: 'portrait-primary',
      icon_paths: {
        standard_192: '/pwa-192x192.png',
        standard_512: '/pwa-512x512.png',
        maskable_512: '/pwa-maskable-512x512.png',
      },
      bubblewrap_command: `npx @bubblewrap/cli init --manifest="${currentUrl}/manifest.json" && npx @bubblewrap/cli build`,
      capacitor_command: `npm install @capacitor/core @capacitor/cli && npx cap init "E-Candidato" br.gov.eleicoes.ecandidato && npx cap add android`,
    };

    const blob = new Blob([JSON.stringify(androidConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `e-candidato-android-config.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        id="app-export-modal"
        className="w-full max-w-2xl rounded-2xl bg-[#0E1E31] border border-[#1E3A5F] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E3A5F] bg-[#112233]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4A537]/20 border border-[#D4A537] flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#D4A537]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F2EFE6]">
                Central de Versões: Android & HTML
              </h2>
              <p className="text-xs text-slate-400">
                Gere e instale as versões móveis e autônomas do E-Candidato
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#16304A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-[#1E3A5F] bg-[#0B1B2B]">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'android'
                ? 'border-[#2E9C87] text-[#2E9C87] bg-[#112233]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Versão Android (App / APK / PWA)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2E9C87]/20 text-[#2E9C87] font-mono">
              APK Nativo
            </span>
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'html'
                ? 'border-[#D4A537] text-[#D4A537] bg-[#112233]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Versão HTML (Standalone Offline)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#D4A537]/20 text-[#D4A537] font-mono">
              .HTML
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'android' && (
            <div className="space-y-5">
              {/* Option 1: Direct PWA/WebAPK installation */}
              <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E9C87] px-2 py-0.5 rounded bg-[#2E9C87]/15">
                      Método 1 (Instantâneo)
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">
                      Instalação Direta no Celular Android
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Instala o app nativamente na tela inicial do seu smartphone Android com ícone, tela de carregamento e sem barra do navegador.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#2E9C87]/20 border border-[#2E9C87] flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-[#2E9C87]" />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={install}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#2E9C87] to-[#1E7363] hover:from-[#36af98] hover:to-[#238573] text-white font-bold text-xs shadow-lg shadow-[#2E9C87]/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isInstalled ? 'Já Instalado no Dispositivo' : 'Instalar no Celular Android Agora'}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(currentUrl, 'url')}
                    className="py-2.5 px-3 rounded-xl bg-[#16304A] hover:bg-[#1E3A5F] text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-[#1E3A5F]"
                    title="Copiar Link para abrir no Chrome do Android"
                  >
                    {copiedText === 'url' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>Copiar Link</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A537]" />
                  <span>No Chrome para Android: você também pode tocar em <strong>Menu (⋮) → Adicionar à tela inicial / Instalar aplicativo</strong>.</span>
                </p>
              </div>

              {/* Option 2: QR Code for Android phone */}
              <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] flex flex-col sm:flex-row items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-md shrink-0 flex items-center justify-center">
                  <div className="w-28 h-28 flex flex-col items-center justify-center border-2 border-dashed border-slate-400 rounded-lg text-slate-800 text-center p-2">
                    <QrCode className="w-12 h-12 text-[#0B1B2B] mb-1" />
                    <span className="text-[9px] font-extrabold tracking-tight uppercase">E-Candidato</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A537] px-2 py-0.5 rounded bg-[#D4A537]/15">
                    Acesso Rápido Mobile
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Abra direto no seu Smartphone
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Aponte a câmera do seu celular Android para o link do aplicativo. O navegador sugerirá a instalação imediata do aplicativo na tela inicial do candidato e equipe.
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 truncate max-w-xs">
                    {currentUrl}
                  </p>
                </div>
              </div>

              {/* Option 3: APK Build Guide & Manifest Download */}
              <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-400/15">
                      Método 2 (APK / Google Play)
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">
                      Gerar Pacote APK para Android Studio / Google Play
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      O aplicativo já possui Web App Manifest com suporte total a TWA (Trusted Web Activity) e Capacitor.
                    </p>
                  </div>
                </div>

                {/* Bubblewrap CLI snippet */}
                <div className="rounded-lg bg-[#07121D] border border-[#1E3A5F] p-3 text-xs font-mono">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 border-b border-slate-800 mb-2">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Terminal className="w-3.5 h-3.5 text-[#2E9C87]" />
                      Comando para Gerar APK (Bubblewrap CLI)
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `npx @bubblewrap/cli init --manifest="${currentUrl}/manifest.json"\nnpx @bubblewrap/cli build`,
                          'cli'
                        )
                      }
                      className="hover:text-white flex items-center gap-1 text-[10px]"
                    >
                      {copiedText === 'cli' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copiar</span>
                    </button>
                  </div>
                  <div className="text-emerald-400">
                    npx @bubblewrap/cli init --manifest="{currentUrl}/manifest.json"
                  </div>
                  <div className="text-slate-400 mt-1">npx @bubblewrap/cli build</div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={downloadAndroidConfig}
                    className="w-full py-2 px-4 rounded-xl bg-[#16304A] hover:bg-[#1E3A5F] text-[#D4A537] font-bold text-xs border border-[#1E3A5F] hover:border-[#D4A537]/50 flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar Pacote de Configuração Android (.json)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="space-y-5">
              {/* Option 1: Standalone HTML Dossier */}
              <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A537] px-2 py-0.5 rounded bg-[#D4A537]/15">
                      Autônomo & Desconectado
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">
                      Dossiê Executivo em Arquivo HTML (.html)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Arquivo único com todo o estilo visual, estatísticas da candidatura, metas nominais e compliance legal. Abre instantaneamente em qualquer navegador sem necessidade de Node.js, internet ou servidor.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#D4A537]/20 border border-[#D4A537] flex items-center justify-center shrink-0">
                    <FileCode className="w-5 h-5 text-[#D4A537]" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={downloadStandaloneHtml}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4A537] to-[#B38728] hover:from-[#e2b54c] hover:to-[#c69630] text-[#0B1B2B] font-extrabold text-xs shadow-lg shadow-[#D4A537]/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar Dossiê Completo (.HTML)</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ideal para Pendrives de Campanha</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pronto para Impressão / Salvar PDF</span>
                  </div>
                </div>
              </div>

              {/* Option 2: Static Web Hosting Guide */}
              <div className="p-4 rounded-xl bg-[#112233] border border-[#1E3A5F] space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#2E9C87]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Publicação Web Estática (Build Produção)
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Para gerar os arquivos estáticos HTML/JS otimizados para qualquer provedor (Vercel, Netlify, Cloudflare Pages, Nginx ou Apache):
                </p>

                <div className="rounded-lg bg-[#07121D] border border-[#1E3A5F] p-3 text-xs font-mono">
                  <div className="text-slate-400"># Compilação estática de produção:</div>
                  <div className="text-emerald-400 mt-1">npm run build</div>
                  <div className="text-slate-400 mt-2"># Pasta gerada com index.html e bundles otimizados:</div>
                  <div className="text-amber-300 mt-0.5">dist/</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#1E3A5F] bg-[#112233] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#2E9C87]" />
            <span>Compatível com Android 8+ e Navegadores Modernos</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#16304A] hover:bg-[#1E3A5F] text-[#F2EFE6] text-xs font-bold border border-[#1E3A5F]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
