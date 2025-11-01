# 极致酷炫跨平台解压缩软件产品规格书

## 项目定位
打造一款**视觉震撼、交互流畅、极具未来感**的跨平台解压缩应用，使用最前沿的Web技术栈，提供远超传统解压软件的用户体验。

---

## 技术栈选型

### 核心技术栈
```
┌─────────────────────────────────────────┐
│   UI Layer (极致酷炫界面)                │
│   - React 18+ (Hooks + Suspense)       │
│   - GSAP 3.x (动画引擎)                 │
│   - Framer Motion (React动画库)         │
│   - Tailwind CSS (样式系统)             │
│   - Radix UI / Headless UI (无头组件)  │
├─────────────────────────────────────────┤
│   Electron Main Process                │
│   - IPC通信                              │
│   - 文件系统操作                         │
│   - 系统集成                             │
├─────────────────────────────────────────┤
│   Native Module (Node.js Addon)        │
│   - Rust核心编译为.node                 │
│   - N-API绑定                           │
├─────────────────────────────────────────┤
│   Rust Core Engine                     │
│   - 高性能解压算法                       │
│   - 多线程并发                           │
└─────────────────────────────────────────┘
```

### 完整依赖清单
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    
    "gsap": "^3.12.0",
    "framer-motion": "^10.16.0",
    "@react-spring/web": "^9.7.0",
    
    "tailwindcss": "^3.3.0",
    "@radix-ui/react-*": "^1.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    
    "zustand": "^4.4.0",
    "immer": "^10.0.0",
    
    "lucide-react": "^0.292.0",
    "react-hot-toast": "^2.4.1",
    "react-dropzone": "^14.2.3",
    
    "electron-store": "^8.1.0"
  },
  "devDependencies": {
    "electron": "^27.0.0",
    "electron-builder": "^24.6.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    
    "napi-rs/cli": "^2.16.0",
    
    "typescript": "^5.2.0",
    "@types/react": "^18.2.0"
  }
}
```

---

## 项目架构

### 目录结构
```
unarchiver-app/
├── package.json
├── electron.vite.config.ts
├── electron-builder.yml
│
├── src/
│   ├── main/                          # Electron主进程
│   │   ├── index.ts                   # 入口文件
│   │   ├── ipc/                       # IPC处理器
│   │   │   ├── archive.ts             # 压缩包操作IPC
│   │   │   ├── file.ts                # 文件操作IPC
│   │   │   └── system.ts              # 系统操作IPC
│   │   ├── windows/
│   │   │   └── main-window.ts         # 主窗口配置
│   │   └── utils/
│   │       ├── native-bridge.ts       # Rust模块桥接
│   │       └── file-watcher.ts
│   │
│   ├── preload/                       # 预加载脚本
│   │   └── index.ts                   # contextBridge定义
│   │
│   └── renderer/                      # React渲染进程
│       ├── index.html
│       ├── main.tsx
│       ├── App.tsx
│       │
│       ├── components/                # UI组件
│       │   ├── Layout/
│       │   │   ├── AppShell.tsx       # 应用外壳
│       │   │   ├── TitleBar.tsx       # 自定义标题栏
│       │   │   └── Sidebar.tsx        # 侧边栏
│       │   │
│       │   ├── Archive/               # 压缩包相关
│       │   │   ├── FileTree.tsx       # 文件树（虚拟滚动）
│       │   │   ├── FileItem.tsx       # 文件项
│       │   │   ├── PreviewPanel.tsx   # 预览面板
│       │   │   └── BreadcrumbNav.tsx  # 面包屑导航
│       │   │
│       │   ├── Animations/            # 动画组件
│       │   │   ├── ParticleBackground.tsx  # 粒子背景
│       │   │   ├── LoadingOrb.tsx          # 加载动画
│       │   │   ├── ProgressRing.tsx        # 环形进度条
│       │   │   └── FileExplodeEffect.tsx   # 文件爆炸效果
│       │   │
│       │   ├── DropZone/
│       │   │   └── MagneticDropZone.tsx    # 磁吸拖拽区
│       │   │
│       │   └── UI/                    # 基础UI组件
│       │       ├── Button.tsx
│       │       ├── Card.tsx
│       │       ├── Modal.tsx
│       │       └── ContextMenu.tsx
│       │
│       ├── features/                  # 功能模块
│       │   ├── extract/
│       │   │   ├── ExtractView.tsx
│       │   │   └── ExtractProgress.tsx
│       │   ├── settings/
│       │   │   └── SettingsView.tsx
│       │   └── history/
│       │       └── HistoryView.tsx
│       │
│       ├── hooks/                     # 自定义Hooks
│       │   ├── useArchive.ts
│       │   ├── useGSAPAnimation.ts
│       │   ├── useFileSystem.ts
│       │   └── useVirtualList.ts
│       │
│       ├── store/                     # 状态管理
│       │   ├── archive-store.ts       # Zustand Store
│       │   ├── ui-store.ts
│       │   └── settings-store.ts
│       │
│       ├── styles/                    # 样式文件
│       │   ├── globals.css
│       │   ├── animations.css         # GSAP动画类
│       │   └── themes.css             # 主题变量
│       │
│       └── utils/
│           ├── ipc.ts                 # IPC封装
│           ├── format.ts              # 格式化工具
│           └── constants.ts
│
├── rust-core/                         # Rust核心引擎
│   ├── Cargo.toml
│   ├── build.rs                       # N-API编译配置
│   └── src/
│       ├── lib.rs                     # N-API导出
│       ├── archive/
│       │   ├── zip.rs
│       │   ├── rar.rs
│       │   ├── sevenz.rs
│       │   └── tar_gz.rs
│       └── models/
│           ├── file_entry.rs
│           └── extract_options.rs
│
├── resources/                         # 应用资源
│   ├── icons/
│   │   ├── icon.icns                  # macOS图标
│   │   ├── icon.ico                   # Windows图标
│   │   └── icon.png
│   └── fonts/
│
└── dist/                              # 构建输出
    ├── mac/
    └── win/
