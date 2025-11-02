# Prompt 编写规范（所有prompt必须遵守）

**文件名**: prompt-must-read.md  
**用途**: 定义所有Figma Make prompt的编写规范  
**更新**: 2025-11-01  
**重要性**: 🔥 每次写prompt前必读

---

## 📜 核心原则（不可违背）

### 原则1: 持续探索，版本平等

```
✓ 所有版本都是探索过程的一步
✓ 新版本不一定比老版本好
✓ 没有"最终版"、"完美版"的概念
✓ 每个版本都有价值，都要保留

禁止使用的词：
  ❌ FINAL
  ❌ PERFECT
  ❌ ULTIMATE
  ❌ BEST
  ❌ 完美
  ❌ 终极
  ❌ 最佳
  
允许使用的词：
  ✓ v0.x（版本号）
  ✓ 探索（exploration）
  ✓ 研究（study）
  ✓ 迭代（iteration）
  ✓ 方向（direction）
```

---

### 原则2: 新老页面平级展示

```
✓ 所有页面在App.tsx中平级排列
✓ 使用统一的导航样式
✓ 按时间顺序编号（01, 02, 03...）
✓ 不突出任何特定版本

导航结构要求：
  - Grid布局（2×3或3×2）
  - 所有按钮大小相同
  - 所有按钮样式统一（仅颜色不同）
  - 按时间顺序排列
  - 无特殊突出显示

示例：
  [01·羽化研究] [02·基础组件] [03·v0.5]
  [04·v0.6]     [05·v0.7]     [06·组件库]
  
  所有按钮：同样大小、同样hover效果、同样光晕
```

---

### 原则3: Prompt文本必须在页面底部

```
每个页面组件底部必须包含：

<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary>📝 查看生成此页面的Prompt</summary>
  
  <div className="space-y-6">
    {/* 1. 中文版Prompt */}
    <div>
      <h4>Prompt (中文版)</h4>
      <pre>{/* 完整的中文prompt内容 */}</pre>
    </div>
    
    {/* 2. 英文版Prompt */}
    <div>
      <h4>Prompt (English Version)</h4>
      <pre>{/* 完整的英文prompt内容 */}</pre>
    </div>
    
    {/* 3. 元数据 */}
    <div>
      <p>生成日期: YYYY-MM-DD</p>
      <p>Prompt文件: prompt-XX.XX.md</p>
      <p>探索方向: [具体说明]</p>
    </div>
  </div>
</details>

要求：
  ✓ 必须有中英文两个版本
  ✓ 必须可折叠（不占用空间）
  ✓ 必须包含元数据
  ✓ 文本可复制（用<pre>标签）
```

---

### 原则4: 页面添加位置明确

```
每个prompt必须明确说明：

"ADD this page to App.tsx navigation at position XX"

示例：
  "Add this page as button 05 in the grid"
  "Insert between v0.6 and Component Library"
  "Append as the last item in navigation grid"

必须包含：
  ✓ 在grid中的位置（第几个）
  ✓ 按钮文字
  ✓ 按钮颜色（按彩虹序列）
  ✓ onClick跳转目标
```

---

## 📝 Prompt模板（标准格式）

### 每个prompt必须包含的部分（仅3部分）

```markdown
# Prompt XX.XX: [描述性标题]

**目标**: [本次探索的目的]  
**日期**: YYYY-MM-DD  
**文件**: XX-[PageName].tsx

---

## 🎯 本次探索的方向

[简短说明本次prompt要探索/修复的内容，2-3句话]

---

## 🎨 中文Prompt

```
[完整的中文prompt内容]

导航位置：
在 App.tsx 中添加为第X个按钮
按钮文字: "XX · [描述]"
按钮颜色: [color]-400 to [color]-500

页面底部添加prompt记录：
<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary>📝 查看生成此页面的Prompt</summary>
  <div className="space-y-6">
    <div>
      <h4>Prompt (中文版)</h4>
      <pre>[本prompt中文内容]</pre>
    </div>
    <div>
      <h4>Prompt (English Version)</h4>
      <pre>[本prompt英文内容]</pre>
    </div>
    <div>
      <p>生成日期: YYYY-MM-DD</p>
      <p>Prompt文件: prompt-XX.XX.md</p>
      <p>探索方向: [说明]</p>
    </div>
  </div>
</details>
```

---

## 🎨 English Prompt

```
[Complete English prompt content]

