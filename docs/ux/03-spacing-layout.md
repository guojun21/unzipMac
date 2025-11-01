# 主要内容预览

## 一、布局哲学
- 流体网格理念（压缩→解压→弹性→层叠）
- 布局三原则（8px网格、呼吸空间、视觉重心）

## 二、间距系统 (Spacing System)
- 8px 基准网格（4px-256px）
- Tailwind 间距映射表

## 三、内边距规范 (Padding)
- 组件内边距（按钮、输入框、卡片、对话框）
- 容器内边距（移动端、平板、桌面）
- 不对称内边距技巧

## 四、外边距规范 (Margin)
- 垂直节奏（组件间距、区块间距）
- 使用示例（列表、区块、表单）
- 负边距技巧

## 五、间隙规范 (Gap)
- Flexbox / Grid 间隙定义
- 使用场景（按钮组、工具栏、网格、标签）

## 六、布局模式 (Layout Patterns)
- 单列布局（内容优先）
- 侧边栏布局（导航+内容）
- 两栏布局（主内容+信息栏）
- 卡片网格（文件列表）
- 居中布局（表单/对话框）
- 头部固定（工具栏布局）

## 七、容器规范 (Container)
- 最大宽度定义（640px-1536px）
- 使用场景
- 响应式容器

## 八、Z轴层次 (Z-Index)
- 层级定义（0-9999）
- Tailwind 映射
- 层叠上下文规则

## 九、滚动区域规范
- 滚动容器（垂直、水平、双向）
- 滚动优化（平滑滚动、自定义滚动条）
- 滚动阴影提示

## 十、响应式布局
- 断点系统（640px-1536px）
- 移动优先策略
- 隐藏/显示元素
- 响应式间距模式

## 十一、特殊布局技巧
- 全屏居中、粘性底部、等高卡片
- 圣杯布局、宽高比容器、分栏布局

## 十二、无障碍布局
- 焦点可见区域
- 触摸目标最小尺寸（44×44px）
- Skip Link（跳过导航）

## 十三、布局检查清单
- 12项质量验证标准

## 十四、Tailwind 完整配置
- 自定义间距、容器、Z轴、触摸目标

---

# 间距与布局规范

**版本**: v1.0  
**设计理念**: 流体科技 (Fluid Technology)  
**更新日期**: 2025-11-01

---

## 一、布局哲学

### 流体网格理念
压缩包解压是**数据从压缩态到展开态的过渡**，布局应模拟这种**流动性**：

```
压缩 → 紧凑但有序 → 高信息密度
解压 → 展开且透气 → 内容自然流动
弹性 → 适应容器 → 响应式伸缩
层叠 → 深度感知 → Z轴层次
```

### 布局三原则

1. **8px 基准网格**: 所有间距必须是 8 的倍数
2. **呼吸空间**: 元素之间需要足够的"水域"来流动
3. **视觉重心**: 重要内容占据视觉中心，次要内容退后

---

## 二、间距系统 (Spacing System)

### 8px 基准网格

```css
/* 基准单位 */
--spacing-unit: 8px;

/* 完整间距尺度 */
--spacing-0:   0px;      /* 0 */
--spacing-1:   4px;      /* 0.5 × 8 - 最小间距 */
--spacing-2:   8px;      /* 1 × 8 - 基准 */
--spacing-3:   12px;     /* 1.5 × 8 */
--spacing-4:   16px;     /* 2 × 8 */
--spacing-5:   20px;     /* 2.5 × 8 */
--spacing-6:   24px;     /* 3 × 8 */
--spacing-8:   32px;     /* 4 × 8 */
--spacing-10:  40px;     /* 5 × 8 */
--spacing-12:  48px;     /* 6 × 8 */
--spacing-16:  64px;     /* 8 × 8 */
--spacing-20:  80px;     /* 10 × 8 */
--spacing-24:  96px;     /* 12 × 8 */
--spacing-32:  128px;    /* 16 × 8 */
--spacing-40:  160px;    /* 20 × 8 */
--spacing-48:  192px;    /* 24 × 8 */
--spacing-64:  256px;    /* 32 × 8 */
```

### Tailwind 间距映射

