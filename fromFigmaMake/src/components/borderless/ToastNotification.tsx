import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastNotificationProps {
  type: ToastType;
  message?: string;
  isVisible?: boolean;
  onClose?: () => void;
}

const toastConfig = {
  success: {
    background: 'rgba(16,185,129,0.95)',
    glow: '0 0 30px rgba(16,185,129,0.5)',
    icon: CheckCircle,
    defaultMessage: '上传完成'
  },
  error: {
    background: 'rgba(239,68,68,0.95)',
    glow: '0 0 30px rgba(239,68,68,0.5)',
    icon: XCircle,
    defaultMessage: '文件损坏'
  },
  info: {
    background: 'rgba(6,182,212,0.95)',
    glow: '0 0 30px rgba(6,182,212,0.5)',
    icon: Info,
    defaultMessage: '处理中'
  },
  warning: {
    background: 'rgba(251,146,60,0.95)',
    glow: '0 0 30px rgba(251,146,60,0.5)',
    icon: AlertTriangle,
    defaultMessage: '文件过大'
  }
};

export function ToastNotification({
  type,
  message,
  isVisible = true,
  onClose
}: ToastNotificationProps) {
  const config = toastConfig[type];
  const Icon = config.icon;
  const displayMessage = message || config.defaultMessage;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="
            min-w-[280px] h-14 rounded-xl
            backdrop-blur-[12px]
            flex items-center gap-3 px-4
            text-white
          "
          style={{
            background: config.background,
            boxShadow: config.glow
          }}
          initial={{
            opacity: 0,
            y: -20,
            filter: 'blur(10px)'
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)'
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            filter: 'blur(5px)'
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1 text-sm font-medium">{displayMessage}</span>
          {onClose && (
            <motion.button
              className="w-4 h-4 flex items-center justify-center hover:opacity-70"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing toast state
export function useToast() {
  const [toasts, setToasts] = React.useState<Array<{
    id: string;
    type: ToastType;
    message?: string;
  }>>([]);

  const showToast = (type: ToastType, message?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, showToast, removeToast };
}

import * as React from "react";
