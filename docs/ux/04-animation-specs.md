# 04-animation-specs.md - 动画规范与参数

## 一、动画设计原则

### 1.1 核心理念

**动画不是装饰，而是功能的一部分**

- **提供反馈**：让用户知道操作已被接收
- **引导注意力**：将用户视线引导到重要内容
- **建立空间关系**：展示元素之间的层级和关联
- **增强品牌感**：通过独特的动效传递品牌个性
- **提升愉悦感**：让交互更自然、更有趣

### 1.2 设计准则

#### 自然与物理性
```
动画应模拟真实世界的物理规律：
- 有质量（惯性）
- 受重力影响
- 有摩擦力
- 遵循能量守恒
```

#### 目的性
```
每个动画都应有明确目的：
✅ 提供状态反馈
✅ 引导用户注意
✅ 展示层级关系
✅ 平滑过渡

❌ 纯粹为了炫技
❌ 分散用户注意力
❌ 延缓用户操作
```

#### 克制与高效
```
动画应简洁高效：
- 时长通常 < 400ms
- 避免过度复杂的动画
- 关键路径上的动画要快
- 装饰性动画可以慢一些
```

---

## 二、动画时长规范

### 2.1 标准时长系统

```css
/* 动画时长变量 */
--duration-instant: 100ms;    /* 即时反馈 */
--duration-fast: 150ms;       /* 快速过渡 */
--duration-normal: 200ms;     /* 标准动画 */
--duration-moderate: 300ms;   /* 中等动画 */
--duration-slow: 400ms;       /* 慢速动画 */
--duration-slower: 500ms;     /* 更慢动画 */
--duration-deliberate: 700ms; /* 刻意慢动画 */
```

### 2.2 时长使用场景

| 时长 | 适用场景 | 示例 |
|-----|---------|------|
| 100ms | 即时反馈、微交互 | 按钮按下、复选框勾选、开关切换 |
| 150ms | 快速状态变化 | 悬停效果、焦点状态、颜色变化 |
| 200ms | 标准过渡 | 下拉菜单展开、提示框出现、标签页切换 |
| 300ms | 中等复杂度 | 模态框出现、侧边栏展开、卡片翻转 |
| 400ms | 页面级过渡 | 路由切换、大型组件加载、抽屉滑出 |
| 500ms | 强调动画 | 成功提示、重要通知、引导动画 |
| 700ms | 叙事动画 | 欢迎引导、教学动画、品牌展示 |

### 2.3 时长决策树

```
选择动画时长：

1. 是否在关键路径上？
   是 → 使用 100-200ms
   否 → 继续

2. 移动距离如何？
   短距离 (< 100px) → 150-200ms
   中距离 (100-300px) → 200-300ms
   长距离 (> 300px) → 300-400ms

3. 元素大小如何？
   小元素 → 时长 × 0.8
   大元素 → 时长 × 1.2

4. 是否需要强调？
   需要 → 时长 × 1.5
   不需要 → 保持标准时长
```

---

## 三、缓动函数 (Easing)

### 3.1 标准缓动曲线

```css
/* 缓动函数变量 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);        /* 标准 - 平滑进出 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);             /* 减速 - 元素进入 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);              /* 加速 - 元素离开 */
--ease-linear: linear;                               /* 线性 - 持续动画 */

/* 品牌专用缓动 */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* 弹性 - 有趣交互 */
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);    /* 流畅 - 滚动动画 */
--ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);         /* 锐利 - 快速变化 */
```

### 3.2 缓动函数对比

```jsx type=react
import React from 'react';

function EasingComparison() {
    const [isAnimating, setIsAnimating] = React.useState(false);
    
    const easings = [
        { name: 'Linear', value: 'linear' },
        { name: 'Ease In Out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
        { name: 'Ease Out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
        { name: 'Ease In', value: 'cubic-bezier(0.4, 0, 1, 1)' },
        { name: 'Spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    ];
    
    return (
        <div className="p-8 bg-gray-50 rounded-lg">
            <button
                onClick={() => {
                    setIsAnimating(false);
                    setTimeout(() => setIsAnimating(true), 50);
                }}
                className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                播放动画
            </button>
            
            <div className="space-y-4">
                {easings.map(easing => (
                    <div key={easing.name} className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium text-gray-700">
                            {easing.name}
                        </div>
                        <div className="flex-1 h-12 bg-white rounded border border-gray-200 relative overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full w-12 bg-blue-600 rounded"
                                style={{
                                    transform: isAnimating ? 'translateX(calc(100vw - 400px))' : 'translateX(0)',
                                    transition: `transform 1000ms ${easing.value}`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EasingComparison;
```

