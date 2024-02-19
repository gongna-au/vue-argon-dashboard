## 运行

```shell
$ vue --version
@vue/cli 5.0.8
```

or 
```shell
npm install -g @vue/cli
```

```shell
npm install
```

```shell
npm run serve
```

如果问题仍然存在，检查 package.json 文件确保 vue-cli-service 被列为了一个依赖项，它通常是作为 @vue/cli-service 的一部分被安装。如果没有找到，你可能需要手动安装它：

```bash
npm install @vue/cli-service --save-dev
```


## 注册功能的实现

为了使给定的代码请求后端接口实现注册功能，同时保持样式不变，我们需要对<script>部分进行一些修改，以便在提交表单时调用后端的注册接口。下面是如何修改你的Vue组件来实现这一点：

首先，确保argon-input组件可以使用v-model来双向绑定数据，如果argon-input是一个自定义组件，需要确保它可以正确地使用v-model。假设argon-input已经正确设置了v-model的使用，下面是如何修改代码：

1. 添加数据属性
我们需要在组件的data函数中添加一些属性来存储用户输入的姓名、电子邮件和密码。

2. 添加注册方法
我们将在组件的methods部分添加一个register方法，这个方法会在表单提交时调用。

3. 修改表单提交
将表单的@submit.prevent修改为调用register方法。

根据上述步骤修改后的代码为：


