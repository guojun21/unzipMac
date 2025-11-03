import { motion } from "motion/react";
import { Droplet } from "lucide-react";
import { useState } from "react";
import ComponentShowcase from "./pages/ComponentShowcase";
import BorderlessComparison from "./pages/BorderlessComparison";
import DynamicBorderlessDemoV5 from "./pages/DynamicBorderlessDemoV5";
import DynamicBorderlessV6 from "./pages/04-DynamicBorderlessV6-Perfect";
import DynamicBorderlessV7 from "./pages/05-DynamicBorderlessV7-Ultimate";
import DynamicBorderlessV7Fix from "./pages/07-DynamicBorderlessV7-SliderFix";
import DynamicBorderlessV8 from "./pages/08-DynamicBorderlessV8-BlurredGlow";
import DynamicBorderlessV9 from "./pages/09-DynamicBorderlessV9-GlowFix";
import DynamicBorderlessV1 from "./pages/10-DynamicBorderlessV1.0";
import DynamicBorderlessV1_1 from "./pages/11-DynamicBorderlessV1.1";
import DynamicBorderlessV1_2 from "./pages/12-DynamicBorderlessV1.2";
import DynamicBorderlessV1_3 from "./pages/13-DynamicBorderlessV1.3";
import ComponentLibraryV1_4 from "./pages/14-ComponentLibraryV1.4";
import ComponentLibraryV1_5 from "./pages/15-ComponentLibraryV1.5";
import ComponentLibraryV1_6 from "./pages/16-ComponentLibraryV1.6";
import ComponentLibraryV1_7 from "./pages/17-ComponentLibraryV1.7";
import GlowingEdgeCardV1_8 from "./pages/18-GlowingEdgeCardV1.8";
import CodePenGlowingEdgeV1_9 from "./pages/19-CodePenGlowingEdgeV1.9";
import BorderlessCardV2_0 from "./pages/20-BorderlessCardV2.0";
import GlowingButtonsV2_1 from "./pages/21-GlowingButtonsV2.1";

