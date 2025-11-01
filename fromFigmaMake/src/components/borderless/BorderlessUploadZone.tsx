import { motion } from "motion/react";
import { Upload, File } from "lucide-react";
import { useState } from "react";

interface BorderlessUploadZoneProps {
  onDrop?: (files: FileList) => void;
  className?: string;
}

export function BorderlessUploadZone({
  onDrop,
  className = ""
}: BorderlessUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (onDrop && e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer.files);
    }
  };

  return (
    <motion.div
      className={`
        w-full h-48 rounded-2xl
        backdrop-blur-[10px]
        flex flex-col items-center justify-center gap-3
        cursor-pointer
        ${className}
      `}
      style={{
        background: isDragging
          ? 'radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.08) 70%, rgba(6,182,212,0.03) 90%, rgba(6,182,212,0) 100%)'
          : 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0) 100%)',
        boxShadow: isDragging
          ? '0 0 0 2px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.2), 0 8px 32px rgba(0,0,0,0.08)'
          : '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={{
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08), 0 0 25px rgba(6,182,212,0.15)'
      }}
      animate={{
        background: isDragging
          ? 'radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.08) 70%, rgba(6,182,212,0.03) 90%, rgba(6,182,212,0) 100%)'
          : 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0) 100%)'
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      <motion.div
        animate={{
          scale: isDragging ? 1.1 : 1,
          color: isDragging ? 'rgb(6,182,212)' : 'rgb(148,163,184)'
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20
        }}
      >
        {isDragging ? (
          <File className="w-12 h-12" />
        ) : (
          <Upload className="w-12 h-12" />
        )}
      </motion.div>

      <div className="text-center">
        <p className={`text-sm font-medium ${isDragging ? 'text-cyan-600' : 'text-slate-700'}`}>
          {isDragging ? '松开上传' : '拖放文件'}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          或点击选择
        </p>
      </div>

      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          if (onDrop && e.target.files) {
            onDrop(e.target.files);
          }
        }}
      />
    </motion.div>
  );
}
