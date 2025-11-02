import { motion } from "motion/react";
import { BorderlessPrimaryButton } from "../components/borderless/BorderlessPrimaryButton";
import { BorderlessCard } from "../components/borderless/BorderlessCard";
import { IconButton } from "../components/borderless/IconButton";
import { BorderlessInput } from "../components/borderless/BorderlessInput";
import { ToastNotification } from "../components/borderless/ToastNotification";
import { BorderlessUploadZone } from "../components/borderless/BorderlessUploadZone";
import { 
  Upload, 
  Download, 
  Trash2, 
  Share2, 
  Settings, 
  Star, 
  Heart,
  Search,
  Filter,
  FileArchive,
  Image as ImageIcon,
  Video,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";

interface ComponentShowcaseProps {
  onBack?: () => void;
}

export default function ComponentShowcase({ onBack }: ComponentShowcaseProps) {
  const [showToasts, setShowToasts] = useState({
    success: true,
    error: true,
    info: true,
    warning: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl mb-2">02 · Basic Components v0.2</h1>
              <p className="text-xl text-slate-600">基础组件 · Fluid Technology Design System</p>
            </div>
            <motion.button
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 text-white flex items-center gap-2"
              style={{
                boxShadow: '0 0 20px rgba(100,116,139,0.3), 0 0 40px rgba(100,116,139,0.15)'
              }}
              whileHover={{
                boxShadow: '0 0 30px rgba(100,116,139,0.4), 0 0 60px rgba(100,116,139,0.2)',
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Primary Buttons */}
        <Section title="Primary Buttons" subtitle="主要按钮">
          <div className="flex flex-wrap gap-6">
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Default</p>
              <BorderlessPrimaryButton />
            </div>
            
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Custom Text</p>
              <BorderlessPrimaryButton icon={<Download className="w-[18px] h-[18px]" />}>
                下载
              </BorderlessPrimaryButton>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Delete</p>
              <BorderlessPrimaryButton icon={<Trash2 className="w-[18px] h-[18px]" />}>
                删除
              </BorderlessPrimaryButton>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Share</p>
              <BorderlessPrimaryButton icon={<Share2 className="w-[18px] h-[18px]" />}>
                分享
              </BorderlessPrimaryButton>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Loading</p>
              <BorderlessPrimaryButton loading>
                上传
              </BorderlessPrimaryButton>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Disabled</p>
              <BorderlessPrimaryButton disabled>
                上传
              </BorderlessPrimaryButton>
            </div>
          </div>
        </Section>

        {/* Icon Buttons */}
        <Section title="Icon Buttons" subtitle="图标按钮">
          <div className="flex flex-wrap gap-8 items-end">
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Small (32px)</p>
              <div className="flex gap-2">
                <IconButton size="sm" icon={<Heart className="w-4 h-4" />} aria-label="喜欢" />
                <IconButton size="sm" icon={<Star className="w-4 h-4" />} aria-label="收藏" />
                <IconButton size="sm" icon={<Settings className="w-4 h-4" />} aria-label="设置" />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Medium (44px)</p>
              <div className="flex gap-2">
                <IconButton size="md" icon={<Download className="w-5 h-5" />} aria-label="下载" />
                <IconButton size="md" icon={<Share2 className="w-5 h-5" />} aria-label="分享" />
                <IconButton size="md" icon={<Trash2 className="w-5 h-5" />} aria-label="删除" />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Large (56px)</p>
              <div className="flex gap-2">
                <IconButton size="lg" icon={<Upload className="w-6 h-6" />} aria-label="上传" />
                <IconButton size="lg" icon={<Download className="w-6 h-6" />} aria-label="下载" />
                <IconButton size="lg" icon={<Settings className="w-6 h-6" />} aria-label="设置" />
              </div>
            </div>
          </div>
        </Section>

        {/* Borderless Cards */}
        <Section title="Borderless Cards" subtitle="无界卡片 · 水滴效果">
          <div className="grid md:grid-cols-3 gap-6">
            <BorderlessCard
              title="项目.zip"
              meta="245 个文件"
              icon={<FileArchive className="w-6 h-6 text-white" />}
              onDownload={() => console.log('下载')}
              onShare={() => console.log('分享')}
              onDelete={() => console.log('删除')}
            />

            <BorderlessCard
              title="照片.zip"
              meta="128 个文件"
              icon={<ImageIcon className="w-6 h-6 text-white" />}
              onDownload={() => console.log('下载')}
              onShare={() => console.log('分享')}
              onDelete={() => console.log('删除')}
            />

            <BorderlessCard
              title="视频.zip"
              meta="56 个文件"
              icon={<Video className="w-6 h-6 text-white" />}
              onDownload={() => console.log('下载')}
              onShare={() => console.log('分享')}
              onDelete={() => console.log('删除')}
            />
          </div>
          <p className="text-sm text-slate-500 mt-6">
            ✨ Hover over cards to see the cyan glow effect and radial gradient edges
          </p>
        </Section>

        {/* Inputs */}
        <Section title="Borderless Inputs" subtitle="无界输入框">
          <div className="flex flex-wrap gap-6">
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Search</p>
              <BorderlessInput placeholder="搜索" />
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Filter</p>
              <BorderlessInput
                icon={<Filter className="w-[18px] h-[18px]" />}
                placeholder="筛选"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Custom</p>
              <BorderlessInput
                icon={<Star className="w-[18px] h-[18px]" />}
                placeholder="输入"
              />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            ✨ Focus on inputs to see the cyan glow ring
          </p>
        </Section>

        {/* Upload Zone */}
        <Section title="Upload Zone" subtitle="上传区域">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Default State</p>
              <BorderlessUploadZone
                onDrop={(files) => console.log('Files:', files)}
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Try Dragging a File Over</p>
              <BorderlessUploadZone
                onDrop={(files) => console.log('Files:', files)}
              />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            ✨ Drag files over the zone to see the cyan radial gradient appear
          </p>
        </Section>

        {/* Toast Notifications */}
        <Section title="Toast Notifications" subtitle="通知提示">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Success</p>
              <ToastNotification
                type="success"
                isVisible={showToasts.success}
                onClose={() => setShowToasts(prev => ({ ...prev, success: false }))}
              />
              {!showToasts.success && (
                <button
                  className="text-xs text-cyan-600 underline"
                  onClick={() => setShowToasts(prev => ({ ...prev, success: true }))}
                >
                  Show again
                </button>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Error</p>
              <ToastNotification
                type="error"
                isVisible={showToasts.error}
                onClose={() => setShowToasts(prev => ({ ...prev, error: false }))}
              />
              {!showToasts.error && (
                <button
                  className="text-xs text-cyan-600 underline"
                  onClick={() => setShowToasts(prev => ({ ...prev, error: true }))}
                >
                  Show again
                </button>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Info</p>
              <ToastNotification
                type="info"
                isVisible={showToasts.info}
                onClose={() => setShowToasts(prev => ({ ...prev, info: false }))}
              />
              {!showToasts.info && (
                <button
                  className="text-xs text-cyan-600 underline"
                  onClick={() => setShowToasts(prev => ({ ...prev, info: true }))}
                >
                  Show again
                </button>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500">Warning</p>
              <ToastNotification
                type="warning"
                isVisible={showToasts.warning}
                onClose={() => setShowToasts(prev => ({ ...prev, warning: false }))}
              />
              {!showToasts.warning && (
                <button
                  className="text-xs text-cyan-600 underline"
                  onClick={() => setShowToasts(prev => ({ ...prev, warning: true }))}
                >
                  Show again
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            ✨ Each toast has a colored glow matching its type
          </p>
        </Section>

        {/* Design Notes */}
        <Section title="Design Philosophy" subtitle="设计哲学">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div
              className="p-6 rounded-2xl backdrop-blur-[10px]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0) 100%)',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
              }}
            >
              <h3 className="text-lg mb-3 text-cyan-600">✓ Do This</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Use radial gradients (solid center → transparent edges)</li>
                <li>• Use glow shadows (cyan colored, layered blurs)</li>
                <li>• Keep text minimal (≤4 Chinese characters)</li>
                <li>• Use spring physics for animations</li>
                <li>• Blur backgrounds (10-30px)</li>
              </ul>
            </div>

            <div
              className="p-6 rounded-2xl backdrop-blur-[10px]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0) 100%)',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
              }}
            >
              <h3 className="text-lg mb-3 text-red-500">✗ Avoid This</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• NO solid borders (border: 1px solid)</li>
                <li>• NO hard edges on cards</li>
                <li>• NO long text labels</li>
                <li>• NO linear/ease animations</li>
                <li>• NO flat backgrounds</li>
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl mb-1">{title}</h2>
        <p className="text-slate-500">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}
