# 主要内容预览

## 一、组件库哲学
- 核心理念（流体科技、无界、极简文字）
- 组件设计三原则
- 与设计总概念的关联

## 二、基础组件 (Primitives)
- 按钮系统（主要、次要、图标、悬浮）
- 输入框（文本、搜索、选择器）
- 标签与徽章
- 分割线（渐变、光晕）

## 三、内容组件 (Content)
- 卡片系统（无界卡片、玻璃卡片）
- 列表与列表项
- 表格
- 文件项组件

## 四、反馈组件 (Feedback)
- Toast通知
- 模态框与对话框
- 加载器（液滴、进度条）
- 空状态

## 五、导航组件 (Navigation)
- 导航栏
- 侧边栏
- Tab标签页
- 面包屑

## 六、叠加组件 (Overlay)
- Dropdown下拉菜单
- Popover气泡卡片
- Tooltip工具提示
- 上下文菜单

## 七、表单组件 (Forms)
- 复选框与单选框
- 开关切换
- 滑块
- 文件上传区

## 八、特殊组件 (Special)
- 拖拽区域
- 进度指示器
- 时间轴
- 评分组件

## 九、组合模式 (Composition)
- 卡片+操作栏
- 搜索+过滤
- 表格+分页
- 文件列表+预览

## 十、组件状态系统
- 交互状态（默认、悬停、激活、禁用）
- 数据状态（加载、空、错误、成功）
- 无界状态表现

## 十一、组件动画规范
- 进入/退出动画
- 悬停反馈
- 状态切换过渡

## 十二、无障碍规范
- ARIA属性
- 键盘导航
- 焦点管理

## 十三、组件检查清单
- 无界验证、极简文字验证、功能验证

---

# 组件库设计规范

**版本**: v1.0  
**设计理念**: 流体科技 (Fluid Technology)  
**更新日期**: 2025-11-01

---

## 一、组件库哲学

### 与设计总概念的关联

本组件库基于 **00-design-concept.md** 中的核心理念：

```
流体科技 (Fluid Technology)
  ↓
三个设计主张：
  1. 有机流动，非机械冰冷
  2. 轻盈透明，非厚重实体
  3. 主动引导，非被动等待
  ↓
无界 (Borderless)
  ↓
每个组件都应体现：
  - 无硬性边框
  - 光晕扩散效果
  - 水滴晕染边缘
  ↓
极简文字 (Minimal Text)
  ↓
  - 能用图标就不用字
  - 必须用字就用最少的字
```

### 组件设计三原则

#### 1. 无界优先
```
❌ 传统组件：方框 + 边框 + 实色背景
✅ 无界组件：渐变 + 光晕 + 毛玻璃
```

#### 2. 图标优先
```
❌ 文字按钮："上传文件到服务器"
✅ 图标按钮：<UploadIcon /> + "上传"（或纯图标）
```

#### 3. 流体动效
```
❌ 线性变化：opacity 0 → 1
✅ 流体过渡：scale + blur + glow + opacity
```

---

## 二、基础组件 (Primitives)

### 2.1 按钮系统 (Button)

#### 主按钮 (Primary Button)

**设计特点**：无边框、青色渐变、光晕扩散

```jsx
function ButtonPrimary({ children, icon: Icon, onClick, loading = false }) {
  return (
    <button
      onClick={onClick}
      className="group relative px-6 py-3 rounded-xl font-medium text-white overflow-hidden transition-all duration-200"
      style={{
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
        boxShadow: '0 0 0 0 rgba(6, 182, 212, 0), 0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      disabled={loading}
    >
      {/* 悬停光晕层 */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* 内容 */}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <LoadingSpinner size={16} />
        ) : Icon ? (
          <Icon size={18} />
        ) : null}
        {children}
      </span>
      
      {/* 悬停时的样式由CSS处理 */}
      <style jsx>{`
        button:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 0 20px rgba(6, 182, 212, 0.4),
            0 0 40px rgba(6, 182, 212, 0.2),
            0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }
        button:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 
            0 0 10px rgba(6, 182, 212, 0.3),
            0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </button>
  );
}

