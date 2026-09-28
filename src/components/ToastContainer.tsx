import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCraft } from '../context/CraftContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCraft();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'text-[#283618]';
        let borderColor = 'border-[#283618]/20';
        let bgStyle = 'bg-[#FCFAF6]';

        if (toast.type === 'warn') {
          Icon = AlertCircle;
          iconColor = 'text-[#C85A32]';
          borderColor = 'border-[#C85A32]/30';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-[#8B7355]';
          borderColor = 'border-[#8B7355]/20';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border ${borderColor} ${bgStyle} shadow-lg shadow-black/5 text-[#3D312A] text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3 duration-200`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
              <p className="font-medium truncate">{toast.message}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {toast.actionLabel && toast.onAction && (
                <button
                  onClick={() => {
                    toast.onAction?.();
                    removeToast(toast.id);
                  }}
                  className="font-semibold text-xs text-[#C85A32] hover:underline cursor-pointer"
                >
                  {toast.actionLabel}
                </button>
              )}
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-md text-[#8B7355] hover:text-[#3D312A] hover:bg-[#F3ECE2] transition cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