```

---

## UI设计理念：极致酷炫

### 设计风格定位
- **Glassmorphism（玻璃态）** + **Neumorphism（新拟态）** 混合
- **Cyberpunk（赛博朋克）** 色彩风格
- **Fluid Animations（流体动画）**
- **Micro-interactions（微交互）** 无处不在

### 核心视觉特性

#### 1. 全局粒子背景系统
```tsx
// ParticleBackground.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // 使用GSAP驱动的粒子系统
    // 1000+粒子随鼠标移动产生涟漪效果
    // 粒子根据解压进度改变颜色/密度
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-30"
    />
  );
}
```

#### 2. 磁吸式拖拽交互
```tsx
// MagneticDropZone.tsx
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

export function MagneticDropZone() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  const { getRootProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      // GSAP爆炸动画：文件图标从中心向外散开
      gsap.to('.file-icon', {
        scale: 0,
        rotation: 360,
        duration: 0.6,
        ease: 'back.in',
        stagger: 0.05
      });
    }
  });
  
  return (
    <motion.div
      {...getRootProps()}
      style={{ x: springX, y: springY }}
      className="relative h-64 border-2 border-dashed 
                 border-cyan-500/50 rounded-2xl
                 bg-gradient-to-br from-purple-900/20 to-cyan-900/20
                 backdrop-blur-xl"
      whileHover={{ scale: 1.02 }}
    >
      {isDragActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-cyan-500/20 
                     rounded-2xl border-4 border-cyan-400"
        >
          <div className="flex items-center justify-center h-full">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity },
                scale: { duration: 1, repeat: Infinity }
              }}
            >
              {/* 发光图标 */}
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
```

#### 3. 液态进度环
```tsx
// ProgressRing.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function ProgressRing({ progress }: { progress: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // GSAP动画：圆环液态填充效果
    gsap.to(pathRef.current, {
      strokeDashoffset: (1 - progress / 100) * 283,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // 脉冲发光效果
    gsap.to(glowRef.current, {
      opacity: 0.3 + (progress / 100) * 0.7,
      scale: 1 + (progress / 100) * 0.1,
      duration: 0.3
    });
  }, [progress]);
  
  return (
    <div className="relative w-32 h-32">
      {/* 发光背景 */}
      <div 
        ref={glowRef}
        className="absolute inset-0 rounded-full 
                   bg-gradient-radial from-cyan-500/50 to-transparent
                   blur-xl"
      />
      
      {/* SVG圆环 */}
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="64" cy="64" r="45"
          fill="none"
          stroke="rgba(6, 182, 212, 0.2)"
          strokeWidth="8"
        />
        <path
          ref={pathRef}
          d="M 64,19 a 45,45 0 1,1 0,90 a 45,45 0 1,1 0,-90"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset="283"
        />
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* 中心文字 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">
          {progress}%
        </span>
      </div>
    </div>
  );
}
```

#### 4. 文件列表虚拟滚动 + 视差效果
```tsx
// FileTree.tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from 'framer-motion';

