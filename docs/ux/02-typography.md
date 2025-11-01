# 主要内容预览

## 一、字体哲学
- 流动的文字理念
- 排版三原则（功能优先、呼吸感、数字友好）

## 二、字体家族 (Font Family)
- 西文字体栈（Inter、等宽、显示）
- 中文字体栈（苹方、雅黑、思源）
- 字体加载策略

## 三、字阶系统 (Type Scale)
- 基础设置（16px基准、1.25比例）
- 完整字阶表（10px-48px）
- Tailwind 配置

## 四、字重系统 (Font Weight)
- 字重定义（300-700）
- 使用规范与禁止场景
- 组合示例

## 五、行高与间距
- 行高系统（1.0-2.0）
- 使用规则
- 段落间距、垂直节奏

## 六、字符间距 (Letter Spacing)
- 间距定义（-0.05em 至 0.1em）
- 使用场景（标题压缩、大写字母）
- 禁用场景

## 七、文本样式预设
- 标题样式组（Hero、Page、Section、Card）
- 正文样式组（Main、Secondary、Caption）
- 特殊样式组（文件名、大小、时间戳、按钮、标签）

## 八、数字与表格排版
- 等宽数字 vs 旧式数字
- 表格文字对齐
- 数字列处理

## 九、响应式排版
- 断点缩放策略
- 响应式字阶

## 十、特殊文字处理
- 截断文字（单行、多行）
- 文字换行规则
- 大小写转换

## 十一、无障碍排版
- 最小字号要求
- 最大行宽建议
- 对比度标准
- 焦点可见性

## 十二、排版最佳实践
- 信息层级、阅读节奏、数字对齐

## 十三、排版检查清单
- 12项质量验证标准

---

# 字体排版系统设计规范

**版本**: v1.0  
**设计理念**: 流体科技 (Fluid Technology)  
**更新日期**: 2025-11-01

---

## 一、字体哲学

### 流动的文字
压缩包管理工具的文字应该像**数据流**一样：

```
清晰易读 → 快速扫描 → 高效决策
轻盈流畅 → 不拖沓 → 不冗余
层次分明 → 关键信息突出 → 次要信息退后
```

### 排版三原则

1. **功能优先**: 可读性 > 美观性，信息密度要适中
2. **呼吸感**: 文字需要空间，行高和字间距要舒适
3. **数字友好**: 等宽数字，对齐清晰，便于比较文件大小和时间

---

## 二、字体家族 (Font Family)

### 西文字体栈

```css
/* 主字体 - 界面文字 */
--font-sans: 
  'Inter', 
  -apple-system, 
  BlinkMacSystemFont, 
  'Segoe UI', 
  'Roboto', 
  'Helvetica Neue', 
  Arial, 
  sans-serif,
  'Apple Color Emoji', 
  'Segoe UI Emoji';

/* 等宽字体 - 代码、路径、数字 */
--font-mono: 
  'JetBrains Mono',
  'Fira Code',
  'SF Mono', 
  'Monaco', 
  'Cascadia Code',
  'Consolas', 
  'Courier New', 
  monospace;

/* 显示字体 - 标题、Logo */
--font-display: 
  'Inter', 
  -apple-system, 
  BlinkMacSystemFont, 
  sans-serif;
```

### 中文字体栈

```css
/* 主字体 - 界面文字 */
--font-sans-zh: 
  'PingFang SC',      /* macOS 苹方 */
  'Microsoft YaHei',  /* Windows 微软雅黑 */
  'Noto Sans CJK SC', /* Linux/Android */
  'Source Han Sans',  /* Adobe 思源黑体 */
  sans-serif;

/* 等宽字体 - 代码、路径 */
--font-mono-zh: 
  'SF Mono SC',
  'PingFang SC',
  'Microsoft YaHei',
  monospace;
```

### 完整字体声明

```css
body {
  font-family: 
    'Inter', 
    'PingFang SC', 
    -apple-system, 
    BlinkMacSystemFont, 
    'Segoe UI',
    'Microsoft YaHei',
    sans-serif;
}

code, .path, .filename {
  font-family: 
    'JetBrains Mono',
    'SF Mono',
    'PingFang SC',
    monospace;
}
```

### 字体加载策略