// 使用示例
<ButtonPrimary icon={UploadIcon}>上传</ButtonPrimary>  // ✅ 图标+2字
<ButtonPrimary>开始解压</ButtonPrimary>              // ✅ 4字
```

---

#### 次要按钮 (Secondary Button)

**设计特点**：透明背景、光晕边缘、悬停时晕染

```jsx
function ButtonSecondary({ children, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative px-6 py-3 rounded-xl font-medium text-slate-700 transition-all duration-200"
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* 悬停时的青色晕染 */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
        }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon size={18} />}
        {children}
      </span>
    </button>
  );
}
```

---

#### 图标按钮 (Icon Button)

**设计特点**：纯图标、圆形、悬停光晕

```jsx
function IconButton({ icon: Icon, onClick, label, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`${sizes[size]} rounded-full flex items-center justify-center text-slate-600 hover:text-cyan-600 transition-all duration-200`}
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 0 0 0 rgba(6, 182, 212, 0)',
      }}
    >
      <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      
      <style jsx>{`
        button:hover {
          background: rgba(6, 182, 212, 0.1);
          box-shadow: 
            0 0 15px rgba(6, 182, 212, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </button>
  );
}

// 使用示例 - 纯图标，无文字
<IconButton icon={TrashIcon} label="删除" />
<IconButton icon={DownloadIcon} label="下载" />
<IconButton icon={SettingsIcon} label="设置" />
```

---

#### 悬浮操作按钮 (FAB)

**设计特点**：圆形、强光晕、固定在屏幕角落

```jsx
function FloatingActionButton({ icon: Icon, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white z-50 transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
        boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 8px 24px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Icon size={24} />
      
      <style jsx>{`
        button:hover {
          transform: scale(1.1);
          box-shadow: 
            0 0 40px rgba(6, 182, 212, 0.6),
            0 0 80px rgba(6, 182, 212, 0.3),
            0 12px 32px rgba(0, 0, 0, 0.25);
        }
        button:active {
          transform: scale(0.95);
        }
      `}</style>
    </button>
  );
}

// 使用示例 - 纯图标
<FloatingActionButton icon={PlusIcon} label="添加" />
```

---

### 2.2 输入框 (Input)

#### 文本输入框（无界版）

**设计特点**：无边框、聚焦时光晕、毛玻璃背景

```jsx
function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  icon: Icon,
  ...props 
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
    <div className="relative">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isFocused ? 'ring-2 ring-cyan-500/20' : ''
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: isFocused 
            ? '0 0 0 1px rgba(6, 182, 212, 0.2), 0 0 30px rgba(6, 182, 212, 0.15), 0 8px 24px rgba(0, 0, 0, 0.08)'
            : '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* 图标（如果有） */}
        {Icon && (
          <Icon size={18} className={`transition-colors duration-200 ${
            isFocused ? 'text-cyan-500' : 'text-slate-400'
          }`} />
        )}
        
        {/* 输入框 */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
          {...props}
        />
      </div>
    </div>
  );
}

// 使用示例 - 极简placeholder
<Input icon={SearchIcon} placeholder="搜索" />       // ✅ 2字
<Input icon={FileIcon} placeholder="文件名" />       // ✅ 3字
<Input placeholder="输入路径" />                     // ✅ 4字
```

---

### 2.3 标签与徽章 (Tag & Badge)

#### 标签（无边框版）

```jsx
function Tag({ children, variant = 'default', onRemove }) {
  const variants = {
    default: {
      bg: 'rgba(148, 163, 184, 0.15)',
      text: 'text-slate-700',
      glow: 'rgba(148, 163, 184, 0.3)',
    },
    cyan: {
      bg: 'rgba(6, 182, 212, 0.15)',
      text: 'text-cyan-700',
      glow: 'rgba(6, 182, 212, 0.4)',
    },
    purple: {
      bg: 'rgba(167, 139, 250, 0.15)',
      text: 'text-purple-700',
      glow: 'rgba(167, 139, 250, 0.4)',
    },
  };
  
  const style = variants[variant];
  
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.text} transition-all duration-200`}
      style={{
        background: style.bg,
        backdropFilter: 'blur(8px)',
        boxShadow: `0 0 0 1px ${style.glow}, 0 0 10px rgba(0, 0, 0, 0.05)`,
      }}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:scale-110 transition-transform"
          aria-label="移除"
        >
          <XIcon size={12} />
        </button>
      )}
    </span>
  );
}