| Tailwind类 | 像素值 | rem值 | 使用场景 |
|-----------|-------|-------|---------|
| `p-1` / `m-1` | 4px | 0.25rem | 图标内边距、徽章 |
| `p-2` / `m-2` | 8px | 0.5rem | 小按钮内边距 |
| `p-3` / `m-3` | 12px | 0.75rem | 标签内边距 |
| `p-4` / `m-4` | 16px | 1rem | ★ 标准按钮、卡片内边距 |
| `p-6` / `m-6` | 24px | 1.5rem | ★ 卡片间距、区块间距 |
| `p-8` / `m-8` | 32px | 2rem | 大卡片内边距、页面边距 |
| `p-12` / `m-12` | 48px | 3rem | 页面区块间距 |
| `p-16` / `m-16` | 64px | 4rem | 大区块分隔 |
| `p-24` / `m-24` | 96px | 6rem | 页面顶部/底部留白 |

---

## 三、内边距规范 (Padding)

### 组件内边距

```css
/* 按钮 */
.button-small {
  padding: 8px 12px;      /* py-2 px-3 */
}

.button-medium {
  padding: 12px 16px;     /* py-3 px-4 - ★ 标准 */
}

.button-large {
  padding: 16px 24px;     /* py-4 px-6 */
}

/* 输入框 */
.input {
  padding: 12px 16px;     /* py-3 px-4 */
}

/* 卡片 */
.card-compact {
  padding: 16px;          /* p-4 */
}

.card-comfortable {
  padding: 24px;          /* p-6 - ★ 标准 */
}

.card-spacious {
  padding: 32px;          /* p-8 */
}

/* 对话框 */
.dialog-content {
  padding: 24px;          /* p-6 */
}

.dialog-large {
  padding: 32px;          /* p-8 */
}
```

### 容器内边距

```jsx
/* 移动端 - 较小内边距 */
<div className="px-4 py-6">
  {/* 左右 16px，上下 24px */}
</div>

/* 平板端 - 标准内边距 */
<div className="px-6 py-8 md:px-8 md:py-12">
  {/* 响应式增加 */}
</div>

/* 桌面端 - 宽松内边距 */
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  {/* 容器自适应 */}
</div>
```

### 不对称内边距

```jsx
/* ✅ 正确：顶部小，底部大 - 视觉平衡 */
<header className="pt-6 pb-8">
  导航栏
</header>

/* ✅ 正确：左侧大，右侧小 - 对齐优化 */
<div className="pl-6 pr-4">
  <Icon className="mr-2" />
  文字内容
</div>

/* ❌ 错误：随意的不对称 */
<div className="pt-3 pb-7 pl-5 pr-2">
  {/* 不符合 8px 网格 */}
</div>
```

---

## 四、外边距规范 (Margin)

### 垂直节奏

```css
/* 组件间距 - 垂直方向 */
--gap-components-tight:      16px;  /* space-y-4 - 紧凑列表 */
--gap-components-normal:     24px;  /* space-y-6 - ★ 标准间距 */
--gap-components-relaxed:    32px;  /* space-y-8 - 宽松布局 */

/* 区块间距 */
--gap-sections-small:        48px;  /* space-y-12 */
--gap-sections-medium:       64px;  /* space-y-16 - ★ 标准 */
--gap-sections-large:        96px;  /* space-y-24 */
```

### 使用示例

```jsx
/* 卡片列表 */
<div className="space-y-4">
  <Card />
  <Card />
  <Card />
</div>

/* 页面区块 */
<main className="space-y-16">
  <section>英雄区</section>
  <section>功能区</section>
  <section>底部区</section>
</main>

/* 表单组 */
<form className="space-y-6">
  <div className="space-y-2">
    <label>文件名</label>
    <input />
  </div>
  
  <div className="space-y-2">
    <label>保存路径</label>
    <input />
  </div>
  
  <button>提交</button>
</form>
```

### 负边距技巧

```jsx
/* ✅ 正确：抵消容器内边距 */
<div className="p-6">
  <div className="-mx-6 border-t border-b">
    {/* 让边框延伸到容器边缘 */}
  </div>
</div>

/* ✅ 正确：图片突破容器 */
<div className="max-w-2xl mx-auto px-4">
  <img className="-mx-4 w-screen max-w-none" src="wide.jpg" />
</div>
```