```html
<!-- Google Fonts 加载 - 仅英文界面 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- 可选：JetBrains Mono -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
/* 字体加载优化 */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* 避免 FOIT */
  src: url('/fonts/inter-regular.woff2') format('woff2');
}
```

---

## 三、字阶系统 (Type Scale)

### 基础设置

```css
/* 基准字号 */
--text-base-size: 16px;     /* 1rem */
--text-line-height: 1.5;    /* 24px */

/* 比例系数 - 大三度音阶 (Major Third = 1.25) */
--scale-ratio: 1.25;
```

### 完整字阶表

| 名称 | 变量名 | 字号 | 行高 | 用途 |
|------|--------|------|------|------|
| **显示** Display | `text-5xl` | 48px (3rem) | 1.1 (52.8px) | 首页大标题、空状态标题 |
| **大标题** Heading 1 | `text-4xl` | 36px (2.25rem) | 1.2 (43.2px) | 页面主标题 |
| **二级标题** Heading 2 | `text-3xl` | 30px (1.875rem) | 1.3 (39px) | 区块标题 |
| **三级标题** Heading 3 | `text-2xl` | 24px (1.5rem) | 1.4 (33.6px) | 卡片标题、对话框标题 |
| **四级标题** Heading 4 | `text-xl` | 20px (1.25rem) | 1.4 (28px) | 列表组标题 |
| **大正文** Large Body | `text-lg` | 18px (1.125rem) | 1.5 (27px) | 重点说明文字 |
| **正文** Body | `text-base` | 16px (1rem) | 1.5 (24px) | ★ 主要内容 |
| **小正文** Small Body | `text-sm` | 14px (0.875rem) | 1.5 (21px) | 辅助信息、按钮文字 |
| **极小** Caption | `text-xs` | 12px (0.75rem) | 1.4 (16.8px) | 时间戳、标签、提示 |
| **微型** Tiny | `text-2xs` | 10px (0.625rem) | 1.4 (14px) | 角标、徽章数字 |

### Tailwind CSS 配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      '2xs': ['0.625rem', { lineHeight: '1.4' }],  // 10px
      'xs':  ['0.75rem',  { lineHeight: '1.4' }],  // 12px
      'sm':  ['0.875rem', { lineHeight: '1.5' }],  // 14px
      'base':['1rem',     { lineHeight: '1.5' }],  // 16px
      'lg':  ['1.125rem', { lineHeight: '1.5' }],  // 18px
      'xl':  ['1.25rem',  { lineHeight: '1.4' }],  // 20px
      '2xl': ['1.5rem',   { lineHeight: '1.4' }],  // 24px
      '3xl': ['1.875rem', { lineHeight: '1.3' }],  // 30px
      '4xl': ['2.25rem',  { lineHeight: '1.2' }],  // 36px
      '5xl': ['3rem',     { lineHeight: '1.1' }],  // 48px
    },
  },
}
```

---

## 四、字重系统 (Font Weight)

### 字重定义

```css
--font-light:      300;  /* 轻 - 装饰性文字 */
--font-normal:     400;  /* ★ 常规 - 正文 */
--font-medium:     500;  /* 中等 - 按钮、标签 */
--font-semibold:   600;  /* 半粗 - 小标题、强调 */
--font-bold:       700;  /* 粗体 - 大标题 */
```

### 使用规范

| 字重 | Tailwind类 | 使用场景 | 禁止场景 |
|------|-----------|---------|---------|
| 300 | `font-light` | 大标题（48px+）的装饰性减重 | ❌ 小于 16px 的文字 |
| 400 | `font-normal` | ✅ 正文、描述、段落 | - |
| 500 | `font-medium` | 按钮文字、Tab标签、表单标签 | ❌ 长段落 |
| 600 | `font-semibold` | 列表项标题、卡片标题、强调文字 | ❌ 正文段落 |
| 700 | `font-bold` | 页面标题、数字强调、警告信息 | ❌ 大面积使用 |

### 组合示例

```jsx
/* ✅ 正确：层次清晰 */
<div>
  <h1 className="text-4xl font-bold text-slate-900">      {/* 标题 */}
    解压工具
  </h1>
  <p className="text-base font-normal text-slate-600">    {/* 正文 */}
    快速管理您的压缩文件
  </p>
  <span className="text-sm font-medium text-cyan-600">   {/* 标签 */}
    新功能
  </span>
