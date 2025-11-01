# 主要内容预览

## 一、无障碍设计哲学
- 核心理念（包容性设计）
- WCAG 2.1 AA 标准
- 与流体科技的平衡

## 二、视觉无障碍
- 颜色对比度要求
- 色盲友好设计
- 焦点可见性
- 文字大小与间距

## 三、运动与动画
- 减少动画偏好
- 禁用光晕选项
- 动画时长限制

## 四、键盘无障碍
- Tab导航顺序
- 快捷键系统
- 焦点管理
- 跳过链接

## 五、屏幕阅读器
- ARIA属性规范
- 语义化HTML
- 动态内容通知
- 图标文字描述

## 六、触摸与指针
- 触摸目标尺寸
- 手势替代方案
- 指针精度

## 七、认知无障碍
- 简洁文案（极简原则）
- 清晰的视觉层次
- 一致的交互模式
- 错误提示友好

## 八、测试与验证
- 自动化测试工具
- 手动测试清单
- 真实用户测试

---

# 无障碍设计规范

**版本**: v1.0  
**设计理念**: 流体科技 (Fluid Technology)  
**更新日期**: 2025-11-01  
**遵循标准**: WCAG 2.1 Level AA

---

## 一、无障碍设计哲学

### 核心信念

**可访问性不是额外功能，而是基本人权**

```
设计理念：
  包容性 > 排他性
  可用性 > 炫技
  清晰度 > 复杂度
```

### 与流体科技的平衡

**无界设计 + 无障碍 = 平衡之道**

```
无界设计特点：
  - 柔和边缘 ✓
  - 半透明背景 ✓
  - 光晕效果 ✓

无障碍要求：
  - 清晰对比度 ✓
  - 可识别边界 ✓
  - 焦点可见 ✓

平衡方案：
  - 核心内容高对比度（≥4.5:1）
  - 边缘柔化但不影响识别
  - 高对比度模式下显示边框
  - 光晕作为辅助，不作为唯一标识
```

---

## 二、视觉无障碍

### 2.1 颜色对比度要求

#### WCAG AA 标准（最低要求）

```css
/* 正文文字（< 18px 或 粗体 < 14px） */
--min-contrast-text: 4.5:1;

/* 大文字（≥ 18px 或 粗体 ≥ 14px） */
--min-contrast-large-text: 3:1;

/* UI组件（按钮、图标、边框） */
--min-contrast-ui: 3:1;

/* 非文字内容（图表、图标、状态指示） */
--min-contrast-graphics: 3:1;
```

#### 实际应用

```jsx
/* ✅ 正确：符合 4.5:1 */
<p className="text-slate-900">         {/* #0f172a on #ffffff = 16.9:1 */}
  这是正文内容
</p>

<p className="text-slate-600">         {/* #475569 on #ffffff = 8.3:1 */}
  这是辅助文字
</p>

/* ⚠️ 警告：接近临界值 */
<p className="text-slate-500">         {/* #64748b on #ffffff = 4.6:1 */}
  这是浅色文字
</p>

/* ❌ 错误：对比度不足 */
<p className="text-slate-400">         {/* #94a3b8 on #ffffff = 2.9:1 */}
  这是太浅的文字
</p>
```

---

### 2.2 色盲友好设计

**原则：永远不仅用颜色传达信息**

```jsx
/* ❌ 错误：仅用颜色区分 */
<div className="text-red-600">错误</div>
<div className="text-green-600">成功</div>

/* ✅ 正确：颜色 + 图标 + 文字 */
<div className="flex items-center gap-2 text-red-600">
  <XCircleIcon size={18} />
  <span>错误</span>
</div>

<div className="flex items-center gap-2 text-emerald-600">
  <CheckCircleIcon size={18} />
  <span>成功</span>
</div>
```

**状态指示规范**：

| 状态 | 颜色 | 图标 | 文字 |
|-----|------|------|------|
| 成功 | 绿色 | ✓ 勾 | "完成" |
| 错误 | 红色 | ✗ 叉 | "失败" |
| 警告 | 橙色 | ⚠ 三角 | "注意" |
| 信息 | 青色 | ⓘ 圆圈 | "提示" |

---

### 2.3 焦点可见性（无界版）

**高对比度模式自动显示边框**

