# 主要内容预览

## 一、设计令牌哲学
- 什么是设计令牌
- 为什么需要令牌系统
- 与设计总概念的关联

## 二、颜色令牌 (Color Tokens)
- 主色系统（Cyan）
- 辅助色系统（Aurora）
- 中性色系统（Slate）
- 功能色系统（Success/Error/Warning/Info）
- 深色模式映射

## 三、间距令牌 (Spacing Tokens)
- 8px基准网格
- 内边距令牌
- 外边距令牌
- 间隙令牌

## 四、字体令牌 (Typography Tokens)
- 字体家族
- 字号尺度
- 字重
- 行高

## 五、阴影令牌 (Shadow Tokens)
- 标准阴影
- 无界光晕阴影
- 玻璃态阴影
- 层次阴影

## 六、模糊令牌 (Blur Tokens)
- 毛玻璃模糊
- 层次模糊
- 边缘模糊

## 七、动画令牌 (Animation Tokens)
- 时长令牌
- 缓动函数令牌
- 延迟令牌

## 八、边框令牌 (Border Tokens)
- 圆角令牌
- 无界边框（渐变）

## 九、Z轴令牌 (Z-Index Tokens)
- 层级系统
- 与模糊度的映射

## 十、完整令牌导出
- CSS变量
- Tailwind配置
- JavaScript对象
- 设计工具导出

---

# 设计令牌（代码变量）

**版本**: v1.0  
**设计理念**: 流体科技 (Fluid Technology)  
**更新日期**: 2025-11-01

---

## 一、设计令牌哲学

### 什么是设计令牌

设计令牌是**设计决策的原子化表达**，将设计系统中的每个设计决策转化为可复用的代码变量。

```
设计决策: "主按钮用青色渐变"
  ↓
设计令牌: --color-primary-gradient
  ↓
代码变量: linear-gradient(135deg, #06b6d4, #0ea5e9)
  ↓
实际应用: background: var(--color-primary-gradient)
```

### 为什么需要令牌系统

```
一致性：    所有组件使用相同的颜色/间距/阴影
可维护性：  修改一个令牌，全局生效
可扩展性：  新增主题只需修改令牌值
协作效率：  设计师和开发者共同语言
```

### 与设计总概念的关联

```
流体科技 (Fluid Technology)
  ↓
无界 (Borderless)
  ↓
设计令牌应用：
  - 无 border 令牌
  - 有 glow (光晕) 令牌
  - 有 blur (模糊) 令牌
  - 有 gradient (渐变) 令牌
```

---

## 二、颜色令牌 (Color Tokens)

### 2.1 主色系统 - Cyan

```css
:root {
  /* Cyan - 主品牌色 */
  --color-cyan-50:  #ecfeff;
  --color-cyan-100: #cffafe;
  --color-cyan-200: #a5f3fc;
  --color-cyan-300: #67e8f9;
  --color-cyan-400: #22d3ee;
  --color-cyan-500: #06b6d4;  /* ★ 主色 */
  --color-cyan-600: #0891b2;
  --color-cyan-700: #0e7490;
  --color-cyan-800: #155e75;
  --color-cyan-900: #164e63;
  
  /* 语义化主色 */
  --color-primary: var(--color-cyan-500);
  --color-primary-light: var(--color-cyan-400);
  --color-primary-dark: var(--color-cyan-600);
  
  /* 主色渐变 */
  --gradient-primary: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
  --gradient-primary-glow: linear-gradient(180deg, rgba(103, 232, 249, 0.3) 0%, transparent 100%);
  --gradient-primary-flow: linear-gradient(90deg, #06b6d4 0%, #22d3ee 50%, #06b6d4 100%);
}
```

---

### 2.2 辅助色系统 - Aurora

```css
:root {
  /* Purple - 特殊文件 */
  --color-aurora-purple: #a78bfa;
  --color-aurora-purple-light: #c084fc;
  --color-aurora-purple-dark: #8b5cf6;
  
  /* Pink - 媒体文件 */
  --color-aurora-pink: #f472b6;
  --color-aurora-pink-light: #f9a8d4;
  --color-aurora-pink-dark: #ec4899;
  
  /* Orange - 警示 */
  --color-aurora-orange: #fb923c;
  --color-aurora-orange-light: #fbbf24;
  --color-aurora-orange-dark: #f97316;
  
  /* Green - 成功 */
  --color-aurora-green: #34d399;
  --color-aurora-green-light: #6ee7b7;
  --color-aurora-green-dark: #10b981;
}
```