export function FileTree({ files }: { files: FileEntry[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: files.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5
  });
  
  return (
    <div 
      ref={parentRef}
      className="h-full overflow-auto 
                 scrollbar-thin scrollbar-track-transparent 
                 scrollbar-thumb-cyan-500/50"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const file = files[virtualRow.index];
          
          return (
            <motion.div
              key={virtualRow.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: virtualRow.index * 0.02,
                duration: 0.3 
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`
              }}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: 'rgba(6, 182, 212, 0.1)'
              }}
              className="px-4 py-3 flex items-center gap-3
                         border-b border-cyan-500/10
                         cursor-pointer transition-colors"
            >
              {/* 文件图标动画 */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
              >
                {getFileIcon(file.type)}
              </motion.div>
              
              <div className="flex-1">
                <div className="text-white font-medium">
                  {file.name}
                </div>
                <div className="text-cyan-400/60 text-sm">
                  {formatBytes(file.size)}
                </div>
              </div>
              
              {/* Hover时显示操作按钮 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="flex gap-2"
              >
                <ActionButton icon="eye" />
                <ActionButton icon="extract" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

#### 5. 解压爆炸动画
```tsx
// 当点击"解压"按钮时触发
function handleExtract() {
  const tl = gsap.timeline();
  
  // 1. 压缩包图标缩放
  tl.to('.archive-icon', {
    scale: 1.2,
    duration: 0.2,
    ease: 'back.out'
  });
  
  // 2. 爆炸效果：文件四散
  tl.to('.file-particle', {
    x: () => gsap.utils.random(-300, 300),
    y: () => gsap.utils.random(-300, 300),
    rotation: () => gsap.utils.random(-360, 360),
    opacity: 0,
    scale: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.02
  }, '-=0.1');
  
  // 3. 进度环淡入
  tl.from('.progress-ring', {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    ease: 'back.out'
  }, '-=0.5');
}
```

---

## 核心功能设计

### 1. 主界面布局

```tsx
// App.tsx
export function App() {
  return (
    <div className="h-screen bg-gradient-to-br 
                    from-slate-900 via-purple-900 to-slate-900">
      <ParticleBackground />
      
      <div className="flex flex-col h-full">
        {/* 自定义标题栏 */}
        <TitleBar />
        
        <div className="flex-1 flex overflow-hidden">
          {/* 侧边栏 */}
          <Sidebar />
          
          {/* 主内容区 */}
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/extract" element={<ExtractView />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
```

### 2. 拖拽交互流程

```
用户拖入文件
    ↓
磁吸效果吸附（GSAP弹簧动画）
    ↓
文件识别（Rust分析格式）
    ↓
卡片翻转动画展示文件信息
    ↓
点击"查看" → 文件列表淡入（Stagger动画）
    ↓
点击"解压" → 爆炸动画 + 进度环
```

### 3. 解压进度展示

```tsx
// ExtractProgress.tsx
export function ExtractProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // 监听主进程的进度事件
    window.electron.onExtractProgress((data) => {
      setProgress(data.progress);
      
      // 粒子爆发效果
      if (data.progress % 10 === 0) {
        triggerParticleBurst();
      }
    });
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center
                 bg-black/60 backdrop-blur-xl z-50"
    >
      <div className="relative">
        {/* 背景辉光 */}
        <div className="absolute inset-0 blur-3xl bg-cyan-500/30 
                        animate-pulse" />
        
        {/* 进度环 */}
        <ProgressRing progress={progress} />
        
        {/* 文件名滚动 */}
        <motion.div
          className="mt-8 text-cyan-400 text-center"
          key={currentFile}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          正在解压: {currentFile}
        </motion.div>
        
        {/* 速度/剩余时间 */}
        <div className="mt-4 text-white/60 text-sm text-center">
          {speed} MB/s · 剩余 {eta}
        </div>
      </div>
    </motion.div>
  );
}
```

### 4. 文件预览面板

```tsx
// PreviewPanel.tsx - 支持文本、图片、代码预览
export function PreviewPanel({ file }: { file: FileEntry }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="w-96 bg-slate-800/50 backdrop-blur-xl
                 border-l border-cyan-500/20 p-6"
    >
      {/* 文件图标 3D旋转 */}
      <motion.div
        className="w-32 h-32 mx-auto mb-6"
        whileHover={{ 
          rotateY: 180,
          transition: { duration: 0.6 }
        }}
      >
        <FileIcon3D type={file.type} />
      </motion.div>
      
      {/* 文件信息 */}
      <div className="space-y-3">
        <InfoRow label="大小" value={formatBytes(file.size)} />
        <InfoRow label="修改时间" value={formatDate(file.mtime)} />
        <InfoRow label="压缩率" value={`${file.ratio}%`} />
      </div>
      
      {/* 预览内容 */}
      {file.previewable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-4 bg-black/30 rounded-lg"
        >
          <FilePreview file={file} />
        </motion.div>
      )}
    </motion.div>
  );
}
```

---

## Rust核心与Electron集成

### N-API绑定示例

```rust
// rust-core/src/lib.rs
use napi_derive::napi;
use napi::bindgen_prelude::*;

#[napi(object)]
pub struct FileEntry {
  pub name: String,
  pub size: i64,
  pub is_directory: bool,
  pub modified_time: i64,
}

#[napi(object)]
pub struct ExtractOptions {
  pub output_path: String,
  pub password: Option<String>,
  pub overwrite: bool,
}

#[napi]
pub struct Archive {
  // 内部实现
}

#[napi]
impl Archive {
  #[napi(constructor)]
  pub fn new(path: String) -> Result<Self> {
    // 打开压缩包
  }
  
  #[napi]
  pub fn list_files(&self) -> Result<Vec<FileEntry>> {
    // 列出文件
  }
  
  #[napi]
  pub async fn extract(
    &self,
    options: ExtractOptions,
    progress_callback: JsFunction,
  ) -> Result<()> {
    // 异步解压，调用进度回调
  }
}
```

### Electron主进程调用

```typescript
// src/main/ipc/archive.ts
import { ipcMain } from 'electron';
import { Archive } from '../../rust-core/index.node';

ipcMain.handle('archive:open', async (_, path: string) => {
  const archive = new Archive(path);
  return archive.listFiles();
});

ipcMain.handle('archive:extract', async (event, path, options) => {
  const archive = new Archive(path);
  
  await archive.extract(options, (progress: number) => {
    // 发送进度到渲染进程
    event.sender.send('extract:progress', { progress });
  });
});
```

### 渲染进程调用

```typescript
// src/renderer/hooks/useArchive.ts
export function useArchive() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    window.electron.onExtractProgress(({ progress }) => {
      setProgress(progress);
    });
  }, []);
  
  const openArchive = async (path: string) => {
    const fileList = await window.electron.invoke('archive:open', path);
    setFiles(fileList);
  };
  
  const extract = async (options: ExtractOptions) => {
    await window.electron.invoke('archive:extract', currentPath, options);
  };
  
  return { files, progress, openArchive, extract };
}
```

---

## 动画性能优化

### GSAP优化策略

```typescript
// src/renderer/utils/gsap-config.ts
import gsap from 'gsap';

