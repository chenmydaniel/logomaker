# Logo Maker 部署指南

本文档提供了将 Logo Maker 项目部署到 Web 服务器的详细步骤，以及如何添加新字体的指导。

## 目录

1. [项目概述](#项目概述)
2. [文件说明](#文件说明)
3. [部署步骤](#部署步骤)
   - [准备工作](#准备工作)
   - [上传文件](#上传文件)
   - [配置域名](#配置域名)
   - [测试部署](#测试部署)
4. [添加新字体](#添加新字体)
   - [下载字体文件](#下载字体文件)
   - [添加字体到项目](#添加字体到项目)
   - [更新 CSS 文件](#更新-css-文件)
   - [更新字体选择器](#更新字体选择器)
5. [更新文件](#更新文件)
6. [常见问题解答](#常见问题解答)
7. [维护与更新](#维护与更新)

## 项目概述

Logo Maker 是一个基于浏览器的工具，允许用户创建自定义徽标。该项目使用以下技术构建：

- HTML5
- CSS3
- JavaScript (React)
- SVG.js 用于矢量图形处理
- PHP 用于资源版本控制

## 文件说明

- `index.php` - 主入口文件
- `assets.php` - 动态处理 CSS 和字体文件，自动添加时间戳
- `style.css` - 原始样式表
- `script.js` - 主 JavaScript 文件
- `deploy-guide.md` - 本部署指南
- `fonts/` - 字体文件目录
  - `Great_Vibes/` - 手写风格字体
  - `Roboto/` - 现代无衬线字体
  - `Poppins/` - 几何无衬线字体
  - `Oswald/` - 压缩无衬线字体
  - `Open_Sans/` - 可读性强的无衬线字体
  - `Montserrat/` - 优雅的现代字体
  - `Dancing_Script/` - 手写风格字体
  - `Raleway/` - 优雅的显示字体
  - `Lato/` - 圆润的无衬线字体
  - `Abril_Fatface/` - 装饰性衬线字体
  - `Amatic_SC/` - 手写风格字体
  - `Arvo/` - 几何衬线字体
  - `Bangers/` - 卡通风格字体
  - `Bebas_Neue/` - 压缩无衬线字体
  - `Cinzel/` - 装饰性衬线字体
  - `Dosis/` - 圆润的无衬线字体
  - `Fjalla_One/` - 压缩无衬线字体
  - `Indie_Flower/` - 手写风格字体
  - `Josefin_Sans/` - 几何无衬线字体
  - `Kaushan_Script/` - 手写风格字体
  - `Lobster/` - 装饰性手写字体
  - `Merriweather/` - 可读性强的衬线字体
  - `Pacifico/` - 手写风格字体
  - `Playfair_Display/` - 优雅的衬线字体
  - `Poiret_One/` - 纤细的现代字体
  - `Quicksand/` - 圆润的无衬线字体
  - `Shadows_Into_Light/` - 手写风格字体
  - `Special_Elite/` - 打字机风格字体
  - `Tangerine/` - 优雅的手写字体
  - `Ubuntu/` - 现代无衬线字体
  - `Vollkorn/` - 可读性强的衬线字体

## 部署步骤

### 准备工作

1. 确保您的服务器支持 PHP 5.6 或更高版本
2. 准备好您的项目文件
3. 测试本地运行是否正常

### 上传文件

1. 登录您的服务器控制面板或使用 FTP 客户端
2. 上传项目文件到网站根目录（通常是 `public_html` 或 `htdocs`）
3. 确保保持文件结构不变，特别是字体文件夹结构

**必须上传的文件和文件夹：**
```
public_html/
├── index.php         # 主入口文件
├── assets.php        # 动态资源处理器
├── style.css         # 样式表
├── script.js         # 主 JavaScript 文件
├── favicon.ico      # 网站图标
└── fonts/            # 字体文件夹
    ├── Great_Vibes/  # 字体文件
    ├── Roboto/       # 字体文件
    ├── Poppins/      # 字体文件
    ├── Oswald/       # 字体文件
    └── Open_Sans/    # 字体文件
```

**不需要上传的文件和目录：**
```
├── node_modules/     # Node.js 依赖包（开发环境）
├── src/              # 源代码目录（如果存在）
├── .git/            # Git 版本控制目录
├── .gitignore       # Git 忽略文件
├── .htaccess        # Apache 配置文件（如果服务器不需要）
├── check-fonts.js   # 字体检查工具
├── package.json     # Node.js 项目配置
├── package-lock.json # 依赖锁定文件
├── server.js        # 本地开发服务器
└── 部署指南.md       # 已合并到 deploy-guide.md
```

**可选文件（根据需要上传）：**
```
├── test-assets.php   # 用于测试 assets.php 是否正常工作
└── .htaccess        # 如果需要 URL 重写或自定义服务器配置
```

4. 设置文件权限：
   - 文件权限：644
   - 目录权限：755

### 配置域名

1. 在您的域名管理面板中设置 DNS 记录
2. 将域名指向您的服务器 IP 地址
3. 等待 DNS 传播（可能需要 24-48 小时）

### 测试部署

1. 访问 `http://您的域名/test-assets.php` 测试 assets.php 是否正常工作
2. 检查字体文件 URL 是否已正确添加时间戳
3. 访问网站首页，检查样式和字体是否正常加载
4. 按 F12 打开开发者工具，查看 Network 标签页中的 CSS 和字体文件请求
5. 确认每个字体文件 URL 都包含时间戳参数

## 添加新字体

### 下载字体文件

1. 从 [Google Fonts](https://fonts.google.com/) 或其他字体资源网站下载字体
2. 下载完整的字体包，包括不同的字重（至少包含 Regular 和 Bold）
3. 解压缩下载的字体包

### 添加字体到项目

1. 在 `fonts` 目录中创建新字体文件夹：
   ```
   fonts/新字体名称/
   ```

2. 将字体文件复制到该目录：
   - 如果字体包含 `static` 子目录，保持该结构
   - 确保至少包含 Regular 和 Bold 两种字重

3. 字体文件结构示例：
   ```
   fonts/新字体名称/
   ├── 新字体名称-Regular.ttf
   ├── 新字体名称-Bold.ttf
   └── 其他字重...
   ```
   
   或者（带有 static 子目录）：
   ```
   fonts/新字体名称/
   ├── 新字体名称-VariableFont_wght.ttf
   └── static/
       ├── 新字体名称-Regular.ttf
       ├── 新字体名称-Bold.ttf
       └── 其他字重...
   ```

### 更新 CSS 文件

1. 打开 `style.css` 文件
2. 在文件末尾添加新的 `@font-face` 规则：

```css
@font-face {
  font-family: 'New Font';
  src: url('./fonts/New_Font/NewFont-Regular.ttf') format('truetype');
  font-display: swap;
}
```

注意：
- 字体名称（`font-family`）中的空格必须与字体文件名中的空格完全一致
- 不需要指定 `font-weight` 和 `font-style`，除非您有特殊需求
- `font-display: swap` 确保文本在字体加载完成前保持可见

### 更新字体选择器

1. 打开 `script.js` 文件
2. 在 `fonts` 数组常量中添加您的新字体名称：

```javascript
const fonts = [
  // ... 其他字体 ...
  'New Font'  // 添加到这里
].sort();  // 自动按字母顺序排序
```

3. 保存文件
4. 刷新页面，新字体会自动按字母顺序出现在字体选择器中

### 测试新字体
```

### 上传更新后的文件

1. 将更新后的 `style.css` 和 `script.js` 文件上传到服务器
2. 将新字体文件夹上传到服务器的 `fonts` 目录
3. 测试新字体是否正确加载和显示

## 更新文件

- 修改 `style.css` 后，无需手动更新时间戳，`assets.php` 会自动处理
- 修改 `script.js` 后，需要更新 `index.php` 中的时间戳：
  ```php
  <script type="text/babel" src="script.js?t=<?php echo time(); ?>"></script>
  ```

## 常见问题解答

### 1. 样式未加载
- 检查 `assets.php` 是否有执行权限
- 检查 `style.css` 文件是否存在且可读
- 查看服务器错误日志
- 确保 PHP 版本 >= 5.6

### 2. 字体未加载
- 检查 `fonts` 目录是否存在且可读
- 检查字体文件路径是否正确
- 使用 `test-assets.php` 检查字体 URL 是否已正确处理
- 确保字体文件已正确上传

### 3. 网站加载速度慢
- 如果网站加载速度慢，可能是因为：
  - 字体文件过大
  - 同时加载太多字体

优化方法：
- 只包含必要的字体和字重
- 使用 `font-display: swap` 确保文本在字体加载时仍然可见
- 考虑使用 `preload` 预加载关键字体

### 4. 时间戳未更新
- 确保 `assets.php` 文件正确上传
- 检查服务器是否启用了 PHP
- 清除浏览器缓存后重试

## 维护与更新

1. **定期备份**：定期备份网站文件和数据库（如果有）
2. **更新依赖**：定期检查并更新项目依赖
3. **监控性能**：使用工具如 Google PageSpeed Insights 监控网站性能
4. **安全更新**：保持服务器软件和 PHP 版本更新到最新稳定版

## 技术支持

如有问题，请参考以下资源：
- 服务器错误日志
- 浏览器开发者工具控制台输出
- PHP 错误日志

如果问题仍然存在，请联系开发人员并提供以下信息：
- 问题描述
- 重现步骤
- 浏览器版本
- 控制台错误信息
- 服务器环境信息
