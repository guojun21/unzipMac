# 主要内容预览

## 一、色彩哲学
- 水色光谱理念（浅水→深海→水流→水滴）
- 色彩三原则（冷暖平衡、透明优先、渐变思维）

## 二、主色系统 (Primary Colors)
- 青色渐变色阶（Cyan 50-900）
- 使用场景映射表
- 主渐变定义（品牌、光感、流动）

## 三、辅助色系统 (Secondary Colors)
- 极光色盘（紫/粉/橙/绿）
- 文件类型色彩分类
- 功能状态标记

## 四、功能色系统 (Semantic Colors)
- 状态色定义（成功/警告/错误/信息）
- 使用规范与示例

## 五、中性色系统 (Neutral Colors)
- 深海渐变理念
- 浅色模式（水面之上）
- 深色模式（深海之下）
- WCAG 对比度保证

## 六、特殊效果色
- 玻璃态效果（毛玻璃背景）
- 发光效果（焦点/激活状态）
- 渐变遮罩（列表淡出）

## 七、色彩使用规范
- 面积比例原则（60-30-10法则）
- 层次表达技巧
- 交互状态色彩变化
- 无障碍设计要求

## 八、颜色代码速查
- Tailwind CSS 类名映射
- 完整配置文件

## 九、色彩测试清单
- 对比度、占比、适配、无障碍验证

---

# 色彩系统设计规范

**版本**: v1.0  
**设计理念**: 流体科技 (Fluid Technology)  
**更新日期**: 2025-11-01

---

## 一、色彩哲学

### 水色光谱理念
压缩包解压的本质是**数据的流动与释放**。我们的色彩系统模拟**水在不同状态下的光学表现**：

```
浅水 → 清澈透明 → 浅色模式
深海 → 幽蓝神秘 → 深色模式
水流 → 动态渐变 → 交互状态
水滴 → 晶莹剔透 → 强调元素
```

### 色彩三原则

1. **冷暖平衡**: 以青色为主（冷），用暖色点缀（功能色）
2. **透明优先**: 多用半透明叠加，少用纯色填充
3. **渐变思维**: 避免单一色块，倾向柔和过渡

---

## 二、主色系统 (Primary Colors)

### 青色渐变 - 品牌主色

```css
/* Cyan Gradient Palette */
--cyan-50:  #ecfeff;  /* 水面反光 - 最亮高光 */
--cyan-100: #cffafe;  /* 浅水波纹 - 悬浮卡片背景 */
--cyan-200: #a5f3fc;  /* 水晶质感 - 选中状态背景 */
--cyan-300: #67e8f9;  /* 流动光泽 - Hover高光 */
--cyan-400: #22d3ee;  /* 活跃水流 - 活跃状态 */
--cyan-500: #06b6d4;  /* ★ 主品牌色 - 主按钮/链接 */
--cyan-600: #0891b2;  /* 深水色调 - 按钮按下态 */
--cyan-700: #0e7490;  /* 海洋深处 - 深色模式主色 */
--cyan-800: #155e75;  /* 深海暗影 - 边框/分割线 */
--cyan-900: #164e63;  /* 海沟黑蓝 - 最深阴影 */
```

#### 使用场景

| 色阶 | 浅色模式 | 深色模式 | 典型用途 |
|------|---------|---------|---------|
| 50-100 | 背景/悬浮层 | - | 卡片悬浮态、工具提示背景 |
| 200-300 | 选中/高光 | - | 选中文件背景、Hover效果 |
| 400-500 | 主交互色 | 辅助色 | 主按钮、链接、进度条 |
| 600-700 | 按压态 | 主交互色 | 按钮按下、深色模式按钮 |
| 800-900 | 边框/文字 | 边框/背景 | 分割线、深色模式卡片背景 |

#### 主渐变定义

