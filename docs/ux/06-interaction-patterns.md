# 主要内容预览

## 一、交互设计哲学
- 核心理念（流体科技、无界、极简）
- 交互三原则
- 与设计总概念的关联

## 二、基础交互模式
- 点击/轻点
- 悬停（仅桌面）
- 长按
- 双击
- 右键菜单

## 三、拖放交互
- 拖拽文件上传
- 拖拽排序
- 拖拽移动
- 磁吸效果

## 四、手势交互（移动端）
- 滑动
- 捏合缩放
- 下拉刷新
- 侧滑返回

## 五、键盘交互
- 快捷键系统
- Tab导航
- 搜索聚焦
- 快速操作

## 六、反馈模式
- 即时反馈（100ms内）
- 进度反馈
- 成功/失败反馈
- 加载状态

## 七、引导模式
- 首次使用引导
- 功能提示
- 空状态引导
- 操作预期

## 八、无界交互特色
- 光晕反馈
- 水滴涟漪
- 边缘呼吸
- 磁力吸附

## 九、交互检查清单
- 无界验证、反馈及时性、无障碍

---

# 交互模式库

**版本**: v1.0  
**设计理念**: 流体科技 (Fluid Technology)  
**更新日期**: 2025-11-01

---

## 一、交互设计哲学

### 与设计总概念的关联

本交互系统基于 **00-design-concept.md** 中的核心理念：

```
流体科技 (Fluid Technology)
  ↓
主动引导，非被动等待
  ↓
动效暗示操作、磁力吸附、自然节奏
  ↓
交互应用：
  - 每个操作立即有光晕反馈
  - 水滴涟漪扩散
  - 边缘呼吸提示
  - 磁力引导下一步
```

### 交互三原则

#### 1. 呼应性（100ms内反馈）
```
用户操作 → 0ms   → 立即视觉反馈（按钮缩小）
         → 100ms → 涟漪扩散动画
         → 300ms → 执行实际操作

永远不让用户等待反馈！
```

#### 2. 连续性（有来源有去向）
```
❌ 错误：元素凭空出现 (opacity 0 → 1)
✅ 正确：从父容器边缘流入 + 光晕扩散

❌ 错误：元素突然消失
✅ 正确：边缘消融 + 向目标位置流出
```

#### 3. 引导性（暗示下一步）
```
- 悬停时轻微浮起 → 暗示"可点击"
- 光晕脉冲呼吸 → 暗示"注意这里"
- 磁力吸附效果 → 暗示"拖到这里"
- 箭头方向提示 → 暗示"滑动方向"
```

---

## 二、基础交互模式

### 2.1 点击/轻点 (Click/Tap)

#### 无界按钮点击

```jsx
function BorderlessButton({ children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-6 py-3 rounded-xl font-medium text-white overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
      }}
      // 点击瞬间反馈（0ms）
      whileTap={{ 
        scale: 0.97,
        boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
      }}
      // 涟漪扩散（100ms后）
      onTap={(e) => {
        createRipple(e);
        setTimeout(onClick, 100);
      }}
    >
      {children}
    </motion.button>
  );
}
```

**交互时序**：
```
0ms:   scale(0.97) 立即缩小
100ms: 涟漪从点击点扩散
300ms: 执行 onClick 回调
500ms: 恢复原状 scale(1)
800ms: 涟漪完全消散
```

---

### 2.2 悬停 (Hover) - 仅桌面端

#### 无界卡片悬停

```css
.card-borderless {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 70%,
    rgba(255, 255, 255, 0.3) 90%,
    transparent 100%
  );
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* 悬停 - 光晕增强 */
@media (hover: hover) {
  .card-borderless:hover {
    transform: translateY(-4px);
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.8) 70%,
      rgba(255, 255, 255, 0.4) 90%,
      transparent 100%
    );
    box-shadow: 
      0 0 30px rgba(6, 182, 212, 0.2),
      0 16px 48px rgba(0, 0, 0, 0.12);
  }
}

/* 触摸设备不触发悬停 */
@media (hover: none) {
  .card-borderless:active {
    transform: scale(0.98);
  }
}
```

---

### 2.3 长按 (Long Press)