```css
/* 默认：无界光晕焦点 */
.interactive-element:focus {
  outline: none;
  box-shadow: 
    0 0 0 2px rgba(6, 182, 212, 0.3),
    0 0 20px rgba(6, 182, 212, 0.4);
}

/* 高对比度模式：显示实线边框 */
@media (prefers-contrast: high) {
  .interactive-element:focus {
    box-shadow: none;
    outline: 2px solid #06b6d4;
    outline-offset: 2px;
  }
  
  /* 无界设计在高对比度下显示边框 */
  .borderless-component {
    border: 1px solid currentColor;
  }
}
```

#### Tailwind 焦点环

```jsx
<button className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-cyan-500/30
  focus:ring-offset-2
  
  /* 高对比度模式 */
  contrast-more:focus:ring-cyan-500
  contrast-more:focus:ring-4
">
  按钮
</button>
```

---

### 2.4 文字大小要求

```css
/* 绝对最小值 */
--min-font-size: 12px;

/* 建议最小值 */
--recommended-min: 14px;

/* 正文最佳 */
--body-optimal: 16px;
```

**响应式字号**：

```jsx
/* ✅ 正确：移动端不小于14px */
<p className="text-sm md:text-base">    {/* 14px → 16px */}
  正文内容
</p>

/* ❌ 错误：移动端过小 */
<p className="text-xs">                  {/* 12px 过小 */}
  正文内容
</p>
```

---

## 三、运动与动画无障碍

### 3.1 减少动画偏好

**必须支持 `prefers-reduced-motion`**

```css
/* 默认：完整动画 */
.animated-element {
  animation: fadeIn 400ms ease-out;
  transition: all 300ms;
}

/* 用户偏好减少动画：移除所有动画 */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
    transition: none !important;
  }
  
  /* 保留必要的透明度变化（即时） */
  .animated-element {
    transition: opacity 0.01ms !important;
  }
}
```

#### React 实现

```jsx
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', listener);
    
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  
  return prefersReducedMotion;
}

// 使用示例
function AnimatedCard() {
  const reducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.3,
        ease: 'easeOut',
      }}
    >
      内容
    </motion.div>
  );
}
```

---

### 3.2 禁用光晕选项（用户设置）

```jsx
// 用户可选择关闭光晕效果
function SettingsPanel() {
  const [glowEffects, setGlowEffects] = React.useState(true);
  
  return (
    <div>
      <Switch
        checked={glowEffects}
        onChange={setGlowEffects}
        label="光晕效果"  {/* ✅ 4字 */}
      />
      
      <p className="text-xs text-slate-500 mt-2">
        关闭可提升性能和对比度  {/* ✅ 简洁说明 */}
      </p>
    </div>
  );
}

// 全局CSS变量控制
document.documentElement.style.setProperty(
  '--glow-enabled',
  glowEffects ? '1' : '0'
);
```

```css
/* 根据设置显示/隐藏光晕 */
.component {
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.08);
}

.component:hover {
  /* 光晕效果仅在启用时显示 */
  box-shadow: 
    0 0 0 1px rgba(6, 182, 212, calc(0.1 * var(--glow-enabled, 1))),
    0 0 calc(30px * var(--glow-enabled, 1)) rgba(6, 182, 212, calc(0.2 * var(--glow-enabled, 1))),
    0 16px 48px rgba(0, 0, 0, 0.12);
}
```

---

## 四、键盘无障碍

### 4.1 Tab 导航顺序

**原则：逻辑顺序 = 视觉顺序 = Tab顺序**

```html
<!-- ✅ 正确：自然的DOM顺序 -->
<header>
  <button>Logo</button>
  <nav>
    <a href="/">首页</a>     <!-- Tab 1 -->
    <a href="/files">文件</a> <!-- Tab 2 -->
    <a href="/settings">设置</a> <!-- Tab 3 -->
  </nav>
  <button>用户菜单</button>  <!-- Tab 4 -->
</header>

<!-- ❌ 错误：用 tabindex 改变顺序 -->
<div>
  <button tabindex="3">第三个</button>
  <button tabindex="1">第一个</button>  <!-- 混乱！ -->
  <button tabindex="2">第二个</button>
</div>
```

**tabindex 使用规范**：

```html
<!-- tabindex="0" - 加入Tab顺序 -->
<div tabindex="0" role="button">可聚焦的div</div>

<!-- tabindex="-1" - 可编程聚焦，但不在Tab顺序 -->
<div tabindex="-1">模态框内容</div>

<!-- ❌ 永远不用 tabindex > 0 -->
<button tabindex="5">错误</button>
```