Navigation:
Add to App.tsx as button #X
Button text: "XX · [Description]"
Button color: [color]-400 to [color]-500

Bottom prompt display:
<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary>📝 View Prompt</summary>
  <div className="space-y-6">
    <div>
      <h4>Prompt (中文版)</h4>
      <pre>[Chinese prompt]</pre>
    </div>
    <div>
      <h4>Prompt (English Version)</h4>
      <pre>[English prompt]</pre>
    </div>
    <div>
      <p>Generated: YYYY-MM-DD</p>
      <p>Prompt file: prompt-XX.XX.md</p>
      <p>Exploration: [description]</p>
    </div>
  </div>
</details>
```

---

**仅需3部分：目的说明 + 中文Prompt + 英文Prompt**  
**去掉：预期结果、检查清单等冗余内容**
```

---

## 🎨 命名规范

### Prompt文件命名

```
格式: prompt-[类别].[序号]-[描述].md

类别编号：
  01.xx - 导航和结构
  02.xx - 动态无界探索
  03.xx - 主应用界面
  04.xx - 交互功能
  05.xx - 响应式设计
  
示例：
  ✓ prompt-01.01-navigation-restructure.md
  ✓ prompt-02.06-dynamic-borderless-v0.7.md
  ✓ prompt-03.01-main-app-layout.md
```

### 页面文件命名

```
格式: XX-[DescriptiveName].tsx

示例：
  ✓ 01-FeatherIntensityStudy.tsx
  ✓ 05-DynamicBorderlessV7.tsx
  ✓ 06-ComponentLibrary.tsx
  
避免：
  ❌ FinalVersion.tsx
  ❌ BestDesign.tsx
  ❌ Perfect.tsx
```

---

## 🔒 强制检查项

### 每次写prompt前必须检查

```
□ 是否避免了"最终"、"完美"等绝对词？
□ 是否说明了在App.tsx的位置？
□ 是否包含中英文两个版本？
□ 是否有页面底部的prompt展示代码？
□ 是否使用了描述性命名？
□ 是否与现有页面平级？
□ 是否按时间顺序编号？
□ 是否使用统一的按钮样式？
```

---

## 💡 Prompt编写示例

### ✅ 好的Prompt开头

```
Create page: src/pages/07-DynamicBorderlessV8.tsx

Title: "Dynamic Borderless v0.8"
Subtitle: "探索：[具体探索内容]"

ADD to App.tsx navigation:
- Position: 7th button in grid
- Text: "07 · v0.8 [探索方向]"  
- Color: Gradient green-400 to green-500
- Same size and style as all other nav buttons

NO special highlighting - this is one step in ongoing exploration.
```

### ❌ 不好的Prompt开头

```
Create the FINAL PERFECT page!

This is THE BEST version!

Highlight this as the ultimate solution!
```

---

## 🎯 导航样式规范

### 统一的NavButton规格

```
所有导航按钮必须：
  - 尺寸: px-6 py-3
  - 圆角: rounded-xl
  - 字号: text-base
  - 字重: font-medium
  - 布局: Grid (2×3 or 3×2)
  
颜色序列（固定）：
  01 - purple-400 to purple-500
  02 - pink-400 to pink-500
  03 - cyan-400 to cyan-500
  04 - emerald-400 to emerald-500
  05 - orange-400 to orange-500
  06 - blue-500 to blue-600
  07 - green-400 to green-500
  08 - indigo-400 to indigo-500
  09 - rose-400 to rose-500
  10 - amber-400 to amber-500
  
光晕效果（统一）：
  - Default: 0 0 20px rgba(color, 0.3)
  - Hover: 0 0 30px rgba(color, 0.4) + translateY(-2px)
```

---

## 📂 文件组织规范

### prompt文件位置

```
所有prompt文件存放在：
  docs/ux/figmaPrompt/

不要放在其他位置！
```

### 生成的页面文件位置

```
所有页面组件存放在：
  fromFigmaMake/src/pages/

命名规范：
  XX-[DescriptiveName].tsx
  
示例：
  05-DynamicBorderlessV7.tsx
```

---

## 🔄 版本迭代规范

### 如何添加新版本