### 3.3 缓动选择指南

#### Ease Out (减速曲线)
```
使用场景：元素进入视口
cubic-bezier(0, 0, 0.2, 1)

特点：快速开始，平缓结束
适用：
- 对话框/模态框出现
- 菜单展开
- 元素从外部进入
- 页面加载动画

示例：
.modal-enter {
    animation: slideIn 300ms cubic-bezier(0, 0, 0.2, 1);
}
```

#### Ease In (加速曲线)
```
使用场景：元素离开视口
cubic-bezier(0.4, 0, 1, 1)

特点：缓慢开始，快速结束
适用：
- 对话框/模态框关闭
- 菜单收起
- 元素退出视口
- 删除动画

示例：
.modal-exit {
    animation: slideOut 200ms cubic-bezier(0.4, 0, 1, 1);
}
```

#### Ease In Out (平滑曲线)
```
使用场景：状态过渡、位置移动
cubic-bezier(0.4, 0, 0.2, 1)

特点：两端平缓，中间快速
适用：
- 元素移动
- 尺寸变化
- 颜色过渡
- 布局调整

示例：
.card-hover {
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Spring (弹性曲线)
```
使用场景：趣味交互、强调动画
cubic-bezier(0.34, 1.56, 0.64, 1)

特点：超出目标值后回弹
适用：
- 按钮点击反馈
- 成功/完成动画
- 点赞/收藏动画
- 品牌特色交互

⚠️ 注意：谨慎使用，避免过度
```

---

## 四、常见动画类型

### 4.1 淡入淡出 (Fade)

```css
/* 淡入 */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 200ms cubic-bezier(0, 0, 0.2, 1);
}

