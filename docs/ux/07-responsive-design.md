# 主要内容预览

## 一、断点系统 (Breakpoints)
- 断点定义（Mobile, Tablet, Desktop, Large Desktop）
- 为什么选择这些断点值
- 移动优先 vs 桌面优先策略

## 二、设备适配
- 手机（竖屏/横屏）
- 平板（竖屏/横屏）
- 笔记本/桌面
- 大屏显示器
- 折叠屏设备

## 三、布局响应式规则
- 网格系统如何响应
- 导航栏变化
- 侧边栏折叠/展开
- 内容重排策略

## 四、组件响应式行为
- 按钮在不同屏幕的大小
- 卡片布局变化
- 表格响应式处理
- 表单适配

## 五、图片与媒体
- 响应式图片
- 视频容器
- 图标缩放规则

## 六、触摸优化
- 触摸目标大小
- 手势支持
- 移动端特有交互

## 七、性能优化
- 条件加载
- 图片懒加载
- 移动端资源优化



# 07-responsive-design.md - 响应式设计指南

## 一、断点系统 (Breakpoints)

### 1.1 核心断点定义

我们采用**移动优先**的响应式策略，定义以下标准断点：

```css
/* 断点变量定义 */
--breakpoint-xs: 0px;      /* 超小屏 - 小型手机 */
--breakpoint-sm: 640px;    /* 小屏 - 标准手机 */
--breakpoint-md: 768px;    /* 中屏 - 平板竖屏 */
--breakpoint-lg: 1024px;   /* 大屏 - 平板横屏/小笔记本 */
--breakpoint-xl: 1280px;   /* 超大屏 - 标准桌面 */
--breakpoint-2xl: 1536px;  /* 2K屏 - 大型显示器 */
--breakpoint-3xl: 1920px;  /* 全高清 - 超大显示器 */
```

### 1.2 断点使用规范

#### 媒体查询写法

```css
/* ✅ 推荐：移动优先 */
.component {
    /* 基础样式 - 移动端 */
    padding: 16px;
}

@media (min-width: 768px) {
    /* 平板及以上 */
    .component {
        padding: 24px;
    }
}

@media (min-width: 1024px) {
    /* 桌面及以上 */
    .component {
        padding: 32px;
    }
}

/* ❌ 不推荐：桌面优先 */
.component {
    padding: 32px;
}

@media (max-width: 1023px) {
    .component {
        padding: 24px;
    }
}
```

#### Tailwind CSS 断点

```jsx
// Tailwind 响应式类名
<div className="
    p-4          /* 默认：移动端 16px */
    md:p-6       /* 平板：24px */
    lg:p-8       /* 桌面：32px */
    xl:p-10      /* 大屏：40px */
">
    响应式内容
</div>
```

### 1.3 设备分类与断点映射

| 设备类型 | 屏幕尺寸 | 断点范围 | 典型分辨率 |
|---------|---------|---------|-----------|
| 🤏 超小屏手机 | < 375px | xs | 320×568 (iPhone SE) |
| 📱 标准手机 | 375px - 640px | sm | 375×667, 390×844 |
| 📱 大屏手机 | 640px - 768px | sm-md | 414×896, 428×926 |
| 📱 折叠屏展开 | 768px - 884px | md | 884×2778 (Z Fold) |
| 📲 平板竖屏 | 768px - 1024px | md-lg | 768×1024 (iPad) |
| 💻 平板横屏 | 1024px - 1280px | lg | 1024×768 |
| 🖥️ 笔记本 | 1280px - 1536px | xl | 1366×768, 1440×900 |
| 🖥️ 桌面显示器 | 1536px - 1920px | 2xl | 1920×1080 |
| 🖥️ 2K/4K 显示器 | > 1920px | 3xl | 2560×1440, 3840×2160 |

---

## 二、布局响应式策略

### 2.1 容器宽度系统

