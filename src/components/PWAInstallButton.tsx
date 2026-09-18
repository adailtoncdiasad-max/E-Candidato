import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Smartphone, Download, Check, Sparkles } from 'lucide-react';

interface PWAInstallButtonProps {
  onOpenExportModal?: () => void;
  variant?: 'compact' | 'full';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenExportModal,
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed and variant is compact, still allow opening Android/HTML center if requested
  if (isInstalled && !onOpenExportModal) {
    return null;
  }

  // If user clicked or can install
  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else if (onOpenExportModal) {
      onOpenExportModal();
    }
  };

  if (variant === 'full') {
    return (
      <>
        <button
          onClick={handleClick}
          id="btn-install-android-full"
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#16304A] to-[#1E3A5F] hover:from-[#1C3B5E] hover:to-[#254B78] border border-[#2E9C87]/40 hover:border-[#2E9C87] text-left transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2E9C87]/20 border border-[#2E9C87] flex items-center justify-center text-[#2E9C87]">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Versão Android & HTML</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#2E9C87]/20 text-[#2E9C87] font-mono font-bold">
                  PWA / APK
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Instalar no celular ou exportar</p>
            </div>
          </div>
          <Download className="w-4 h-4 text-slate-400 group-hover:text-[#2E9C87] transition-colors" />
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-xl bg-[#112233] border border-[#1E3A5F] p-6 shadow-2xl">
              <h3 className="text-base font-bold text-white">Instalar no iPhone / iPad</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                1. Toque no botão <strong>Compartilhar</strong> na barra do Safari.<br />
                2. Role para baixo e selecione <strong>Adicionar à Tela de Início</strong>.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] py-2 text-xs font-bold text-white border border-[#1E3A5F]"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        id="btn-install-android-compact"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2E9C87]/20 hover:bg-[#2E9C87]/30 text-[#2E9C87] hover:text-emerald-300 border border-[#2E9C87]/40 text-xs font-bold transition-all shadow-sm shadow-[#2E9C87]/10"
        title="Instalar no Celular Android ou Baixar Versão HTML"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Android & HTML</span>
        <span className="sm:hidden">App</span>
      </button>

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl bg-[#112233] border border-[#1E3A5F] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">Instalar no iPhone / iPad</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              1. Toque no botão <strong>Compartilhar</strong> na barra do Safari.<br />
              2. Role para baixo e selecione <strong>Adicionar à Tela de Início</strong>.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full rounded-lg bg-[#16304A] hover:bg-[#1E3A5F] py-2 text-xs font-bold text-white border border-[#1E3A5F]"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
};