</div>

/* ❌ 错误：字重混乱 */
<div>
  <h1 className="text-4xl font-normal">                   {/* 标题太轻 */}
    解压工具
  </h1>
  <p className="text-base font-bold">                     {/* 正文太重 */}
    快速管理您的压缩文件
  </p>
</div>
```

---

## 五、行高与间距 (Line Height & Spacing)

### 行高系统

```css
--leading-none:     1.0;   /* 紧凑 - 大标题单行 */
--leading-tight:    1.25;  /* 紧 - 多行标题 */
--leading-snug:     1.375; /* 舒适 - 按钮文字 */
--leading-normal:   1.5;   /* ★ 标准 - 正文 */
--leading-relaxed:  1.625; /* 放松 - 长文本 */
--leading-loose:    2.0;   /* 宽松 - 诗歌/引用 */
```

### 使用规则

```
字号越大 → 行高越小（1.1 - 1.3）
字号越小 → 行高越大（1.4 - 1.6）

标题   → 紧凑 (1.1 - 1.3)
正文   → 标准 (1.5)
说明文 → 放松 (1.6 - 1.75)
```

### 段落间距

```css
/* 段落底部间距 */
p {
  margin-bottom: 1em;  /* 相对单位，随字号缩放 */
}

/* 标题与正文间距 */
h1, h2, h3 {
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}

/* 列表项间距 */
li {
  margin-bottom: 0.5em;
}
```

### Tailwind 间距类

```jsx
/* 垂直节奏 */
<div className="space-y-6">         {/* 组件间距 24px */}
  <div className="space-y-2">       {/* 标题与正文 8px */}
    <h2 className="text-2xl font-semibold">标题</h2>
    <p className="text-base text-slate-600">正文内容</p>
  </div>
  
  <ul className="space-y-3">        {/* 列表项间距 12px */}
    <li>项目一</li>
    <li>项目二</li>
  </ul>
</div>
```

---

## 六、字符间距 (Letter Spacing)

### 间距定义

```css
--tracking-tighter:  -0.05em;  /* 极紧 - 大标题压缩 */
--tracking-tight:    -0.025em; /* 紧 - 标题优化 */
--tracking-normal:   0em;      /* ★ 标准 - 正文 */
--tracking-wide:     0.025em;  /* 宽 - 全大写文字 */
--tracking-wider:    0.05em;   /* 更宽 - 按钮文字 */
--tracking-widest:   0.1em;    /* 最宽 - 装饰性大写 */
```

### 使用场景

```jsx
/* 大标题 - 稍微压缩 */
<h1 className="text-5xl font-bold tracking-tight">
  UNZIP PRO
</h1>

/* 正文 - 默认 */
<p className="text-base tracking-normal">
  这是一段正文内容
</p>

/* 全大写按钮 - 增加间距 */
<button className="uppercase text-sm font-medium tracking-wider">
  UPLOAD FILE
</button>

/* 装饰性文字 */
<span className="text-xs uppercase tracking-widest text-slate-400">
  BETA
</span>
```

### 禁用场景

```
❌ 不要在中文正文使用 tracking（会破坏字形）
❌ 不要在小字号（<14px）使用负间距
✅ 只在西文大写、大标题使用非零间距
```

---

## 七、文本样式预设 (Typography Presets)

### 标题样式组

```css
/* 大标题 - 着陆页 */
.heading-hero {
  font-size: 3rem;           /* 48px */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--neutral-text-primary);
}