---

### 4.2 焦点管理

#### 模态框焦点陷阱

```jsx
function AccessibleModal({ isOpen, onClose, children }) {
  const modalRef = React.useRef(null);
  const previousFocus = React.useRef(null);
  
  React.useEffect(() => {
    if (isOpen) {
      // 保存当前焦点
      previousFocus.current = document.activeElement;
      
      // 聚焦到模态框
      modalRef.current?.focus();
      
      // 焦点陷阱
      const handleTab = (e) => {
        if (e.key === 'Tab') {
          const focusable = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    } else {
      // 恢复之前的焦点
      previousFocus.current?.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className="fixed inset-0 z-50"
    >
      {/* 内容 */}
      {children}
    </div>
  );
}
```

---

### 4.3 跳过链接 (Skip Link)

```jsx
function Layout({ children }) {
  return (
    <>
      {/* 跳过链接 - 仅键盘用户可见 */}
      <a
        href="#main-content"
        className="
          sr-only 
          focus:not-sr-only 
          focus:absolute 
          focus:top-4 
          focus:left-4 
          focus:z-[100]
          px-4 py-2 
          rounded-lg
          font-medium
          text-white
        "
        style={{
          background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
        }}
      >
        跳到主内容  {/* ✅ 5字 */}
      </a>
      
      <header>导航</header>
      
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
```

---

## 五、屏幕阅读器支持

### 5.1 ARIA 属性规范

#### 必须添加的 ARIA

```jsx
/* 图标按钮 - 必须有 aria-label */
<button aria-label="删除文件">
  <TrashIcon />
</button>

/* 装饰性图标 - 隐藏 */
<StarIcon aria-hidden="true" />

/* 动态内容 - aria-live */
<div aria-live="polite" aria-atomic="true">
  {statusMessage}  {/* "上传完成" 等 */}
</div>

/* 模态框 - 完整 ARIA */
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">删除文件</h2>
  <p id="dialog-description">确定删除这3个文件？</p>
</div>

/* 进度条 - aria-valuenow */
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="上传进度"  {/* ✅ 4字 */}
>
  {progress}%
</div>

/* 标签页 - 完整 ARIA */
<div role="tablist" aria-label="文件类型">
  <button
    role="tab"
    aria-selected={activeTab === 'all'}
    aria-controls="panel-all"
    id="tab-all"
  >
    全部  {/* ✅ 2字 */}
  </button>
</div>

<div
  role="tabpanel"
  id="panel-all"
  aria-labelledby="tab-all"
  hidden={activeTab !== 'all'}
>
  内容
</div>
```

---

### 5.2 语义化 HTML

```jsx
/* ✅ 正确：使用语义化标签 */
<header>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>标题</h1>
    <p>内容</p>
  </article>
</main>

<footer>
  版权信息
</footer>

/* ❌ 错误：全用 div */
<div className="header">
  <div className="nav">
    <div className="link">首页</div>
  </div>
</div>
```

---

### 5.3 图标文字描述

```jsx
/* ✅ 正确：图标有文字描述 */
function IconWithLabel({ icon: Icon, label }) {
  return (
    <button className="flex items-center gap-2">
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

/* ✅ 正确：纯图标有 aria-label */
<button aria-label="搜索">
  <SearchIcon />
</button>

/* ✅ 正确：使用 title 提供额外信息 */
<button 
  aria-label="删除"
  title="删除所选文件 (Delete)"
>
  <TrashIcon />
</button>
```

---

## 六、触摸无障碍

### 6.1 触摸目标尺寸

**最小尺寸：44×44px**

```css
/* ✅ 正确：足够大的触摸区域 */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 桌面端可以更小 */
@media (hover: hover) and (pointer: fine) {
  .touch-target {
    min-width: 32px;
    min-height: 32px;
  }
}
```

```jsx
/* ✅ 正确：图标按钮有足够的padding */
<button className="w-11 h-11 rounded-full flex items-center justify-center">
  <Icon size={20} />
</button>

/* ❌ 错误：触摸区域太小 */
<button className="p-1">
  <Icon size={16} />
</button>
```

---

### 6.2 间距要求

**触摸目标之间最小间距：8px**