/* 淡出 */
@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.fade-out {
    animation: fadeOut 150ms cubic-bezier(0.4, 0, 1, 1);
}
```

**使用场景**：提示信息、浮层出现/消失、内容切换

### 4.2 滑动 (Slide)

```css
/* 从下滑入 */
@keyframes slideInUp {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.slide-in-up {
    animation: slideInUp 300ms cubic-bezier(0, 0, 0.2, 1);
}

/* 从右滑入 */
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* 滑出到左 */
@keyframes slideOutLeft {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(-100%);
        opacity: 0;
    }
}
```

**使用场景**：抽屉、侧边栏、移动端菜单、页面切换

### 4.3 缩放 (Scale)

```css
/* 放大进入 */
@keyframes scaleIn {
    from {
        transform: scale(0.9);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.scale-in {
    animation: scaleIn 200ms cubic-bezier(0, 0, 0.2, 1);
}

/* 从中心放大 */
@keyframes scaleUp {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* 弹性放大 */
@keyframes scaleBounce {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
```

**使用场景**：模态框、图片预览、成功提示、点赞动画

### 4.4 旋转 (Rotate)

```css
/* 旋转加载 */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinner {
    animation: spin 1000ms linear infinite;
}

/* 翻转 */
@keyframes flip {
    from {
        transform: rotateY(0);
    }
    to {
        transform: rotateY(180deg);
    }
}

.flip {
    animation: flip 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**使用场景**：加载动画、卡片翻转、刷新按钮

### 4.5 弹跳 (Bounce)

```css
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}

.bounce {
    animation: bounce 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 向下弹跳提示 */
@keyframes bounceDown {
    0%, 100% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-8px);
    }
    50% {
        transform: translateY(0);
    }
    75% {
        transform: translateY(-4px);
    }
}
```

**使用场景**：引导提示、下拉刷新、新消息提醒

---

## 五、组件动画规范

### 5.1 按钮动画

```css
/* 悬停状态 */
.button {
    transition: 
        background-color 150ms cubic-bezier(0, 0, 0.2, 1),
        transform 150ms cubic-bezier(0, 0, 0.2, 1),
        box-shadow 150ms cubic-bezier(0, 0, 0.2, 1);
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 点击状态 */
.button:active {
    transform: translateY(0);
    transition-duration: 100ms;
}

/* 加载状态 */
.button.loading {
    position: relative;
}

.button.loading::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 600ms linear infinite;
}
```

### 5.2 卡片动画

```css
.card {
    transition: 
        transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 
        0 12px 24px -8px rgba(0, 0, 0, 0.1),
        0 4px 8px -4px rgba(0, 0, 0, 0.05);
}

/* 卡片进入动画 */
.card-enter {
    animation: cardEnter 300ms cubic-bezier(0, 0, 0.2, 1);
}

@keyframes cardEnter {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### 5.3 模态框动画

```css
/* 遮罩层 */
.modal-overlay {
    animation: fadeIn 200ms cubic-bezier(0, 0, 0.2, 1);
}

/* 模态框容器 */
.modal-content {
    animation: modalSlideUp 300ms cubic-bezier(0, 0, 0.2, 1);
}

@keyframes modalSlideUp {
    from {
        opacity: 0;
        transform: translateY(32px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* 关闭动画 */
.modal-exit .modal-overlay {
    animation: fadeOut 200ms cubic-bezier(0.4, 0, 1, 1);
}

.modal-exit .modal-content {
    animation: modalSlideDown 200ms cubic-bezier(0.4, 0, 1, 1);
}

@keyframes modalSlideDown {
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateY(32px) scale(0.95);
    }
}
```

### 5.4 下拉菜单动画

```css
.dropdown-menu {
    transform-origin: top center;
    animation: dropdownOpen 200ms cubic-bezier(0, 0, 0.2, 1);
}

@keyframes dropdownOpen {
    from {
        opacity: 0;
        transform: scaleY(0.8) translateY(-8px);
    }
    to {
        opacity: 1;
        transform: scaleY(1) translateY(0);
    }
}

/* 单个菜单项依次出现 */
.dropdown-menu-item {
    animation: menuItemFadeIn 150ms cubic-bezier(0, 0, 0.2, 1);
    animation-fill-mode: both;
}

.dropdown-menu-item:nth-child(1) { animation-delay: 0ms; }
.dropdown-menu-item:nth-child(2) { animation-delay: 30ms; }
.dropdown-menu-item:nth-child(3) { animation-delay: 60ms; }
.dropdown-menu-item:nth-child(4) { animation-delay: 90ms; }
.dropdown-menu-item:nth-child(5) { animation-delay: 120ms; }

@keyframes menuItemFadeIn {
    from {
        opacity: 0;
        transform: translateX(-8px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

### 5.5 Toast 通知动画

```css
/* 从顶部滑入 */
.toast-top {
    animation: toastSlideInTop 300ms cubic-bezier(0, 0, 0.2, 1);
}

@keyframes toastSlideInTop {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* 从底部滑入 */
.toast-bottom {
    animation: toastSlideInBottom 300ms cubic-bezier(0, 0, 0.2, 1);
}

@keyframes toastSlideInBottom {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* 退出动画 */
.toast-exit {
    animation: toastFadeOut 200ms cubic-bezier(0.4, 0, 1, 1);
}

@keyframes toastFadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.9);
    }
}
```

### 5.6 侧边栏/抽屉动画

```css
/* 从右侧滑入 */
.drawer-right {
    animation: drawerSlideInRight 300ms cubic-bezier(0, 0, 0.2, 1);
}

@keyframes drawerSlideInRight {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

/* 从左侧滑入 */
.drawer-left {
    animation: drawerSlideInLeft 300ms cubic-bezier(0, 0, 0.2, 1);
}

@keyframes drawerSlideInLeft {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}
```

---

## 六、微交互动画

### 6.1 复选框勾选

```css
.checkbox-mark {
    stroke-dasharray: 20;
    stroke-dashoffset: 20;
    transition: stroke-dashoffset 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.checkbox:checked + .checkbox-mark {
    stroke-dashoffset: 0;
}
```

### 6.2 开关切换

```css
.switch-thumb {
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.switch:checked .switch-thumb {
    transform: translateX(20px);
}

/* 添加弹性效果 */
.switch-thumb {
    transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 6.3 输入框聚焦

```css
.input {
    border: 2px solid #e5e7eb;
    transition: 
        border-color 150ms cubic-bezier(0, 0, 0.2, 1),
        box-shadow 150ms cubic-bezier(0, 0, 0.2, 1);
}

.input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### 6.4 点赞/收藏动画

```css
@keyframes heartBeat {
    0% {
        transform: scale(1);
    }
    15% {
        transform: scale(1.3);
    }
    30% {
        transform: scale(1);
    }
    45% {
        transform: scale(1.15);
    }
    60% {
        transform: scale(1);
    }
}

.like-button.active {
    animation: heartBeat 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
    color: #ef4444;
}
```

### 6.5 数字变化动画

```jsx type=react
import React, { useState, useEffect } from 'react';

function CountUp({ end, duration = 1000 }) {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let startTime = null;
        const startValue = count;
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // 使用 easeOutCubic 缓动
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (end - startValue) * easeOut);
            
            setCount(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }, [end, duration]);
    
    return (
        <span className="text-4xl font-bold tabular-nums">
            {count.toLocaleString()}
        </span>
    );
}

export default CountUp;
```

---

## 七、加载动画

### 7.1 旋转加载器

```css
.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 800ms linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
```

### 7.2 脉冲加载

```css
.pulse {
    animation: pulse 1500ms cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
```

### 7.3 骨架屏动画

```css
.skeleton {
    background: linear-gradient(
        90deg,
        #f3f4f6 0%,
        #e5e7eb 50%,
        #f3f4f6 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1500ms ease-in-out infinite;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
```

### 7.4 进度条动画

```css
.progress-bar {
    position: relative;
    overflow: hidden;
}

.progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 30%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.5),
        transparent
    );
    animation: progressShine 1500ms ease-in-out infinite;
}

@keyframes progressShine {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(400%);
    }
}
```

### 7.5 点点点加载

```css
.loading-dots::after {
    content: '';
    animation: dots 1500ms steps(4, end) infinite;
}

@keyframes dots {
    0%, 20% {
        content: '';
    }
    40% {
        content: '.';
    }
    60% {
        content: '..';
    }
    80%, 100% {
        content: '...';
    }
}
```

---

## 八、页面过渡动画

### 8.1 路由切换动画

```css
/* 淡入淡出 */
.page-enter {
    opacity: 0;
}

.page-enter-active {
    opacity: 1;
    transition: opacity 300ms cubic-bezier(0, 0, 0.2, 1);
}

.page-exit {
    opacity: 1;
}

.page-exit-active {
    opacity: 0;
    transition: opacity 200ms cubic-bezier(0.4, 0, 1, 1);
}

/* 滑动过渡 */
.page-slide-enter {
    transform: translateX(100%);
}

.page-slide-enter-active {
    transform: translateX(0);
    transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
}

.page-slide-exit {
    transform: translateX(0);
}

.page-slide-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms cubic-bezier(0.4, 0, 1, 1);
}
```

### 8.2 列表项交错动画

```css
.list-item {
    animation: listItemEnter 300ms cubic-bezier(0, 0, 0.2, 1);
    animation-fill-mode: both;
}

/* 为每个元素添加延迟 */
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
.list-item:nth-child(4) { animation-delay: 150ms; }
.list-item:nth-child(5) { animation-delay: 200ms; }
.list-item:nth-child(6) { animation-delay: 250ms; }

@keyframes listItemEnter {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### 8.3 视差滚动

```jsx type=react
import React, { useState, useEffect } from 'react';

function ParallaxSection() {
    const [scrollY, setScrollY] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <div className="relative h-screen overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    transform: `translateY(${scrollY * 0.5}px)`,
                    transition: 'transform 0.1s linear',
                }}
            >
                <img 
                    src="/background.jpg" 
                    className="w-full h-full object-cover"
                    alt="Background"
                />
            </div>
            
            <div
                className="relative z-10 flex items-center justify-center h-full"
                style={{
                    transform: `translateY(${scrollY * 0.2}px)`,
                }}
            >
                <h1 className="text-6xl font-bold text-white">
                    视差滚动效果
                </h1>
            </div>
        </div>
    );
}

export default ParallaxSection;
```

---

## 九、性能优化

### 9.1 使用 transform 和 opacity

```css
/* ✅ 推荐：使用 transform，触发 GPU 加速 */
.element {
    transform: translateX(100px);
    transition: transform 200ms;
}

/* ❌ 避免：使用 left/top，触发重排 */
.element {
    left: 100px;
    transition: left 200ms;
}
```

### 9.2 will-change 提示

```css
/* 提前告知浏览器将要变化的属性 */
.animated-element {
    will-change: transform, opacity;
}

/* ⚠️ 注意：不要过度使用 */
/* 动画结束后移除 will-change */
.animated-element.animation-done {
    will-change: auto;
}
```

### 9.3 减少重绘和重排

```css
/* ✅ 推荐：改变 transform */
.slide {
    transform: translateY(100%);
    transition: transform 300ms;
}

.slide.active {
    transform: translateY(0);
}

/* ❌ 避免：改变 height */
.slide {
    height: 0;
    transition: height 300ms;
}

.slide.active {
    height: 500px;
}
```

### 9.4 动画帧率控制

```javascript
// 使用 requestAnimationFrame 而非 setInterval
function animate() {
    // 动画逻辑
    element.style.transform = `translateX(${position}px)`;
    
    if (!finished) {
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate);
```

### 9.5 CSS 包含 (containment)

```css
/* 告诉浏览器该元素独立于页面其余部分 */
.animated-card {
    contain: layout style paint;
}
```

---

## 十、辅助功能考虑

### 10.1 尊重用户偏好

```css
/* 检测用户是否偏好减少动画 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

```jsx
// React 中检测用户偏好
function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        
        const listener = () => setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', listener);
        
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);
    
    return prefersReducedMotion;
}
```

### 10.2 提供暂停控制

```jsx
function AutoplayCarousel() {
    const [isPaused, setIsPaused] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    
    // 如果用户偏好减少动画，默认暂停
    useEffect(() => {
        if (prefersReducedMotion) {
            setIsPaused(true);
        }
    }, [prefersReducedMotion]);
    
    return (
        <div>
            <Carousel autoplay={!isPaused} />
            <button onClick={() => setIsPaused(!isPaused)}>
                {isPaused ? '播放' : '暂停'}
            </button>
        </div>
    );
}
```

---

## 十一、动画库推荐

### 11.1 Framer Motion (React)

```jsx
import { motion } from 'framer-motion';

function AnimatedComponent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: [0, 0, 0.2, 1],
            }}
        >
            内容
        </motion.div>
    );
}
```

### 11.2 GSAP (通用)

```javascript
import gsap from 'gsap';

gsap.to('.element', {
    duration: 0.3,
    x: 100,
    opacity: 1,
    ease: 'power2.out',
});
```

### 11.3 Anime.js (轻量级)

```javascript
import anime from 'animejs';

anime({
    targets: '.element',
    translateX: 100,
    opacity: 1,
    duration: 300,
    easing: 'easeOutCubic',
});
```

---

## 十二、调试工具

### 12.1 Chrome DevTools

```
1. 打开 DevTools
2. 选择 More tools > Animations
3. 可以：
   - 查看所有运行的动画
   - 调整动画速度
   - 暂停/播放动画
   - 逐帧查看
```

### 12.2 动画时长可视化

```css
/* 开发时添加边框查看动画元素 */
.debug-animation * {
    outline: 1px solid rgba(255, 0, 0, 0.3);
}

/* 显示动画持续时间 */
.debug-animation [style*="animation"]::before {
    content: attr(style);
    position: absolute;
    top: 0;
    left: 0;
    font-size: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 2px 4px;
    z-index: 9999;
}
```

---

## 十三、检查清单

### 动画实施前
- [ ] 动画有明确目的
- [ ] 不妨碍用户完成任务
- [ ] 时长符合规范
- [ ] 选择合适的缓动函数

### 动画实施中
- [ ] 使用 transform/opacity 而非 left/top/width/height
- [ ] 添加 will-change 提示（必要时）
- [ ] 考虑性能影响
- [ ] 在真实设备测试

### 动画实施后
- [ ] 检查不同网速下的表现
- [ ] 确保支持 prefers-reduced-motion
- [ ] 无不必要的动画
- [ ] 动画流畅，无卡顿

---

**文档版本**: v1.0  
**最后更新**: 2025-11-01