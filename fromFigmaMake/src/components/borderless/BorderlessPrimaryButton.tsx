import { motion } from "motion/react";
import { Upload, Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface BorderlessPrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function BorderlessPrimaryButton({
  loading = false,
  icon = <Upload className="w-[18px] h-[18px]" />,
  children = "上传",
  disabled,
  className = "",
  ...props
}: BorderlessPrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      className={`
        relative h-12 px-6 rounded-xl
        bg-gradient-to-br from-cyan-500 to-blue-500
        text-white font-medium text-sm
        flex items-center justify-center gap-2
        overflow-hidden
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        boxShadow: isDisabled
          ? 'none'
          : '0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.15)'
      }}
      disabled={isDisabled}
      whileHover={
        !isDisabled
          ? {
              y: -2,
              boxShadow: '0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2)'
            }
          : {}
      }
      whileTap={
        !isDisabled
          ? {
              scale: 0.98,
              boxShadow: '0 0 10px rgba(6,182,212,0.3), 0 0 20px rgba(6,182,212,0.15)'
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      animate={{
        opacity: isDisabled ? 0.5 : 1
      }}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-[18px] h-[18px] animate-spin" />
      ) : (
        icon
      )}
      <span>{children}</span>
    </motion.button>
  );
}