// 全局配置
gsap.config({
  force3D: true,  // 强制使用GPU加速
  nullTargetWarn: false,
});

// 复用Timeline，避免重复创建
const masterTimeline = gsap.timeline({ paused: true });

// 批量动画使用 .set() 而不是 .to()
export function batchAnimate(elements: Element[], props: object) {
  gsap.set(elements, props);
}
```

### 虚拟滚动优化

```tsx
// 只渲染可见区域 + 上下各5个overscan
const virtualizer = useVirtualizer({
  count: 10000,  // 支持1万个文件
  estimateSize: () => 60,
  overscan: 5,
});
```

---

## 主题系统

### Tailwind配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        cyber: {
          pink: '#ff006e',
          blue: '#00f5ff',
          purple: '#8b5cf6',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, filter: 'blur(0px)' },
          '50%': { opacity: 0.5, filter: 'blur(4px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ]
}
```

---

## 打包配置

### electron-builder.yml

```yaml
appId: com.unarchiver.app
productName: UnarchiverPro

directories:
  output: dist

files:
  - src/main/**/*
  - src/preload/**/*
  - src/renderer/dist/**/*
  - rust-core/**/*.node

mac:
  target:
    - dmg
    - zip
  category: public.app-category.utilities
  icon: resources/icons/icon.icns
  darkModeSupport: true
  hardenedRuntime: true
  gatekeeperAssess: false

win:
  target:
    - nsis
    - portable
  icon: resources/icons/icon.ico

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: always
```

---

## 开发路线图

### Phase 1: 核心框架搭建 (1-2周)
- [x] Electron + React + Vite项目初始化
- [x] Rust N-API模块搭建
- [x] IPC通信架构
- [x] 基础UI组件库

### Phase 2: 动画系统 (2周)
- [x] GSAP集成
- [x] Framer Motion动画组件
- [x] 粒子背景系统
- [x] 磁吸拖拽交互
- [x] 进度环动画

### Phase 3: 核心功能 (2-3周)
- [x] ZIP/TAR/GZ格式支持
- [x] 文件列表虚拟滚动
- [x] 解压功能实现
- [x] 进度显示

### Phase 4: 高级功能 (2周)
- [ ] RAR/7Z格式支持
- [ ] 文件预览
- [ ] 密码支持
- [ ] 批量操作

### Phase 5: 打磨发布 (1-2周)
- [ ] 性能优化
- [ ] 系统集成（文件关联、右键菜单）
- [ ] 打包签名
- [ ] 自动更新

---

## 性能指标

| 指标 | 目标值 |
|------|--------|
| 启动时间 | < 2秒 |
| 打开10MB压缩包 | < 0.5秒 |
| 渲染10000个文件 | 60fps |
| 解压100MB文件 | < 5秒 |
| 内存占用 | < 300MB |
| 打包体积 | < 150MB |

---

## 视觉参考

参考以下应用的动画风格：
- **Arc浏览器** - 流畅的页面切换动画
- **Linear** - 极致的微交互
- **Raycast** - 磁吸式命令面板
- **Figma** - 丝滑的拖拽体验
- **Spline** - 3D动画效果

---


# 极致动画交互设计手册 - 每个按钮都是艺术品

## 设计哲学

```
动画 ≠ 装饰
动画 = 功能反馈 + 视觉引导 + 情感连接

每个按钮动画必须满足：
1. 目的性：告诉用户"发生了什么"
2. 合理性：符合物理直觉和心理预期
3. 性能：60fps流畅运行
4. 可访问：支持减弱动画模式
```

---

## 一、按钮动画分类体系

### 1. 主要操作按钮（Primary Actions）
**场景**：解压、打开、确认等关键操作