```jsx
function LongPressItem({ onLongPress, children }) {
  const [pressing, setPressing] = React.useState(false);
  const timerRef = React.useRef(null);
  
  const handleStart = () => {
    setPressing(true);
    timerRef.current = setTimeout(() => {
      onLongPress();
      // 触觉反馈（如果支持）
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }, 500); // 500ms 触发长按
  };
  
  const handleEnd = () => {
    setPressing(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  
  return (
    <div
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      className="relative"
      style={{
        background: pressing 
          ? 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)'
          : 'transparent',
      }}
    >
      {children}
      
      {/* 长按时的呼吸光晕 */}
      {pressing && (
        <div 
          className="absolute inset-0 rounded-xl animate-pulse pointer-events-none"
          style={{
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
          }}
        />
      )}
    </div>
  );
}
```

**使用场景**：
- 文件项长按显示上下文菜单
- 列表项长按进入多选模式
- 图标长按显示详细信息

---

### 2.4 右键菜单 (Context Menu)

```jsx
function ContextMenu({ trigger, items }) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleContextMenu = (e) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };
  
  return (
    <>
      <div onContextMenu={handleContextMenu}>
        {trigger}
      </div>
      
      {isOpen && (
        <div
          className="fixed z-[60] py-2 rounded-xl min-w-[200px] animate-context-menu-enter"
          style={{
            left: position.x,
            top: position.y,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 40px rgba(0, 0, 0, 0.15)',
          }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-cyan-50/50 transition-colors"
            >
              <item.icon size={18} />
              <span>{item.label}</span>  {/* ✅ 极简：2-4字 */}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// 使用示例
<ContextMenu
  trigger={<FileItem />}
  items={[
    { icon: EyeIcon, label: '预览', action: handlePreview },      // ✅ 2字
    { icon: DownloadIcon, label: '下载', action: handleDownload }, // ✅ 2字
    { icon: ShareIcon, label: '分享', action: handleShare },       // ✅ 2字
    { icon: TrashIcon, label: '删除', action: handleDelete },      // ✅ 2字
  ]}
/>
```

---

## 三、拖放交互 (Drag & Drop)

### 3.1 文件拖拽上传（无界版）

```jsx
function DragDropUpload({ onDrop }) {
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
      className="relative py-16 rounded-2xl transition-all duration-300"
      style={{
        background: isDragging
          ? 'radial-gradient(circle at center, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.05) 70%, transparent 100%)'
          : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: isDragging
          ? '0 0 0 2px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.4)'
          : '0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.08)',
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* 图标 - 拖拽时脉冲 */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-cyan-500 transition-all ${
            isDragging ? 'animate-pulse scale-110' : ''
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
            boxShadow: isDragging ? '0 0 40px rgba(6, 182, 212, 0.5)' : '0 0 20px rgba(6, 182, 212, 0.2)',
          }}
        >
          <UploadCloudIcon size={32} />
        </div>
        
        {/* 文字 - 极简 */}
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">
            {isDragging ? '释放' : '拖入文件'}  {/* ✅ 2-4字 */}
          </p>
        </div>
      </div>
    </div>
  );
}
```

**交互状态**：
- **默认**: 柔和晕染边缘
- **拖入悬停**: 青色晕染扩散 + 轻微放大
- **释放**: 光晕脉冲 + 文件爆炸动画

---

### 3.2 拖拽排序（磁吸效果）

```jsx
function DraggableSortList({ items, onReorder }) {
  const [draggedItem, setDraggedItem] = React.useState(null);
  const [dropTarget, setDropTarget] = React.useState(null);
  
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          draggable
          onDragStart={() => setDraggedItem(item)}
          onDragEnd={() => {
            setDraggedItem(null);
            setDropTarget(null);
          }}
          onDragEnter={() => setDropTarget(index)}
          className="relative"
          animate={{
            // 磁吸效果：目标位置显示占位符
            y: dropTarget === index && draggedItem?.id !== item.id ? 60 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div
            className="px-4 py-3 rounded-xl flex items-center gap-3 cursor-move"
            style={{
              background: draggedItem?.id === item.id
                ? 'rgba(6, 182, 212, 0.15)'
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              boxShadow: draggedItem?.id === item.id
                ? '0 0 40px rgba(6, 182, 212, 0.5), 0 8px 32px rgba(0, 0, 0, 0.2)'
                : '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.05)',
              opacity: draggedItem?.id === item.id ? 0.6 : 1,
            }}
          >
            <GripVerticalIcon size={16} className="text-slate-400" />
            <span className="flex-1 text-sm">{item.name}</span>
          </div>
          
          {/* 磁吸线提示 */}
          {dropTarget === index && draggedItem?.id !== item.id && (
            <div
              className="absolute -top-1 left-0 right-0 h-0.5 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.6)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
```