// 使用示例 - 极简文字
<Tag>ZIP</Tag>          // ✅ 纯标识
<Tag variant="cyan">新</Tag>  // ✅ 1字
<Tag variant="purple" onRemove={handleRemove}>大文件</Tag>  // ✅ 3字
```

---

#### 徽章数字

```jsx
function Badge({ count, max = 99 }) {
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <span
      className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-2xs font-semibold text-white tabular-nums"
      style={{
        background: 'linear-gradient(135deg, #ef4444, #f87171)',
        boxShadow: '0 0 15px rgba(239, 68, 68, 0.5), 0 2px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      {displayCount}
    </span>
  );
}

// 使用示例
<div className="relative">
  <IconButton icon={NotificationIcon} />
  <Badge count={3} />
</div>
```

---

### 2.4 分割线（无界版）

**核心原则**：永远不用实线，用渐变

```jsx
// 水平渐变分割线
function Divider({ className = '' }) {
  return (
    <div 
      className={`h-px ${className}`}
      style={{
        background: 'linear-gradient(to right, transparent, rgba(148, 163, 184, 0.3), transparent)',
      }}
    />
  );
}

// 带文字的分割线
function DividerWithText({ children }) {
  return (
    <div className="relative flex items-center gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-slate-300/50" />
      <span className="text-xs text-slate-400 uppercase tracking-widest">
        {children}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300/50 to-slate-300/50" />
    </div>
  );
}

// 使用示例
<Divider className="my-6" />
<DividerWithText>或</DividerWithText>  // ✅ 1字
```

---

## 三、内容组件 (Content)

### 3.1 无界卡片系统 (Borderless Card)

#### 标准无界卡片

```jsx
function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`relative p-6 rounded-2xl transition-all duration-300 ${className} ${
        hover ? 'hover:shadow-borderless-hover hover:-translate-y-1' : ''
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 70%, rgba(255, 255, 255, 0.3) 90%, rgba(255, 255, 255, 0) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.08)',
      }}
    >
      {children}
    </div>
  );
}

// 使用示例
<Card>
  <h3 className="text-xl font-semibold mb-2">项目.zip</h3>
  <p className="text-sm text-slate-600">245 个文件</p>
</Card>
```

---

#### 玻璃卡片（毛玻璃效果）

```jsx
function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`relative p-6 rounded-2xl ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* 顶部高光 */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl opacity-50 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, transparent 100%)',
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
```

---

### 3.2 文件项组件 (File Item)

**设计特点**：无边框、悬停光晕、图标+简短文字

```jsx
function FileItem({ 
  icon: Icon, 
  name, 
  size, 
  date, 
  selected = false,
  onSelect,
  onAction 
}) {
  return (
    <div
      onClick={onSelect}
      className={`relative flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
        selected ? 'ring-2 ring-cyan-500/30' : ''
      }`}
      style={{
        background: selected 
          ? 'rgba(6, 182, 212, 0.1)'
          : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        boxShadow: selected
          ? '0 0 20px rgba(6, 182, 212, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)'
          : '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* 文件图标 */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
        selected ? 'text-cyan-600' : 'text-slate-500'
      }`}>
        <Icon size={24} />
      </div>
      
      {/* 文件信息 - 极简 */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-900 truncate text-sm">
          {name}
        </p>
        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono tabular-nums">
          <span>{size}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
      
      {/* 操作按钮 - 纯图标 */}
      <div className="flex items-center gap-1">
        <IconButton icon={DownloadIcon} label="下载" size="sm" />
        <IconButton icon={MoreIcon} label="更多" size="sm" />
      </div>
    </div>
  );
}

// 使用示例
<FileItem 
  icon={ZipIcon}
  name="项目文件.zip"
  size="24.5 MB"
  date="2小时前"
/>
```

---

### 3.3 列表组件

#### 无界列表容器

```jsx
function List({ children, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  );
}

// 带渐变遮罩的滚动列表
function ScrollableList({ children, maxHeight = '400px' }) {
  return (
    <div className="relative">
      {/* 顶部渐变遮罩 */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      
      {/* 列表内容 */}
      <div 
        className="overflow-y-auto custom-scrollbar-borderless py-2"
        style={{ maxHeight }}
      >
        <div className="space-y-2 px-1">
          {children}
        </div>
      </div>
      
      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}
```

---

## 四、反馈组件 (Feedback)

### 4.1 Toast 通知（无界版）

**设计特点**：边缘消融、进入时水滴扩散

```jsx
function Toast({ type = 'info', message, icon: Icon, onClose }) {
  const types = {
    success: {
      bg: 'rgba(16, 185, 129, 0.95)',
      glow: 'rgba(16, 185, 129, 0.5)',
      icon: CheckCircleIcon,
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.95)',
      glow: 'rgba(239, 68, 68, 0.5)',
      icon: XCircleIcon,
    },
    info: {
      bg: 'rgba(6, 182, 212, 0.95)',
      glow: 'rgba(6, 182, 212, 0.5)',
      icon: InfoIcon,
    },
  };
  
  const style = types[type];
  const IconComponent = Icon || style.icon;
  
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-white backdrop-blur-xl animate-toast-enter"
      style={{
        background: style.bg,
        boxShadow: `0 0 30px ${style.glow}, 0 8px 24px rgba(0, 0, 0, 0.2)`,
      }}
    >
      <IconComponent size={20} />
      <span className="text-sm font-medium">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 hover:scale-110 transition-transform"
        aria-label="关闭"
      >
        <XIcon size={16} />
      </button>
    </div>
  );
}

// 使用示例 - 极简消息
<Toast type="success" message="上传完成" />     // ✅ 4字
<Toast type="error" message="文件损坏" />       // ✅ 4字
<Toast type="info" message="处理中" />         // ✅ 3字
```

```css
/* Toast 进入动画 - 边缘消融 */
@keyframes toast-enter {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
    filter: blur(10px);
  }
  50% {
    opacity: 1;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.animate-toast-enter {
  animation: toast-enter 400ms cubic-bezier(0, 0, 0.2, 1);
}
```

---

### 4.2 模态框（无界版）

**设计特点**：晕染边缘、毛玻璃遮罩、光晕边界

```jsx
function Modal({ isOpen, onClose, title, children, actions }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩层 - 高斯模糊 */}
      <div 
        className="absolute inset-0 backdrop-blur-xl bg-slate-900/60 animate-fade-in"
        onClick={onClose}
      />
      
      {/* 模态框内容 - 晕染边缘 */}
      <div
        className="relative w-full max-w-md rounded-2xl p-6 animate-modal-enter"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 70%, rgba(255, 255, 255, 0.85) 100%)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 0 0 1px rgba(6, 182, 212, 0.15), 0 0 60px rgba(6, 182, 212, 0.2), 0 20px 80px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* 标题 - 极简 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            {title}  {/* 应该是简短的，如"删除文件" */}
          </h2>
          <IconButton icon={XIcon} onClick={onClose} label="关闭" size="sm" />
        </div>
        
        {/* 内容 */}
        <div className="mb-6 text-slate-700">
          {children}
        </div>
        
        {/* 操作按钮 */}
        <div className="flex justify-end gap-3">
          {actions}
        </div>
      </div>
    </div>
  );
}

// 使用示例 - 极简标题和按钮文字
<Modal
  isOpen={true}
  onClose={handleClose}
  title="删除文件"  // ✅ 4字
  actions={
    <>
      <ButtonSecondary onClick={handleClose}>取消</ButtonSecondary>  // ✅ 2字
      <ButtonPrimary onClick={handleDelete}>删除</ButtonPrimary>    // ✅ 2字
    </>
  }
>
  <p>确定删除这3个文件？</p>  {/* ✅ 简洁提问 */}
</Modal>
```

```css
@keyframes modal-enter {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
    filter: blur(15px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

.animate-modal-enter {
  animation: modal-enter 400ms cubic-bezier(0, 0, 0.2, 1);
}
```

---

### 4.3 加载器（流体版）

#### 液滴加载器

```jsx
function DropletLoader() {
  return (
    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full animate-droplet-bounce"
          style={{
            background: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            animationDelay: `${i * 0.2}s`,
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
          }}
        />
      ))}
    </div>
  );
}
```

#### 进度条（液体流动）

```jsx
function ProgressBar({ progress = 0, showLabel = false }) {
  return (
    <div className="space-y-2">
      {/* 进度文字 - 极简 */}
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-600 font-mono tabular-nums">
          <span>{progress}%</span>
          <span>{progress === 100 ? '完成' : '处理中'}</span>
        </div>
      )}
      
      {/* 进度条容器 */}
      <div 
        className="h-2 rounded-full overflow-hidden"
        style={{
          background: 'rgba(6, 182, 212, 0.1)',
        }}
      >
        {/* 液体填充 */}
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #06b6d4 0%, #22d3ee 50%, #06b6d4 100%)',
            backgroundSize: '200% 100%',
            animation: 'liquidFlow 2s ease-in-out infinite',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>
    </div>
  );
}

// 使用示例
<ProgressBar progress={65} showLabel />
```

---

### 4.4 空状态（极简版）

```jsx
function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* 图标 - 带光晕 */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-cyan-500"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          boxShadow: '0 0 40px rgba(6, 182, 212, 0.2)',
        }}
      >
        <Icon size={40} />
      </div>
      
      {/* 文字 - 极简 */}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        {title}  {/* 应该≤6个字 */}
      </h3>
      
      {description && (
        <p className="text-sm text-slate-600 mb-6 max-w-xs text-center">
          {description}  {/* 应该≤12个字 */}
        </p>
      )}
      
      {/* 操作按钮 */}
      {action && action}
    </div>
  );
}

// 使用示例 - 极简文案
<EmptyState
  icon={FolderIcon}
  title="暂无文件"        // ✅ 4字
  description="拖入压缩包开始"  // ✅ 8字
  action={
    <ButtonPrimary icon={UploadIcon}>
      选择文件  {/* ✅ 4字 */}
    </ButtonPrimary>
  }
/>
```

---

## 五、导航组件 (Navigation)

### 5.1 导航栏（无界版）

```jsx
function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 px-6 py-3"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.1), 0 8px 32px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <LogoIcon size={24} />
          <span className="text-lg font-semibold">Unzip</span>  {/* ✅ 品牌名简短 */}
        </div>
        
        {/* 导航项 - 纯图标或图标+1字 */}
        <div className="flex items-center gap-2">
          <IconButton icon={HomeIcon} label="首页" />
          <IconButton icon={HistoryIcon} label="历史" />
          <IconButton icon={SettingsIcon} label="设置" />
        </div>
      </div>
      
      {/* 底部光晕线 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </nav>
  );
}
```

---

### 5.2 Tab 标签页（无界版）

```jsx
function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-2 p-1 rounded-xl bg-slate-100/50 backdrop-blur-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          style={activeTab === tab.id ? {
            background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)',
          } : {}}
        >
          {/* 图标（如果有） */}
          {tab.icon && <tab.icon size={16} className="inline mr-1.5" />}
          {/* 文字 - 极简（1-2个字） */}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// 使用示例 - 极简标签
<Tabs
  tabs={[
    { id: 'all', label: '全部', icon: GridIcon },      // ✅ 2字
    { id: 'zip', label: 'ZIP', icon: ArchiveIcon },    // ✅ 缩写
    { id: 'recent', label: '最近', icon: ClockIcon },  // ✅ 2字
  ]}
  activeTab="all"
  onChange={setActiveTab}
/>
```

---

## 六、叠加组件 (Overlay)

### 6.1 Dropdown 下拉菜单（无界版）

```jsx
function Dropdown({ trigger, items, onSelect }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="relative">
      {/* 触发器 */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {/* 下拉内容 */}
      {isOpen && (
        <div
          className="absolute top-full mt-2 right-0 min-w-[200px] py-2 rounded-xl animate-dropdown-enter"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.15)',
          }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-cyan-50/50 transition-colors"
            >
              {/* 图标 */}
              {item.icon && <item.icon size={18} />}
              {/* 文字 - 极简（2-4字） */}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 使用示例
<Dropdown
  trigger={<IconButton icon={MoreIcon} label="更多" />}
  items={[
    { icon: DownloadIcon, label: '下载' },      // ✅ 2字
    { icon: ShareIcon, label: '分享' },         // ✅ 2字
    { icon: TrashIcon, label: '删除' },         // ✅ 2字
  ]}
  onSelect={handleSelect}
/>
```

---

### 6.2 Tooltip 工具提示（无界版）

```jsx
function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = React.useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div
          className={`absolute z-[70] px-3 py-2 rounded-lg text-xs text-white whitespace-nowrap animate-tooltip-enter ${
            position === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : ''
          }`}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          {content}
          
          {/* 箭头 */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              marginTop: '-4px',
            }}
          />
        </div>
      )}
    </div>
  );
}

// 使用示例 - 详细信息放这里
<Tooltip content="支持ZIP、RAR、7Z，最大2GB">
  <IconButton icon={CompressIcon} label="压缩" />
</Tooltip>
```

---

## 七、表单组件 (Forms)

### 7.1 复选框（无界版）

```jsx
function Checkbox({ checked, onChange, label, children }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer group">
      {/* 复选框 */}
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        
        <div
          className={`w-5 h-5 rounded-md transition-all duration-200 ${
            checked ? 'scale-100' : 'scale-95'
          }`}
          style={{
            background: checked 
              ? 'linear-gradient(135deg, #06b6d4, #0ea5e9)'
              : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            boxShadow: checked
              ? '0 0 15px rgba(6, 182, 212, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1)'
              : '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* 勾选标记 */}
          {checked && (
            <svg
              className="w-full h-full p-1 text-white animate-check-in"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3,8 6,11 13,4" />
            </svg>
          )}
        </div>
      </div>
      
      {/* 标签文字 - 极简 */}
      <span className="text-sm text-slate-700">
        {label || children}
      </span>
    </label>
  );
}

// 使用示例
<Checkbox label="全选" />              // ✅ 2字
<Checkbox label="记住选择" />          // ✅ 4字
<Checkbox>覆盖已有文件</Checkbox>      // ✅ 6字
```

---

### 7.2 开关（无界版）

```jsx
function Switch({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        
        {/* 轨道 */}
        <div
          className="w-11 h-6 rounded-full transition-all duration-300"
          style={{
            background: checked
              ? 'linear-gradient(135deg, #06b6d4, #0ea5e9)'
              : 'rgba(148, 163, 184, 0.3)',
            boxShadow: checked
              ? '0 0 20px rgba(6, 182, 212, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.1)'
              : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* 滑块 - 无边框，有光晕 */}
          <div
            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300"
            style={{
              background: 'white',
              transform: checked ? 'translateX(20px)' : 'translateX(0)',
              boxShadow: checked
                ? '0 0 10px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.2)'
                : '0 2px 6px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>
      </div>
      
      {/* 标签 - 极简 */}
      {label && (
        <span className="text-sm text-slate-700">{label}</span>
      )}
    </label>
  );
}

// 使用示例
<Switch label="深色模式" />    // ✅ 4字
<Switch label="自动解压" />    // ✅ 4字
```

---

### 7.3 文件上传区（无界版）

```jsx
function DropZone({ onDrop, accept }) {
  const [isDragging, setIsDragging] = React.useState(false);
  
  return (
    <div
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        onDrop(e.dataTransfer.files);
      }}
      className={`relative py-16 px-8 rounded-2xl transition-all duration-300 cursor-pointer ${
        isDragging ? 'scale-105' : 'scale-100'
      }`}
      style={{
        background: isDragging
          ? 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.05) 70%, transparent 100%)'
          : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 70%, rgba(255, 255, 255, 0.2) 90%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: isDragging
          ? '0 0 0 2px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.3), 0 12px 40px rgba(0, 0, 0, 0.1)'
          : '0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.08)',
        border: 'none',
      }}
    >
      {/* 中心图标 */}
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-cyan-500"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            boxShadow: isDragging ? '0 0 40px rgba(6, 182, 212, 0.4)' : '0 0 20px rgba(6, 182, 212, 0.2)',
          }}
        >
          <UploadCloudIcon size={32} />
        </div>
        
        {/* 文字 - 极简 */}
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900 mb-1">
            拖入文件  {/* ✅ 4字 */}
          </p>
          <p className="text-sm text-slate-500">
            或点击选择  {/* ✅ 5字 */}
          </p>
        </div>
      </div>
      
      {/* 隐藏的文件输入 */}
      <input
        type="file"
        accept={accept}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => onDrop(e.target.files)}
      />
    </div>
  );
}
```

---

## 八、特殊组件 (Special)

### 8.1 拖拽列表项

```jsx
function DraggableItem({ item, isDragging, onDragStart, onDragEnd }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-move transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-105' : 'opacity-100'
      }`}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        boxShadow: isDragging
          ? '0 0 30px rgba(6, 182, 212, 0.4), 0 12px 40px rgba(0, 0, 0, 0.2)'
          : '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* 拖拽手柄 - 纯图标 */}
      <GripVerticalIcon size={16} className="text-slate-400" />
      
      {/* 内容 */}
      <div className="flex-1">
        <span className="text-sm font-medium text-slate-900">
          {item.name}
        </span>
      </div>
    </div>
  );
}
```

---

### 8.2 时间轴（无界版）

```jsx
function Timeline({ items }) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="relative flex gap-4">
          {/* 时间线 - 渐变光晕 */}
          <div className="relative flex flex-col items-center">
            {/* 节点 */}
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)',
              }}
            />
            
            {/* 连接线（如果不是最后一个） */}
            {i < items.length - 1 && (
              <div 
                className="w-px flex-1 mt-2"
                style={{
                  background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.3), transparent)',
                  minHeight: '40px',
                }}
              />
            )}
          </div>
          
          {/* 内容卡片 */}
          <div className="flex-1 pb-6">
            <p className="text-sm font-medium text-slate-900 mb-1">
              {item.title}  {/* ✅ 极简标题 */}
            </p>
            <p className="text-xs text-slate-500 font-mono">
              {item.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// 使用示例
<Timeline
  items={[
    { title: '上传完成', time: '14:32' },      // ✅ 4字
    { title: '开始解压', time: '14:33' },      // ✅ 4字
    { title: '解压完成', time: '14:35' },      // ✅ 4字
  ]}
/>
```

---

## 九、组合模式 (Composition Patterns)

### 9.1 文件卡片 + 操作栏

```jsx
function FileCard({ file, onDownload, onDelete, onShare }) {
  return (
    <Card hover>
      {/* 文件信息 */}
      <div className="flex items-start gap-4 mb-4">
        {/* 文件图标 */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-purple-500"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)',
          }}
        >
          <FileZipIcon size={28} />
        </div>
        
        {/* 文件名和大小 - 极简 */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 truncate mb-1">
            {file.name}
          </h4>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono tabular-nums">
            <span>{file.size}</span>
            <span>·</span>
            <span>{file.date}</span>
          </div>
        </div>
      </div>
      
      {/* 操作栏 - 纯图标 */}
      <div className="flex items-center gap-2 pt-4 border-t-0 relative">
        {/* 顶部渐变分隔线 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />
        
        <IconButton icon={DownloadIcon} onClick={onDownload} label="下载" size="sm" />
        <IconButton icon={ShareIcon} onClick={onShare} label="分享" size="sm" />
        <div className="flex-1" />
        <IconButton icon={TrashIcon} onClick={onDelete} label="删除" size="sm" />
      </div>
    </Card>
  );
}
```

---

### 9.2 搜索 + 过滤组合

```jsx
function SearchWithFilter({ onSearch, onFilter, filters }) {
  return (
    <div className="flex items-center gap-3">
      {/* 搜索框 - 极简placeholder */}
      <Input 
        icon={SearchIcon}
        placeholder="搜索"     // ✅ 2字
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1"
      />
      
      {/* 过滤按钮 - 纯图标 */}
      <Dropdown
        trigger={
          <IconButton icon={FilterIcon} label="过滤" />
        }
        items={filters}
        onSelect={onFilter}
      />
      
      {/* 排序按钮 - 纯图标 */}
      <IconButton icon={SortIcon} label="排序" />
    </div>
  );
}
```

---

## 十、组件状态系统

### 10.1 交互状态（无界表现）

#### 默认状态 (Default)
```css
.component-default {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.05);
  transform: scale(1);
}
```

#### 悬停状态 (Hover)
```css
.component-hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 0 0 1px rgba(6, 182, 212, 0.1),
    0 0 20px rgba(6, 182, 212, 0.15),
    0 8px 24px rgba(0, 0, 0, 0.1);
  transform: scale(1.02) translateY(-2px);
}
```

#### 激活/选中状态 (Active)
```css
.component-active {
  background: radial-gradient(
    ellipse at center,
    rgba(6, 182, 212, 0.2) 0%,
    rgba(6, 182, 212, 0.1) 70%,
    transparent 100%
  );
  box-shadow: 
    0 0 0 2px rgba(6, 182, 212, 0.3),
    0 0 30px rgba(6, 182, 212, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.1);
}
```

#### 禁用状态 (Disabled)
```css
.component-disabled {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  box-shadow: none;
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

### 10.2 数据状态

#### 加载状态

```jsx
function ComponentLoading() {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <DropletLoader />
      <span className="text-sm text-slate-600">加载中</span>  {/* ✅ 3字 */}
    </div>
  );
}
```

#### 空状态

```jsx
<EmptyState
  icon={InboxIcon}
  title="暂无数据"        // ✅ 4字
  description="开始添加内容"  // ✅ 6字
/>
```

#### 错误状态

```jsx
function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-red-500"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)',
        }}
      >
        <AlertCircleIcon size={32} />
      </div>
      
      <p className="text-sm font-medium text-slate-900">
        {message}  {/* ✅ 如"加载失败" 4字 */}
      </p>
      
      <ButtonSecondary icon={RefreshIcon} onClick={onRetry}>
        重试  {/* ✅ 2字 */}
      </ButtonSecondary>
    </div>
  );
}
```

---

## 十一、组件动画规范

### 11.1 进入动画

所有组件出现都应该有**水滴扩散**效果：

```css
/* 卡片进入 */
@keyframes card-enter {
  0% {
    opacity: 0;
    transform: scale(0.9);
    filter: blur(10px);
    box-shadow: 0 0 0 0 rgba(6, 182, 212, 0);
  }
  50% {
    filter: blur(2px);
    box-shadow: 0 0 30px rgba(6, 182, 212, 0.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.08);
  }
}

.animate-card-enter {
  animation: card-enter 400ms cubic-bezier(0, 0, 0.2, 1);
}
```

### 11.2 退出动画

组件消失应该有**边缘消融**效果：

```css
@keyframes component-exit {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.95);
    filter: blur(8px);
  }
}

.animate-component-exit {
  animation: component-exit 300ms cubic-bezier(0.4, 0, 1, 1);
}
```

### 11.3 交错出现

列表项应该错落出现，像水滴依次落下：

```jsx
function AnimatedList({ items }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="animate-list-item-enter"
          style={{
            animationDelay: `${i * 50}ms`,
          }}
        >
          <FileItem {...item} />
        </div>
      ))}
    </div>
  );
}
```

```css
@keyframes list-item-enter {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.animate-list-item-enter {
  animation: list-item-enter 300ms cubic-bezier(0, 0, 0.2, 1);
  animation-fill-mode: both;
}
```

---

## 十二、无障碍规范

### 12.1 ARIA 属性要求

```jsx
/* ✅ 正确：纯图标按钮必须有 aria-label */
<button aria-label="删除文件">
  <TrashIcon />
</button>

/* ✅ 正确：状态变化用 aria-live */
<div aria-live="polite" aria-atomic="true">
  {status}  {/* "上传完成" 等 */}
</div>

/* ✅ 正确：模态框完整ARIA */
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">删除文件</h2>
  <p id="modal-description">确定删除？</p>
</div>
```

### 12.2 键盘导航

所有交互组件必须支持：

```jsx
function AccessibleButton({ onClick, children, ...props }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  };
  
  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      {...props}
    >
      {children}
    </button>
  );
}
```

**键盘快捷键**：
- `Tab`: 下一个元素
- `Shift + Tab`: 上一个元素
- `Enter`: 激活按钮/链接
- `Space`: 激活按钮/复选框
- `Esc`: 关闭模态框/下拉菜单
- `Arrow Keys`: 在列表/菜单中导航

---

## 十三、组件检查清单

### 无界设计验证（⭐ 核心）
- [ ] 组件无硬性边框（border: none）
- [ ] 使用光晕/渐变/模糊度表达层次
- [ ] 背景使用径向渐变或半透明
- [ ] 添加了 backdrop-filter 毛玻璃效果
- [ ] 悬停时光晕增强
- [ ] 激活状态有晕染扩散
- [ ] 边缘柔和过渡到背景

### 极简文字验证（⭐ 核心）
- [ ] 能用纯图标的都用了纯图标
- [ ] 图标按钮有正确的 aria-label
- [ ] 按钮文字不超过4个字
- [ ] 标签/提示不超过6个字
- [ ] 去掉了"请"、"您"等虚词
- [ ] 详细说明在Tooltip中，不在主界面

### 流体动效验证
- [ ] 进入动画包含水滴扩散效果
- [ ] 退出动画包含边缘消融效果
- [ ] 悬停有平滑的光晕变化
- [ ] 使用流体缓动函数
- [ ] 动画时长符合规范（100-400ms）

### 功能性验证
- [ ] 组件有明确的视觉状态（默认/悬停/激活/禁用）
- [ ] 所有交互元素≥44×44px
- [ ] 焦点状态清晰可见（光晕或ring）
- [ ] 支持键盘导航
- [ ] 深色模式有对应适配
- [ ] 响应式布局不破碎
- [ ] 加载/错误/空状态有友好提示

### 无障碍验证
- [ ] 纯图标按钮有 aria-label
- [ ] 动态内容有 aria-live
- [ ] 模态框有完整 role 和 aria 属性
- [ ] 颜色对比度符合 WCAG AA
- [ ] 支持 prefers-reduced-motion
- [ ] 支持 prefers-contrast: high

---

## 十四、组件库导出规范

### 组件命名规范

```javascript
// 基础组件
export { 
  ButtonPrimary,
  ButtonSecondary,
  IconButton,
  FloatingActionButton,
} from './Button';

export { Input, TextArea, SearchInput } from './Input';
export { Tag, Badge } from './Tag';
export { Divider } from './Divider';

// 内容组件
export { Card, GlassCard } from './Card';
export { List, ListItem, ScrollableList } from './List';
export { FileItem, FileCard } from './File';

// 反馈组件
export { Toast } from './Toast';
export { Modal, Dialog } from './Modal';
export { DropletLoader, ProgressBar } from './Loader';
export { EmptyState, ErrorState } from './State';

// 导航组件
export { Navbar } from './Navbar';
export { Tabs, TabPanel } from './Tabs';

// 叠加组件
export { Dropdown } from './Dropdown';
export { Tooltip } from './Tooltip';
export { Popover } from './Popover';

// 表单组件
export { Checkbox } from './Checkbox';
export { Switch } from './Switch';
export { DropZone } from './DropZone';

// 特殊组件
export { DraggableItem } from './Draggable';
export { Timeline } from './Timeline';
```

---

## 十五、使用示例：完整页面

```jsx
function UnzipAppExample() {
  const [files, setFiles] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50/30">
      {/* 导航栏 - 无界 */}
      <Navbar />
      
      {/* 主内容 */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* 上传区 - 无界 */}
        <DropZone onDrop={handleDrop} accept=".zip,.rar,.7z" />
        
        {/* 搜索 + 过滤 */}
        <SearchWithFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={[
            { icon: ArchiveIcon, label: '全部' },    // ✅ 2字
            { icon: ZipIcon, label: 'ZIP' },
            { icon: ClockIcon, label: '最近' },      // ✅ 2字
          ]}
        />
        
        {/* 文件列表 - 无界卡片 */}
        {files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={InboxIcon}
            title="暂无文件"      // ✅ 4字
            description="拖入压缩包"  // ✅ 5字
          />
        )}
      </main>
      
      {/* 悬浮按钮 - 纯图标 */}
      <FloatingActionButton 
        icon={PlusIcon} 
        label="添加" 
        onClick={handleAdd}
      />
    </div>
  );
}
```

---

**组件是界面的基石，无界组件让界面像水一样流动。**  
**少即是多，图标优于文字，简洁胜于详细。** ✨💧