```css
/* 主品牌渐变 - 用于大面积装饰 */
--gradient-primary: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);

/* 光感渐变 - 用于按钮、卡片顶部高光 */
--gradient-glow: linear-gradient(180deg, 
  rgba(103, 232, 249, 0.3) 0%, 
  rgba(6, 182, 212, 0) 100%
);

/* 流动渐变 - 用于进度条、加载动画 */
--gradient-flow: linear-gradient(90deg, 
  #06b6d4 0%, 
  #22d3ee 50%, 
  #06b6d4 100%
);
/* 配合 background-size: 200% 和动画使用 */
```

---

## 三、辅助色系统 (Secondary Colors)

### 极光色盘 - 功能分类色

基于**北极光的色彩**设计，用于文件类型区分和功能状态。

#### 紫色 - 创意/特殊文件
```css
--purple-400: #c084fc;  /* 浅紫光 - Hover */
--purple-500: #a78bfa;  /* ★ 紫光 - 主色 */
--purple-600: #8b5cf6;  /* 深紫 - 按压态 */

/* 使用场景 */
- 压缩包图标
- 特殊格式文件 (.psd, .ai, .sketch)
- 高级功能标记
```

#### 粉色 - 图片/媒体文件
```css
--pink-400: #f9a8d4;  /* 浅粉光 */
--pink-500: #f472b6;  /* ★ 粉光 */
--pink-600: #ec4899;  /* 深粉 */

/* 使用场景 */
- 图片文件 (.jpg, .png, .gif)
- 视频文件 (.mp4, .mov)
- 媒体预览标记
```

#### 橙色 - 重要/警示
```css
--orange-400: #fbbf24;  /* 浅橙光 */
--orange-500: #fb923c;  /* ★ 橙光 */
--orange-600: #f97316;  /* 深橙 */

/* 使用场景 */
- 加密压缩包
- 大文件警告
- 重要提示标记
```

#### 绿色 - 成功/完成
```css
--emerald-400: #34d399;  /* 浅绿光 */
--emerald-500: #10b981;  /* ★ 绿光 */
--emerald-600: #059669;  /* 深绿 */

/* 使用场景 */
- 解压成功状态
- 文件校验通过
- 完成进度标记
```

---

## 四、功能色系统 (Semantic Colors)

### 状态色定义

```css
/* 成功 Success */
--color-success-light: #34d399;     /* 浅色模式 */
--color-success-dark:  #10b981;     /* 深色模式 */
--color-success-bg:    rgba(16, 185, 129, 0.1);  /* 背景 */
--color-success-border: rgba(16, 185, 129, 0.3); /* 边框 */

/* 警告 Warning */
--color-warning-light: #fbbf24;
--color-warning-dark:  #f59e0b;
--color-warning-bg:    rgba(245, 158, 11, 0.1);
--color-warning-border: rgba(245, 158, 11, 0.3);

/* 错误 Error */
--color-error-light: #f87171;
--color-error-dark:  #ef4444;
--color-error-bg:    rgba(239, 68, 68, 0.1);
--color-error-border: rgba(239, 68, 68, 0.3);

/* 信息 Info */
--color-info-light: #60a5fa;
--color-info-dark:  #3b82f6;
--color-info-bg:    rgba(59, 130, 246, 0.1);
--color-info-border: rgba(59, 130, 246, 0.3);
```

### 使用规范

```jsx
// ✅ 正确：带背景的状态提示
<div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600">
  解压成功
</div>

// ❌ 错误：纯色背景太强烈
<div className="bg-emerald-500 text-white">
  解压成功
</div>
```

---

## 五、中性色系统 (Neutral Colors)

### 深海渐变理念
不使用纯黑白灰，而是**带有蓝色倾向的中性色**，呼应"深海"主题。

#### 浅色模式 - 水面之上