```css
.container {
    width: 100%;
    margin: 0 auto;
    padding: 0 16px;
}

/* 断点容器最大宽度 */
@media (min-width: 640px) {
    .container {
        max-width: 640px;
        padding: 0 24px;
    }
}

@media (min-width: 768px) {
    .container {
        max-width: 768px;
    }
}

@media (min-width: 1024px) {
    .container {
        max-width: 1024px;
        padding: 0 32px;
    }
}

@media (min-width: 1280px) {
    .container {
        max-width: 1280px;
    }
}

@media (min-width: 1536px) {
    .container {
        max-width: 1400px; /* 限制最大宽度提升可读性 */
    }
}
```

### 2.2 网格系统响应式

```css
/* 移动端：单列 */
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

/* 平板：2列 */
@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }
}

/* 桌面：3列 */
@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;
    }
}

/* 大屏：4列 */
@media (min-width: 1536px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

### 2.3 侧边栏布局

```css
/* 移动端：垂直堆叠 */
.layout {
    display: flex;
    flex-direction: column;
}

.sidebar {
    width: 100%;
    /* 默认隐藏或通过抽屉展示 */
}

.main {
    width: 100%;
}

/* 桌面端：侧边栏布局 */
@media (min-width: 1024px) {
    .layout {
        flex-direction: row;
    }
    
    .sidebar {
        width: 280px;
        flex-shrink: 0;
    }
    
    .main {
        flex: 1;
        min-width: 0; /* 防止内容溢出 */
    }
}

/* 大屏：更宽的侧边栏 */
@media (min-width: 1536px) {
    .sidebar {
        width: 320px;
    }
}
```

---

## 三、导航系统响应式

### 3.1 顶部导航栏

```jsx
// 移动端：汉堡菜单
// 桌面端：完整导航

function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    return (
        <nav className="border-b border-gray-200">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Logo />
                    
                    {/* 桌面导航 - 隐藏在移动端 */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink href="/">首页</NavLink>
                        <NavLink href="/products">产品</NavLink>
                        <NavLink href="/about">关于</NavLink>
                        <Button>登录</Button>
                    </div>
                    
                    {/* 移动端汉堡菜单 - 隐藏在桌面 */}
                    <button 
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
                
                {/* 移动端菜单抽屉 */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <NavLink href="/" mobile>首页</NavLink>
                        <NavLink href="/products" mobile>产品</NavLink>
                        <NavLink href="/about" mobile>关于</NavLink>
                        <Button className="w-full mt-4">登录</Button>
                    </div>
                )}
            </div>
        </nav>
    );
}
```

### 3.2 侧边栏导航

```jsx
// 移动端：通过按钮打开的全屏/抽屉式侧边栏
// 桌面端：固定显示的侧边栏

function Sidebar() {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 1023px)');
    
    if (isMobile) {
        // 移动端：抽屉式
        return (
            <>
                <button onClick={() => setOpen(true)}>
                    <Menu />
                </button>
                
                <Drawer open={open} onClose={() => setOpen(false)}>
                    <SidebarContent />
                </Drawer>
            </>
        );
    }
    
    // 桌面端：固定侧边栏
    return (
        <aside className="w-64 border-r border-gray-200">
            <SidebarContent />
        </aside>
    );
}
```

---

## 四、组件响应式规范

### 4.1 按钮响应式

```css
/* 移动端：较大的触摸目标 */
.button {
    min-height: 44px; /* iOS 推荐最小触摸目标 */
    padding: 12px 24px;
    font-size: 16px;
}

/* 桌面端：标准尺寸 */
@media (min-width: 1024px) {
    .button {
        min-height: 40px;
        padding: 10px 20px;
        font-size: 14px;
    }
}
```

```jsx
// Tailwind 实现
<button className="
    px-6 py-3 text-base      /* 移动端 */
    lg:px-5 lg:py-2.5 lg:text-sm  /* 桌面端 */
">
    按钮文字
