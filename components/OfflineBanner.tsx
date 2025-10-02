'use client';

import { WifiOff } from 'lucide-react';

interface OfflineBannerProps {
  isOffline?: boolean;
}

const OfflineBanner = ({ isOffline = false }: OfflineBannerProps) => {
  if (!isOffline) return null;

  return (
    <div className="bg-yellow-100 border-b border-yellow-300 px-4 py-2 flex items-center gap-2">
      <WifiOff size={16} className="text-yellow-700" />
      <span className="text-sm text-yellow-700 font-medium">
        You are offline. Changes will sync when connected.
      </span>
    </div>
  );
};

export default OfflineBanner;