#### 1.1 解压按钮 - "能量充能释放"
```tsx
const ExtractButton = () => {
  return (
    <motion.button
      className="relative px-8 py-4 rounded-xl overflow-hidden
                 bg-gradient-to-r from-cyan-500 to-purple-600"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: {},
        hover: {},
        tap: {}
      }}
    >
      {/* 背景能量波动层 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500"
        variants={{
          rest: { scale: 1, opacity: 0 },
          hover: { 
            scale: 1.5, 
            opacity: 0.3,
            transition: { duration: 0.4 }
          }
        }}
      />
      
      {/* 粒子环绕效果 */}
      <motion.div
        className="absolute inset-0"
        variants={{
          hover: {
            // GSAP接管：生成20个粒子沿边缘旋转
          }
        }}
      >
        {Array.from({length: 20}).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </motion.div>
      
      {/* 发光边框 */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        variants={{
          rest: { 
            boxShadow: '0 4px 20px rgba(6, 182, 212, 0.4)' 
          },
          hover: { 
            boxShadow: '0 8px 40px rgba(6, 182, 212, 0.8)',
            transition: { duration: 0.3 }
          },
          tap: {
            boxShadow: '0 2px 10px rgba(6, 182, 212, 0.6)',
            transition: { duration: 0.1 }
          }
        }}
      />
      
      {/* 文字 + 图标 */}
      <motion.div
        className="relative flex items-center gap-2"
        variants={{
          rest: { scale: 1, x: 0 },
          hover: { scale: 1.05, x: 2 },
          tap: { scale: 0.95 }
        }}
      >
        <Zap className="w-5 h-5" />
        <span className="font-bold">解压文件</span>
      </motion.div>
      
      {/* 点击波纹 */}
      <AnimatePresence>
        {isClicked && <RippleEffect />}
      </AnimatePresence>
    </motion.button>
  );
};

// 点击时的完整动画序列
const handleClick = () => {
  const tl = gsap.timeline();
  
  // 1. 按钮压缩
  tl.to(buttonRef.current, {
    scale: 0.9,
    duration: 0.1,
    ease: 'power2.in'
  });
  
  // 2. 能量爆发（白色闪光）
  tl.to('.flash-overlay', {
    opacity: 1,
    duration: 0.1
  });
  
  // 3. 波纹扩散
  tl.to('.ripple', {
    scale: 2,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.1');
  
  // 4. 按钮恢复 + 弹跳
  tl.to(buttonRef.current, {
    scale: 1,
    duration: 0.4,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.5');
  
  // 5. 触发实际解压操作
  tl.call(performExtract);
};
```

**动画逻辑**：
- **悬停**：能量汇聚（发光增强 + 粒子出现）
- **按下**：能量压缩（缩小 + 阴影收缩）
- **释放**：能量释放（波纹 + 闪光 + 弹性恢复）

---

#### 1.2 打开文件按钮 - "磁吸吸入"
```tsx
const OpenButton = () => {
  return (
    <motion.button
      className="relative group"
      whileHover="hover"
      whileTap="tap"
    >
      {/* 背景磁场效果 */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        variants={{
          rest: { 
            background: 'rgba(6, 182, 212, 0.1)',
            scale: 1
          },
          hover: { 
            background: 'rgba(6, 182, 212, 0.2)',
            scale: 1.1,
            transition: { type: 'spring', stiffness: 400 }
          },
          tap: { scale: 0.95 }
        }}
      />
      
      {/* 图标组 */}
      <div className="relative flex items-center gap-3 px-6 py-3">
        {/* 文件夹图标 */}
        <motion.div
          variants={{
            rest: { rotate: 0, y: 0 },
            hover: { 
              rotate: -10, 
              y: -2,
              transition: { duration: 0.3 }
            },
            tap: { rotate: 0, y: 0 }
          }}
        >
          <FolderOpen className="w-5 h-5 text-cyan-400" />
        </motion.div>
        
        {/* 箭头（从右侧飞入） */}
        <motion.div
          variants={{
            rest: { x: 10, opacity: 0 },
            hover: { 
              x: 0, 
              opacity: 1,
              transition: { duration: 0.3, delay: 0.1 }
            }
          }}
        >
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </motion.div>
        
        <span>打开</span>
      </div>
      
      {/* 悬停时的光点从左到右扫过 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r 
                   from-transparent via-white to-transparent
                   opacity-0 group-hover:opacity-20"
        variants={{
          hover: {
            x: ['0%', '100%'],
            transition: { duration: 0.8, ease: 'easeInOut' }
          }
        }}
      />
    </motion.button>
  );
};
```

**动画逻辑**：
- **悬停**：文件夹打开（旋转-10deg） + 箭头飞入 + 光扫过
- **按下**：整体压缩
- **释放**：弹性恢复

---

### 2. 次要操作按钮（Secondary Actions）
**场景**：预览、取消、关闭等辅助操作

#### 2.1 预览按钮 - "放大镜聚焦"
```tsx
const PreviewButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      className="relative group px-4 py-2 rounded-lg
                 border border-cyan-500/30 bg-transparent"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover="hover"
      whileTap="tap"
    >
      {/* 边框发光动画 */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-cyan-500"
        variants={{
          rest: { opacity: 0, scale: 0.95 },
          hover: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3 }
          }
        }}
      />
      
      {/* 放大镜图标 */}
      <motion.div
        className="relative flex items-center gap-2"
        variants={{
          hover: { scale: 1.1 }
        }}
      >
        <motion.div
          animate={isHovered ? {
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ duration: 0.6 }}
        >
          <Search className="w-4 h-4" />
        </motion.div>
        
        {/* 文字（从中心扩展） */}
        <motion.span
          variants={{
            rest: { width: 0, opacity: 0 },
            hover: { 
              width: 'auto', 
              opacity: 1,
              transition: { duration: 0.3 }
            }
          }}
          className="overflow-hidden whitespace-nowrap"
        >
          预览
        </motion.span>
      </motion.div>
      
      {/* 聚焦光圈效果 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)'
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};
```