---

### 2.3 中性色系统 - Slate

```css
:root {
  /* Slate - 深海渐变中性色 */
  --color-slate-50:  #f8fafc;
  --color-slate-100: #f1f5f9;
  --color-slate-200: #e2e8f0;
  --color-slate-300: #cbd5e1;
  --color-slate-400: #94a3b8;
  --color-slate-500: #64748b;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1e293b;
  --color-slate-900: #0f172a;
  
  /* 语义化中性色 - 浅色模式 */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: var(--color-slate-50);
  --color-bg-tertiary: var(--color-slate-100);
  
  --color-text-primary: var(--color-slate-900);
  --color-text-secondary: var(--color-slate-600);
  --color-text-tertiary: var(--color-slate-500);
  --color-text-disabled: var(--color-slate-400);
  
  --color-border-light: var(--color-slate-200);
  --color-border-medium: var(--color-slate-300);
  --color-border-heavy: var(--color-slate-400);
}

/* 深色模式 */
.dark {
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-bg-tertiary: #334155;
  
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #cbd5e1;
  --color-text-tertiary: #94a3b8;
  --color-text-disabled: #64748b;
  
  --color-border-light: #334155;
  --color-border-medium: #475569;
  --color-border-heavy: #64748b;
}
```

---

### 2.4 功能色系统

```css
:root {
  /* Success - 成功 */
  --color-success: #10b981;
  --color-success-light: #34d399;
  --color-success-dark: #059669;
  --color-success-bg: rgba(16, 185, 129, 0.1);
  --color-success-border: rgba(16, 185, 129, 0.3);
  
  /* Error - 错误 */
  --color-error: #ef4444;
  --color-error-light: #f87171;
  --color-error-dark: #dc2626;
  --color-error-bg: rgba(239, 68, 68, 0.1);
  --color-error-border: rgba(239, 68, 68, 0.3);
  
  /* Warning - 警告 */
  --color-warning: #f59e0b;
  --color-warning-light: #fbbf24;
  --color-warning-dark: #d97706;
  --color-warning-bg: rgba(245, 158, 11, 0.1);
  --color-warning-border: rgba(245, 158, 11, 0.3);
  
  /* Info - 信息 */
  --color-info: #3b82f6;
  --color-info-light: #60a5fa;
  --color-info-dark: #2563eb;
  --color-info-bg: rgba(59, 130, 246, 0.1);
  --color-info-border: rgba(59, 130, 246, 0.3);
}
```

---

## 三、间距令牌 (Spacing Tokens)

### 8px 基准网格

```css
:root {
  /* 基准单位 */
  --spacing-unit: 8px;
  
  /* 间距尺度 */
  --spacing-0:  0px;
  --spacing-1:  4px;      /* 0.5 × 8 */
  --spacing-2:  8px;      /* 1 × 8 */
  --spacing-3:  12px;     /* 1.5 × 8 */
  --spacing-4:  16px;     /* 2 × 8 */
  --spacing-5:  20px;     /* 2.5 × 8 */
  --spacing-6:  24px;     /* 3 × 8 */
  --spacing-8:  32px;     /* 4 × 8 */
  --spacing-10: 40px;     /* 5 × 8 */
  --spacing-12: 48px;     /* 6 × 8 */
  --spacing-16: 64px;     /* 8 × 8 */
  --spacing-20: 80px;     /* 10 × 8 */
  --spacing-24: 96px;     /* 12 × 8 */
  --spacing-32: 128px;    /* 16 × 8 */
  
  /* 语义化间距 */
  --spacing-button-x: var(--spacing-6);     /* 按钮水平 24px */
  --spacing-button-y: var(--spacing-3);     /* 按钮垂直 12px */
  --spacing-card: var(--spacing-6);         /* 卡片内边距 24px */
  --spacing-section: var(--spacing-16);     /* 区块间距 64px */
}
```