```jsx
/* ✅ 正确：足够间距 */
<div className="flex gap-2">      {/* 8px 间距 */}
  <IconButton icon={TrashIcon} />
  <IconButton icon={EditIcon} />
  <IconButton icon={ShareIcon} />
</div>

/* ❌ 错误：太拥挤 */
<div className="flex gap-0.5">    {/* 2px 太小 */}
  <IconButton />
  <IconButton />
</div>
```

---

## 七、认知无障碍

### 7.1 简洁文案（极简原则）

**极简文字本身就是认知无障碍**

```jsx
/* ✅ 正确：简洁直接 */
<button>删除</button>                // 2字，0.5秒理解
<Toast message="上传完成" />         // 4字，瞬间理解
<EmptyState title="暂无数据" />      // 4字，清晰明了

/* ❌ 错误：冗长复杂 */
<button>删除选中的所有文件</button>   // 9字，2秒理解
<Toast message="您的文件已经成功上传到服务器" />  // 15字，认知负担重
<EmptyState title="您目前还没有任何数据记录" />   // 12字，啰嗦
```

**认知友好度评分**：
```
1-2个字：★★★★★ 极佳
3-4个字：★★★★☆ 很好
5-6个字：★★★☆☆ 可接受
7-8个字：★★☆☆☆ 稍长
9字以上：★☆☆☆☆ 需简化
```

---

### 7.2 清晰的视觉层次

```jsx
/* ✅ 正确：清晰的层次 */
<div className="space-y-6">
  <h1 className="text-4xl font-bold text-slate-900">
    我的文件  {/* ✅ 一级标题，3字 */}
  </h1>
  
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-slate-800">
      最近解压  {/* ✅ 二级标题，4字 */}
    </h2>
    
    <div className="space-y-2">
      <FileItem />
      <FileItem />
    </div>
  </div>
</div>

/* ❌ 错误：层次混乱 */
<div className="space-y-2">
  <h1 className="text-base">我的文件</h1>      {/* 标题太小 */}
  <h2 className="text-4xl">最近解压</h2>      {/* 层次倒置 */}
</div>
```

---

### 7.3 错误提示友好

```jsx
/* ✅ 正确：错误 + 解决方案 */
function ErrorMessage({ error, onRetry }) {
  const errorMessages = {
    FILE_TOO_LARGE: {
      title: '文件过大',        // ✅ 4字
      solution: '最大100MB',    // ✅ 简洁
      action: '选择其他文件',
    },
    FILE_CORRUPTED: {
      title: '文件损坏',
      solution: '无法读取',
      action: '重新下载',
    },
    NETWORK_ERROR: {
      title: '网络错误',
      solution: '检查连接',
      action: '重试',           // ✅ 2字
    },
  };
  
  const msg = errorMessages[error.code];
  
  return (
    <div
      className="p-4 rounded-xl flex items-start gap-3"
      style={{
        background: 'rgba(239, 68, 68, 0.1)',
        boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.2)',
      }}
    >
      <AlertCircleIcon size={20} className="text-red-500 flex-shrink-0" />
      
      <div className="flex-1">
        <p className="font-medium text-red-700 mb-1">
          {msg.title}
        </p>
        <p className="text-sm text-red-600">
          {msg.solution}
        </p>
      </div>
      
      <ButtonSecondary size="sm" onClick={onRetry}>
        {msg.action}
      </ButtonSecondary>
    </div>
  );
}

/* ❌ 错误：只有错误代码 */
<div className="text-red-600">
  Error: ERR_FILE_TOO_LARGE_MAX_SIZE_EXCEEDED
</div>
```

---

## 八、测试与验证

### 8.1 自动化测试工具

```bash
# axe-core - 无障碍测试
npm install --save-dev @axe-core/react

# React 中使用
import { axe } from '@axe-core/react';

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}

# lighthouse - 性能和无障碍审计
npm install -g lighthouse

lighthouse https://your-app.com --view
```

---

### 8.2 手动测试清单

#### 键盘导航测试
- [ ] 仅用Tab键能访问所有交互元素
- [ ] 焦点顺序符合逻辑
- [ ] 焦点清晰可见（光晕或outline）
- [ ] Esc能关闭模态框/菜单
- [ ] 快捷键都能正常工作

#### 屏幕阅读器测试
- [ ] 使用VoiceOver (macOS) 或 NVDA (Windows) 测试
- [ ] 所有图标按钮有正确朗读
- [ ] 表单标签关联正确
- [ ] 动态内容变化有通知
- [ ] 页面结构清晰（标题、地标）