---

## 五、间隙规范 (Gap)

### Flexbox / Grid 间隙

```css
/* Flexbox 间隙 */
--gap-flex-tight:    8px;   /* gap-2 */
--gap-flex-normal:   16px;  /* gap-4 - ★ 标准 */
--gap-flex-relaxed:  24px;  /* gap-6 */

/* Grid 间隙 */
--gap-grid-tight:    16px;  /* gap-4 */
--gap-grid-normal:   24px;  /* gap-6 - ★ 标准 */
--gap-grid-relaxed:  32px;  /* gap-8 */
```

### 使用场景

```jsx
/* 按钮组 - 水平紧凑 */
<div className="flex gap-2">
  <button>取消</button>
  <button>确认</button>
</div>

/* 工具栏 - 标准间距 */
<div className="flex items-center gap-4">
  <IconButton />
  <IconButton />
  <Divider />
  <IconButton />
</div>

/* 文件网格 - 宽松布局 */
<div className="grid grid-cols-3 gap-6">
  <FileCard />
  <FileCard />
  <FileCard />
</div>

/* 标签组 - 紧凑排列 */
<div className="flex flex-wrap gap-2">
  <Tag>ZIP</Tag>
  <Tag>RAR</Tag>
  <Tag>7Z</Tag>
</div>
```

---

## 六、布局模式 (Layout Patterns)

### 1. 单列布局 - 内容优先

```jsx
/* 移动端优先的单列 */
<div className="min-h-screen flex flex-col">
  {/* 头部固定 */}
  <header className="sticky top-0 z-50 bg-white border-b px-4 py-3">
    顶部导航
  </header>
  
  {/* 主内容区 */}
  <main className="flex-1 px-4 py-6 space-y-6">
    <section>内容区块</section>
  </main>
  
  {/* 底部 */}
  <footer className="border-t px-4 py-6">
    底部信息
  </footer>
</div>
```

**间距规范**:
- 页面边距: `px-4` (16px)
- 区块间距: `space-y-6` (24px)
- 头部/底部内边距: `py-3` / `py-6`

### 2. 侧边栏布局 - 导航 + 内容

```jsx
<div className="flex h-screen">
  {/* 侧边栏 - 固定宽度 */}
  <aside className="w-64 border-r bg-slate-50 p-6 space-y-4 overflow-y-auto">
    <nav>导航菜单</nav>
  </aside>
  
  {/* 主内容 - 自适应 */}
  <main className="flex-1 overflow-y-auto">
    <div className="max-w-6xl mx-auto px-8 py-12 space-y-8">
      <section>内容</section>
    </div>
  </main>
</div>
```

**间距规范**:
- 侧边栏宽度: `256px` (w-64)
- 侧边栏内边距: `p-6` (24px)
- 主区域最大宽度: `1152px` (max-w-6xl)
- 主区域内边距: `px-8 py-12`

### 3. 两栏布局 - 主内容 + 信息栏

```jsx
<div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* 主内容 - 占 2/3 */}
    <div className="lg:col-span-2 space-y-6">
      <article>主要内容</article>
    </div>
    
    {/* 侧边信息 - 占 1/3 */}
    <aside className="space-y-4">
      <Card>相关信息</Card>
      <Card>快捷操作</Card>
    </aside>
  </div>
</div>
```

**间距规范**:
- 栏间距: `gap-8` (32px)
- 主栏内间距: `space-y-6` (24px)
- 侧栏内间距: `space-y-4` (16px)

### 4. 卡片网格 - 文件列表

```jsx
/* 响应式网格 */
<div className="grid gap-6 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4
">
  <FileCard />
  <FileCard />
  <FileCard />
  <FileCard />
</div>

/* 或使用自动填充 */
<div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
  <FileCard />
  <FileCard />
</div>
```

**间距规范**:
- 网格间距: `gap-6` (24px)
- 最小卡片宽度: `240px`
- 卡片内边距: `p-4` 或 `p-6`

### 5. 居中布局 - 表单/对话框