**动画逻辑**：
- **悬停**：放大镜抖动 + 文字滑出 + 光圈聚焦 + 边框点亮
- **按下**：轻微缩小
- **释放**：弹回

---

#### 2.2 取消按钮 - "X分裂消散"
```tsx
const CancelButton = () => {
  const [particles, setParticles] = useState([]);
  
  const handleClick = () => {
    // 生成粒子
    const newParticles = Array.from({length: 12}, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * Math.PI * 2
    }));
    setParticles(newParticles);
    
    // 0.6s后清除粒子
    setTimeout(() => setParticles([]), 600);
  };
  
  return (
    <motion.button
      className="relative w-10 h-10 rounded-full
                 border border-red-500/30"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
    >
      {/* 背景 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-red-500/10"
        variants={{
          rest: { scale: 1, opacity: 1 },
          hover: { scale: 1.2, opacity: 0.3 },
          tap: { scale: 0.9 }
        }}
      />
      
      {/* X图标（两条线） */}
      <svg className="absolute inset-0 w-full h-full p-2">
        <motion.line
          x1="30%" y1="30%" x2="70%" y2="70%"
          stroke="currentColor"
          strokeWidth="2"
          variants={{
            rest: { pathLength: 1, rotate: 0 },
            hover: { rotate: 90 },
            tap: { pathLength: 0 }
          }}
        />
        <motion.line
          x1="70%" y1="30%" x2="30%" y2="70%"
          stroke="currentColor"
          strokeWidth="2"
          variants={{
            rest: { pathLength: 1, rotate: 0 },
            hover: { rotate: -90 },
            tap: { pathLength: 0 }
          }}
        />
      </svg>
      
      {/* 点击时的粒子爆炸 */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute top-1/2 left-1/2 w-1 h-1 
                       bg-red-500 rounded-full"
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 1, 
              opacity: 1 
            }}
            animate={{
              x: Math.cos(particle.angle) * 40,
              y: Math.sin(particle.angle) * 40,
              scale: 0,
              opacity: 0
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};
```

**动画逻辑**：
- **悬停**：背景膨胀 + X旋转90度
- **按下**：X消失（pathLength: 0）
- **释放**：粒子从中心向12个方向爆炸

---

### 3. 图标按钮（Icon Buttons）
**场景**：工具栏、文件操作等小按钮

#### 3.1 删除按钮 - "垃圾桶盖子打开"
```tsx
const DeleteButton = () => {
  return (
    <motion.button
      className="relative w-8 h-8 rounded-lg group"
      whileHover="hover"
      whileTap="tap"
    >
      {/* 背景 */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        variants={{
          rest: { backgroundColor: 'transparent' },
          hover: { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
          tap: { scale: 0.9 }
        }}
      />
      
      {/* 垃圾桶SVG */}
      <svg className="w-full h-full p-1.5 text-gray-400 group-hover:text-red-500">
        {/* 盖子 */}
        <motion.rect
          x="25%" y="25%" width="50%" height="10%"
          fill="currentColor"
          variants={{
            rest: { y: 0, rotate: 0 },
            hover: { 
              y: -3, 
              rotate: -10,
              transition: { duration: 0.3 }
            }
          }}
        />
        
        {/* 桶身 */}
        <motion.path
          d="M30,35 L70,35 L65,85 L35,85 Z"
          fill="currentColor"
          variants={{
            hover: {
              // 轻微晃动
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.5, delay: 0.1 }
            }
          }}
        />
        
        {/* 内容线条（悬停时消失） */}
        <motion.line
          x1="45%" y1="45%" x2="45%" y2="75%"
          stroke="white"
          strokeWidth="2"
          variants={{
            rest: { opacity: 0.5 },
            hover: { 
              opacity: 0,
              y: 20,
              transition: { duration: 0.3 }
            }
          }}
        />
      </svg>
      
      {/* 点击确认层 */}
      <AnimatePresence>
        {needConfirm && (
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2
                       px-3 py-1 bg-red-500 rounded text-xs
                       whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            再次点击确认
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
```

**动画逻辑**：
- **悬停**：盖子打开（上移+旋转） + 桶身晃动 + 内容下沉
- **按下**：整体缩小
- **首次点击**：确认提示弹出
- **二次点击**：垃圾桶整体向下沉入（translateY + opacity）

---