---

## 四、手势交互 (Mobile Gestures)

### 4.1 滑动切换

```jsx
function SwipeableView({ items }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex(i => Math.min(items.length - 1, i + 1)),
    onSwipedRight: () => setCurrentIndex(i => Math.max(0, i - 1)),
    trackMouse: false,
  });
  
  return (
    <div {...handlers} className="relative overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {items.map((item) => (
          <div key={item.id} className="min-w-full">
            {item.content}
          </div>
        ))}
      </motion.div>
      
      {/* 指示器 - 无界版 */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background: i === currentIndex
                ? 'linear-gradient(135deg, #06b6d4, #0ea5e9)'
                : 'rgba(148, 163, 184, 0.3)',
              boxShadow: i === currentIndex
                ? '0 0 10px rgba(6, 182, 212, 0.5)'
                : 'none',
              transform: i === currentIndex ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

---

### 4.2 下拉刷新

```jsx
function PullToRefresh({ onRefresh, children }) {
  const [pulling, setPulling] = React.useState(false);
  const [pullDistance, setPullDistance] = React.useState(0);
  const startY = React.useRef(0);
  
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };
  
  const handleTouchMove = (e) => {
    if (window.scrollY === 0) {
      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY.current);
      
      if (distance > 0) {
        setPulling(true);
        setPullDistance(Math.min(distance, 100));
      }
    }
  };
  
  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      onRefresh();
    }
    setPulling(false);
    setPullDistance(0);
  };
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* 刷新指示器 */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center transition-all"
        style={{
          transform: `translateY(${pullDistance - 60}px)`,
          opacity: pullDistance / 60,
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
            transform: `rotate(${pullDistance * 3.6}deg)`,
          }}
        >
          <RefreshIcon size={20} className="text-white" />
        </div>
      </div>
      
      {children}
    </div>
  );
}
```

---

## 五、键盘交互

### 5.1 快捷键系统

```jsx
function useKeyboardShortcuts() {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + O: 打开文件
      if ((e.metaKey || e.ctrlKey) && e.key === 'o') {
        e.preventDefault();
        openFile();
      }
      
      // Cmd/Ctrl + E: 解压
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        extractArchive();
      }
      
      // Delete: 删除选中
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (hasSelection()) {
          e.preventDefault();
          deleteSelected();
        }
      }
      
      // Esc: 关闭模态框
      if (e.key === 'Escape') {
        closeModal();
      }
      
      // Cmd/Ctrl + A: 全选
      if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
        e.preventDefault();
        selectAll();
      }
      
      // Cmd/Ctrl + /: 显示快捷键帮助
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        showKeyboardHelp();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
```

**快捷键列表**：
```
全局操作：
  Cmd/Ctrl + O     → 打开
  Cmd/Ctrl + E     → 解压
  Cmd/Ctrl + W     → 关闭
  Cmd/Ctrl + ,     → 设置
  Cmd/Ctrl + /     → 帮助

文件操作：
  Cmd/Ctrl + A     → 全选
  Cmd/Ctrl + D     → 取消选择
  Delete/Backspace → 删除
  Enter            → 打开/确认
  Space            → 预览

导航：
  Tab              → 下一个
  Shift + Tab      → 上一个
  ↑↓               → 上下选择
  Esc              → 关闭/返回
