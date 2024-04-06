import{_ as n,c as s,o as a,U as p}from"./chunks/framework.DqMUgYTQ.js";const u=JSON.parse('{"title":"系统简介","description":"","frontmatter":{"title":"系统简介"},"headers":[],"relativePath":"docs/intro.md","filePath":"docs/intro.md","lastUpdated":1712377656000}'),e={name:"docs/intro.md"},l=p(`<h1 id="系统简介" tabindex="-1">系统简介 <a class="header-anchor" href="#系统简介" aria-label="Permalink to &quot;系统简介&quot;">​</a></h1><h2 id="welcome-👏" tabindex="-1">Welcome！👏 <a class="header-anchor" href="#welcome-👏" aria-label="Permalink to &quot;Welcome！👏&quot;">​</a></h2><p>如果能给我一个<strong>star</strong>那将是对我莫大的鼓励。使用之前，你应该明白它基于 mPython 官方硬件及固件，它的基本逻辑离不开 mPython（mPython＜MicroPython＜Python），一些问题应该在使用之前就从互联网或官方文档了解详情🔎。</p><h2 id="关于-mpython-掌控板" tabindex="-1">关于 mPython/掌控板 <a class="header-anchor" href="#关于-mpython-掌控板" aria-label="Permalink to &quot;关于 mPython/掌控板&quot;">​</a></h2><p>mPython掌控是一块MicroPython微控制器板。掌控板是创客教育专家委员会、猫友汇、广大一线老师共同提出需求并与创客教育行业优秀企业代表共同参与研发的教具、学具，是一块为教育而生的开源硬件，也是一个公益项目。</p><h2 id="关于-senioros" tabindex="-1">关于 SeniorOS <a class="header-anchor" href="#关于-senioros" aria-label="Permalink to &quot;关于 SeniorOS&quot;">​</a></h2><p>SeniorOS 是运行在 mPython （掌控版）平台上的轻量级多文件操作系统，旨在致力于构建完整的 mPython 生态体验。SeniorOS 也是一个为 mPython 开发者们准备好的全新平台，这里优化了大量官方固件中缺失的体验与功能，向 mPython 硬件的极限靠近。SeniorOS 不是 mPython 中的 MIUI ，也不会成为 mPython 中的 MIUI ，为了保证各位开发者能将程序毫发无损的迁移至 SeniorOS ，我们并未对固件做破坏性改动或删除重要功能，这将是日后， SeniorOS 生态强健有力的基础。</p><h2 id="senioros-现有版本文件目录" tabindex="-1">SeniorOS 现有版本文件目录 <a class="header-anchor" href="#senioros-现有版本文件目录" aria-label="Permalink to &quot;SeniorOS 现有版本文件目录&quot;">​</a></h2><h3 id="编译前" tabindex="-1">编译前 <a class="header-anchor" href="#编译前" aria-label="Permalink to &quot;编译前&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/code</span></span>
<span class="line"><span></span></span>
<span class="line"><span>│  boot.py  # SeniorOS 启动选择器，用于引导系统/用户程序运行</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└─SeniorOS  # System</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>        ├─system  # 系统核心代码</span></span>
<span class="line"><span>        │      core.py  # 系统可调用代码</span></span>
<span class="line"><span>        │      pages.py  # 系统可调用页面</span></span>
<span class="line"><span>        │      main.py  # 系统引导后最先运行的代码</span></span>
<span class="line"><span>        │      ui.py  # 日光引擎</span></span>
<span class="line"><span>        │</span></span>
<span class="line"><span>        ├─data  # 系统数据</span></span>
<span class="line"><span>        │      brightness.fos  # 系统显示亮度</span></span>
<span class="line"><span>        |      fileList.json  # 系统更新文件</span></span>
<span class="line"><span>        │      volume.fos  # 系统音量</span></span>
<span class="line"><span>        │      light.fos  # 系统日光/黑夜模式数据存放</span></span>
<span class="line"><span>        |      wifi.fos  # WIFI 预配置文件</span></span>
<span class="line"><span>        │</span></span>
<span class="line"><span>        ├─apps # 本地预置应用</span></span>
<span class="line"><span>        |         logo.py  # 软件图标</span></span>
<span class="line"><span>        |  └─ app_0  # 系统设置</span></span>
<span class="line"><span>        |           core.py  # 核心代码</span></span>
<span class="line"><span>        |           main.py  # 主体</span></span>
<span class="line"><span>        |      </span></span>
<span class="line"><span>        |  └─ app_1  # 线上插件</span></span>
<span class="line"><span>        |           main  # 主体</span></span>
<span class="line"><span>        │</span></span>
<span class="line"><span>        ├─fonts  # 系统字体</span></span>
<span class="line"><span>        │      quantum.py  # 桌面时间字体</span></span></code></pre></div><h3 id="编译后" tabindex="-1">编译后 <a class="header-anchor" href="#编译后" aria-label="Permalink to &quot;编译后&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>│  boot.py  # SeniorOS 启动选择器，用于引导系统/用户程序运行</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└─SeniorOS  # System</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>        ├─system  # 系统核心代码</span></span>
<span class="line"><span>        │      core.mpy  # 系统可调用代码</span></span>
<span class="line"><span>        │      pages.mpy  # 系统可调用页面</span></span>
<span class="line"><span>        │      main.mpy  # 系统引导后最先运行的代码</span></span>
<span class="line"><span>        │      ui.mpy  # 日光引擎</span></span>
<span class="line"><span>        │</span></span>
<span class="line"><span>        ├─data  # 系统数据</span></span>
<span class="line"><span>        │      brightness.fos  # 系统显示亮度</span></span>
<span class="line"><span>        |      fileList.json  # 系统更新文件</span></span>
<span class="line"><span>        │      volume.fos  # 系统音量</span></span>
<span class="line"><span>        │      light.fos  # 系统日光/黑夜模式数据存放</span></span>
<span class="line"><span>        |      wifi.fos  # WIFI 预配置文件</span></span>
<span class="line"><span>        │</span></span>
<span class="line"><span>        ├─apps # 本地预置应用</span></span>
<span class="line"><span>        |         logo.py  # 软件图标</span></span>
<span class="line"><span>        |  └─ app_0  # 系统设置</span></span>
<span class="line"><span>        |           core.py  # 核心代码</span></span>
<span class="line"><span>        |           main.py  # 主体</span></span>
<span class="line"><span>        |      </span></span>
<span class="line"><span>        |  └─ app_1  # 线上插件</span></span>
<span class="line"><span>        |           main  # 主体</span></span>
<span class="line"><span>        │</span></span>
<span class="line"><span>        ├─fonts  # 系统字体</span></span>
<span class="line"><span>        │      quantum.mpy  # 桌面时间字体</span></span></code></pre></div><h1 id="开发注意事项" tabindex="-1">开发注意事项 <a class="header-anchor" href="#开发注意事项" aria-label="Permalink to &quot;开发注意事项&quot;">​</a></h1><p>请注意，您的开发应当基于 Alpha 分支，您的提交也应在 Alpha 分支进行</p><p>目前该系统没有正式版本</p>`,15),i=[l];function o(t,c,r,h,d,m){return a(),s("div",null,i)}const S=n(e,[["render",o]]);export{u as __pageData,S as default};