```jsx
/* 垂直水平居中 */
<div className="min-h-screen flex items-center justify-center p-4">
  <div className="w-full max-w-md space-y-6">
    <h1 className="text-3xl font-bold text-center">解压文件</h1>
    
    <Card className="p-6 space-y-4">
      <input />
      <button className="w-full">确认</button>
    </Card>
  </div>
</div>
```

**间距规范**:
- 最大宽度: `max-w-md` (448px)
- 外层间距: `p-4` (防止触边)
- 卡片内边距: `p-6` (24px)
- 内部元素间距: `space-y-4` (16px)

### 6. 头部固定 - 工具栏布局

```jsx
<div className="h-screen flex flex-col">
  {/* 固定头部 */}
  <header className="flex-none h-16 border-b px-6 flex items-center justify-between">
    <Logo />
    <Actions />
  </header>
  
  {/* 可滚动内容 */}
  <div className="flex-1 overflow-y-auto">
    <div className="p-6 space-y-6">
      <Content />
    </div>
  </div>
</div>
```

**间距规范**:
- 头部高度: `h-16` (64px)
- 头部水平边距: `px-6` (24px)
- 内容区边距: `p-6` (24px)

---

## 七、容器规范 (Container)

### 最大宽度定义

```css
/* Tailwind 内置容器 */
--container-sm:   640px;   /* max-w-sm */
--container-md:   768px;   /* max-w-md */
--container-lg:   1024px;  /* max-w-lg */
--container-xl:   1280px;  /* max-w-xl */
--container-2xl:  1536px;  /* max-w-2xl */

/* 自定义内容容器 */
--container-prose:    65ch;    /* max-w-prose - 文章阅读 */
--container-content:  896px;   /* max-w-4xl - 主内容 */
--container-wide:     1152px;  /* max-w-6xl - 宽内容 */
```

### 使用场景

```jsx
/* 窄容器 - 表单、对话框 */
<div className="max-w-md mx-auto">
  <Form />
</div>

/* 标准容器 - 文章内容 */
<div className="max-w-4xl mx-auto px-4">
  <Article />
</div>

/* 宽容器 - 仪表盘 */
<div className="max-w-6xl mx-auto px-6">
  <Dashboard />
</div>

/* 全宽 - 背景区块 */
<div className="w-full">
  <div className="max-w-6xl mx-auto px-6">
    <Content />
  </div>
</div>
```

### 响应式容器

```jsx
/* 移动端到桌面端逐步放宽 */
<div className="
  px-4 sm:px-6 lg:px-8
  max-w-full sm:max-w-xl lg:max-w-6xl
  mx-auto
">
  内容
</div>
```

---

## 八、Z轴层次 (Z-Index)

### 层级定义

```css
/* Z轴分层系统 */
--z-base:          0;     /* 基础层 - 正常文档流 */
--z-dropdown:      10;    /* 下拉菜单 */
--z-sticky:        20;    /* 粘性定位 */
--z-fixed:         30;    /* 固定定位 */
--z-overlay:       40;    /* 遮罩层 */
--z-modal:         50;    /* 模态框 */
--z-popover:       60;    /* 弹出框 */
--z-tooltip:       70;    /* 工具提示 */
--z-notification:  80;    /* 通知 */
--z-max:           9999;  /* 最高层 - 紧急提示 */
```

### Tailwind 映射

```jsx
/* 下拉菜单 */
<div className="absolute z-10 mt-2 bg-white shadow-lg">
  下拉内容
</div>

/* 粘性头部 */
<header className="sticky top-0 z-20 bg-white">
  导航栏
</header>

/* 遮罩层 */
<div className="fixed inset-0 z-40 bg-black/50" />

/* 模态框 */
<div className="fixed inset-0 z-50 flex items-center justify-center">
  <Modal />
</div>

/* 工具提示 */
<div className="absolute z-[70] px-2 py-1 bg-slate-900 text-white text-xs">
  提示文字
</div>
```

### 层叠上下文规则

```jsx
/* ✅ 正确：子元素 z-index 在父上下文内 */
<div className="relative z-10">
  <div className="absolute z-20">高于父元素</div>
</div>

/* ❌ 错误：z-index 冲突 */
<div className="absolute z-50">
  <Modal />
</div>
<div className="fixed z-60">
  {/* 可能被遮挡，因为不在同一层叠上下文 */}
</div>

/* ✅ 正确：使用 Portal */
<div className="relative">
  <button>打开</button>
</div>
<Portal>
  <div className="fixed inset-0 z-50">
    <Modal />
  </div>
</Portal>
```