#### 3.2 收藏按钮 - "星星填充"
```tsx
const StarButton = ({ isFavorited }: { isFavorited: boolean }) => {
  return (
    <motion.button
      className="relative w-8 h-8"
      whileHover="hover"
      whileTap="tap"
    >
      {/* 星星外框 */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 24 24"
      >
        <motion.path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={isFavorited ? '#fbbf24' : 'none'}
          stroke="#fbbf24"
          strokeWidth="2"
          variants={{
            rest: { 
              scale: 1,
              fill: isFavorited ? '#fbbf24' : 'none'
            },
            hover: { 
              scale: 1.2,
              rotate: isFavorited ? 0 : 72 // 旋转1/5圈
            },
            tap: { scale: 0.9 }
          }}
          animate={isFavorited ? {
            fill: ['none', '#fbbf24'],
            transition: { duration: 0.4 }
          } : {}}
        />
      </motion.svg>
      
      {/* 点击时的光芒扩散 */}
      <AnimatePresence>
        {isFavorited && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {Array.from({length: 5}).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-4 
                           bg-yellow-400 origin-bottom"
                style={{
                  rotate: (i * 72) + 'deg',
                  translateX: '-50%'
                }}
                initial={{ scaleY: 0, opacity: 1 }}
                animate={{ scaleY: 1, opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
```

**动画逻辑**：
- **悬停**：星星放大 + 旋转（未收藏时）
- **按下**：缩小
- **收藏**：填充颜色 + 五道光芒向外扩散
- **取消收藏**：颜色渐变透明

---

### 4. 切换按钮（Toggle Buttons）

#### 4.1 开关按钮 - "滑块磁吸"
```tsx
const ToggleSwitch = ({ enabled, onChange }) => {
  return (
    <motion.button
      className="relative w-14 h-8 rounded-full cursor-pointer"
      onClick={onChange}
      animate={{
        backgroundColor: enabled 
          ? 'rgba(6, 182, 212, 0.3)' 
          : 'rgba(100, 116, 139, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 轨道发光 */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: enabled
            ? '0 0 20px rgba(6, 182, 212, 0.6) inset'
            : '0 0 10px rgba(100, 116, 139, 0.3) inset'
        }}
      />
      
      {/* 滑块 */}
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full
                   bg-white shadow-lg"
        animate={{
          x: enabled ? 28 : 4,
          backgroundColor: enabled ? '#06b6d4' : '#cbd5e1'
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        {/* 滑块内部图标 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: enabled ? 0 : 180 }}
        >
          {enabled ? (
            <Check className="w-4 h-4 text-white" />
          ) : (
            <X className="w-4 h-4 text-gray-400" />
          )}
        </motion.div>
        
        {/* 拖尾粒子 */}
        <AnimatePresence>
          {enabled && (
            <motion.div
              className="absolute right-full mr-1 w-1 h-1 
                         bg-cyan-400 rounded-full"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0, x: -10 }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};
```

**动画逻辑**：
- **切换ON**：滑块弹性滑动到右侧 + 颜色变cyan + 图标旋转 + 轨道发光
- **切换OFF**：滑块滑回 + 颜色变灰 + 图标旋转
- **拖动交互**：支持拖拽滑块（useMotionValue）

---

#### 4.2 标签页切换 - "滑动下划线"
```tsx
const TabButtons = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="relative flex gap-1 p-1 bg-slate-800/50 rounded-lg">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className="relative px-4 py-2 rounded-md text-sm z-10"
          onClick={() => onChange(tab.id)}
          whileHover="hover"
          whileTap="tap"
        >
          {/* 文字 */}
          <motion.span
            className="relative z-10"
            animate={{
              color: activeTab === tab.id ? '#fff' : '#94a3b8'
            }}
          >
            {tab.label}
          </motion.span>
          
          {/* 图标（激活时旋转弹跳） */}
          <motion.div
            className="inline-block ml-2"
            animate={activeTab === tab.id ? {
              rotate: [0, -10, 10, 0],
              scale: [1, 1.2, 1]
            } : {
              scale: 1
            }}
            transition={{ duration: 0.5 }}
          >
            {tab.icon}
          </motion.div>
        </motion.button>
      ))}
      
      {/* 滑动背景高亮 */}
      <motion.div
        className="absolute inset-y-1 rounded-md bg-cyan-500/20
                   border border-cyan-500/50"
        layoutId="activeTab"
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30
        }}
        style={{
          width: tabWidths[activeTab],
          x: tabOffsets[activeTab]
        }}
      />
    </div>
  );
};
```

**动画逻辑**：
- **切换**：背景高亮弹性滑动到新位置（layoutId自动处理）
- **文字**：颜色渐变
- **图标**：激活时摇摆弹跳
- **悬停**：未激活的tab背景淡入

---

### 5. 特殊场景按钮

#### 5.1 拖拽文件按钮 - "磁力吸附"
```tsx
const DragFileButton = ({ file }) => {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileDrag={{ 
        scale: 1.1,
        rotate: 5,
        cursor: 'grabbing'
      }}
    >
      {/* 文件卡片 */}
      <motion.div
        className="px-4 py-3 bg-slate-800 rounded-lg border
                   border-cyan-500/30"
        animate={{
          boxShadow: isDragging
            ? '0 20px 60px rgba(6, 182, 212, 0.6)'
            : '0 4px 20px rgba(6, 182, 212, 0.2)'
        }}
      >
        {/* 图标 */}
        <FileIcon type={file.type} />
        <span>{file.name}</span>
      </motion.div>
      
      {/* 拖拽时的磁力线效果 */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({length: 8}).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-0.5 h-12
                           bg-gradient-to-b from-cyan-400 to-transparent
                           origin-top"
                style={{
                  rotate: (i * 45) + 'deg'
                }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
```

