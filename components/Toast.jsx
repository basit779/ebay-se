"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertCircle, Info, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

const icons = {
  success: Check,
  error: AlertCircle,
  info: Info
};

const colors = {
  success: "border-neon-emerald/30 bg-neon-emerald/10 text-neon-emerald",
  error: "border-neon-rose/30 bg-neon-rose/10 text-neon-rose",
  info: "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan"
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Check;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-panel/95 px-5 py-3.5 shadow-2xl backdrop-blur-2xl"
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${colors[toast.type]}`}>
                <Icon size={14} />
              </div>
              <p className="text-sm font-medium text-white/80">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-white/20 transition hover:text-white/50"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
