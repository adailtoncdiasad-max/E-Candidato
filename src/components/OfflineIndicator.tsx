import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      aria-label="Notificação de status offline"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600/90 text-white px-3.5 py-2 text-xs font-semibold shadow-xl backdrop-blur-xs border border-amber-400/40 animate-pulse"
    >
      <WifiOff className="w-4 h-4 text-amber-200" />
      <span>Modo Offline — O aplicativo está funcionando com cache local PWA.</span>
    </aside>
  );
};
