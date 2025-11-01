import { motion } from "motion/react";
import { Search } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

interface BorderlessInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: React.ReactNode;
  containerClassName?: string;
}

export function BorderlessInput({
  icon = <Search className="w-[18px] h-[18px]" />,
  placeholder = "搜索",
  containerClassName = "",
  className = "",
  ...props
}: BorderlessInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className={`
        relative w-80 h-12 rounded-lg
        backdrop-blur-[10px]
        flex items-center gap-3 px-4
        ${containerClassName}
      `}
      style={{
        background: 'rgba(255,255,255,0.7)',
        boxShadow: isFocused
          ? '0 0 0 2px rgba(6,182,212,0.2), 0 0 30px rgba(6,182,212,0.15)'
          : '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)'
      }}
      animate={{
        boxShadow: isFocused
          ? '0 0 0 2px rgba(6,182,212,0.2), 0 0 30px rgba(6,182,212,0.15)'
          : '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)'
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      <motion.div
        animate={{
          color: isFocused ? 'rgb(6,182,212)' : 'rgb(148,163,184)'
        }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      
      <input
        type="text"
        placeholder={placeholder}
        className={`
          flex-1 bg-transparent outline-none
          text-slate-900 placeholder:text-slate-400
          text-sm
          ${className}
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </motion.div>
  );
}