```

---

### 5.2 搜索聚焦 (Cmd+K模式)

```jsx
function GlobalSearch() {
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K: 打开搜索
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] p-4">
      {/* 遮罩 */}
      <div 
        className="absolute inset-0 backdrop-blur-xl bg-slate-900/60"
        onClick={() => setIsOpen(false)}
      />
      
      {/* 搜索框 - 无界版 */}
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 0 0 1px rgba(6, 182, 212, 0.2), 0 0 60px rgba(6, 182, 212, 0.3), 0 20px 80px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* 搜索输入 */}
        <div className="flex items-center gap-3 px-6 py-4">
          <SearchIcon size={20} className="text-cyan-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="搜索"  {/* ✅ 2字 */}
            className="flex-1 bg-transparent border-none outline-none text-lg"
          />
          <kbd className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-600">Esc</kbd>
        </div>
        
        {/* 搜索结果 */}
        <div className="max-h-96 overflow-y-auto p-2">
          {/* 结果列表 */}
        </div>
      </div>
    </div>
  );
}
```

---

## 六、反馈模式 (Feedback Patterns)

### 6.1 即时反馈（100ms内）

**原则：用户操作后100ms内必须有视觉反馈**

```jsx
function InstantFeedbackButton({ onClick, children }) {
  const [clicked, setClicked] = React.useState(false);
  
  const handleClick = async (e) => {
    // 0ms: 立即视觉反馈
    setClicked(true);
    
    // 100ms: 涟漪动画
    createRipple(e);
    
    // 300ms: 执行实际操作
    setTimeout(async () => {
      await onClick();
      setClicked(false);
    }, 300);
  };
  
  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden"
      style={{
        transform: clicked ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 100ms',
      }}
    >
      {children}
    </button>
  );
}
```

---

### 6.2 进度反馈

```jsx
function UploadWithProgress({ file, onUploadComplete }) {
  const [progress, setProgress] = React.useState(0);
  
  return (
    <div className="space-y-3">
      {/* 文件信息 - 极简 */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-700 truncate">{file.name}</span>
        <span className="text-xs text-slate-500 font-mono tabular-nums">{progress}%</span>
      </div>
      
      {/* 液体进度条 */}
      <div 
        className="h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(6, 182, 212, 0.1)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #06b6d4 0%, #22d3ee 50%, #06b6d4 100%)',
            backgroundSize: '200% 100%',
            animation: 'liquidFlow 2s ease-in-out infinite',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)',
          }}
        />
      </div>
      
      {/* 状态文字 - 极简 */}
      <p className="text-xs text-slate-600">
        {progress < 100 ? '上传中' : '完成'}  {/* ✅ 3-2字 */}
      </p>
    </div>
  );
}
```

---

### 6.3 成功反馈（粒子爆炸）

```jsx
function SuccessFeedback({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed top-8 right-8 z-[80] px-6 py-4 rounded-xl flex items-center gap-3"
      style={{
        background: 'rgba(16, 185, 129, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 40px rgba(16, 185, 129, 0.5), 0 8px 24px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* 成功图标 - 带粒子爆炸 */}
      <ParticleBurst color="emerald" />
      <CheckCircleIcon size={24} className="text-white" />
      
      {/* 消息 - 极简 */}
      <span className="text-white font-medium">
        {message}  {/* ✅ 如"解压完成" 4字 */}
      </span>
      
      <button onClick={onClose} aria-label="关闭">
        <XIcon size={18} className="text-white/80 hover:text-white" />
      </button>
    </motion.div>
  );
}
```

---

## 七、引导模式 (Guidance Patterns)

### 7.1 首次使用引导

```jsx
function FirstTimeGuide() {
  const [step, setStep] = React.useState(0);
  
  const steps = [
    {
      target: '.upload-zone',
      title: '拖入文件',           // ✅ 4字
      description: '支持ZIP、RAR、7Z', // ✅ 简洁说明
    },
    {
      target: '.file-list',
      title: '查看内容',           // ✅ 4字
      description: '点击预览文件',
    },
    {
      target: '.extract-button',
      title: '开始解压',           // ✅ 4字
      description: '选择保存位置',
    },
  ];
  
  return (
    <>
      {steps.map((s, i) => (
        i === step && (
          <Spotlight
            key={i}
            target={s.target}
            onNext={() => setStep(i + 1)}
            onSkip={() => setStep(steps.length)}
          >
            <div
              className="p-6 rounded-2xl max-w-xs"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 60px rgba(6, 182, 212, 0.3), 0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{s.description}</p>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => setStep(steps.length)}
                  className="text-sm text-slate-500"
                >
                  跳过  {/* ✅ 2字 */}
                </button>
                <div className="flex gap-2">
                  <span className="text-xs text-slate-400">
                    {i + 1}/{steps.length}
                  </span>
                  <ButtonPrimary onClick={() => setStep(i + 1)} size="sm">
                    {i === steps.length - 1 ? '完成' : '下一步'}  {/* ✅ 2-3字 */}
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </Spotlight>
        )
      ))}
    </>
  );
}
```

---

### 7.2 空状态引导

```jsx
function EmptyStateWithGuide({ onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* 动画图标 - 光晕脉冲 */}
      <motion.div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(6, 182, 212, 0.2)',
            '0 0 40px rgba(6, 182, 212, 0.4)',
            '0 0 20px rgba(6, 182, 212, 0.2)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <InboxIcon size={48} className="text-cyan-500" />
      </motion.div>
      
      {/* 引导文字 - 极简 */}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        暂无文件  {/* ✅ 4字 */}
      </h3>
      <p className="text-sm text-slate-600 mb-6">
        拖入压缩包开始  {/* ✅ 7字 */}
      </p>
      
      {/* 操作按钮 */}
      <ButtonPrimary icon={FolderPlusIcon} onClick={onAction}>
        选择文件  {/* ✅ 4字 */}
      </ButtonPrimary>
      
      {/* 提示 - 可选 */}
      <p className="text-xs text-slate-400 mt-4">
        或使用 Cmd+O  {/* ✅ 快捷键提示 */}
      </p>
    </div>
  );
}
```

---

## 八、无界交互特色

### 8.1 光晕反馈

**所有交互都应该有光晕变化**

```css
/* 默认状态 */
.interactive-element {
  box-shadow: 0 0 0 rgba(6, 182, 212, 0);
  transition: box-shadow 200ms;
}

