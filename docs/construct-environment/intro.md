---
title: 步骤认识
---
# 构建环境

<br>

# 步骤认识

恭喜，你已经将 SeniorOS 源代码获取至本地了，接下来要做的是如何编译在你手中的源代码

## 为什么要构建

SeniorOS 使用了专用的特殊工具以提高代码精简度/可读性，所以一部分代码不能直接刷入至掌控版中

本章节将介绍如何使用 `./tools/Build.py` 来构建 SeniorOS

::: danger
由于 Build.py 依赖于 GitPython 库，所以如果你使用 Gitee 下载 .zip 文件 获取的源代码将无法直接被编译（因为缺少 .git 目录）
:::