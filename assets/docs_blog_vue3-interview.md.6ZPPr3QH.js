import{_ as n,c as p,k as a,a as s,t as e,U as i,o as l}from"./chunks/framework.B_3kUSfg.js";const C=JSON.parse('{"title":"Vue3面试题","description":"","frontmatter":{},"headers":[],"relativePath":"docs/blog/vue3-interview.md","filePath":"docs/blog/vue3-interview.md","lastUpdated":1711254851000}'),t={name:"docs/blog/vue3-interview.md"},h=i(`<h1 id="vue3面试题" tabindex="-1">Vue3面试题 <a class="header-anchor" href="#vue3面试题" aria-label="Permalink to &quot;Vue3面试题&quot;">​</a></h1><p>接上篇的面试文章，<a href="https://juejin.cn/post/6948587166679171102" target="_blank" rel="noreferrer">vue2面试题大全含源码级回答</a> ，这篇讲讲vue3常见的面试题及回答。</p><blockquote><p>水平有限，有讲的不对的，希望各位大佬指出来，或者有其他的面试题想了解的，欢迎提出来，我研究后同步在本文。</p></blockquote><blockquote><p>个人整理的前端进阶知识网站，欢迎关注:<br> 仓库地址：<a href="https://github.com/process1024/article" target="_blank" rel="noreferrer">https://github.com/process1024/article</a><br> 网站地址: <a href="https://process1024.github.io/article/" target="_blank" rel="noreferrer">https://process1024.github.io/article/</a> 、国内访问<a href="https://junyi-chen.gitee.io/article/" target="_blank" rel="noreferrer">https://junyi-chen.gitee.io/article/</a></p></blockquote><h2 id="_1-vue3与vue2有哪些不同" tabindex="-1">1. vue3与vue2有哪些不同 <a class="header-anchor" href="#_1-vue3与vue2有哪些不同" aria-label="Permalink to &quot;1. vue3与vue2有哪些不同&quot;">​</a></h2><p>大的改动：</p><ul><li>proxy代替Object.definPrototety响应式系统</li><li>ts代替flow类型检查</li><li>重构了目录结构，将代码主要分成三个独立的模块，更利于长期维护</li><li>重写vdom，优化编译性能</li><li>支持tree shaking</li><li>增加了composition api(setup)，让代码更易于维护</li></ul><p>小的改动:</p><ul><li>异步组件需要 defineAsyncComponent 方法来创建</li><li>v-model 用法</li><li><code>v-if优先级高于v-for</code></li><li>destroyed 生命周期选项被重命名为 unmounted</li><li>beforeDestroy 生命周期选项被重命名为 beforeUnmount</li><li>render函数默认参数createElement移除改为全局引入</li><li>组件事件现在需要在 emits 选项中声明</li></ul><p>新特性：</p><ul><li>组合式 API</li><li>Teleport</li><li>framents（组件支持多个根节点）</li><li>createRenderer（跨平台的自定义渲染器）</li></ul><p>没有列举完，推荐看官网的<a href="https://v3.cn.vuejs.org/guide/migration/introduction.html" target="_blank" rel="noreferrer">v3迁移指南</a></p><h2 id="_2-vue3在哪些方面提升了性能" tabindex="-1">2. vue3在哪些方面提升了性能 <a class="header-anchor" href="#_2-vue3在哪些方面提升了性能" aria-label="Permalink to &quot;2. vue3在哪些方面提升了性能&quot;">​</a></h2><h3 id="_1-响应式系统提升" tabindex="-1">1. 响应式系统提升 <a class="header-anchor" href="#_1-响应式系统提升" aria-label="Permalink to &quot;1. 响应式系统提升&quot;">​</a></h3><p>vue2在初始化的时候，通过Object.defineProperty对data的每个属性进行访问和修改的拦截，getter进行依赖收集、setter派发更新。在属性值是对象的时候还需要递归调用defineproperty。看下大致实现的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function observe(target) {</span></span>
<span class="line"><span>  if (target &amp;&amp; typeof target === &quot;Object&quot;) {</span></span>
<span class="line"><span>    Object.keys(target).forEach((key) =&gt; {</span></span>
<span class="line"><span>      defineReactive(target, key, target[key])</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function defineReactive(obj, key, val) {</span></span>
<span class="line"><span>  const dep = new Dep();</span></span>
<span class="line"><span>  observe(val) // 如果属性值是对象就遍历它的属性</span></span>
<span class="line"><span>  Object.defineProperty(obj, key, {</span></span>
<span class="line"><span>    get() {</span></span>
<span class="line"><span>      return val</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    set(v) {</span></span>
<span class="line"><span>      val = v</span></span>
<span class="line"><span>      dep.notify();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>而如果属性是数组，还需要覆盖数组的七个方法(会改变原数组的七个方法)进行变更的通知：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const arrayProto = Array.prototype</span></span>
<span class="line"><span>const arrayMethods = Object.create(arrayProto)</span></span>
<span class="line"><span>const methodsToPatch = [</span></span>
<span class="line"><span>  &#39;push&#39;,</span></span>
<span class="line"><span>  &#39;pop&#39;,</span></span>
<span class="line"><span>  &#39;shift&#39;,</span></span>
<span class="line"><span>  &#39;unshift&#39;,</span></span>
<span class="line"><span>  &#39;splice&#39;,</span></span>
<span class="line"><span>  &#39;sort&#39;,</span></span>
<span class="line"><span>  &#39;reverse&#39;</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>methodsToPatch.forEach(function (method) {</span></span>
<span class="line"><span>  const original = arrayProto[method]</span></span>
<span class="line"><span>  def(arrayMethods, method, function mutator (...args) {</span></span>
<span class="line"><span>    const result = original.apply(this, args)</span></span>
<span class="line"><span>    const ob = this.__ob__</span></span>
<span class="line"><span>    ob.dep.notify()</span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>从这几段代码可以看出Object.defineProperty的几个缺点：</p><ul><li>初始化时需要遍历对象所有key，层级多的情况下，性能有一定影响</li><li>动态新增、删除对象属性无法拦截，只能用set/delete api代替</li><li>不支持新的Map、Set等数据结构</li><li>无法监控到数组下标的变化(监听的性能代价太大)</li></ul><p>所以在vue3中用了proxy全面代替Object.defineProperty的响应式系统。proxy是比较新的浏览器特性，拦截的是整个对象而不是对象的属性，可以拦截多种方法，包括属性的访问、赋值、删除等操作，不需要初始化的时候遍历所有属性，并且是懒执行的特性，也就是在访问到的时候才会触发，当访问到对象属性的时候才会递归代理这个对象属性，所以性能比vue2有明显的优势。</p><p>总结下proxy的优势：</p><ul><li>可以监听多种操作方法，包括动态新增的属性和删除属性、has、apply等操作</li><li>可以监听数组的索引和 length 等属性</li><li>懒执行，不需要初始化的时候递归遍历</li><li>浏览器新标准，性能更好，并且有持续优化的可能</li></ul><p>看下大致实现拦截对象的方法。</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reactive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">target</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (target </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (target </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)[ReactiveFlags.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IS_READONLY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> target</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createReactiveObject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    target,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mutableHandlers,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mutableCollectionHandlers</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createReactiveObject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  target</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  isReadonly</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  baseHandlers</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ProxyHandler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  collectionHandlers</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ProxyHandler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> proxy</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Proxy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    target,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    baseHandlers</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  proxyMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, proxy) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 用weakMap收集</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> proxy</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_2-编译优化-虚拟dom优化" tabindex="-1">2. 编译优化（虚拟dom优化） <a class="header-anchor" href="#_2-编译优化-虚拟dom优化" aria-label="Permalink to &quot;2. 编译优化（虚拟dom优化）&quot;">​</a></h3><p>编译优化主要是通过重写虚拟dom。优化的点包括<code>编译模板的静态标记</code>、<code>静态提升</code>、<code>事件缓存</code></p><ul><li>静态标记（PatchFlag）</li></ul><p>根据尤大直播所说，更新的性能提升1.3~2倍，ssr提升2~3倍。 在对更新的节点进行对比的时候，只会去对比带有静态标记的节点。并且 PatchFlag 枚举定义了十几种类型，用以更精确的定位需要对比节点的类型。</p><p>看这段代码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span>    &lt;p&gt;前端好好玩&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;div&gt;{{message}}&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p>vue2编译后的渲染函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function render() {</span></span>
<span class="line"><span>  with(this) {</span></span>
<span class="line"><span>    return _c(&#39;div&#39;, {</span></span>
<span class="line"><span>      attrs: {</span></span>
<span class="line"><span>        &quot;id&quot;: &quot;app&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }, [_c(&#39;p&#39;, [_v(&quot;前端好好玩&quot;)]), _c(&#39;div&#39;, [_v(</span></span>
<span class="line"><span>      _s(message))])])</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这个render函数会返回vnode，后面更新的时候vue2会调<code>patch</code>函数比旧vnode进行diff算法更新（在我的上篇文章有解析过），这时候对比是整个vnode，包括里面的静态节点<code>&lt;p&gt;前端好好玩&lt;/p&gt;</code>，这样就会有一定的性能损耗。</p><p>vue3编译后的渲染函数:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from &quot;vue&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function render(_ctx, _cache) {</span></span>
<span class="line"><span>  return (_openBlock(), _createBlock(&quot;div&quot;, { id: &quot;app&quot; }, [</span></span>
<span class="line"><span>    _createVNode(&quot;p&quot;, null, &quot;前端好好玩&quot;),</span></span>
<span class="line"><span>    _createVNode(&quot;div&quot;, null, _toDisplayString(_ctx.message), 1 /* TEXT */)</span></span>
<span class="line"><span>  ]))</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,36),k=a("code",null,"_createVNode",-1),r=a("code",null,"text",-1),E=i(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  TEXT = 1,// 动态的文本节点</span></span>
<span class="line"><span>  CLASS = 1 &lt;&lt; 1,  // 2，动态Class的节点</span></span>
<span class="line"><span>  STYLE = 1 &lt;&lt; 2,  // 4，表示动态样式</span></span>
<span class="line"><span>  PROPS = 1 &lt;&lt; 3,  // 8，动态属性</span></span>
<span class="line"><span>  FULL_PROPS = 1 &lt;&lt; 4,  // 16 动态键名</span></span>
<span class="line"><span>  HYDRATE_EVENTS = 1 &lt;&lt; 5,  // 32 带有事件监听器的节点</span></span>
<span class="line"><span>  STABLE_FRAGMENT = 1 &lt;&lt; 6,   // 64 一个不会改变子节点顺序的</span></span>
<span class="line"><span>  KEYED_FRAGMENT = 1 &lt;&lt; 7, // 128 带有 key 属性</span></span>
<span class="line"><span>  UNKEYED_FRAGMENT = 1 &lt;&lt; 8, // 256 子节点没有 key</span></span>
<span class="line"><span>  NEED_PATCH = 1 &lt;&lt; 9,   // 512</span></span>
<span class="line"><span>  DYNAMIC_SLOTS = 1 &lt;&lt; 10,  // 动态插槽</span></span>
<span class="line"><span>  HOISTED = -1,  // 静态提升的标记，不会被diff，下面的静态提升会提到</span></span>
<span class="line"><span>  BAIL = -2 //</span></span></code></pre></div><blockquote><p><code>//</code>位运算，有符号右移运算符，不了解的可以看我掘金的第一篇文章<a href="https://juejin.cn/post/6885185633028538376" target="_blank" rel="noreferrer">https://juejin.cn/post/6885185633028538376</a></p></blockquote><ul><li>静态提升</li></ul><p>静态提升的意思就是把函数里的某些变量放到外面来，这样再次执行这个函数的时候就不会重新声明。vue3在编译阶段做了这个优化。还是上面那段代码，分别看下vue2和vue3编译后的不同</p><p>vue2:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function render() {</span></span>
<span class="line"><span>  with(this) {</span></span>
<span class="line"><span>    return _c(&#39;div&#39;, {</span></span>
<span class="line"><span>      attrs: {</span></span>
<span class="line"><span>        &quot;id&quot;: &quot;app&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }, [_c(&#39;p&#39;, [_v(&quot;前端好好玩&quot;)]), _c(&#39;div&#39;, [_v(_s(message))])])</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>vue3:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from &quot;vue&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const _hoisted_1 = { id: &quot;app&quot; }</span></span>
<span class="line"><span>const _hoisted_2 = /*#__PURE__*/_createVNode(&quot;p&quot;, null, &quot;前端好好玩&quot;, -1 /* HOISTED */)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function render(_ctx, _cache, $props, $setup, $data, $options) {</span></span>
<span class="line"><span>  return (_openBlock(), _createBlock(&quot;div&quot;, _hoisted_1, [</span></span>
<span class="line"><span>    _hoisted_2,</span></span>
<span class="line"><span>    _createVNode(&quot;div&quot;, null, _toDisplayString(_ctx.message), 1 /* TEXT */)</span></span>
<span class="line"><span>  ]))</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以看到vue3将不变的节点声明放到了外面去执行，后面再渲染的时候直接去_hoited变量就行，而vue2每次render都需要执行_c生成新的节点。这里还有一个点，_hoisted_2的_createVNode第四个参数-1，标记这个节点永远不需要diff。</p><ul><li>事件缓存</li></ul><p>默认情况下事件被认为是动态变量，所以每次更新视图的时候都会追踪它的变化。但是正常情况下，我们的 @click 事件在视图渲染前和渲染后，都是同一个事件，基本上不需要去追踪它的变化，所以 Vue 3.0 对此作出了相应的优化叫事件监听缓存</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span>    &lt;p @click=&quot;handleClick&quot;&gt;前端好好玩&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p>vue3编译后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from &quot;vue&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const _hoisted_1 = { id: &quot;app&quot; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function render(_ctx, _cache, $props, $setup, $data, $options) {</span></span>
<span class="line"><span>  return (_openBlock(), _createBlock(&quot;div&quot;, _hoisted_1, [</span></span>
<span class="line"><span>    _createVNode(&quot;p&quot;, {</span></span>
<span class="line"><span>      onClick: _cache[1] || (_cache[1] = (...args) =&gt; (_ctx.handleClick &amp;&amp; _ctx.handleClick(...args)))</span></span>
<span class="line"><span>    }, &quot;前端好好玩&quot;)</span></span>
<span class="line"><span>  ]))</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以看到onClick有一个_cache判断缓存赋值的操作，从而变成静态节点</p><h3 id="_3-源码体积的优化" tabindex="-1">3. 源码体积的优化 <a class="header-anchor" href="#_3-源码体积的优化" aria-label="Permalink to &quot;3. 源码体积的优化&quot;">​</a></h3><p>vue3通过重构全局api和内部api，支持了tree shaking，任何一个函数，如ref、reavtived、computed等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小</p><h2 id="_3-介绍下composition-api" tabindex="-1">3. 介绍下composition api <a class="header-anchor" href="#_3-介绍下composition-api" aria-label="Permalink to &quot;3. 介绍下composition api&quot;">​</a></h2><p>Composition API是vue3最重要的特性之一，为的是更好的<code>逻辑复用和代码组织</code>，解决options api在大型项目中，options api不好拆分和重用的问题。</p><p>Composition api声明在<code>setup</code>函数内，setup是在创建组件之前执行，这也意味着这时候组件实例尚未被创建，因此在 setup 选项中没有 this。</p><p>setup接受<code>props</code>和<code>context</code>两个参数，props是父组件传递的参数，并且原本就是响应式的，context则是一个普通的对象，包含<code>attrs</code>、<code>slots</code> 、<code>emit</code>三个属性。setup的返回值可以在模板和其他选项中访问到，也可以返回渲染函数。</p><p>vue2是将data选项的数据进行处理后成为响应式数据，而在vue3中要通过<code>reactive</code>和<code>ref</code>函数来进行数据定义后才是响应式数据。这样做的一个好处就是模板绑定的数据不一定是需要响应式的，vue3通过用户自行决定需要响应式的数据来处理，而vue2中要在模板中使用变量只能通过在data里声明，这样就造成了一定的性能浪费。</p><p>因为setup是在组件创建之前执行，需要访问组件实例或者 生命周期则要通过引入vue提供的函数，<code>getCurrentInstance</code>、<code>onMounted</code>等等，这就是函数式编程的方式，也更利于代码逻辑的拆分，再也不需要mixin来混入各种选项了。</p><p>利用这个特性，可以将一些复用的代码抽离出来作为一个函数，只要在使用的地方直接进行调用，非常灵活，看下官方提供的例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { toRefs, reactive, onUnmounted, onMounted } from &#39;vue&#39;;</span></span>
<span class="line"><span>function useMouse(){</span></span>
<span class="line"><span>    const state = reactive({x:0,y:0});</span></span>
<span class="line"><span>    const update = e=&gt;{</span></span>
<span class="line"><span>        state.x = e.pageX;</span></span>
<span class="line"><span>        state.y = e.pageY;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onMounted(()=&gt;{</span></span>
<span class="line"><span>        window.addEventListener(&#39;mousemove&#39;,update);</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    onUnmounted(()=&gt;{</span></span>
<span class="line"><span>        window.removeEventListener(&#39;mousemove&#39;,update);</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return toRefs(state);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>组件使用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import useMousePosition from &#39;./mouse&#39;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>    setup() {</span></span>
<span class="line"><span>        const { x, y } = useMousePosition()</span></span>
<span class="line"><span>        return { x, y }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从源码看下setup函数的实现和调用逻辑： 创建组件的时候会调<code>mountComponent</code>，在mountComponent调用<code>setupComponent</code>，再<code>setupStatefulComponent</code>函数处理。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function setupComponent(</span></span>
<span class="line"><span>  instance: ComponentInternalInstance,</span></span>
<span class="line"><span>  isSSR = false</span></span>
<span class="line"><span>) {</span></span>
<span class="line"><span>  isInSSRComponentSetup = isSSR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const { props, children, shapeFlag } = instance.vnode</span></span>
<span class="line"><span>  const isStateful = shapeFlag &amp; ShapeFlags.STATEFUL_COMPONENT</span></span>
<span class="line"><span>  initProps(instance, props, isStateful, isSSR)</span></span>
<span class="line"><span>  initSlots(instance, children)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const setupResult = isStateful</span></span>
<span class="line"><span>    ? setupStatefulComponent(instance, isSSR)</span></span>
<span class="line"><span>    : undefined</span></span>
<span class="line"><span>  isInSSRComponentSetup = false</span></span>
<span class="line"><span>  return setupResult // 最终返回setup处理后的结果</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function setupStatefulComponent(</span></span>
<span class="line"><span>  instance: ComponentInternalInstance,</span></span>
<span class="line"><span>  isSSR: boolean</span></span>
<span class="line"><span>) {</span></span>
<span class="line"><span>  const Component = instance.type as ComponentOptions</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (__DEV__) {</span></span>
<span class="line"><span>    if (Component.name) {</span></span>
<span class="line"><span>      validateComponentName(Component.name, instance.appContext.config)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (Component.components) {</span></span>
<span class="line"><span>      const names = Object.keys(Component.components)</span></span>
<span class="line"><span>      for (let i = 0; i &lt; names.length; i++) {</span></span>
<span class="line"><span>        validateComponentName(names[i], instance.appContext.config)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (Component.directives) {</span></span>
<span class="line"><span>      const names = Object.keys(Component.directives)</span></span>
<span class="line"><span>      for (let i = 0; i &lt; names.length; i++) {</span></span>
<span class="line"><span>        validateDirectiveName(names[i])</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 0. create render proxy property access cache</span></span>
<span class="line"><span>  instance.accessCache = Object.create(null)</span></span>
<span class="line"><span>  // 1. create public instance / render proxy</span></span>
<span class="line"><span>  // also mark it raw so it&#39;s never observed</span></span>
<span class="line"><span>  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers)</span></span>
<span class="line"><span>  if (__DEV__) {</span></span>
<span class="line"><span>    exposePropsOnRenderContext(instance)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 2. call setup()</span></span>
<span class="line"><span>  const { setup } = Component</span></span>
<span class="line"><span>  // 如果有setup选项就进去setup的处理</span></span>
<span class="line"><span>  if (setup) {</span></span>
<span class="line"><span>    const setupContext = (instance.setupContext =</span></span>
<span class="line"><span>      setup.length &gt; 1 ? createSetupContext(instance) : null)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    currentInstance = instance</span></span>
<span class="line"><span>    pauseTracking()</span></span>
<span class="line"><span>    const setupResult = callWithErrorHandling(</span></span>
<span class="line"><span>      setup,</span></span>
<span class="line"><span>      instance,</span></span>
<span class="line"><span>      ErrorCodes.SETUP_FUNCTION,</span></span>
<span class="line"><span>      [__DEV__ ? shallowReadonly(instance.props) : instance.props, setupContext]</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    // 暂停依赖收集</span></span>
<span class="line"><span>    resetTracking()</span></span>
<span class="line"><span>    currentInstance = null</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    finishComponentSetup(instance, isSSR)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>判断有setup选项就通过<code>callWithErrorHandling</code>开始执行setup，这个函数执行setup选项并做了错误处理机制。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function callWithErrorHandling(</span></span>
<span class="line"><span>  fn: Function, // 这个fn就是setup选项</span></span>
<span class="line"><span>  instance: ComponentInternalInstance | null,</span></span>
<span class="line"><span>  type: ErrorTypes,</span></span>
<span class="line"><span>  args?: unknown[]</span></span>
<span class="line"><span>) {</span></span>
<span class="line"><span>  let res</span></span>
<span class="line"><span>  try {</span></span>
<span class="line"><span>    res = args ? fn(...args) : fn()</span></span>
<span class="line"><span>  } catch (err) {</span></span>
<span class="line"><span>    handleError(err, instance, type)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return res</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>执行完后在调<code>handleSetupResult</code>对setup的返回值进行判断是否合法，最终<code>finishComponentSetup</code>完成setup处理，看finishComponentSetup函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function finishComponentSetup(</span></span>
<span class="line"><span>  instance: ComponentInternalInstance,</span></span>
<span class="line"><span>  isSSR: boolean</span></span>
<span class="line"><span>) {</span></span>
<span class="line"><span>  const Component = instance.type as ComponentOptions</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // template / render function normalization</span></span>
<span class="line"><span>  if (__NODE_JS__ &amp;&amp; isSSR) {</span></span>
<span class="line"><span>    if (Component.render) {</span></span>
<span class="line"><span>      instance.render = Component.render as InternalRenderFunction</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  } else if (!instance.render) {</span></span>
<span class="line"><span>    // could be set from setup()</span></span>
<span class="line"><span>    if (compile &amp;&amp; Component.template &amp;&amp; !Component.render) {</span></span>
<span class="line"><span>      if (__DEV__) {</span></span>
<span class="line"><span>        startMeasure(instance, \`compile\`)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      Component.render = compile(Component.template, {</span></span>
<span class="line"><span>        isCustomElement: instance.appContext.config.isCustomElement,</span></span>
<span class="line"><span>        delimiters: Component.delimiters</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>      if (__DEV__) {</span></span>
<span class="line"><span>        endMeasure(instance, \`compile\`)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    instance.render = (Component.render || NOOP) as InternalRenderFunction</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (instance.render._rc) {</span></span>
<span class="line"><span>      instance.withProxy = new Proxy(</span></span>
<span class="line"><span>        instance.ctx,</span></span>
<span class="line"><span>        RuntimeCompiledPublicInstanceProxyHandlers</span></span>
<span class="line"><span>      )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // support for 2.x options</span></span>
<span class="line"><span>  if (__FEATURE_OPTIONS_API__) {</span></span>
<span class="line"><span>    currentInstance = instance</span></span>
<span class="line"><span>    applyOptions(instance, Component)</span></span>
<span class="line"><span>    currentInstance = null</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这个函数是将绑定render函数到当前实例 instance，然后再调<code>applyOptions</code>函数对setup之外的<code>data</code>、<code>computed</code>、<code>watch</code>之类选项进行处理和生命周期钩子的调用。所以可以得出结论，setup里是访问不到data这些选项和其他生命周期。</p><h2 id="_4-vue3的响应式实现" tabindex="-1">4. vue3的响应式实现 <a class="header-anchor" href="#_4-vue3的响应式实现" aria-label="Permalink to &quot;4. vue3的响应式实现&quot;">​</a></h2><p>在前面有说过，vue3的响应式是通过proxy实现的，在源码的<code>/packages/reactivity</code>目录下。</p><p>整个响应式系统的流程如下：</p><p>1、通过state = <code>reactive</code>(target) 来定义响应式数据(代理get、set、deleteProperty、has、ownKeys等操作)</p><p>2、通过 <code>effect</code> 声明依赖响应式数据的函数cb ( 例如视图渲染函数render函数)，并执行cb函数，执行过程中，会触发响应式数据 <code>getter</code></p><p>3、在响应式数据 <code>getter</code>中进行 <code>track</code>依赖收集：存储响应式数据与更新函数 <code>cb</code> 的映射关系，存储于<code>targetMap</code></p><p>4、当变更响应式数据时，触发<code>trigger</code>，根据<code>targetMap</code>找到关联的<code>cb</code>并执行</p><p>通过源码来看下这几个关键函数的实现：</p><h3 id="reactive" tabindex="-1">reactive <a class="header-anchor" href="#reactive" aria-label="Permalink to &quot;reactive&quot;">​</a></h3><p><code>/packages/reactivity/reactive</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function reactive(target: object) {</span></span>
<span class="line"><span>  // 如果尝试观察只读代理，则返回只读版本</span></span>
<span class="line"><span>  if (target &amp;&amp; (target as Target)[ReactiveFlags.IS_READONLY]) {</span></span>
<span class="line"><span>    return target</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return createReactiveObject(</span></span>
<span class="line"><span>    target,</span></span>
<span class="line"><span>    false,</span></span>
<span class="line"><span>    mutableHandlers,</span></span>
<span class="line"><span>    mutableCollectionHandlers,</span></span>
<span class="line"><span>    reactiveMap</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function createReactiveObject(</span></span>
<span class="line"><span>  target: Target,</span></span>
<span class="line"><span>  isReadonly: boolean,</span></span>
<span class="line"><span>  baseHandlers: ProxyHandler&lt;any&gt;,</span></span>
<span class="line"><span>  collectionHandlers: ProxyHandler&lt;any&gt;,</span></span>
<span class="line"><span>  proxyMap: WeakMap&lt;Target, any&gt;</span></span>
<span class="line"><span>) {</span></span>
<span class="line"><span>  // 如果不是对象，直接返回即可</span></span>
<span class="line"><span>  if (!isObject(target)) {</span></span>
<span class="line"><span>    if (__DEV__) {</span></span>
<span class="line"><span>      console.warn(\`value cannot be made reactive: \${String(target)}\`)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return target</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 代理的目标本身就是代理的proxy，直接返回自身</span></span>
<span class="line"><span>  if (</span></span>
<span class="line"><span>    target[ReactiveFlags.RAW] &amp;&amp;</span></span>
<span class="line"><span>    !(isReadonly &amp;&amp; target[ReactiveFlags.IS_REACTIVE])</span></span>
<span class="line"><span>  ) {</span></span>
<span class="line"><span>    return target</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 代理的目标已经被代理过了，直接返回代理对象</span></span>
<span class="line"><span>  const existingProxy = proxyMap.get(target)</span></span>
<span class="line"><span>  if (existingProxy) {</span></span>
<span class="line"><span>    return existingProxy</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 只能代理可以代理的白名单类型对象.</span></span>
<span class="line"><span>  const targetType = getTargetType(target)</span></span>
<span class="line"><span>  if (targetType === TargetType.INVALID) {</span></span>
<span class="line"><span>    return target</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 判断代理的对象类型，来根据不同的类型做不同的代理处理</span></span>
<span class="line"><span>  const proxy = new Proxy(</span></span>
<span class="line"><span>    target,</span></span>
<span class="line"><span>    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>  // 保存在proxyMap，防止目标对象被重复代理</span></span>
<span class="line"><span>  proxyMap.set(target, proxy)</span></span>
<span class="line"><span>  return proxy</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>通过reactive调用<code>createReactiveObject</code>生成响应式对象，对传入的target有做不同情况的处理，proxy的handler用传入的<code>baseHandlers</code>，这里默认传入的是<code>mutableHandlers</code>，这个方法从<code>reactivity/baseHandlers</code>导入：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mutableHandlers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: ProxyHandler</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">object</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  get,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  set,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  deleteProperty,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  has,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ownKeys</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> get</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> /*#__PURE__*/</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createGetter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> set</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> /*#__PURE__*/</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createSetter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createGetter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">isReadonly</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">shallow</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">target</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> symbol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">receiver</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 对数组做特殊的读取值处理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> targetIsArray</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">isReadonly </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> targetIsArray </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> hasOwn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arrayInstrumentations, key)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Reflect.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arrayInstrumentations, key, receiver)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> res</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Reflect.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, key, receiver)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // track 依赖收集</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">isReadonly) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      track</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, TrackOpTypes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">GET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, key)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 如果读取的值是对象，递归调用reactive，使之成为响应式对象</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isObject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> isReadonly </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> readonly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reactive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> res</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createSetter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">shallow</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    target</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> symbol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    receiver</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> object</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  )</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> oldValue </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (target </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)[key]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 判断是新增还是删除属性</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> hadKey</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      isArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isIntegerKey</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> target.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> hasOwn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, key)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Reflect.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, key, value, receiver)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // don&#39;t trigger if target is something up in the prototype chain of original</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (target </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> toRaw</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(receiver)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">hadKey) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // trigger更新函数</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        trigger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, TriggerOpTypes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ADD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, key, value)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hasChanged</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(value, oldValue)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        trigger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, TriggerOpTypes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, key, value, oldValue)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>mutableHandlers对get、set、deleteProperty等属性操作做了处理，这边只分析get 和set。在get的时候会进行<code>track</code>依赖收集，如果get的属性值是对象还会进行递归响应式处理，set则会<code>trigger</code>进行更新。</p><h3 id="track" tabindex="-1">track <a class="header-anchor" href="#track" aria-label="Permalink to &quot;track&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> track</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">target</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TrackOpTypes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">shouldTrack </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> activeEffect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 获取target对应依赖表</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> depsMap </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> targetMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">depsMap) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    targetMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target, (depsMap </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 获取key对应的响应函数集合</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dep </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dep) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 动态创建依赖关系</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key, (dep </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // activeEffect临时变量，getter触发依赖收集的回调函数，可能是render或者effect生成的副作用函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dep.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">has</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(activeEffect)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    dep.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(activeEffect)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    activeEffect.deps.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dep)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (__DEV__ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> activeEffect.options.onTrack) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      activeEffect.options.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onTrack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        effect: activeEffect,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        target,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        type,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        key</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>track依赖收集的时候，先判断<code>targetMap</code>是否存在访问的这个对象，targetMap是一个weakMap的结构，格式为<code>{target：{ key: [fn1,fn2]}}</code>，target为weakMap的key，value是一个map类型，key为访问到的target的属性，值为这个属性对应的<code>回调函数集合</code>。最后面有一个<code>activeEffect</code>的判断，这个判断依赖收集的<code>副作用函数</code>，这个副作用函数可能是<code>ffect</code>临时生成，也有可能是在<code>render渲染函数</code>临时生成的副作用函数。</p><h3 id="trigger" tabindex="-1">trigger <a class="header-anchor" href="#trigger" aria-label="Permalink to &quot;trigger&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> trigger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  target</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TriggerOpTypes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  newValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  oldValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  oldTarget</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 获取触发更新的target对应的属性映射集合</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> depsMap</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> targetMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">depsMap) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // never been tracked</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> effects</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ReactiveEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">effectsToAdd</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ReactiveEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (effectsToAdd) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      effectsToAdd.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">effect</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (effect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> activeEffect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> effect.allowRecurse) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          effects.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (type </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TriggerOpTypes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CLEAR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // collection being cleared</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // trigger all effects for target</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(add)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (key </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;length&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;&amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">dep</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (key </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;length&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> key </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (newValue </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dep)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // schedule runs for SET | ADD | DELETE</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (key </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!==</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // also run for iteration key on ADD | DELETE | Map.SET</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 根据触发的操作类型做不同的回调函数处理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    switch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (type) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      case</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TriggerOpTypes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ADD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ITERATE_KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">          if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">MAP_KEY_ITERATE_KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isIntegerKey</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key)) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // new index added to array -&gt; length changes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;length&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        break</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      case</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TriggerOpTypes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">DELETE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ITERATE_KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">          if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">MAP_KEY_ITERATE_KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        break</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      case</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TriggerOpTypes.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(depsMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ITERATE_KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        break</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> run</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">effect</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactiveEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (__DEV__ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> effect.options.onTrigger) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      effect.options.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onTrigger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        effect,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        target,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        key,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        type,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        newValue,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        oldValue,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        oldTarget</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (effect.options.scheduler) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      effect.options.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">scheduler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 执行所有的回调函数集合</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  effects.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(run)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>trigger触发更新，根据<code>targetsMap</code>找到target对应的属性依赖集合，再根据key找到回调函数集合，然后还要根据操作类型做处理后，执行所有的回调函数集合。</p><h3 id="effect" tabindex="-1">effect <a class="header-anchor" href="#effect" aria-label="Permalink to &quot;effect&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// effect栈，保存所有的effect副作用函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> effectStack</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactiveEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  fn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  options</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactiveEffectOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> EMPTY_OBJ</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactiveEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(fn)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    fn </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fn.raw</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> effect</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createReactiveEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(fn, options)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">options.lazy) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    effect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> effect</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createReactiveEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  fn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  options</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactiveEffectOptions</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactiveEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> effect</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reactiveEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">effect.active) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> options.scheduler </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> undefined</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // effectStack是否存在当前执行的副作用函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">effectStack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">includes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(effect)) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      cleanup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        enableTracking</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        effectStack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        activeEffect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> effect</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">finally</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        effectStack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        resetTracking</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        activeEffect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> effectStack[effectStack.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactiveEffect</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  effect.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  effect.allowRecurse </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">options.allowRecurse</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  effect._isEffect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  effect.active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  effect.raw </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fn</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  effect.deps </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  effect.options </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> options</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> effect</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><code>effectStack</code>栈结构的数组，effect的时候，将副作用函数放入<code>effectStack</code>中，再将<code>activeEffect</code>临时赋值为当前执行的<code>effect</code>函数，用于<code>track</code>的时候将effect函数放入响应式数据的key的回调函数集合，effect执行完再将<code>activeEffect</code>赋值回原来<code>effectStack</code>的末位函数。</p><h2 id="_5-vue3的hook与react的hook有什么不同" tabindex="-1">5. vue3的hook与react的hook有什么不同 <a class="header-anchor" href="#_5-vue3的hook与react的hook有什么不同" aria-label="Permalink to &quot;5. vue3的hook与react的hook有什么不同&quot;">​</a></h2><p>毫无疑问，vue3的hook是借鉴了react的hook思想，vue3中自定义hook的写法与react看起来很类似，但实际使用是有些许不同，而内部实现原理更是完全不一样。</p><p>首先说下react hook的两个限制：</p><ol><li><code>只在最顶层使用 Hook</code>，<code>不要在循环，条件或嵌套函数中调用 Hook</code></li><li><code>只在 React 函数中调用 Hook</code>，<code>不要在普通的 JavaScript 函数中调用 Hook</code></li></ol><p>这在<a href="https://zh-hans.reactjs.org/docs/hooks-rules.html#explanation" target="_blank" rel="noreferrer">react官网</a>也有专门介绍。</p><p>只能在最顶层使用Hook，这是因为react的hook是依靠调用的顺序来确认state对应的hook，每次重新渲染都会再调用hook，所以需要确保hook的调用顺序是不会变的。</p><p>再说下vue与react使用的不同之处：</p><ol><li>setup只执行一遍，而react每次渲染都会重新执行hook</li><li>Hook需要更新值时Vue可以直接赋值，而react则需要调用hook的赋值函数</li><li>调用顺序无要求，也可以放在条件语句里</li></ol><p>实现原理的不同：</p><p>vue中的hook是<code>响应式对象</code>，在render的时候读取到就会被<code>依赖收集</code>。</p><p>react中的hook本质是一个函数，每次重新渲染都需要再次调用，在声明的时候按照调用顺序通过{ value1, setValue1} -&gt; { value2, setValue2 }的<code>链表</code>结构存储，所以需要严格限制 Hook 的执行顺序和禁止条件调用。</p><h2 id="_6-vue3的dom-diff与react的dom-diff不同" tabindex="-1">6. vue3的dom diff与react的dom diff不同 <a class="header-anchor" href="#_6-vue3的dom-diff与react的dom-diff不同" aria-label="Permalink to &quot;6. vue3的dom diff与react的dom diff不同&quot;">​</a></h2><p>在前面的vue3性能提升的优化点有说过了vdom编译优化通过<code>静态节点、静态提升和事件缓存</code>，而在react是没有做这个实现的。</p><p>react是通过把vdom树以链表的结构，利用浏览器的空闲时间来做diff，也就是<code>时间切片</code>的概念，如果超过了16ms，有动画或者用户交互的任务，就把主进程控制权还给浏览器，等空闲了继续diff。用的是<code>requestIdleCallback</code>这个浏览器的api实现。</p>`,71);function c(d,g,o,y,F,u){return l(),p("div",null,[h,a("p",null,[s("只有"),k,s("这个函数带有第四个参数的才是非静态节点，也就是需要后续diff的节点。第四个参数是这个节点具体包含需要被diff的类型，比如是"),r,s("节点，只有"+e()+"这种模板变量的绑定，后续只需要对比这个text即可，看下源码中定义了哪些枚举的元素类型:",1)]),E])}const A=n(t,[["render",c]]);export{C as __pageData,A as default};