/* 悬停 - 光晕出现 */
.interactive-element:hover {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
}

/* 聚焦 - 光晕增强 */
.interactive-element:focus {
  box-shadow: 
    0 0 0 2px rgba(6, 182, 212, 0.2),
    0 0 30px rgba(6, 182, 212, 0.4);
}

/* 激活 - 光晕脉冲 */
.interactive-element.active {
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(6, 182, 212, 0.5);
  }
}
```

---

### 8.2 水滴涟漪

**点击时从点击点扩散涟漪**

```jsx
function RippleButton({ children, onClick }) {
  const [ripples, setRipples] = React.useState([]);
  
  const createRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = { x, y, id: Date.now() };
    setRipples([...ripples, ripple]);
    
    setTimeout(() => {
      setRipples(ripples.filter(r => r.id !== ripple.id));
    }, 800);
  };
  
  return (
    <button
      onClick={(e) => {
        createRipple(e);
        onClick(e);
      }}
      className="relative overflow-hidden"
    >
      {children}
      
      {/* 涟漪动画 */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)',
            animation: 'rippleExpand 800ms ease-out',
          }}
        />
      ))}
    </button>
  );
}
```

```css
@keyframes rippleExpand {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}
```

---

### 8.3 边缘呼吸提示

**引导用户注意关键元素**

```jsx
function BreathingPrompt({ children, highlight = false }) {
  return (
    <div className="relative">
      {children}
      
      {/* 呼吸光晕 */}
      {highlight && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none -z-10"
          style={{
            animation: 'breathingGlow 2s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
}
```

```css
@keyframes breathingGlow {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(6, 182, 212, 0.3),
      0 0 40px rgba(6, 182, 212, 0.15);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(6, 182, 212, 0.5),
      0 0 60px rgba(6, 182, 212, 0.3);
  }
}
```

---

### 8.4 磁力吸附

**拖拽时自动吸附到目标区域**

```jsx
function MagneticDropTarget({ onDrop, children }) {
  const [isNear, setIsNear] = React.useState(false);
  const targetRef = React.useRef(null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    
    // 计算距离
    const rect = targetRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(x * x + y * y);
    
    // 距离 < 100px 时显示磁力效果
    setIsNear(distance < 100);
  };
  
  return (
    <div
      ref={targetRef}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsNear(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsNear(false);
        onDrop(e);
      }}
      className="relative transition-all duration-300"
      style={{
        background: isNear
          ? 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.1) 70%, transparent 100%)'
          : 'radial-gradient(ellipse, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 70%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: isNear
          ? '0 0 0 2px rgba(6, 182, 212, 0.5), 0 0 50px rgba(6, 182, 212, 0.5)'
          : '0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.08)',
        transform: isNear ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {children}
      
      {/* 磁力线提示 */}
      {isNear && (
        <div className="absolute inset-0 rounded-xl animate-magneticPulse pointer-events-none">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-xl"
              style={{
                boxShadow: '0 0 0 1px rgba(6, 182, 212, 0.3)',
                animation: `magneticRing 1.5s ease-out infinite ${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

```css
@keyframes magneticRing {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
```

---

## 九、复杂交互模式

### 9.1 文件多选

```jsx
function MultiSelectList({ items }) {
  const [selected, setSelected] = React.useState(new Set());
  const [lastSelected, setLastSelected] = React.useState(null);
  
  const handleClick = (id, e) => {
    const newSelected = new Set(selected);
    
    if (e.shiftKey && lastSelected !== null) {
      // Shift + 点击：范围选择
      const start = items.findIndex(i => i.id === lastSelected);
      const end = items.findIndex(i => i.id === id);
      const range = items.slice(
        Math.min(start, end),
        Math.max(start, end) + 1
      );
      range.forEach(item => newSelected.add(item.id));
    } else if (e.metaKey || e.ctrlKey) {
      // Cmd/Ctrl + 点击：多选
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
    } else {
      // 单击：单选
      newSelected.clear();
      newSelected.add(id);
    }
    
    setSelected(newSelected);
    setLastSelected(id);
  };
  
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={(e) => handleClick(item.id, e)}
          className="relative px-4 py-3 rounded-xl cursor-pointer transition-all"
          style={{
            background: selected.has(item.id)
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 70%, transparent 100%)'
              : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            boxShadow: selected.has(item.id)
              ? '0 0 0 2px rgba(6, 182, 212, 0.3), 0 0 20px rgba(6, 182, 212, 0.2)'
              : '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div className="flex items-center gap-3">
            {/* 选中指示器 */}
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
              style={{
                background: selected.has(item.id)
                  ? 'linear-gradient(135deg, #06b6d4, #0ea5e9)'
                  : 'rgba(148, 163, 184, 0.2)',
                boxShadow: selected.has(item.id)
                  ? '0 0 10px rgba(6, 182, 212, 0.5)'
                  : 'none',
              }}
            >
              {selected.has(item.id) && (
                <CheckIcon size={14} className="text-white" />
              )}
            </div>
            
            <span className="text-sm">{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**快捷键提示**：
- 单击：选中单个
- Cmd/Ctrl + 点击：多选
- Shift + 点击：范围选择
- Cmd/Ctrl + A：全选

---

### 9.2 预览交互

```jsx
function FilePreview({ file }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  
  return (
    <>
      {/* 缩略图 - 点击预览 */}
      <div
        onClick={() => setIsFullscreen(true)}
        className="relative group cursor-pointer"
      >
        <img
          src={file.thumbnail}
          className="w-full h-48 object-cover rounded-xl"
        />
        
        {/* 悬停遮罩 - 光晕提示 */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
            }}
          >
            <EyeIcon size={24} className="text-cyan-600" />
          </div>
        </div>
      </div>
      
      {/* 全屏预览 */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          {/* 遮罩 */}
          <div className="absolute inset-0 backdrop-blur-2xl bg-slate-900/80" />
          
          {/* 图片 */}
          <motion.img
            src={file.full}
            className="relative z-10 max-w-full max-h-full rounded-2xl"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            style={{
              boxShadow: '0 0 80px rgba(6, 182, 212, 0.3), 0 20px 100px rgba(0, 0, 0, 0.5)',
            }}
          />
          
          {/* 关闭按钮 - 纯图标 */}
          <button
            className="absolute top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            }}
            aria-label="关闭"
          >
            <XIcon size={20} />
          </button>
        </div>
      )}
    </>
  );
}
```

---

## 十、交互检查清单

### 无界交互验证（⭐ 核心）
- [ ] 所有交互都有光晕反馈
- [ ] 点击有涟漪扩散效果
- [ ] 悬停时光晕增强
- [ ] 激活状态有呼吸光晕
- [ ] 拖拽时边缘晕染
- [ ] 无硬性边框高亮

### 反馈及时性验证
- [ ] 点击后0-100ms内有视觉反馈
- [ ] 加载状态清晰可见
- [ ] 成功/失败有明确提示
- [ ] 进度百分比实时更新
- [ ] 悬停状态即时响应

### 极简交互验证
- [ ] 操作图标清晰易懂
- [ ] 提示文字≤8个字
- [ ] 详细说明在Tooltip中
- [ ] 快捷键标注清晰

### 功能性验证
- [ ] 键盘可完全操作
- [ ] 触摸目标≥44×44px
- [ ] 长按功能正常
- [ ] 拖拽流畅无卡顿
- [ ] 手势识别准确
- [ ] 右键菜单完整

### 无障碍验证
- [ ] 所有交互元素可Tab访问
- [ ] 焦点状态清晰（光晕）
- [ ] 操作有 aria-label
- [ ] 支持屏幕阅读器
- [ ] 键盘快捷键完整

---

**好的交互是自然的，用户感受到流畅，而非学习成本。**  
**无界交互让操作如水般顺滑，光晕引导每一步。** ✨💧

