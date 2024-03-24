import{_ as a,c as s,o as n,U as e}from"./chunks/framework.B_3kUSfg.js";const g=JSON.parse('{"title":"位运算及应用","description":"","frontmatter":{},"headers":[],"relativePath":"docs/blog/bit-operation.md","filePath":"docs/blog/bit-operation.md","lastUpdated":1711254726000}'),p={name:"docs/blog/bit-operation.md"},t=e(`<h1 id="位运算及应用" tabindex="-1">位运算及应用 <a class="header-anchor" href="#位运算及应用" aria-label="Permalink to &quot;位运算及应用&quot;">​</a></h1><blockquote><p>在了解什么是位运算之前，让我们先来了解什么是位 ？位指计算机存储信息的最小单位，在二进制数系统中，位是通过0或1来表示。在学习一门编程语言的数据类型时，总会告诉我们 int 的存储需要 4个字节，取值范围为-2 147 483 648 ~ 2 147 483 647 。其实取值范围就是通过 位 计算出来的，由于 1 字节 = 8 位 ，所以 int 中的 1 用二进制表示为0000 0000 0000 0000 0000 0000 0000 0001 。所以位运算就是直接对整数在内存中的二进制位进行操作。</p></blockquote><h1 id="接下来先介绍下二进制和十进制的转换方式" tabindex="-1">接下来先介绍下二进制和十进制的转换方式 <a class="header-anchor" href="#接下来先介绍下二进制和十进制的转换方式" aria-label="Permalink to &quot;接下来先介绍下二进制和十进制的转换方式&quot;">​</a></h1><h3 id="十进制转二进制-正数-除2取余-逆序排列-ps-小数和负数转换不一样" tabindex="-1">十进制转二进制(正数) ---- 除2取余，逆序排列 (ps: 小数和负数转换不一样) <a class="header-anchor" href="#十进制转二进制-正数-除2取余-逆序排列-ps-小数和负数转换不一样" aria-label="Permalink to &quot;十进制转二进制(正数) ---- 除2取余，逆序排列 (ps: 小数和负数转换不一样)&quot;">​</a></h3><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7d6a971a4674c7fbe3f417ff1f762ce~tplv-k3u1fbpfcp-watermark.image" alt=""></p><h3 id="二进制转十进制-按权相加法" tabindex="-1">二进制转十进制 ---- 按权相加法 <a class="header-anchor" href="#二进制转十进制-按权相加法" aria-label="Permalink to &quot;二进制转十进制 ---- 按权相加法&quot;">​</a></h3><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e103fc204de54dcdbca9eaf5edddead0~tplv-k3u1fbpfcp-watermark.image" alt=""></p><h1 id="运算符" tabindex="-1">运算符 <a class="header-anchor" href="#运算符" aria-label="Permalink to &quot;运算符&quot;">​</a></h1><h2 id="_1、按位与-均1返1" tabindex="-1">1、按位与(&amp;) 均1返1 <a class="header-anchor" href="#_1、按位与-均1返1" aria-label="Permalink to &quot;1、按位与(&amp;) 均1返1&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>10 &amp; 13</span></span>
<span class="line"><span>10 : 0000 0000 0000 1010</span></span>
<span class="line"><span>13 : 0000 0000 0000 1101</span></span>
<span class="line"><span>------------------------------------------</span></span>
<span class="line"><span>结果:0000 0000 0000 1000</span></span></code></pre></div><h2 id="_2、按位或-有1返1" tabindex="-1">2、按位或(|) 有1返1 <a class="header-anchor" href="#_2、按位或-有1返1" aria-label="Permalink to &quot;2、按位或(|) 有1返1&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>42 | 13</span></span>
<span class="line"><span>42 : 0000 0000 0010 1010</span></span>
<span class="line"><span>13 : 0000 0000 0000 1101</span></span>
<span class="line"><span>------------------------------------------</span></span>
<span class="line"><span>结果:0000 0000 0010 1111</span></span></code></pre></div><h2 id="_3、按位异或-不同返1-相同返0" tabindex="-1">3、按位异或(^) 不同返1，相同返0 <a class="header-anchor" href="#_3、按位异或-不同返1-相同返0" aria-label="Permalink to &quot;3、按位异或(^) 不同返1，相同返0&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>42 ^ 13</span></span>
<span class="line"><span>42 : 0000 0000 0010 1010</span></span>
<span class="line"><span>13 : 0000 0000 0000 1101</span></span>
<span class="line"><span>------------------------------------------</span></span>
<span class="line"><span>结果:0000 0000 0010 0111</span></span></code></pre></div><h2 id="_4、按位取反-所有位取反-二进制的反码" tabindex="-1">4、按位取反(~) 所有位取反 （二进制的反码） <a class="header-anchor" href="#_4、按位取反-所有位取反-二进制的反码" aria-label="Permalink to &quot;4、按位取反(~) 所有位取反 （二进制的反码）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>42 : 0000 0000 0010 1010</span></span>
<span class="line"><span>------------------------------------------</span></span>
<span class="line"><span>~42: 1111 1111 1101 0101</span></span></code></pre></div><h2 id="_5、有符号左移-往左移动n位" tabindex="-1">5、有符号左移(&lt;&lt;) 往左移动n位 <a class="header-anchor" href="#_5、有符号左移-往左移动n位" aria-label="Permalink to &quot;5、有符号左移(&lt;&lt;) 往左移动n位&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>13 &lt;&lt; 2</span></span>
<span class="line"><span>13 : 0000 0000 0000 1101</span></span>
<span class="line"><span>----------------------------------------</span></span>
<span class="line"><span>&lt;&lt;2: 0000 0000 0011 0100</span></span>
<span class="line"><span>13 &lt;&lt; 2 的结果为：52 -----&gt; 13 * (2^2) = 52</span></span></code></pre></div><h2 id="_6、有符号右移-往右移动n位-拷贝最左侧位填充到最左侧" tabindex="-1">6、有符号右移(&gt;&gt;) 往右移动n位（拷贝最左侧位填充到最左侧） <a class="header-anchor" href="#_6、有符号右移-往右移动n位-拷贝最左侧位填充到最左侧" aria-label="Permalink to &quot;6、有符号右移(&gt;&gt;) 往右移动n位（拷贝最左侧位填充到最左侧）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>13 &gt;&gt; 2</span></span>
<span class="line"><span>13 : 0000 0000 0000 1101</span></span>
<span class="line"><span>----------------------------------------</span></span>
<span class="line"><span>&gt;&gt;2: 0000 0000 0000 0011</span></span>
<span class="line"><span>13 &gt;&gt; 2 的结果为：3 -----&gt; 13 / (2^2) = 3</span></span></code></pre></div><h2 id="_7、无符号右移-最左侧位用0填充-所以结果一定是非0的" tabindex="-1">7、无符号右移(&gt;&gt;&gt;) （最左侧位用0填充，所以结果一定是非0的 <a class="header-anchor" href="#_7、无符号右移-最左侧位用0填充-所以结果一定是非0的" aria-label="Permalink to &quot;7、无符号右移(&gt;&gt;&gt;) （最左侧位用0填充，所以结果一定是非0的&quot;">​</a></h2><h1 id="位运算的应用" tabindex="-1">位运算的应用 <a class="header-anchor" href="#位运算的应用" aria-label="Permalink to &quot;位运算的应用&quot;">​</a></h1><h2 id="_1、判断奇偶数" tabindex="-1">1、判断奇偶数 <a class="header-anchor" href="#_1、判断奇偶数" aria-label="Permalink to &quot;1、判断奇偶数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 偶数 &amp; 1 = 0</span></span>
<span class="line"><span>// 奇数 &amp; 1 = 1</span></span>
<span class="line"><span>console.log(2 &amp; 1)    // 0</span></span>
<span class="line"><span>console.log(3 &amp; 1)    // 1</span></span></code></pre></div><blockquote><p>从前面的二进制转十进制方法可以知道，除了最右边的位是1 X 1* 0 = 1，其他位数都是1乘以2的n次方，所以其他位数一定是偶数，由此可以得出，最后一位为1的时候一定是奇数。</p></blockquote><h2 id="_2、两个数值的变量交换" tabindex="-1">2、两个数值的变量交换 <a class="header-anchor" href="#_2、两个数值的变量交换" aria-label="Permalink to &quot;2、两个数值的变量交换&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var a = 5</span></span>
<span class="line"><span>var b = 8</span></span>
<span class="line"><span>a ^= b</span></span>
<span class="line"><span>b ^= a</span></span>
<span class="line"><span>a ^= b</span></span>
<span class="line"><span>console.log(a)   // 8</span></span>
<span class="line"><span>console.log(b)   // 5</span></span></code></pre></div><p>关键点</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>b = (a ^ b) ^ b = a ^ (b ^ b) = a ^ 0 = a;</span></span></code></pre></div><blockquote><p>相同的两个数按位异或为0，一个数按位异或0为本身。</p></blockquote><h2 id="_3、权限认证-、类型判断" tabindex="-1">3、权限认证 、类型判断 <a class="header-anchor" href="#_3、权限认证-、类型判断" aria-label="Permalink to &quot;3、权限认证 、类型判断&quot;">​</a></h2><p>场景：后台管理系统，操作权限分为一级、二级、三级管理员，其中一级管理员拥有最高的权限，二、三级较低，有些操作只允许一、二级管理员操作，有些操作只允许一、三级管理员操作。现在已经登陆的某权限的用户要进行某个操作，要用怎样的数据结构能很方便地判断他能不能进行这个操作呢？我们用位来表示管理权限，一级用第3位，二级用第2位，三级用第1位，即一级的权限表示为0b100 = 4，二级权限表示为0b010 = 2，三级权限表示为0b001 = 1。如果A操作只能由一级和二级操作，那么这个权限值表示为6 = 0b110，它和一级权限与一下：6 &amp; 4 = 0b110 &amp; 0b100 = 4，得到的值不为0，所以认为有权限，同理和二级权限与一下6 &amp; 2 = 2也不为0，而与三级权限与一下6 &amp; 1 = 0，所以三级没有权限。这里标志位的1表示打开，0表示关闭。这样的好处在于，我们可以用一个数字，而不是一个数组来表示某个操作的权限集，同时在进行权限判断的时候也很方便。</p><h1 id="位运算在vue里的实践" tabindex="-1">位运算在vue里的实践 <a class="header-anchor" href="#位运算在vue里的实践" aria-label="Permalink to &quot;位运算在vue里的实践&quot;">​</a></h1><blockquote><p>VUE3使用静态标记，渲染性能得到提升，这里便使用到了位运算</p></blockquote><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b23311f3bbe4bb0a98308b560819f7d~tplv-k3u1fbpfcp-watermark.image" alt=""></p><blockquote><p>这里的枚举类型使用有符号左移来表示标签含有的动态类型，在做判断是否存在某个动态标记的时候便可以使用 &amp; 做校验</p></blockquote><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bfc97f1859e4dca95ea61384b199789~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>附上源码地址 <a href="https://github.com/vuejs/vue-next/blob/master/packages/shared/src/patchFlags.ts" target="_blank" rel="noreferrer">源码地址</a></p><p>react也用到了 <a href="https://github.com/facebook/react/blob/master/packages/react-dom/src/events/EventSystemFlags.js" target="_blank" rel="noreferrer">源码地址</a></p><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><p>位运算在各大框架和库的源码都可以见到，react、vue、lodash等。懂得位运算可以作为阅读源码的前置知识，在开发系统和组件、库的时候 也可以灵活使用</p>`,41),l=[t];function i(o,c,r,h,d,b){return n(),s("div",null,l)}const m=a(p,[["render",i]]);export{g as __pageData,m as default};