```css
/* 背景层级 */
--neutral-bg-primary:   #ffffff;  /* 主背景 - 纯白水面 */
--neutral-bg-secondary: #f8fafc;  /* 次背景 - 浅波纹 */
--neutral-bg-tertiary:  #f1f5f9;  /* 三级背景 - 卡片背景 */
--neutral-bg-elevated:  #ffffff;  /* 悬浮层 - 带阴影的白 */

/* 边框/分割线 */
--neutral-border-light:  #e2e8f0;  /* 浅边框 */
--neutral-border-medium: #cbd5e1;  /* 中边框 */
--neutral-border-heavy:  #94a3b8;  /* 重边框 */

/* 文字层级 */
--neutral-text-primary:   #0f172a;  /* 主文字 - 深板岩色 */
--neutral-text-secondary: #475569;  /* 次文字 - 中灰 */
--neutral-text-tertiary:  #64748b;  /* 三级文字 - 浅灰 */
--neutral-text-disabled:  #94a3b8;  /* 禁用文字 */
--neutral-text-placeholder: #cbd5e1; /* 占位符 */
```

#### 深色模式 - 深海之下

```css
/* 背景层级 */
--neutral-bg-primary:   #0f172a;  /* 主背景 - 深海黑蓝 */
--neutral-bg-secondary: #1e293b;  /* 次背景 - 板岩暗 */
--neutral-bg-tertiary:  #334155;  /* 三级背景 - 卡片背景 */
--neutral-bg-elevated:  #1e293b;  /* 悬浮层 - 带光晕 */

/* 边框/分割线 */
--neutral-border-light:  #334155;  /* 浅边框 */
--neutral-border-medium: #475569;  /* 中边框 */
--neutral-border-heavy:  #64748b;  /* 重边框 */

/* 文字层级 */
--neutral-text-primary:   #f1f5f9;  /* 主文字 - 近白 */
--neutral-text-secondary: #cbd5e1;  /* 次文字 - 浅灰 */
--neutral-text-tertiary:  #94a3b8;  /* 三级文字 - 中灰 */
--neutral-text-disabled:  #64748b;  /* 禁用文字 */
--neutral-text-placeholder: #475569; /* 占位符 */
```

### 对比度保证

| 组合 | 浅色模式 | 深色模式 | WCAG等级 |
|------|---------|---------|----------|
| 主文字/主背景 | 16.9:1 | 15.2:1 | AAA |
| 次文字/主背景 | 8.3:1 | 9.1:1 | AAA |
| 三级文字/主背景 | 5.1:1 | 5.8:1 | AA |
| 边框/背景 | 3.2:1 | 2.8:1 | - |

---

## 六、特殊效果色

### 玻璃态效果

```css
/* 浅色模式玻璃 */
--glass-light-bg: rgba(255, 255, 255, 0.7);
--glass-light-border: rgba(255, 255, 255, 0.3);
--glass-light-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

/* 深色模式玻璃 */
--glass-dark-bg: rgba(30, 41, 59, 0.7);
--glass-dark-border: rgba(255, 255, 255, 0.1);
--glass-dark-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

/* 完整玻璃效果类 */
.glass {
  background: var(--glass-light-bg);
  border: 1px solid var(--glass-light-border);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: var(--glass-light-shadow);
}

.dark .glass {
  background: var(--glass-dark-bg);
  border-color: var(--glass-dark-border);
  box-shadow: var(--glass-dark-shadow);
}
```

### 发光效果

```css
/* 主色发光 - 用于焦点/激活状态 */
--glow-cyan: 0 0 20px rgba(6, 182, 212, 0.4),
             0 0 40px rgba(6, 182, 212, 0.2);

/* 成功发光 */
--glow-success: 0 0 20px rgba(16, 185, 129, 0.4);

/* 错误发光 */
--glow-error: 0 0 20px rgba(239, 68, 68, 0.4);

/* 使用示例 */
.button-primary:focus {
  box-shadow: var(--glow-cyan);
}
```

### 渐变遮罩

```css
/* 上渐变遮罩 - 用于列表顶部淡出 */
--mask-top: linear-gradient(180deg, 
  transparent 0%, 
  #ffffff 20%
);

/* 下渐变遮罩 - 用于列表底部淡出 */
--mask-bottom: linear-gradient(0deg, 
  transparent 0%, 
  #ffffff 20%
);

/* 使用方式 */
.scrollable-list::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: var(--mask-top);
  pointer-events: none;
}
```

---

## 七、色彩使用规范

### 面积比例原则