/* 页面标题 */
.heading-page {
  font-size: 2.25rem;        /* 36px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: var(--neutral-text-primary);
}

/* 区块标题 */
.heading-section {
  font-size: 1.5rem;         /* 24px */
  font-weight: 600;
  line-height: 1.4;
  color: var(--neutral-text-primary);
}

/* 卡片标题 */
.heading-card {
  font-size: 1.25rem;        /* 20px */
  font-weight: 600;
  line-height: 1.4;
  color: var(--neutral-text-primary);
}
```

### 正文样式组

```css
/* 主正文 */
.body-main {
  font-size: 1rem;           /* 16px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--neutral-text-primary);
}

/* 辅助正文 */
.body-secondary {
  font-size: 0.875rem;       /* 14px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--neutral-text-secondary);
}

/* 说明文字 */
.body-caption {
  font-size: 0.75rem;        /* 12px */
  font-weight: 400;
  line-height: 1.4;
  color: var(--neutral-text-tertiary);
}
```

### 特殊样式组

```css
/* 文件名/路径 */
.text-filename {
  font-family: var(--font-mono);
  font-size: 0.875rem;       /* 14px */
  font-weight: 500;
  color: var(--neutral-text-primary);
  word-break: break-all;
}

/* 文件大小 */
.text-filesize {
  font-family: var(--font-mono);
  font-size: 0.75rem;        /* 12px */
  font-weight: 400;
  color: var(--neutral-text-secondary);
  font-variant-numeric: tabular-nums; /* 等宽数字 */
}

/* 时间戳 */
.text-timestamp {
  font-family: var(--font-mono);
  font-size: 0.75rem;        /* 12px */
  font-weight: 400;
  color: var(--neutral-text-tertiary);
  font-variant-numeric: tabular-nums;
}

/* 按钮文字 */
.text-button {
  font-size: 0.875rem;       /* 14px */
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.025em;
}

/* 标签文字 */
.text-badge {
  font-size: 0.75rem;        /* 12px */
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Tailwind 快捷类

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--neutral-text-primary)',
            lineHeight: '1.5',
            p: {
              marginBottom: '1em',
            },
            h1: {
              fontSize: '2.25rem',
              fontWeight: '700',
              lineHeight: '1.2',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '600',
              lineHeight: '1.3',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            // ... 更多预设
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

---

## 八、数字与表格排版

### 数字样式

```css
/* 等宽数字 - 用于对齐 */
.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum"; /* OpenType 特性 */
}

/* 旧式数字 - 用于正文 */
.oldstyle-nums {
  font-variant-numeric: oldstyle-nums;
  font-feature-settings: "onum";
}

/* 使用示例 */
<div className="font-mono tabular-nums">
  1,234.56 MB
    987.12 KB
     45.00 GB
</div>
```

### 表格文字对齐

```css
/* 表头 */
thead th {
  font-size: 0.75rem;        /* 12px */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--neutral-text-secondary);
  text-align: left;
  padding: 12px 16px;
}

/* 表格单元格 */
tbody td {
  font-size: 0.875rem;       /* 14px */
  font-weight: 400;
  color: var(--neutral-text-primary);
  padding: 12px 16px;
}

/* 数字列右对齐 */
.table-cell-number {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-family: var(--font-mono);
}

/* 日期/时间列 */
.table-cell-datetime {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--neutral-text-secondary);
}
```

---

## 九、响应式排版

### 断点缩放

```css
/* 移动端基准 */
html {
  font-size: 14px;  /* 基准缩小 */
}

/* 平板及以上 */
@media (min-width: 768px) {
  html {
    font-size: 15px;
  }
}

/* 桌面端 */
@media (min-width: 1024px) {
  html {
    font-size: 16px;  /* 标准基准 */
  }
}

/* 大屏 */
@media (min-width: 1920px) {
  html {
    font-size: 18px;  /* 适当放大 */
  }
}
```

### 响应式字阶

```jsx
/* 移动端标题更小 */
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  压缩包管理
</h1>

/* 移动端正文稍小 */
<p className="text-sm md:text-base">
  描述文字
</p>

/* 移动端行高调整 */
<article className="leading-relaxed md:leading-normal">
  长文本内容...
</article>
```

---

## 十、特殊文字处理

### 截断文字

```css
/* 单行截断 */
.truncate-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行截断（2行） */
.truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tailwind 用法 */
<p className="truncate max-w-xs">
  超长文件名会被截断.zip
</p>

<p className="line-clamp-2">
  这是一段很长的描述文字，
  会在第二行截断...
</p>
```

### 文字换行

```css
/* 文件路径 - 允许断行 */
.break-path {
  word-break: break-all;
  overflow-wrap: break-word;
}

/* 正常单词断行 */
.break-words {
  overflow-wrap: break-word;
  word-wrap: break-word;
}

/* 保持不换行 */
.whitespace-nowrap {
  white-space: nowrap;
}
```

### 大小写转换

```jsx
/* 全大写 - 按钮、标签 */
<span className="uppercase">upload</span>
{/* UPLOAD */}

/* 全小写 */
<span className="lowercase">README.TXT</span>
{/* readme.txt */}

/* 首字母大写 */
<span className="capitalize">file manager</span>
{/* File Manager */}

/* 正常（不转换） */
<span className="normal-case">MixedCase.zip</span>
{/* MixedCase.zip */}
```

---

## 十一、无障碍排版

### 最小字号

```
绝对最小值：12px
建议最小值：14px（正文）
最佳实践：16px（主正文）
```

### 最大行宽

```css
/* 正文最大宽度 - 保证可读性 */
.prose {
  max-width: 65ch;  /* 65个字符宽度 */
}

/* 不同字号的最佳行宽 */
14px → 55-65ch
16px → 60-75ch
18px → 65-80ch
```

### 对比度要求

```
WCAG AA 标准（最低要求）：
- 正文（<18px）：4.5:1
- 大文字（≥18px 或 粗体14px）：3:1

WCAG AAA 标准（推荐）：
- 正文（<18px）：7:1
- 大文字：4.5:1
```

### 焦点可见性

```css
/* 键盘焦点必须清晰可见 */
a:focus, button:focus {
  outline: 2px solid var(--cyan-500);
  outline-offset: 2px;
}

/* 或使用 ring */
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px var(--cyan-500);
}
```

---

## 十二、排版最佳实践

### 信息层级

```jsx
/* ✅ 正确：清晰的视觉层级 */
<div className="space-y-4">
  {/* 一级：页面标题 */}
  <h1 className="text-4xl font-bold text-slate-900">
    我的文件
  </h1>
  
  {/* 二级：区块标题 */}
  <h2 className="text-2xl font-semibold text-slate-800">
    最近解压
  </h2>
  
  {/* 三级：卡片标题 */}
  <h3 className="text-xl font-semibold text-slate-700">
    项目文件.zip
  </h3>
  
  {/* 正文 */}
  <p className="text-base text-slate-600">
    包含 245 个文件
  </p>
  
  {/* 辅助信息 */}
  <span className="text-sm text-slate-500">
    2 小时前
  </span>
</div>

/* ❌ 错误：层级混乱 */
<div>
  <h1 className="text-base">我的文件</h1>         {/* 标题太小 */}
  <p className="text-4xl font-bold">包含 245 个文件</p>  {/* 正文太大 */}
</div>
```

### 阅读节奏

```jsx
/* ✅ 正确：舒适的垂直节奏 */
<article className="space-y-6">
  <h2 className="text-3xl font-bold mb-4">标题</h2>
  
  <p className="text-base leading-relaxed mb-4">
    第一段正文...
  </p>
  
  <p className="text-base leading-relaxed mb-4">
    第二段正文...
  </p>
  
  <ul className="space-y-3 ml-6 list-disc">
    <li>列表项一</li>
    <li>列表项二</li>
  </ul>
</article>

/* ❌ 错误：拥挤无呼吸感 */
<article className="space-y-1">
  <h2>标题</h2>
  <p>第一段</p>
  <p>第二段</p>
  <ul>
    <li>列表项</li>
  </ul>
</article>
```

### 数字对齐

```jsx
/* ✅ 正确：等宽数字对齐 */
<table>
  <tbody className="font-mono tabular-nums text-right">
    <tr><td>1,234.56 MB</td></tr>
    <tr><td>  987.12 KB</td></tr>
    <tr><td>   45.00 GB</td></tr>
  </tbody>
</table>

/* ❌ 错误：比例字体参差不齐 */
<div className="font-sans">
  1,234.56 MB
    987.12 KB
     45.00 GB
</div>
```

---

## 十三、排版检查清单

开发完成后，用此清单验证排版质量：

- [ ] 正文字号不小于 14px（移动端）/ 16px（桌面端）
- [ ] 正文行高在 1.5 - 1.75 之间
- [ ] 标题与正文有明显字重差异（至少 200）
- [ ] 段落间距大于行高
- [ ] 长文本行宽不超过 75 字符
- [ ] 所有文字与背景对比度符合 WCAG AA
- [ ] 数字使用等宽字体
- [ ] 文件路径能正确换行
- [ ] 响应式下字号合理缩放
- [ ] 焦点状态清晰可见
- [ ] 中英文混排无字体冲突
- [ ] 大写文字增加了字间距

---

**文字是界面的灵魂，排版是尊重读者的方式。**