---

## 四、字体令牌 (Typography Tokens)

```css
:root {
  /* 字体家族 */
  --font-sans: 'Inter', 'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'PingFang SC', monospace;
  
  /* 字号尺度 */
  --text-2xs: 0.625rem;   /* 10px */
  --text-xs:  0.75rem;    /* 12px */
  --text-sm:  0.875rem;   /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:  1.125rem;   /* 18px */
  --text-xl:  1.25rem;    /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  
  /* 字重 */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* 行高 */
  --leading-none: 1.0;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2.0;
  
  /* 字间距 */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

---

## 五、阴影令牌 (Shadow Tokens)

### 5.1 标准阴影

```css
:root {
  /* 标准阴影层次 */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
}
```

---

### 5.2 无界光晕阴影（⭐ 核心）

```css
:root {
  /* 光晕阴影 - 无界设计专用 */
  --shadow-glow-sm: 0 0 10px rgba(6, 182, 212, 0.2);
  --shadow-glow-md: 0 0 20px rgba(6, 182, 212, 0.3);
  --shadow-glow-lg: 0 0 30px rgba(6, 182, 212, 0.4);
  --shadow-glow-xl: 0 0 40px rgba(6, 182, 212, 0.5);
  --shadow-glow-2xl: 0 0 60px rgba(6, 182, 212, 0.6);
  
  /* 多层光晕 */
  --shadow-glow-layered: 
    0 0 20px rgba(6, 182, 212, 0.3),
    0 0 40px rgba(6, 182, 212, 0.15);
  
  --shadow-glow-intense: 
    0 0 20px rgba(6, 182, 212, 0.5),
    0 0 40px rgba(6, 182, 212, 0.3),
    0 0 60px rgba(6, 182, 212, 0.2);
  
  /* 成功光晕 */
  --shadow-glow-success: 0 0 20px rgba(16, 185, 129, 0.4);
  
  /* 错误光晕 */
  --shadow-glow-error: 0 0 20px rgba(239, 68, 68, 0.4);
  
  /* 警告光晕 */
  --shadow-glow-warning: 0 0 20px rgba(245, 158, 11, 0.4);
}
```

---

### 5.3 无界容器阴影

```css
:root {
  /* 无界卡片阴影 */
  --shadow-borderless-card: 
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.08);
  
  --shadow-borderless-card-hover: 
    0 0 0 1px rgba(6, 182, 212, 0.1),
    0 0 30px rgba(6, 182, 212, 0.15),
    0 16px 48px rgba(0, 0, 0, 0.12);
  
  /* 无界模态框阴影 */
  --shadow-borderless-modal: 
    0 0 0 1px rgba(6, 182, 212, 0.15),
    0 0 60px rgba(6, 182, 212, 0.2),
    0 20px 80px rgba(0, 0, 0, 0.3);
  
  /* 无界下拉菜单阴影 */
  --shadow-borderless-dropdown: 
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 10px 40px rgba(0, 0, 0, 0.15);
}
```

---

### 5.4 玻璃态阴影

```css
:root {
  /* 浅色模式玻璃 */
  --shadow-glass-light: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  /* 深色模式玻璃 */
  --shadow-glass-dark: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

---

## 六、模糊令牌 (Blur Tokens)

### 毛玻璃模糊度

```css
:root {
  /* 模糊强度 */
  --blur-none: 0px;
  --blur-xs: 2px;
  --blur-sm: 4px;
  --blur-md: 8px;
  --blur-lg: 12px;
  --blur-xl: 16px;
  --blur-2xl: 24px;
  --blur-3xl: 40px;
  
  /* 语义化模糊 */
  --blur-glass: 20px;          /* 标准玻璃效果 */
  --blur-overlay: 30px;        /* 遮罩层 */
  --blur-modal: 24px;          /* 模态框背景 */
  
  /* Z轴对应模糊度 */
  --blur-z-dropdown: 8px;      /* z-10 */
  --blur-z-sticky: 10px;       /* z-20 */
  --blur-z-overlay: 20px;      /* z-40 */
  --blur-z-modal: 24px;        /* z-50 */
}
```

---

## 七、动画令牌 (Animation Tokens)

### 7.1 时长令牌

```css
:root {
  /* 动画时长 */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-moderate: 300ms;
  --duration-slow: 400ms;
  --duration-slower: 500ms;
  --duration-slowest: 700ms;
  
  /* 语义化时长 */
  --duration-micro-interaction: var(--duration-instant);
  --duration-hover: var(--duration-fast);
  --duration-transition: var(--duration-normal);
  --duration-modal: var(--duration-moderate);
  --duration-page: var(--duration-slow);
}
```

---

### 7.2 缓动令牌

```css
:root {
  /* 标准缓动 */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 流体科技专用缓动 */
  --ease-fluid: cubic-bezier(0.34, 1.56, 0.64, 1);      /* 流体弹性 */
  --ease-liquid: cubic-bezier(0.25, 0.1, 0.25, 1);      /* 液体流动 */
  --ease-wave: cubic-bezier(0.36, 0, 0.66, -0.56);      /* 波浪起伏 */
  --ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 弹簧 */
  
  /* 语义化缓动 */
  --ease-enter: var(--ease-out);
  --ease-exit: var(--ease-in);
  --ease-move: var(--ease-in-out);
  --ease-bounce: var(--ease-fluid);
}
```

---

## 八、边框令牌 (Border Tokens)

### 8.1 圆角令牌

```css
:root {
  /* 圆角尺度 */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;
  --radius-full: 9999px;
  
  /* 语义化圆角 */
  --radius-button: var(--radius-xl);      /* 按钮 12px */
  --radius-card: var(--radius-2xl);       /* 卡片 16px */
  --radius-modal: var(--radius-2xl);      /* 模态框 16px */
  --radius-input: var(--radius-lg);       /* 输入框 8px */
  --radius-badge: var(--radius-full);     /* 徽章 完全圆 */
}
```

---

### 8.2 无界边框（渐变）

```css
:root {
  /* 水平渐变分隔线 */
  --border-gradient-horizontal: linear-gradient(
    to right, 
    transparent, 
    rgba(148, 163, 184, 0.3), 
    transparent
  );
  
  /* 垂直渐变分隔线 */
  --border-gradient-vertical: linear-gradient(
    to bottom, 
    transparent, 
    rgba(148, 163, 184, 0.3), 
    transparent
  );
  
  /* 青色渐变边框 */
  --border-gradient-cyan: linear-gradient(
    135deg,
    rgba(6, 182, 212, 0.5),
    rgba(34, 211, 238, 0.5)
  );
}
```

---

## 九、Z轴令牌 (Z-Index Tokens)

```css
:root {
  /* Z轴层级（含对应模糊度） */
  --z-base: 0;              /* blur: 0px */
  --z-dropdown: 10;         /* blur: 8px */
  --z-sticky: 20;           /* blur: 10px */
  --z-fixed: 30;            /* blur: 12px */
  --z-overlay: 40;          /* blur: 20px */
  --z-modal: 50;            /* blur: 24px */
  --z-popover: 60;          /* blur: 16px */
  --z-tooltip: 70;          /* blur: 8px */
  --z-notification: 80;     /* blur: 10px */
  --z-max: 9999;            /* blur: 30px */
}
```

---

## 十、完整令牌导出

### 10.1 CSS 变量（完整版）

```css
/* globals.css */
:root {
  /* ========== 颜色 ========== */
  
  /* 主色 */
  --color-primary: #06b6d4;
  --gradient-primary: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
  
  /* 中性色 */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  
  /* 功能色 */
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;
  
  /* ========== 间距 ========== */
  
  --spacing-unit: 8px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  
  /* ========== 字体 ========== */
  
  --font-sans: 'Inter', 'PingFang SC', -apple-system, sans-serif;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --font-medium: 500;
  --font-semibold: 600;
  
  /* ========== 阴影（无界） ========== */
  
  --shadow-glow: 0 0 20px rgba(6, 182, 212, 0.3);
  --shadow-glow-hover: 0 0 30px rgba(6, 182, 212, 0.4);
  --shadow-borderless: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.08);
  
  /* ========== 模糊 ========== */
  
  --blur-glass: 20px;
  --blur-overlay: 30px;
  
  /* ========== 动画 ========== */
  
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --ease-fluid: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-liquid: cubic-bezier(0.25, 0.1, 0.25, 1);
  
  /* ========== 圆角 ========== */
  
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;
  
  /* ========== Z轴 ========== */
  
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-overlay: 40;
  --z-modal: 50;
}

/* 深色模式覆盖 */
.dark {
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #cbd5e1;
}
```

---

### 10.2 Tailwind 配置

```javascript
// tailwind.config.js - 完整设计令牌配置
module.exports = {
  theme: {
    extend: {
      /* 颜色 */
      colors: {
        // 主色已内置 cyan
        aurora: {
          purple: '#a78bfa',
          pink: '#f472b6',
          orange: '#fb923c',
          green: '#34d399',
        },
      },
      
      /* 间距 */
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      /* 字体 */
      fontFamily: {
        sans: ['Inter', 'PingFang SC', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1.4' }],
      },
      
      /* 阴影 - 无界专用 */
      boxShadow: {
        'glow-sm': '0 0 10px rgba(6, 182, 212, 0.2)',
        'glow': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-lg': '0 0 30px rgba(6, 182, 212, 0.4)',
        'glow-xl': '0 0 40px rgba(6, 182, 212, 0.5)',
        'glow-2xl': '0 0 60px rgba(6, 182, 212, 0.6)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-error': '0 0 20px rgba(239, 68, 68, 0.4)',
        'borderless': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.08)',
        'borderless-hover': '0 0 0 1px rgba(6, 182, 212, 0.1), 0 0 30px rgba(6, 182, 212, 0.15), 0 16px 48px rgba(0, 0, 0, 0.12)',
      },
      
      /* 模糊 */
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
        'heavy': '30px',
      },
      
      /* 渐变背景 */
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'divider-h': 'linear-gradient(to right, transparent, rgba(148, 163, 184, 0.3), transparent)',
        'divider-v': 'linear-gradient(to bottom, transparent, rgba(148, 163, 184, 0.3), transparent)',
      },
      
      /* 动画 */
      transitionDuration: {
        'instant': '100ms',
        'fast': '150ms',
      },
      transitionTimingFunction: {
        'fluid': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'liquid': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      
      /* Z轴 */
      zIndex: {
        'dropdown': '10',
        'sticky': '20',
        'fixed': '30',
        'overlay': '40',
        'modal': '50',
        'popover': '60',
        'tooltip': '70',
        'notification': '80',
      },
      
      /* 最小尺寸 */
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    
    // 自定义无界工具类
    function({ addUtilities }) {
      addUtilities({
        '.bg-borderless': {
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 70%, rgba(255, 255, 255, 0.3) 90%, transparent 100%)',
        },
        '.bg-borderless-dark': {
          background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.9) 0%, rgba(30, 41, 59, 0.6) 70%, rgba(30, 41, 59, 0.2) 90%, transparent 100%)',
        },
      });
    },
  ],
};
```

---

### 10.3 JavaScript 对象

```javascript
// tokens.js - JavaScript 令牌对象
export const tokens = {
  colors: {
    primary: '#06b6d4',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  
  spacing: {
    unit: 8,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  shadows: {
    glow: '0 0 20px rgba(6, 182, 212, 0.3)',
    glowHover: '0 0 30px rgba(6, 182, 212, 0.4)',
    borderless: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.08)',
  },
  
  blur: {
    glass: 20,
    overlay: 30,
    modal: 24,
  },
  
  animation: {
    duration: {
      instant: 100,
      fast: 150,
      normal: 200,
      slow: 300,
    },
    easing: {
      fluid: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      liquid: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    },
  },
  
  radius: {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    full: 9999,
  },
  
  zIndex: {
    dropdown: 10,
    sticky: 20,
    overlay: 40,
    modal: 50,
    tooltip: 70,
  },
};

// 使用示例
import { tokens } from './tokens';

const styles = {
  boxShadow: tokens.shadows.glow,
  backdropFilter: `blur(${tokens.blur.glass}px)`,
  transition: `all ${tokens.animation.duration.normal}ms ${tokens.animation.easing.fluid}`,
};
```

---

### 10.4 设计工具导出 (Figma)

```javascript
// figma-tokens.json - 可导入Figma的令牌
{
  "global": {
    "colors": {
      "primary": {
        "value": "#06b6d4",
        "type": "color"
      },
      "gradient-primary": {
        "value": "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)",
        "type": "gradient"
      }
    },
    "spacing": {
      "unit": {
        "value": "8px",
        "type": "spacing"
      },
      "sm": {
        "value": "{spacing.unit}",
        "type": "spacing"
      },
      "md": {
        "value": "{spacing.unit} * 2",
        "type": "spacing"
      }
    },
    "effects": {
      "shadow-glow": {
        "value": {
          "x": 0,
          "y": 0,
          "blur": 20,
          "spread": 0,
          "color": "rgba(6, 182, 212, 0.3)"
        },
        "type": "boxShadow"
      },
      "blur-glass": {
        "value": "20px",
        "type": "blur"
      }
    },
    "borderRadius": {
      "xl": {
        "value": "12px",
        "type": "borderRadius"
      },
      "2xl": {
        "value": "16px",
        "type": "borderRadius"
      }
    }
  }
}
```

---

## 十一、令牌使用示例

### 组件中使用令牌

```jsx
// 使用 CSS 变量
function BorderlessCard() {
  return (
    <div
      className="p-[--spacing-card] rounded-[--radius-card]"
      style={{
        background: 'var(--gradient-borderless)',
        backdropFilter: 'blur(var(--blur-glass))',
        boxShadow: 'var(--shadow-borderless)',
      }}
    >
      内容
    </div>
  );
}

// 使用 Tailwind 类
function Example() {
  return (
    <div className="
      p-6                    /* spacing-6: 24px */
      rounded-2xl            /* radius-2xl: 16px */
      shadow-borderless      /* 无界阴影 */
      backdrop-blur-glass    /* 玻璃模糊 */
      bg-borderless          /* 无界背景 */
    ">
      内容
    </div>
  );
}
```

---

## 十二、令牌管理最佳实践

### 12.1 命名规范

```
结构：[category]-[property]-[variant?]-[state?]

示例：
  color-primary           ✅
  color-primary-light     ✅
  color-text-secondary    ✅
  shadow-glow-hover       ✅
  
  blueColor              ❌ 不语义化
  buttonPaddingLarge     ❌ 太具体
```

### 12.2 令牌分层

```
Tier 1: 原始令牌（Raw Tokens）
  --color-cyan-500: #06b6d4

Tier 2: 语义令牌（Semantic Tokens）
  --color-primary: var(--color-cyan-500)

Tier 3: 组件令牌（Component Tokens）
  --button-bg-primary: var(--color-primary)
```

### 12.3 更新策略

```
1. 修改原始令牌 → 全局生效
2. 修改语义令牌 → 影响特定场景
3. 修改组件令牌 → 仅影响单个组件

优先修改高层令牌，避免直接修改原始值
```

---

## 十三、设计令牌检查清单

### 令牌完整性
- [ ] 所有颜色都有对应令牌
- [ ] 所有间距都有对应令牌
- [ ] 所有阴影都有对应令牌（包括光晕）
- [ ] 所有模糊度都有对应令牌
- [ ] 所有动画参数都有对应令牌
- [ ] 深色模式令牌完整

### 无界令牌验证
- [ ] 有完整的光晕阴影令牌
- [ ] 有完整的模糊度令牌
- [ ] 有渐变背景令牌
- [ ] 有渐变边框令牌
- [ ] 无 border-width 令牌（因为无边框）

### 命名规范
- [ ] 使用语义化命名
- [ ] 分层清晰（原始/语义/组件）
- [ ] 命名一致（kebab-case）
- [ ] 有注释说明用途

### 使用规范
- [ ] 组件中优先使用令牌
- [ ] 避免硬编码值
- [ ] 令牌值有单位
- [ ] Tailwind配置引用令牌

---

**设计令牌是设计系统的DNA，确保每个像素都有理可依。**  
**无界令牌让代码也像水一样流动。** 💧✨