---

## 九、滚动区域规范

### 滚动容器

```jsx
/* 垂直滚动 - 文件列表 */
<div className="h-96 overflow-y-auto overflow-x-hidden">
  <div className="space-y-2 p-4">
    <FileItem />
    <FileItem />
    {/* ... 更多项目 */}
  </div>
</div>

/* 水平滚动 - 标签栏 */
<div className="overflow-x-auto overflow-y-hidden">
  <div className="flex gap-2 px-4 py-2 min-w-max">
    <Tab />
    <Tab />
    <Tab />
  </div>
</div>

/* 双向滚动 - 大表格 */
<div className="overflow-auto max-h-screen">
  <table className="min-w-full">
    <LargeTable />
  </table>
</div>
```

### 滚动优化

```css
/* 平滑滚动 */
.smooth-scroll {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* iOS 惯性滚动 */
}

/* 自定义滚动条 - Webkit */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}

/* Tailwind 插件 */
@layer utilities {
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
  }
}
```

### 滚动阴影提示

```jsx
/* 顶部渐变遮罩 - 提示可滚动 */
<div className="relative">
  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
  
  <div className="h-96 overflow-y-auto">
    <Content />
  </div>
  
  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
</div>
```

---

## 十、响应式布局

### 断点系统

```css
/* Tailwind 默认断点 */
--breakpoint-sm:   640px;   /* 手机横屏 */
--breakpoint-md:   768px;   /* 平板竖屏 */
--breakpoint-lg:   1024px;  /* 平板横屏 / 小笔记本 */
--breakpoint-xl:   1280px;  /* 桌面 */
--breakpoint-2xl:  1536px;  /* 大屏 */
```

### 移动优先策略

```jsx
/* ✅ 正确：从小到大渐进增强 */
<div className="
  px-4              {/* 移动端：16px */}
  md:px-6           {/* 平板：24px */}
  lg:px-8           {/* 桌面：32px */}
  
  grid 
  grid-cols-1       {/* 移动端：单列 */}
  md:grid-cols-2    {/* 平板：两列 */}
  lg:grid-cols-3    {/* 桌面：三列 */}
  
  gap-4             {/* 移动端：16px */}
  md:gap-6          {/* 平板：24px */}
  lg:gap-8          {/* 桌面：32px */}
">
  <Card />
</div>

/* ❌ 错误：桌面优先（难维护） */
<div className="px-8 md:px-6 sm:px-4">
  {/* 反向思维，容易遗漏断点 */}
</div>
```

### 隐藏/显示元素

```jsx
/* 移动端隐藏侧边栏 */
<aside className="hidden lg:block w-64">
  侧边栏
</aside>

/* 移动端显示汉堡菜单 */
<button className="lg:hidden">
  <MenuIcon />
</button>

/* 响应式文字大小 */
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  标题
</h1>
```

### 响应式间距模式

```jsx
/* 模式一：等比缩放 */
<div className="
  space-y-4 
  md:space-y-6 
  lg:space-y-8
">
  {/* 16px → 24px → 32px */}
</div>

/* 模式二：固定基础 + 大屏放宽 */
<div className="
  px-4 
  lg:px-8 
  2xl:px-12
">
  {/* 16px → 32px → 48px */}
</div>

/* 模式三：移动紧凑 + 桌面标准 */
<div className="
  p-4 
  md:p-6
">
  {/* 移动端 16px，其他 24px */}
</div>
```

---

## 十一、特殊布局技巧

### 1. 全屏居中

```jsx
/* 方法一：Flexbox */
<div className="min-h-screen flex items-center justify-center">
  <Content />
</div>

/* 方法二：Grid */
<div className="min-h-screen grid place-items-center">
  <Content />
</div>

/* 方法三：绝对定位（不推荐，除非必要） */
<div className="relative min-h-screen">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <Content />
  </div>
</div>
```

### 2. 粘性底部