</button>
```

### 4.2 卡片布局

```jsx
// 响应式卡片网格
<div className="
    grid 
    grid-cols-1          /* 移动：1列 */
    sm:grid-cols-2       /* 小屏：2列 */
    lg:grid-cols-3       /* 桌面：3列 */
    xl:grid-cols-4       /* 大屏：4列 */
    gap-4 
    sm:gap-6 
    lg:gap-8
">
    {cards.map(card => (
        <Card key={card.id}>
            <img 
                src={card.image} 
                className="
                    w-full 
                    h-48           /* 移动端固定高度 */
                    sm:h-56        /* 平板 */
                    lg:h-64        /* 桌面 */
                    object-cover 
                    rounded-lg
                " 
            />
            <h3 className="
                text-lg          /* 移动 */
                lg:text-xl       /* 桌面 */
                font-semibold 
                mt-4
            ">
                {card.title}
            </h3>
        </Card>
    ))}
</div>
```

### 4.3 表格响应式

**方案一：水平滚动**
```jsx
<div className="overflow-x-auto -mx-4 sm:mx-0">
    <table className="min-w-full">
        {/* 表格内容 */}
    </table>
</div>
```

**方案二：卡片式展示（移动端）**
```jsx
function ResponsiveTable({ data }) {
    const isMobile = useMediaQuery('(max-width: 767px)');
    
    if (isMobile) {
        // 移动端：卡片布局
        return (
            <div className="space-y-4">
                {data.map(item => (
                    <div key={item.id} className="border rounded-lg p-4">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                            {item.email}
                        </div>
                        <div className="text-sm mt-2">
                            状态: {item.status}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    
    // 桌面端：标准表格
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>邮箱</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
```

### 4.4 表单响应式

```jsx
<form className="space-y-6">
    {/* 移动端：单列；桌面端：双列 */}
    <div className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        gap-4 
        md:gap-6
    ">
        <FormField label="名字">
            <Input placeholder="请输入名字" />
        </FormField>
        
        <FormField label="姓氏">
            <Input placeholder="请输入姓氏" />
        </FormField>
    </div>
    
    {/* 全宽字段 */}
    <FormField label="邮箱">
        <Input 
            type="email" 
            placeholder="your@email.com"
            className="w-full"
        />
    </FormField>
    
    {/* 提交按钮 */}
    <Button 
        type="submit"
        className="
            w-full           /* 移动端：全宽 */
            md:w-auto        /* 桌面端：自适应 */
        "
    >
        提交表单
    </Button>
</form>
```

### 4.5 模态框响应式

```jsx
function Modal({ open, onClose, children }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <div className="
                fixed inset-0 
                flex items-end sm:items-center 
                justify-center 
                p-0 sm:p-4
            ">
                <Dialog.Panel className="
                    w-full 
                    sm:max-w-md          /* 平板：固定最大宽度 */
                    lg:max-w-lg          /* 桌面：更大的宽度 */
                    
                    /* 移动端：从底部滑出 */
                    rounded-t-2xl sm:rounded-2xl
                    
                    /* 桌面端：居中 */
                    max-h-[90vh] 
                    overflow-y-auto
                    
                    bg-white 
                    p-6 
                    sm:p-8
                ">
                    {children}
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
```

---

## 五、字体响应式

### 5.1 基础字体缩放

```css
/* 移动端基础字号 */
html {
    font-size: 16px;
}

/* 大屏幕略微增大 */
@media (min-width: 1536px) {
    html {
        font-size: 18px;
    }
}
```

### 5.2 标题响应式

```css
h1 {
    font-size: 32px;      /* 移动端 */
    line-height: 1.2;
}

@media (min-width: 768px) {
    h1 {
        font-size: 48px;  /* 平板 */
    }
}

@media (min-width: 1024px) {
    h1 {
        font-size: 56px;  /* 桌面 */
    }
}

@media (min-width: 1536px) {
    h1 {
        font-size: 64px;  /* 大屏 */
    }
}
```

### 5.3 Tailwind 字体响应式

```jsx
<h1 className="
    text-3xl          /* 移动：30px */
    sm:text-4xl       /* 小屏：36px */
    md:text-5xl       /* 平板：48px */
    lg:text-6xl       /* 桌面：60px */
    xl:text-7xl       /* 大屏：72px */
    font-bold 
    leading-tight
">
    响应式标题
</h1>

<p className="
    text-base         /* 移动：16px */
    lg:text-lg        /* 桌面：18px */
    leading-relaxed
">
    响应式正文内容
</p>
```

---

## 六、间距响应式

### 6.1 容器内边距

```css
.container {
    padding-left: 16px;
    padding-right: 16px;
}

@media (min-width: 768px) {
    .container {
        padding-left: 24px;
        padding-right: 24px;
    }
}

@media (min-width: 1024px) {
    .container {
        padding-left: 32px;
        padding-right: 32px;
    }
}
```

### 6.2 组件间距

```jsx
<section className="
    py-12           /* 移动：48px 上下 */
    md:py-16        /* 平板：64px */
    lg:py-24        /* 桌面：96px */
">
    <div className="
        space-y-8      /* 移动：32px 间距 */
        md:space-y-12  /* 平板：48px */
        lg:space-y-16  /* 桌面：64px */
    ">
        {/* 内容块 */}
    </div>
</section>
```

---

## 七、图片与媒体响应式

### 7.1 响应式图片

```jsx
// 使用 srcset 提供多种尺寸
<img 
    src="/image-800.jpg"
    srcSet="
        /image-400.jpg 400w,
        /image-800.jpg 800w,
        /image-1200.jpg 1200w,
        /image-1600.jpg 1600w
    "
    sizes="
        (max-width: 640px) 100vw,
        (max-width: 1024px) 50vw,
        33vw
    "
    alt="响应式图片"
    className="w-full h-auto"
/>
```

### 7.2 背景图片

```css
.hero {
    background-image: url('/hero-mobile.jpg');
    background-size: cover;
    background-position: center;
}

@media (min-width: 768px) {
    .hero {
        background-image: url('/hero-tablet.jpg');
    }
}

@media (min-width: 1024px) {
    .hero {
        background-image: url('/hero-desktop.jpg');
    }
}

@media (min-width: 1920px) {
    .hero {
        background-image: url('/hero-2k.jpg');
    }
}
```

### 7.3 视频容器

```jsx
// 16:9 响应式视频容器
<div className="relative w-full pb-[56.25%]">
    <iframe 
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/..."
        allowFullScreen
    />
</div>
```

### 7.4 图标尺寸

```jsx
<Icon className="
    w-5 h-5         /* 移动：20px */
    md:w-6 md:h-6   /* 平板：24px */
    lg:w-7 lg:h-7   /* 桌面：28px */
" />
```

---

## 八、触摸优化

### 8.1 触摸目标尺寸

```css
/* iOS 和 Android 推荐最小触摸目标：44×44px */
.touch-target {
    min-width: 44px;
    min-height: 44px;
    
    /* 确保内部元素居中 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* 桌面端可以更小 */
@media (min-width: 1024px) and (hover: hover) {
    .touch-target {
        min-width: 32px;
        min-height: 32px;
    }
}
```

### 8.2 悬停与触摸分离

```css
/* 仅在支持悬停的设备显示悬停效果 */
@media (hover: hover) {
    .button:hover {
        background-color: var(--color-primary-600);
    }
}

/* 触摸设备：使用 active 状态 */
@media (hover: none) {
    .button:active {
        background-color: var(--color-primary-600);
    }
}
```

### 8.3 移动端手势

```jsx
// 左右滑动切换
function MobileCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const handlers = useSwipeable({
        onSwipedLeft: () => setCurrentIndex(i => i + 1),
        onSwipedRight: () => setCurrentIndex(i => Math.max(0, i - 1)),
        trackMouse: false, // 仅跟踪触摸，不跟踪鼠标
    });
    
    return (
        <div {...handlers} className="overflow-hidden">
            {/* 轮播内容 */}
        </div>
    );
}
```

---

## 九、性能优化

### 9.1 条件加载

```jsx
// 仅在桌面端加载复杂组件
function Dashboard() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    
    return (
        <div>
            <MobileHeader />
            
            {isDesktop && (
                <Suspense fallback={<Loading />}>
                    <ComplexChart />
                </Suspense>
            )}
            
            <MainContent />
        </div>
    );
}
```

### 9.2 图片懒加载

```jsx
<img 
    src="/placeholder.jpg"
    data-src="/actual-image.jpg"
    loading="lazy"
    className="w-full h-auto"
/>
```

### 9.3 移动端资源优化

```jsx
// 根据设备加载不同资源
function HeroSection() {
    const isMobile = useMediaQuery('(max-width: 767px)');
    
    return (
        <section className="relative">
            {isMobile ? (
                // 移动端：更小的图片
                <img src="/hero-mobile-optimized.webp" />
            ) : (
                // 桌面端：高清图片
                <img src="/hero-desktop-2k.webp" />
            )}
        </section>
    );
}
```

---

## 十、测试与调试

### 10.1 必测设备/分辨率

#### 移动端（必测）
- iPhone SE (375×667)
- iPhone 14 Pro (390×844)
- iPhone 14 Pro Max (428×926)
- Samsung Galaxy S21 (360×800)
- Samsung Galaxy S21 Ultra (412×915)

#### 平板（必测）
- iPad Mini (768×1024)
- iPad Air (820×1180)
- iPad Pro 11" (834×1194)
- iPad Pro 12.9" (1024×1366)

#### 桌面（必测）
- 1366×768 (常见笔记本)
- 1920×1080 (全高清)
- 2560×1440 (2K)

### 10.2 Chrome DevTools 断点测试

```javascript
// 设置断点监听
const breakpoints = {
    xs: '(max-width: 639px)',
    sm: '(min-width: 640px) and (max-width: 767px)',
    md: '(min-width: 768px) and (max-width: 1023px)',
    lg: '(min-width: 1024px) and (max-width: 1279px)',
    xl: '(min-width: 1280px) and (max-width: 1535px)',
    '2xl': '(min-width: 1536px)',
};

Object.entries(breakpoints).forEach(([name, query]) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', (e) => {
        if (e.matches) {
            console.log(`当前断点: ${name}`);
        }
    });
});
```

### 10.3 响应式检查清单

#### 布局检查
- [ ] 所有内容在最小宽度 (320px) 下可见
- [ ] 没有水平滚动条（除非设计需要）
- [ ] 导航在所有断点都可用
- [ ] 侧边栏正确折叠/展开

#### 交互检查
- [ ] 触摸目标 ≥ 44×44px
- [ ] 表单在移动端易于填写
- [ ] 下拉菜单/弹出层适配触摸
- [ ] 无需缩放即可阅读文字

#### 性能检查
- [ ] 移动端首屏加载 < 3秒
- [ ] 图片使用响应式尺寸
- [ ] 懒加载已实施
- [ ] 无不必要的桌面资源在移动端加载

#### 视觉检查
- [ ] 字体大小在所有设备可读
- [ ] 间距合理，不拥挤也不空旷
- [ ] 图片不失真或拉伸
- [ ] 断点过渡平滑无跳跃

---

## 十一、常见响应式模式

### 11.1 渐进增强

```jsx
// 基础功能：所有设备都支持
// 增强功能：仅桌面端

function ProgressiveFeature() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    
    return (
        <div>
            {/* 基础版本 */}
            <BasicContent />
            
            {/* 桌面增强 */}
            {isDesktop && <AdvancedFeatures />}
        </div>
    );
}
```

### 11.2 优雅降级

```css
/* 现代浏览器：Grid 布局 */
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

/* 旧浏览器降级：Flexbox */
@supports not (display: grid) {
    .gallery {
        display: flex;
        flex-wrap: wrap;
        margin: -10px;
    }
    
    .gallery > * {
        flex: 0 0 calc(33.333% - 20px);
        margin: 10px;
    }
}
```

### 11.3 组件隐藏/显示

```jsx
<div>
    {/* 仅移动端显示 */}
    <div className="block md:hidden">
        <MobileOnlyComponent />
    </div>
    
    {/* 仅桌面端显示 */}
    <div className="hidden md:block">
        <DesktopOnlyComponent />
    </div>
    
    {/* 平板及以上显示 */}
    <div className="hidden md:block">
        <TabletAndUpComponent />
    </div>
</div>
```

---

## 十二、实战案例

### 案例一：响应式卡片网格

```jsx
function ProductGrid({ products }) {
    return (
        <div className="
            grid 
            grid-cols-1           /* 移动：1列 */
            sm:grid-cols-2        /* 小屏：2列 */
            lg:grid-cols-3        /* 桌面：3列 */
            xl:grid-cols-4        /* 大屏：4列 */
            gap-4 
            sm:gap-6 
            lg:gap-8
        ">
            {products.map(product => (
                <div 
                    key={product.id}
                    className="
                        border rounded-lg 
                        overflow-hidden 
                        hover:shadow-lg 
                        transition-shadow
                    "
                >
                    <img 
                        src={product.image}
                        className="
                            w-full 
                            h-48 sm:h-56 lg:h-64 
                            object-cover
                        "
                    />
                    <div className="p-4 sm:p-5 lg:p-6">
                        <h3 className="
                            text-lg sm:text-xl 
                            font-semibold
                        ">
                            {product.name}
                        </h3>
                        <p className="
                            text-sm sm:text-base 
                            text-gray-600 
                            mt-2
                        ">
                            {product.description}
                        </p>
                        <div className="
                            flex items-center justify-between 
                            mt-4
                        ">
                            <span className="
                                text-xl sm:text-2xl 
                                font-bold
                            ">
                                ¥{product.price}
                            </span>
                            <Button size="sm">
                                加入购物车
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
```

### 案例二：响应式导航

```jsx
function ResponsiveNav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    
    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Logo className="w-8 h-8" />
                        <span className="
                            text-xl font-bold
                            hidden sm:inline
                        ">
                            品牌名称
                        </span>
                    </Link>
                    
                    {/* 桌面导航 */}
                    <div className="
                        hidden lg:flex 
                        items-center 
                        gap-8
                    ">
                        <NavLink href="/products">产品</NavLink>
                        <NavLink href="/solutions">解决方案</NavLink>
                        <NavLink href="/pricing">价格</NavLink>
                        <NavLink href="/docs">文档</NavLink>
                        
                        <div className="flex items-center gap-3">
                            <Button variant="ghost">登录</Button>
                            <Button>免费试用</Button>
                        </div>
                    </div>
                    
                    {/* 移动端菜单按钮 */}
                    <button 
                        className="lg:hidden p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X /> : <Menu />}
                    </button>
                </div>
                
                {/* 移动端菜单 */}
                {mobileOpen && (
                    <div className="
                        lg:hidden 
                        py-4 
                        border-t 
                        space-y-2
                    ">
                        <NavLink href="/products" mobile>
                            产品
                        </NavLink>
                        <NavLink href="/solutions" mobile>
                            解决方案
                        </NavLink>
                        <NavLink href="/pricing" mobile>
                            价格
                        </NavLink>
                        <NavLink href="/docs" mobile>
                            文档
                        </NavLink>
                        
                        <div className="
                            pt-4 
                            border-t 
                            space-y-2
                        ">
                            <Button 
                                variant="ghost" 
                                className="w-full"
                            >
                                登录
                            </Button>
                            <Button className="w-full">
                                免费试用
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
```

### 案例三：响应式仪表板

```jsx
function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* 顶部栏 */}
            <header className="
                bg-white 
                border-b 
                sticky top-0 
                z-40
            ">
                <div className="
                    flex items-center 
                    justify-between 
                    h-16 
                    px-4 lg:px-8
                ">
                    <h1 className="text-xl font-bold">
                        仪表板
                    </h1>
                    <UserMenu />
                </div>
            </header>
            
            <div className="flex">
                {/* 侧边栏 - 桌面端固定，移动端抽屉 */}
                <Sidebar />
                
                {/* 主内容区 */}
                <main className="
                    flex-1 
                    p-4 
                    sm:p-6 
                    lg:p-8
                ">
                    {/* 统计卡片 */}
                    <div className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-4 
                        gap-4 
                        lg:gap-6 
                        mb-8
                    ">
                        <StatCard 
                            title="总用户" 
                            value="12,345" 
                            change="+12%" 
                        />
                        <StatCard 
                            title="活跃用户" 
                            value="8,432" 
                            change="+8%" 
                        />
                        <StatCard 
                            title="收入" 
                            value="¥234,567" 
                            change="+23%" 
                        />
                        <StatCard 
                            title="转化率" 
                            value="3.2%" 
                            change="+0.5%" 
                        />
                    </div>
                    
                    {/* 图表区域 */}
                    <div className="
                        grid 
                        grid-cols-1 
                        lg:grid-cols-2 
                        gap-6 
                        mb-8
                    ">
                        <ChartCard title="用户增长趋势">
                            <LineChart />
                        </ChartCard>
                        <ChartCard title="收入分布">
                            <PieChart />
                        </ChartCard>
                    </div>
                    
                    {/* 数据表格 */}
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-semibold">
                                最近订单
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <ResponsiveTable />
                        </CardBody>
                    </Card>
                </main>
            </div>
        </div>
    );
}
```

---

## 十三、最佳实践总结

### ✅ 推荐做法

1. **移动优先设计**：从最小屏幕开始设计，逐步增强
2. **触摸友好**：所有交互元素 ≥ 44×44px
3. **流式布局**：使用百分比和 fr 单位，而非固定像素
4. **弹性图片**：图片使用 max-width: 100% 和 height: auto
5. **渐进增强**：确保核心功能在所有设备可用
6. **性能优先**：移动端资源优化，懒加载，条件加载
7. **测试覆盖**：在真实设备上测试，不仅仅是模拟器

### ❌ 避免做法

1. ❌ 使用固定宽度而非响应式单位
2. ❌ 小于 44px 的触摸目标
3. ❌ 在移动端加载桌面端大图
4. ❌ 水平滚动（除非设计需要）
5. ❌ 仅针对 iPhone 或特定设备优化
6. ❌ 忽略横屏模式
7. ❌ 过度依赖 JavaScript 检测屏幕尺寸

---

## 十四、工具与资源

### 开发工具
- **Chrome DevTools**：设备模式测试
- **Firefox Responsive Design Mode**：断点调试
- **BrowserStack**：真实设备测试
- **Responsively App**：多设备同步预览

### CSS 框架
- **Tailwind CSS**：强大的响应式工具类
- **Bootstrap**：成熟的响应式网格系统

### React Hooks
```javascript
// 自定义 Media Query Hook
function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    
    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);
        
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        
        return () => media.removeEventListener('change', listener);
    }, [query]);
    
    return matches;
}

// 使用示例
function MyComponent() {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    
    return (
        <div>
            {isMobile && <MobileView />}
            {isTablet && <TabletView />}
            {isDesktop && <DesktopView />}
        </div>
    );
}
```

---

**文档版本**: v1.0  
**最后更新**: 2025-11-01