```
当需要v0.8时：

1. 创建prompt文件：
   prompt-02.07-dynamic-borderless-v0.8.md
   
2. Prompt中说明：
   "Create page: 07-DynamicBorderlessV8.tsx"
   "Add to App.tsx as 7th button (green gradient)"
   "Explore: [v0.8的具体探索方向]"
   
3. 不要说：
   "This is better than v0.7"
   "This is the final version"
   "v0.7 had issues, v0.8 fixes them"
   
4. 只说：
   "v0.8 explores [新的探索方向]"
```

---

## 📖 完整Prompt检查清单

### 提交前必须确认

```
基本信息：
  □ 有清晰的标题
  □ 有生成日期
  □ 有版本号（如适用）
  
内容完整性：
  □ 包含中文prompt
  □ 包含英文prompt
  □ 包含技术规格
  □ 包含预期结果
  
导航相关：
  □ 说明了App.tsx中的位置
  □ 说明了按钮文字
  □ 说明了按钮颜色
  □ 与现有按钮平级
  
页面底部：
  □ 包含prompt展示代码
  □ 有中文版本展示
  □ 有英文版本展示
  □ 有元数据展示
  
措辞规范：
  □ 无绝对词（最终、完美等）
  □ 使用探索性语言
  □ 描述性命名
```

---

## 🚫 禁止事项

```
禁止：
  ❌ 删除老版本页面
  ❌ 隐藏历史版本
  ❌ 突出显示某个版本
  ❌ 使用"最终"、"完美"等词
  ❌ 改变老版本的内容
  ❌ 将新版本放在特殊位置
  ❌ 给新版本特殊样式
  
必须：
  ✓ 保留所有历史
  ✓ 平级展示
  ✓ 时间顺序
  ✓ 统一样式
  ✓ 描述性命名
  ✓ 记录prompt
```

---

## 📋 标准Prompt模板

### 复制此模板开始新prompt

```markdown
# Prompt XX.XX: [探索方向描述]

**目标**: [明确的探索目标]  
**日期**: 2025-11-XX  
**版本**: vX.X (如果是版本迭代)  
**文件**: XX-[PageName].tsx

---

## 🎯 本次探索的方向

[说明这个版本要探索什么新东西]

---

## 🎨 中文Prompt

```
[完整的中文prompt内容]

页面底部添加：
<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary>📝 查看生成此页面的Prompt</summary>
  <div className="space-y-6">
    <div>
      <h4>Prompt (中文版)</h4>
      <pre>[本prompt的中文内容]</pre>
    </div>
    <div>
      <h4>Prompt (English Version)</h4>
      <pre>[本prompt的英文内容]</pre>
    </div>
    <div>
      <p>生成日期: 2025-11-XX</p>
      <p>Prompt文件: prompt-XX.XX-xxx.md</p>
      <p>探索方向: [具体说明]</p>
    </div>
  </div>
</details>

导航位置：
- 在App.tsx中添加为第XX个按钮
- 按钮文字: "XX · [描述]"
- 按钮颜色: [按彩虹序列选择]
- 与其他按钮平级，统一样式
```

---

## 🎨 English Prompt

```
[Complete English prompt content]

Add at bottom of page:
<details className="mt-16 p-6 rounded-xl bg-slate-900 text-white">
  <summary>📝 View Prompt for This Page</summary>
  <div className="space-y-6">
    <div>
      <h4>Prompt (中文版)</h4>
      <pre>[Chinese prompt text]</pre>
    </div>
    <div>
      <h4>Prompt (English Version)</h4>
      <pre>[English prompt text]</pre>
    </div>
    <div>
      <p>Generated: 2025-11-XX</p>
      <p>Prompt file: prompt-XX.XX-xxx.md</p>
      <p>Exploration: [specific goal]</p>
    </div>
  </div>
</details>

Navigation:
- Add to App.tsx as button #XX
- Button text: "XX · [Description]"
- Button color: [following rainbow sequence]
- Same level and style as all other buttons
```

---

## 预期结果

[说明会生成什么]

---

## 检查清单

[验证要点]
```

---

## 📊 彩虹色序列（标准）

### 按钮颜色分配