**动画逻辑**：
- **悬停**：轻微放大
- **拖拽开始**：放大1.1倍 + 旋转5度 + 阴影增强
- **拖拽中**：8条磁力线从中心向外脉冲
- **靠近目标**：目标区域背景高亮（外部控制）
- **释放**：弹性回到原位或吸附到目标

---

#### 5.2 长按操作按钮 - "环形进度填充"
```tsx
const LongPressButton = ({ onLongPress, duration = 1000 }) => {
  const [progress, setProgress] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef(null);
  
  const handlePressStart = () => {
    setIsPressed(true);
    const startTime = Date.now();
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(timerRef.current);
        onLongPress();
      }
    }, 16);
  };
  
  const handlePressEnd = () => {
    setIsPressed(false);
    setProgress(0);
    clearInterval(timerRef.current);
  };
  
  return (
    <motion.button
      className="relative w-16 h-16 rounded-full"
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 背景 */}
      <div className="absolute inset-0 rounded-full bg-red-500/20" />
      
      {/* 环形进度 */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="50%" cy="50%" r="28"
          fill="none"
          stroke="rgba(239, 68, 68, 0.2)"
          strokeWidth="4"
        />
        <motion.circle
          cx="50%" cy="50%" r="28"
          fill="none"
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={176}
          animate={{
            strokeDashoffset: 176 - (176 * progress / 100)
          }}
          transition={{ duration: 0.05 }}
        />
      </svg>
      
      {/* 中心图标 */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: isPressed ? [1, 1.2, 1] : 1
        }}
        transition={{
          repeat: isPressed ? Infinity : 0,
          duration: 0.5
        }}
      >
        <Trash2 className="w-6 h-6 text-red-500" />
      </motion.div>
      
      {/* 完成时的爆炸效果 */}
      <AnimatePresence>
        {progress >= 100 && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full h-full rounded-full bg-red-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
```

**动画逻辑**：
- **按下**：环形进度从0%填充到100%
- **按住中**：图标脉冲缩放
- **达到100%**：环形爆炸扩散 + 触发操作
- **提前释放**：进度重置（带ease-out）

---

## 二、通用按钮状态动画

### 禁用状态
```tsx
const disabledVariants = {
  opacity: 0.5,
  cursor: 'not-allowed',
  scale: 1,
  filter: 'grayscale(100%)',
  pointerEvents: 'none'
};

// 进入禁用状态动画
<motion.button
  animate={disabled ? 'disabled' : 'enabled'}
  variants={{
    enabled: { opacity: 1, filter: 'grayscale(0%)' },
    disabled: {
      opacity: 0.5,
      filter: 'grayscale(100%)',
      transition: { duration: 0.3 }
    }
  }}
>
```

### 加载状态
```tsx
const LoadingButton = ({ isLoading }) => {
  return (
    <motion.button className="relative">
      {/* 正常内容 */}
      <motion.div
        animate={{ opacity: isLoading ? 0 : 1 }}
      >
        解压文件
      </motion.div>
      
      {/* 加载动画 */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 三个点跳跃 */}
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
```

---

## 三、按钮组合动画

### 文件操作按钮组 - "扇形展开"
```tsx
const FileActionMenu = ({ isOpen }) => {
  const actions = [
    { icon: Eye, label: '预览', angle: 0 },
    { icon: Download, label: '提取', angle: 60 },
    { icon: Share, label: '分享', angle: 120 },
    { icon: Trash, label: '删除', angle: 180 }
  ];
  
  return (
    <div className="relative">
      {/* 主按钮 */}
      <motion.button
        className="w-12 h-12 rounded-full bg-cyan-500"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <MoreVertical />
      </motion.button>
      
      {/* 扇形展开的子按钮 */}
      <AnimatePresence>
        {isOpen && actions.map((action, index) => (
          <motion.button
            key={action.label}
            className="absolute w-10 h-10 rounded-full bg-slate-700"
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0, 
              opacity: 0 
            }}
            animate={{
              x: Math.cos((action.angle - 90) * Math.PI / 180) * 80,
              y: Math.sin((action.angle - 90) * Math.PI / 180) * 80,
              scale: 1,
              opacity: 1
            }}
            exit={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: index * 0.05
            }}
            whileHover={{ scale: 1.2 }}
          >
            <action.icon className="w-5 h-5" />
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
};
```

---

## 四、性能优化建议

```tsx
// 1. 使用 will-change 提示浏览器
<motion.button
  style={{ willChange: 'transform, opacity' }}
/>

// 2. 优先使用 transform 和 opacity
// ✅ 好
animate={{ scale: 1.1, opacity: 0.8 }}
// ❌ 避免
animate={{ width: '120px', height: '50px' }}

// 3. 复用动画变体
const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

// 4. 使用 layoutId 共享动画
<motion.div layoutId="shared" />

// 5. 控制粒子数量
// 移动端减少粒子
const particleCount = isMobile ? 10 : 50;
```

---

这套系统确保**每一个按钮都有独特且合理的动画反馈**，符合用户心理预期，同时保持高性能运行！