```jsx
/* Flexbox 方法 */
<div className="min-h-screen flex flex-col">
  <header>头部</header>
  <main className="flex-1">内容</main>
  <footer>底部始终在底</footer>
</div>

/* Grid 方法 */
<div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
  <header>头部</header>
  <main>内容</main>
  <footer>底部</footer>
</div>
```

### 3. 等高卡片

```jsx
/* Grid 自动等高 */
<div className="grid grid-cols-3 gap-6">
  <Card>短内容</Card>
  <Card>很长很长的内容...</Card>
  <Card>中等内容</Card>
</div>

/* Flexbox 手动拉伸 */
<div className="flex gap-6">
  <Card className="flex-1">内容一</Card>
  <Card className="flex-1">内容二</Card>
</div>
```

### 4. 圣杯布局（三栏）

```jsx
<div className="flex h-screen">
  {/* 左侧边栏 */}
  <aside className="w-64 flex-none">左</aside>
  
  {/* 主内容 */}
  <main className="flex-1 overflow-auto">中</main>
  
  {/* 右侧边栏 */}
  <aside className="w-80 flex-none">右</aside>
</div>
```

### 5. 宽高比容器

```jsx
/* 16:9 视频容器 */
<div className="aspect-video bg-slate-200">
  <video className="w-full h-full object-cover" />
</div>

/* 1:1 正方形 */
<div className="aspect-square">
  <img className="w-full h-full object-cover" />
</div>

/* 自定义比例 */
<div className="aspect-[4/3]">
  内容
</div>
```

### 6. 分栏布局（多列文本）

```jsx
/* CSS Columns */
<div className="columns-2 md:columns-3 gap-8">
  <p>长文本会自动分栏...</p>
</div>

/* 防止图片断裂 */
<div className="columns-2 gap-8">
  <img className="break-inside-avoid" />
  <p>文本内容...</p>
</div>
```

---

## 十二、无障碍布局

### 焦点可见区域

```jsx
/* 确保焦点元素有足够空间 */
<button className="
  px-4 py-2 
  focus:outline-none 
  focus:ring-2 
  focus:ring-cyan-500 
  focus:ring-offset-2
">
  {/* ring-offset-2 = 8px 外边距 */}
  按钮
</button>
```

### 触摸目标最小尺寸

```jsx
/* ✅ 正确：最小 44×44px 触摸区 */
<button className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center">
  <Icon size={20} />
</button>

/* ❌ 错误：触摸区太小 */
<button className="p-1">
  <Icon size={16} />
</button>
```

### Skip Link（跳过导航）

```jsx
<a 
  href="#main-content" 
  className="
    sr-only 
    focus:not-sr-only 
    focus:absolute 
    focus:top-4 
    focus:left-4 
    focus:z-50
    px-4 py-2 
    bg-cyan-600 
    text-white
  "
>
  跳到主内容
</a>

<nav>导航...</nav>

<main id="main-content">
  主内容
</main>
```

---

## 十三、布局检查清单

开发完成后，用此清单验证布局质量：

- [ ] 所有间距都是 8px 的倍数
- [ ] 页面有合理的最大宽度（不超过 1536px）
- [ ] 移动端有足够的左右边距（最少 16px）
- [ ] 卡片/组件间距一致
- [ ] 头部/底部固定时不遮挡内容
- [ ] 滚动区域有明确的视觉边界
- [ ] 所有可点击元素≥ 44×44px
- [ ] Z-index 使用有层次且无冲突
- [ ] 响应式断点下布局不破碎
- [ ] 长内容有合理的最大宽度（65-75ch）
- [ ] 焦点状态有足够的外边距
- [ ] 空状态有合理的垂直居中

---

## 十四、Tailwind 完整配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        // 自定义间距（如有需要）
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
      },
      maxWidth: {
        // 自定义容器宽度
        'content': '896px',
        'wide': '1152px',
      },
      zIndex: {
        // 自定义 Z 轴
        'dropdown': '10',
        'sticky': '20',
        'fixed': '30',
        'overlay': '40',
        'modal': '50',
        'popover': '60',
        'tooltip': '70',
        'notification': '80',
      },
      minHeight: {
        // 触摸目标最小高度
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    // 容器查询插件
    require('@tailwindcss/container-queries'),
  ],
}
```

---

**好的布局是隐形的，用户只会感受到舒适，而不会注意到设计。**