```
固定序列（不可改变）：

01 - purple  (紫色)  from-purple-400 to-purple-500
02 - pink    (粉色)  from-pink-400 to-pink-500
03 - cyan    (青色)  from-cyan-400 to-cyan-500
04 - emerald (绿色)  from-emerald-400 to-emerald-500
05 - orange  (橙色)  from-orange-400 to-orange-500
06 - blue    (蓝色)  from-blue-500 to-blue-600
07 - green   (草绿)  from-green-400 to-green-500
08 - indigo  (靛蓝)  from-indigo-400 to-indigo-500
09 - rose    (玫瑰)  from-rose-400 to-rose-500
10 - amber   (琥珀)  from-amber-400 to-amber-500
11 - teal    (蓝绿)  from-teal-400 to-teal-500
12 - violet  (紫罗兰) from-violet-400 to-violet-500

颜色仅作装饰，不表示重要性或质量！
```

---

## 🎯 App.tsx导航标准代码

### 每次都使用这个结构

```tsx
// App.tsx 导航部分
<div className="max-w-7xl mx-auto px-8 py-6">
  
  {/* Header */}
  <div className="mb-8">
    <h1 className="text-5xl mb-2">Fluid Technology</h1>
    <p className="text-xl text-slate-600">流体科技设计系统探索</p>
  </div>
  
  {/* Navigation Grid - 平级展示 */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
    
    {pages.map((page) => (
      <NavButton
        key={page.id}
        color={page.color}
        active={currentPage === page.id}
        onClick={() => setCurrentPage(page.id)}
      >
        {page.title}
      </NavButton>
    ))}
    
  </div>
  
  {/* Current Page Content */}
  <div>
    {renderCurrentPage()}
  </div>
</div>

// NavButton组件（所有按钮统一样式）
function NavButton({ color, active, onClick, children }) {
  const colorConfig = colorMap[color];
  
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl bg-gradient-to-r ${colorConfig.from} ${colorConfig.to} text-white font-medium text-base`}
      style={{
        boxShadow: active 
          ? `0 0 25px ${colorConfig.glow}` 
          : `0 0 20px ${colorConfig.glow}, 0 0 40px ${colorConfig.glowLight}`
      }}
      whileHover={{
        boxShadow: `0 0 30px ${colorConfig.glowHover}, 0 0 60px ${colorConfig.glowLight}`,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}
```

---

## 🔍 Prompt内容要求（精简）

### 必须包含（仅3部分）

```
1. 本次探索的方向（2-3句话）
   说明要探索/修复什么

2. 中文Prompt（完整）
   包含：技术实现 + 导航位置 + 底部prompt展示代码

3. English Prompt（完整）
   包含：技术实现 + 导航位置 + 底部prompt展示代码
```

### 禁止包含（冗余内容）

```
❌ 预期结果
❌ 检查清单
❌ 修复建议
❌ 版本对比表
❌ 成功标准
❌ 其他啰嗦内容

保持简洁！只要3部分！
```

---

## 📌 常见错误

### ❌ 错误示例

```
错误1: 突出新版本
  "Create THE ULTIMATE v0.8 page with special highlighting"
  
错误2: 贬低老版本  
  "v0.7 was wrong, v0.8 is the correct approach"
  
错误3: 只有英文
  "Create v0.8 page [只有英文prompt，没有中文]"
  
错误4: 未说明位置
  "Add this page to navigation" (没说第几个)
  
错误5: 特殊样式
  "Make this button larger and use special glow"
```

### ✅ 正确示例

```
正确1: 平等描述
  "Create page 08-DynamicBorderlessV8.tsx
   Explore: [具体探索方向]"
  
正确2: 客观记录
  "v0.8 explores different blur timing
   v0.7 explored blur intensity"
  
正确3: 双语完整
  [完整的中英文prompt]
  
正确4: 位置明确
  "Add as button 08 in grid, green gradient"
  
正确5: 统一样式
  "Use same NavButton component with color='green'"
```

---

## 🎓 设计哲学

### 为什么要这样做

```
理由1: 尊重探索过程
  - 设计不是线性进步
  - 有时"后退"也有价值
  - 保留所有路径供回顾
  
理由2: 避免过早下结论
  - v0.7可能不是最好的
  - v0.5某些方面可能更好
  - 保留所有选项供对比
  
理由3: 记录思考过程
  - Prompt记录了设计决策
  - 未来可以理解"为什么这样设计"
  - 有助于团队学习和传承
  
理由4: 持续迭代
  - 总会有v0.8, v0.9...
  - 设计是演进的，不是终结的
  - 保持开放和谦逊的态度
```

---

**这是所有prompt必须遵守的规范！**  
**每次写新prompt前，先读这个文件！** 📖✨

**设计是持续探索，不是追求完美。** 🌈🔬

