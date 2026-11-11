import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const Toast = () => {
  const { toast, closeToast } = useBooking();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-secondary shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-[#162024]/95',
    error: 'border-rose-500/30 bg-[#241618]/95',
    info: 'border-secondary/30 bg-[#161D26]/95'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      <AnimatePresence>
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`pointer-events-auto p-4 rounded-xl border shadow-card-elevated backdrop-blur-md flex items-start gap-3 ${borders[toast.type] || borders.info}`}
        >
          {icons[toast.type] || icons.info}
          <div className="flex-1 pr-2">
            <p className="text-sm font-medium text-space-text leading-snug">
              {toast.message}
            </p>
          </div>
          <button
            onClick={closeToast}
            className="text-space-dim hover:text-space-text transition-colors p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Toast;
