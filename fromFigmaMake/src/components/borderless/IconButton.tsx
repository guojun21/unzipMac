import { motion } from "motion/react";
import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  icon: React.ReactNode;
  'aria-label': string;
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-11 h-11',
  lg: 'w-14 h-14'
};

export function IconButton({
  size = 'md',
  icon,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <motion.button
      className={`
        ${sizeMap[size]}
        rounded-full
        backdrop-blur-[8px]
        flex items-center justify-center
        text-slate-600
        ${className}
      `}
      style={{
        background: 'rgba(255,255,255,0.5)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)'
      }}
      whileHover={{
        background: 'rgba(6,182,212,0.1)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06), 0 0 15px rgba(6,182,212,0.25)',
        color: 'rgb(6,182,212)'
      }}
      whileTap={{
        scale: 0.95
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      {...props}
    >
      {icon}
    </motion.button>
  );
}
