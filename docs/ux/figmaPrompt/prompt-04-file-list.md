# Prompt 04: 文件列表视图

**目标**: 详细的文件浏览界面  
**基于**: Prompt 03主界面  
**状态**: 📝 待执行  
**预计时间**: 15-20分钟

---

## 🎯 Prompt内容

```
Great! Now create a detailed FILE LIST VIEW page.

=== FILE LIST VIEW (1440×900) ===

Create: src/pages/FileListView.tsx

LAYOUT (3-column):

LEFT SIDEBAR (280px, borderless):
- Background: gradient from-slate-50 to-slate-100/50
- Right edge: 1px gradient (transparent → slate-300/30 → transparent) NO border!
- Padding: 24px

Content:
- Title: "类型" (2 chars), slate-500, 12px
- Filter chips (vertical gap 8px):
  * "全部" (active, cyan glow)
  * "ZIP"
  * "RAR"
  * "图片" (2 chars)
  * "文档" (2 chars)

---

MAIN AREA (flex-1):

Toolbar (horizontal):
- SearchInput: "搜索" (2 chars)
- IconButton: filter
- IconButton: sort
- IconButton: grid view
All with glows on hover!

File List (scrollable, gap 8px):

Each item (borderless!):
- Height: 72px
- Background: rgba(255,255,255,0.8), blur(8px)
- Shadow: borderless
- NO border!
- Padding: 16px

Layout: [✓] [Icon] [Name] [Size] [Date] [⋯]

Create 12 file items:
- Various types (.md, .js, .png, etc)
- Different sizes (2.4MB, 156KB, etc - monospace)
- Times: "2分钟前", "昨天", "3天前"

Hover:
- Glow appears
- translateY(-1px)

Selected:
- Cyan tint background
- Ring 2px cyan/30%
- Glow shadow

---

RIGHT PANEL (360px, borderless):

Background: Radial gradient (water droplet style)

Content:
- Large icon (80px, colored glow)
- Name: "README.md"
- Properties:
  * "大小" (2 chars): "2.4 MB"
  * "时间" (2 chars): "11-01 14:32"
  * "压缩率" (3 chars): "65%"
- Buttons:
  * "解压" (2 chars, primary)
  * "预览" (2 chars, secondary)

---

ALL TEXT ≤4 CHARS!
All shadows are glows!
NO borders!

Generate this file list view now.
```

---

## 预期效果

3栏布局，完全无界，光晕交互