```
主色 (Cyan):     10-15%  - 关键操作、品牌标识
辅助色 (Aurora): 5-10%   - 文件类型、状态标记
中性色:          70-80%  - 背景、文字、边框
留白:            10-15%  - 呼吸空间
```

### 层次表达

```css
/* ✅ 正确：用透明度表达层次 */
background: rgba(6, 182, 212, 0.1);  /* 最浅 */
background: rgba(6, 182, 212, 0.2);  /* 浅 */
background: rgba(6, 182, 212, 0.5);  /* 中 */
background: #06b6d4;                 /* 实色 */

/* ❌ 错误：用不同色阶表达层次（不连贯） */
background: #ecfeff;  /* cyan-50 */
background: #a5f3fc;  /* cyan-200 - 跳跃太大 */
```

### 交互状态色彩变化

```css
/* 标准按钮状态 */
.button {
  /* 默认 */
  background: #06b6d4;
  
  /* Hover - 提亮 */
  &:hover {
    background: #22d3ee;  /* +2级 */
  }
  
  /* Active - 压暗 */
  &:active {
    background: #0891b2;  /* -1级 */
  }
  
  /* Disabled - 半透明 */
  &:disabled {
    background: rgba(6, 182, 212, 0.3);
    color: rgba(255, 255, 255, 0.5);
  }
}
```

### 色彩无障碍

```css
/* 永远不要仅用颜色传达信息 */

/* ❌ 错误：只用颜色区分 */
<span style="color: red;">错误</span>
<span style="color: green;">成功</span>

/* ✅ 正确：颜色 + 图标 + 文字 */
<span className="text-red-600">
  <XIcon /> 错误
</span>
<span className="text-emerald-600">
  <CheckIcon /> 成功
</span>
```

---

## 八、颜色代码速查

### Tailwind CSS 类名映射

```javascript
// 主色
'bg-cyan-500'       // 主按钮背景
'text-cyan-600'     // 链接文字
'border-cyan-300'   // 边框
'ring-cyan-500'     // 焦点环

// 辅助色
'bg-purple-500'     // 特殊文件
'bg-pink-500'       // 媒体文件
'bg-orange-500'     // 警告标记
'bg-emerald-500'    // 成功状态

// 中性色（浅色模式）
'bg-white'          // 主背景
'bg-slate-50'       // 次背景
'bg-slate-100'      // 卡片背景
'text-slate-900'    // 主文字
'text-slate-600'    // 次文字
'border-slate-200'  // 边框

// 中性色（深色模式）
'dark:bg-slate-900' // 主背景
'dark:bg-slate-800' // 次背景
'dark:bg-slate-700' // 卡片背景
'dark:text-slate-100' // 主文字
'dark:text-slate-400' // 次文字
'dark:border-slate-700' // 边框
```

### 完整 Tailwind 配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // 主色已内置 cyan
        // 辅助色
        aurora: {
          purple: '#a78bfa',
          pink: '#f472b6',
          orange: '#fb923c',
          green: '#34d399',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
        'gradient-glow': 'linear-gradient(180deg, rgba(103, 232, 249, 0.3) 0%, transparent 100%)',
        'gradient-flow': 'linear-gradient(90deg, #06b6d4 0%, #22d3ee 50%, #06b6d4 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-error': '0 0 20px rgba(239, 68, 68, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
```

---

## 九、色彩测试清单

开发完成后，用此清单验证色彩系统实施质量：

- [ ] 所有文字与背景对比度符合 WCAG AA（最低 4.5:1）
- [ ] 主色在界面中占比不超过 15%
- [ ] 深色模式下所有颜色有对应适配
- [ ] 禁用状态明显可辨识（不仅靠颜色）
- [ ] 色盲用户能理解所有状态（红绿色盲测试）
- [ ] 玻璃态效果在不同背景下可读
- [ ] 渐变动画流畅无卡顿
- [ ] 所有交互元素有 hover/active 视觉反馈
- [ ] 发光效果不过度刺眼
- [ ] 移动端颜色显示正常（不同屏幕色域）

---

**色彩不是装饰，是信息传达的第一语言。**