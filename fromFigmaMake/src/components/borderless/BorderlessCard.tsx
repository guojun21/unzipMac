import { motion } from "motion/react";
import { Download, Share2, Trash2, FileArchive } from "lucide-react";
import { IconButton } from "./IconButton";

interface BorderlessCardProps {
  title?: string;
  meta?: string;
  icon?: React.ReactNode;
  onDownload?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function BorderlessCard({
  title = "项目.zip",
  meta = "245 个文件",
  icon,
  onDownload,
  onShare,
  onDelete,
  className = ""
}: BorderlessCardProps) {
  return (
    <motion.div
      className={`
        w-80 rounded-2xl p-6
        backdrop-blur-[10px]
        ${className}
      `}
      style={{
        background: `radial-gradient(ellipse at center, 
          rgba(255,255,255,0.9) 0%, 
          rgba(255,255,255,0.7) 70%, 
          rgba(255,255,255,0.3) 90%, 
          rgba(255,255,255,0) 100%)`,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08), 0 0 30px rgba(6,182,212,0.25), 0 0 60px rgba(6,182,212,0.12)'
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      {/* Icon with purple glow */}
      <div className="mb-4">
        <div
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center"
          style={{
            boxShadow: '0 0 20px rgba(167,139,250,0.3), 0 4px 16px rgba(167,139,250,0.2)'
          }}
        >
          {icon || <FileArchive className="w-6 h-6 text-white" />}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl text-slate-900 mb-1">
        {title}
      </h3>

      {/* Meta */}
      <p className="text-sm text-slate-600 mb-4">
        {meta}
      </p>

      {/* Gradient Divider */}
      <div
        className="h-px mb-4"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.5) 50%, transparent 100%)'
        }}
      />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <IconButton
          size="md"
          icon={<Download className="w-5 h-5" />}
          aria-label="下载"
          onClick={onDownload}
        />
        <IconButton
          size="md"
          icon={<Share2 className="w-5 h-5" />}
          aria-label="分享"
          onClick={onShare}
        />
        <IconButton
          size="md"
          icon={<Trash2 className="w-5 h-5" />}
          aria-label="删除"
          onClick={onDelete}
        />
      </div>
    </motion.div>
  );
}
