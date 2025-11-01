# Prompt 05: 响应式适配

**目标**: 移动端和平板适配  
**基于**: Prompt 03主界面  
**状态**: 📝 待执行  
**预计时间**: 10-15分钟

---

## 🎯 Prompt内容

```
Perfect! Now create RESPONSIVE VERSIONS for mobile and tablet.

=== MOBILE VERSION (375×812px) ===

Create: src/pages/UnzipMainApp-Mobile.tsx

SIMPLIFIED for mobile performance:

1. Nav (56px height):
- Logo only
- Hamburger menu icon (right)

2. Upload Zone (full width - 32px, height 160px):
- Text: "拖入" (2 chars only - super minimal!)
- "或选择" (3 chars)
- Icon: 48px

3. File Grid:
- 1 column only
- Gap: 12px
- Simplified cards (icon + name + size only)

4. Bottom Bar (instead of FAB):
- 4 icons: "上传", "文件", "设置", "更多"
- Each 44×44 minimum

MOBILE OPTIMIZATIONS:
- Fewer shadow layers (performance)
- Max blur: 20px (vs 40px desktop)
- Simplified gradients
- Touch targets ≥44px

---

=== TABLET VERSION (768×1024px) ===

Create: src/pages/UnzipMainApp-Tablet.tsx

2-column grid, full features, same as desktop nav.

---

All versions maintain borderless design with glows!

Generate mobile + tablet versions now.
```

---

## 成功标准

- 3个响应式版本
- 移动端性能优化
- 保持无界美学
