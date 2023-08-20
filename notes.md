## 设计

- dashboard
  - 卡片
    - kafka 集群状态
    - 主题数量 1600 个【跳转到 Kafka-topics】
    - 消费者组数量 2500 个【跳转到 Kafka-groups】
    - 作业实例数量 3800 个【跳转到 jobs】
  - 面板
    - 大主题（消息多的主题）top，按 totalOffset 排序
    - 消费进度 lag top【跳转到 Kafka-groups】
    - 消费速率 top
    - 失败的作业列表【跳转到 jobs】
    - idle 作业列表，按闲置时间排序（当前未干活，在等数据，实际上就是 lag=0 的 job）
- Jobs【跳转到 topics、groups、Memtable、ICC、日志】
  - 列表
  - 数据流图
  - 未结束原因
- Kafka（有些列是后台线程异步定期更新的，页面展示的数据并不是最新的，刷新按钮放哪里？）
  - topics，展示名字、分区数、totalOffset，【增删改查；批量创建、删除；点击某个 topic 可以查看里面的消息】
  - groups，展示消费者组
  - index，
- Memtable【列表形式展示该实例内的内存表，便捷的增删改查】
- ICC

### 后台定时任务

- 获取所有 topics， /120s
- 获取所有 groups，/120s
- describe 所有 topics
- describe 所有 groups

ComposedFuture

### 交互接口

https://ant-design-pro.gitee.io/zh-CN/docs/request#%E5%8F%82%E8%80%83%E5%90%8E%E7%AB%AF%E6%8E%A5%E5%8F%A3%E8%A7%84%E8%8C%83%E5%BB%BA%E8%AE%AE

```
{
"success": true,
"data": {},
"errorMessage": "error message"
}
```

## husky commit msg hook

Proper commit message format is required for automated changelog generation. Examples:

        [<emoji>] [revert: ?]<type>[(scope)?]: <message>

        💥 feat(compiler): add 'comments' option
        🐛 fix(compiler): fix some bug
        📝 docs(compiler): add some docs
        🌷 UI(compiler): better styles
        🏰 chore(compiler): Made some changes to the scaffolding
        🌐 locale(compiler): Made a small contribution to internationalization

        Other commit types: refactor, perf, workflow, build, CI, typos, tests, types, wip, release, dep

        See https://github.com/vuejs/core/blob/main/.github/commit-convention.md

## 目录结构

我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
```

### 页面代码结构推荐

为了让项目代码组织更加规范，让开发能够更方便的定位到相关页面组件代码，我们定义了一套规范，该规范当前只作为推荐的指导，并非强制。

```
src
├── components
└── pages
    ├── Welcome        // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
    |   ├── Form.tsx
    |   ├── index.tsx  // 页面组件的代码
    |   └── index.less // 页面样式
    ├── Order          // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── index.tsx
    |   └── index.less
    ├── user           // 一系列页面推荐通过小写的单一字母做 group 目录
    |   ├── components // group 下公用的组件集合
    |   ├── Login      // group 下的页面 Login
    |   ├── Register   // group 下的页面 Register
    |   └── util.ts    // 这里可以有一些共用方法之类，不做推荐和约束，看业务场景自行做组织
    └── *              // 其它页面组件代码
```

所有路由组件（会配置在路由配置中的组件）我们推荐以大驼峰命名打平到 pages 下面第一级（复杂的项目可以增加 group 层级，在 group 下放置 pages）。不建议在路由组件内部再嵌套路由组件 - 不方便分辨一个组件是否是路由组件，而且不方便快速从全局定位到路由组件。

我们推荐尽可能的拆分路由组件为更细粒度的组件，对于多个页面可能会用到的组件我们推荐放到 src/components 中，对于只是被单个页面依赖的（区块）组件，我们推荐就近维护到路由组件文件夹下即可。

### 自己的实践

- 全局公用的 api 放在/src/services 下，公用的接口定义在/src/services/typings.d.ts
- 非公用的，还是就近放在页面组件内。类型定义放在 pages/Xxx/data.d.ts，后端服务放在 pages/Xxx/service.ts。如果所有的类型定义都放在全局的 services/typings.d.ts，该文件长而乱