type PageType = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType | null>(null);

  // Page routing
  if (currentPage === '01') {
    return <BorderlessComparison onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '02') {
    return <ComponentShowcase onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '03') {
    return <DynamicBorderlessDemoV5 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '04') {
    return <DynamicBorderlessV6 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '05') {
    return <DynamicBorderlessV7 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '06') {
    return <ComponentShowcase onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '07') {
    return <DynamicBorderlessV7Fix onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '08') {
    return <DynamicBorderlessV8 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '09') {
    return <DynamicBorderlessV9 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '10') {
    return <DynamicBorderlessV1 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '11') {
    return <DynamicBorderlessV1_1 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '12') {
    return <DynamicBorderlessV1_2 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '13') {
    return <DynamicBorderlessV1_3 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '14') {
    return <ComponentLibraryV1_4 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '15') {
    return <ComponentLibraryV1_5 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '16') {
    return <ComponentLibraryV1_6 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '17') {
    return <ComponentLibraryV1_7 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '18') {
    return <GlowingEdgeCardV1_8 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '19') {
    return <CodePenGlowingEdgeV1_9 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '20') {
    return <BorderlessCardV2_0 onBack={() => setCurrentPage(null)} />;
  }
  if (currentPage === '21') {
    return <GlowingButtonsV2_1 onBack={() => setCurrentPage(null)} />;
  }

  // Home page with navigation
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="w-10 h-10 text-cyan-500" />
            <h1 className="text-5xl">Fluid Technology</h1>
          </div>
          <p className="text-xl text-slate-600">流体科技设计系统探索</p>
          <p className="text-slate-500 mt-2 max-w-2xl">
            A borderless design philosophy blending liquid fluidity with digital technology.
            Ongoing exploration - all versions are equal steps in the process.
          </p>
        </motion.div>

        {/* Navigation Grid - All versions equal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        >
          <h2 className="text-2xl mb-6 text-slate-700">探索记录 · Exploration Archive</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <NavButton 
              color="purple" 
              onClick={() => setCurrentPage('01')}
            >
              01 · 羽化研究
            </NavButton>

            <NavButton 
              color="pink" 
              onClick={() => setCurrentPage('02')}
            >
              02 · 基础组件
            </NavButton>

            <NavButton 
              color="cyan" 
              onClick={() => setCurrentPage('03')}
            >
              03 · v0.5 透明度变化
            </NavButton>

            <NavButton 
              color="emerald" 
              onClick={() => setCurrentPage('04')}
            >
              04 · v0.6 透明度固定
            </NavButton>

            <NavButton 
              color="orange" 
              onClick={() => setCurrentPage('05')}
            >
              05 · v0.7 凝结靠模糊
            </NavButton>

            <NavButton 
              color="blue" 
              onClick={() => setCurrentPage('06')}
            >
              06 · 组件库
            </NavButton>

            <NavButton 
              color="green" 
              onClick={() => setCurrentPage('07')}
            >
              07 · v0.7 滑块修复
            </NavButton>

            <NavButton 
              color="indigo" 
              onClick={() => setCurrentPage('08')}
            >
              08 · v0.8 光晕模糊
            </NavButton>

            <NavButton 
              color="rose" 
              onClick={() => setCurrentPage('09')}
            >
              09 · v0.9 光晕显示修复
            </NavButton>

            <NavButton 
              color="amber" 
              onClick={() => setCurrentPage('10')}
            >
              10 · v1.0 光晕紧贴边缘 🎉
            </NavButton>

            <NavButton 
              color="teal" 
              onClick={() => setCurrentPage('11')}
            >
              11 · v1.1 边缘线条模糊
            </NavButton>

            <NavButton 
              color="violet" 
              onClick={() => setCurrentPage('12')}
            >
              12 · v1.2 尺寸修正
            </NavButton>

            <NavButton 
              color="fuchsia" 
              onClick={() => setCurrentPage('13')}
            >
              13 · v1.3 静态容器
            </NavButton>

            <NavButton 
              color="sky" 
              onClick={() => setCurrentPage('14')}
            >
              14 · v1.4 组件库
            </NavButton>

            <NavButton 
              color="lime" 
              onClick={() => setCurrentPage('15')}
            >
              15 · v1.5 组件修正
            </NavButton>

            <NavButton 
              color="emerald" 
              onClick={() => setCurrentPage('16')}
            >
              16 · v1.6 按钮简化
            </NavButton>

            <NavButton 
              color="rose" 
              onClick={() => setCurrentPage('17')}
            >
              17 · v1.7 按钮双层
            </NavButton>

            <NavButton 
              color="pink" 
              onClick={() => setCurrentPage('18')}
            >
              18 · v1.8 发光边缘
            </NavButton>

            <NavButton 
              color="orange" 
              onClick={() => setCurrentPage('19')}
            >
              19 · v1.9 CodePen复刻
            </NavButton>

            <NavButton 
              color="violet" 
              onClick={() => setCurrentPage('20')}
            >
              20 · v2.0 融合发光
            </NavButton>

            <NavButton 
              color="fuchsia" 
              onClick={() => setCurrentPage('21')}
            >
              21 · v2.1 发光按钮
            </NavButton>
          </div>
        </motion.div>

        {/* Exploration Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="mt-16 p-8 rounded-2xl bg-white/50 backdrop-blur-sm"
          style={{
            boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)'
          }}
        >
          <h3 className="text-xl mb-4 text-slate-700">设计探索原则</h3>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">✓</span>
              <span>所有版本都是探索���程的一步，平级展示</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">✓</span>
              <span>新版本不一定比老版本好，只是不同的尝试</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">✓</span>
              <span>保留所有历史记录，持续迭代</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500">✓</span>
              <span>每个版本都有生成Prompt记录</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

// NavButton Component - Uniform styling
function NavButton({ 
  color, 
  onClick, 
  children 
}: { 
  color: 'purple' | 'pink' | 'cyan' | 'emerald' | 'orange' | 'blue' | 'green' | 'indigo' | 'rose' | 'amber' | 'teal' | 'violet' | 'fuchsia' | 'sky' | 'lime';
  onClick: () => void;
  children: React.ReactNode;
}) {
  const colorMap = {
    purple: { 
      from: 'from-purple-400', 
      to: 'to-purple-500', 
      glow: 'rgba(167,139,250,0.3)',
      glowLight: 'rgba(167,139,250,0.15)'
    },
    pink: { 
      from: 'from-pink-400', 
      to: 'to-pink-500', 
      glow: 'rgba(244,114,182,0.3)',
      glowLight: 'rgba(244,114,182,0.15)'
    },
    cyan: { 
      from: 'from-cyan-400', 
      to: 'to-cyan-500', 
      glow: 'rgba(6,182,212,0.3)',
      glowLight: 'rgba(6,182,212,0.15)'
    },
    emerald: { 
      from: 'from-emerald-400', 
      to: 'to-emerald-500', 
      glow: 'rgba(52,211,153,0.3)',
      glowLight: 'rgba(52,211,153,0.15)'
    },
    orange: { 
      from: 'from-orange-400', 
      to: 'to-orange-500', 
      glow: 'rgba(251,146,60,0.3)',
      glowLight: 'rgba(251,146,60,0.15)'
    },
    blue: { 
      from: 'from-blue-500', 
      to: 'to-blue-600', 
      glow: 'rgba(59,130,246,0.3)',
      glowLight: 'rgba(59,130,246,0.15)'
    },
    green: { 
      from: 'from-green-400', 
      to: 'to-green-500', 
      glow: 'rgba(34,197,94,0.3)',
      glowLight: 'rgba(34,197,94,0.15)'
    },
    indigo: { 
      from: 'from-indigo-400', 
      to: 'to-indigo-500', 
      glow: 'rgba(99,102,241,0.3)',
      glowLight: 'rgba(99,102,241,0.15)'
    },
    rose: { 
      from: 'from-rose-400', 
      to: 'to-rose-500', 
      glow: 'rgba(251,113,133,0.3)',
      glowLight: 'rgba(251,113,133,0.15)'
    },
    amber: { 
      from: 'from-amber-400', 
      to: 'to-amber-500', 
      glow: 'rgba(251,191,36,0.3)',
      glowLight: 'rgba(251,191,36,0.15)'
    },
    teal: { 
      from: 'from-teal-400', 
      to: 'to-teal-500', 
      glow: 'rgba(20,184,166,0.3)',
      glowLight: 'rgba(20,184,166,0.15)'
    },
    violet: { 
      from: 'from-violet-400', 
      to: 'to-violet-500', 
      glow: 'rgba(139,92,246,0.3)',
      glowLight: 'rgba(139,92,246,0.15)'
    },
    fuchsia: { 
      from: 'from-fuchsia-400', 
      to: 'to-fuchsia-500', 
      glow: 'rgba(232,121,249,0.3)',
      glowLight: 'rgba(232,121,249,0.15)'
    },
    sky: { 
      from: 'from-sky-400', 
      to: 'to-sky-500', 
      glow: 'rgba(56,189,248,0.3)',
      glowLight: 'rgba(56,189,248,0.15)'
    },
    lime: { 
      from: 'from-lime-400', 
      to: 'to-lime-500', 
      glow: 'rgba(163,230,53,0.3)',
      glowLight: 'rgba(163,230,53,0.15)'
    },
  };
  
  const config = colorMap[color];
  
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl bg-gradient-to-r ${config.from} ${config.to} text-white font-medium text-base`}
      style={{
        boxShadow: `0 0 20px ${config.glow}, 0 0 40px ${config.glowLight}`
      }}
      whileHover={{
        boxShadow: `0 0 30px ${config.glow.replace('0.3', '0.4')}, 0 0 60px ${config.glow.replace('0.3', '0.2')}`,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}