#### 视觉测试
- [ ] 文字对比度≥4.5:1 (正文) / 3:1 (大文字)
- [ ] 使用色盲模拟器测试（红绿、蓝黄）
- [ ] 放大200%后仍可用
- [ ] 高对比度模式下可用

#### 运动敏感测试
- [ ] prefers-reduced-motion 生效
- [ ] 关闭动画后仍可用
- [ ] 无自动播放视频（或可暂停）

---

### 8.3 无障碍检查工具

```jsx
// 开发时的无障碍检查组件
function A11yChecker({ children }) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // 检查图标按钮是否有 aria-label
      const iconButtons = document.querySelectorAll('button:not([aria-label])');
      iconButtons.forEach(btn => {
        if (btn.querySelector('svg') && !btn.textContent.trim()) {
          console.warn('图标按钮缺少 aria-label:', btn);
        }
      });
      
      // 检查对比度
      const textElements = document.querySelectorAll('p, span, a, button');
      textElements.forEach(el => {
        const contrast = getContrastRatio(el);
        if (contrast < 4.5) {
          console.warn('对比度不足:', el, `(${contrast}:1)`);
        }
      });
    }
  }, []);
  
  return <>{children}</>;
}
```

---

## 九、无障碍设计模式库

### 9.1 可访问的下拉菜单

```jsx
function AccessibleDropdown({ trigger, items, label }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(i => Math.min(items.length - 1, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(i => Math.max(0, i - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          items[focusedIndex].action();
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={label}
      >
        {trigger}
      </button>
      
      {isOpen && (
        <div
          role="menu"
          onKeyDown={handleKeyDown}
          className="absolute top-full mt-2 right-0 min-w-[200px] py-2 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.15)',
          }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              role="menuitem"
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                i === focusedIndex ? 'bg-cyan-50' : ''
              }`}
              style={i === focusedIndex ? {
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)',
              } : {}}
            >
              <item.icon size={18} />
              <span>{item.label}</span>  {/* ✅ 极简：2-4字 */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### 9.2 可访问的Toast通知

```jsx
function AccessibleToast({ type, message, onClose }) {
  return (
    <div
      role="alert"
      aria-live="assertive"  // 重要消息立即通知
      aria-atomic="true"
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: type === 'error' 
          ? 'rgba(239, 68, 68, 0.95)'
          : 'rgba(16, 185, 129, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 0 30px ${type === 'error' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.5)'}`,
      }}
    >
      {type === 'error' ? <XCircleIcon size={20} /> : <CheckCircleIcon size={20} />}
      <span className="text-white font-medium">{message}</span>
      <button onClick={onClose} aria-label="关闭通知">
        <XIcon size={16} className="text-white/80" />
      </button>
    </div>
  );
}
```

---

## 十、无障碍检查清单

### 视觉无障碍
- [ ] 所有文字对比度≥4.5:1（正文）
- [ ] 所有UI组件对比度≥3:1
- [ ] 不仅用颜色传达信息
- [ ] 焦点状态清晰可见（光晕或边框）
- [ ] 文字最小14px（移动端）/16px（桌面端）
- [ ] 高对比度模式下有边框显示

### 键盘无障碍
- [ ] 所有功能可用键盘操作
- [ ] Tab顺序合理
- [ ] 快捷键有提示
- [ ] Esc能关闭弹出层
- [ ] 有跳过链接
- [ ] 模态框有焦点陷阱

### 屏幕阅读器
- [ ] 所有图标按钮有aria-label
- [ ] 动态内容有aria-live
- [ ] 表单有关联的label
- [ ] 使用语义化HTML
- [ ] 复杂组件有完整ARIA

### 触摸无障碍
- [ ] 触摸目标≥44×44px
- [ ] 目标间距≥8px
- [ ] 手势有替代方案
- [ ] 长按时间合理（500ms）

### 运动与动画
- [ ] 支持prefers-reduced-motion
- [ ] 有关闭动画选项
- [ ] 无自动播放（或可暂停）
- [ ] 闪烁频率<3Hz

### 认知友好
- [ ] 文案简洁（遵循极简原则）
- [ ] 错误提示有解决方案
- [ ] 操作可撤销
- [ ] 视觉层次清晰
- [ ] 交互模式一致

---

**可访问性是基本权利，不是锦上添花。**  
**无界设计与无障碍可以完美共存。** ♿✨

