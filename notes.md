## 设计

### 页面

#### dashboard

卡片

- [x] kafka 集群状态
- [x] 主题数量 1600 个【跳转到 Kafka-topics】
- [x] 消费者组数量 2500 个【跳转到 Kafka-groups】
- [x] 应用数
- [x] 作业实例数量 3800 个【跳转到 jobs】

表格

- [x] 大主题（消息多的主题）top，按 totalOffset 排序
- [x] 消费进度 lag top【跳转到 Kafka-groups】
- [ ] 消费速率 top
- [x] 失败的作业列表【跳转到 jobs】
- [x] idle 作业列表，按闲置时间排序（当前未干活，在等数据，实际上就是 lag=0 的 job）

#### Job

【跳转到 topics、groups、Memtable、ICC、日志】

- [ ] 列表
- [ ] 数据流图
- [ ] 未结束原因

#### Kafka

（有些列是后台线程异步定期更新的，页面展示的数据并不是最新的，刷新按钮放哪里？）

topic 左右布局，4/6 分布。左边是 topic 列表，右边是消息展示

- [ ] 列表包含
  - [ ] 名字
    - [ ] （支持搜索）看了示例，比较复杂，还是使用 protable 的查询能力
  - [ ] 分区数（支持过滤；点击展示每个分区的 offset，leader，replicas，isr）
  - [ ] totalOffset（支持排序）
  - [ ] 索引状态（灰色无，绿色正常，红色错误；点击后展示详情：各类消息的数量、报错原因等；支持过滤）
  - [ ] 支持多选，多选后，底部工具栏：创建索引、删除、重建
  - [ ] 点击某行，在右边展示该 topic 的第一条消息
- [ ] 列表右上工具栏
  - [ ] 查询
  - [ ] 新建
  - [ ] 批量创建（上传 json 文件）
  - [ ] 删除所有
  - [ ] 刷新
- [ ] 消息展示面板，从上到下
  - [ ] 如有索引，显示索引查询栏：下拉框选择索引键+文本框填写索引值+查询按钮
  - [ ] POC（partition，offset，count）三元组查询栏：三个文本框（默认值 0，0，1）+查询按钮
  - [ ] json 文本框展示消息，文本框只读
  - [ ] 消息修改？
    - [ ] 文本框下面有一个“修改消息”按钮，点击后，弹框提示哪些消费组已消费该消息，哪些未消费，只有非消费的才能修改【联动操作，需先暂停消费者】
    - [ ] 点击确认，关闭对话框后，json 文本框可编辑
    - [ ] 编辑后，点击“发布”按钮发布修改后的消息
    - [ ] 文本框里面的消息不止一条，也就是支持批量修改
    - [ ] 文本框里面的消息除了业务消息还有一些工具添加的消息，需要提取和序列化。序列化时尤其注意日期格式、小数位数等
    - [ ] 还需要一个页面展示所有二次发布的消息，给一个链接以跳转。该页面还可以展示修改后的消息被哪些消费组消费了

group 展示消费者组

#### Memtable

【列表形式展示该实例内的内存表，便捷的增删改查】

#### ICC

#### Callback

#### Tools

一个功能就是一个卡片

- [ ] sharding 计算
- [ ] ZooKeeper

### 后台定时任务

- 获取所有 topics， /120s
- 获取所有 groups，/120s
- describe 所有 topics
- describe 所有 groups

ComposedFuture

### 需要使用数据库

- 消息索引大范围使用后，如果索引数据全在内存，一重启就丢失了，会是巨大的损失，因此需要持久化
- 后期如果做用户，也需要 DB
- 一些统计指标需要借助 DB 实现，比如记录某 topic 最近一个月的消息数量变化；记录某作业每天的完成时间

### 查询和分页

前端做还是后端做？

- search 在前端有点复杂，sort、filter 在前端都很简单
- 因此，粗暴的做法，就是后端给全部数据，前端自己折腾
- 精细的做法，后端只给一页，前端的 search、sort、filter、pagination 都请求后端。优点是省流；每次数据都是最新的，而不是操作的前端的缓存

目前简单的做法：search 走后端，其余由前端处理：

- 前端各种折腾都是基于后端给的数据
- 前端是在 search 的结果上折腾
- 进页面，后端给全量数据
- 前端刷新可以再次拿到全量数据

## antd

### 交互接口

通用接口 [网络请求 - Ant Design Pro (gitee.io)](https://ant-design-pro.gitee.io/zh-CN/docs/request/#参考后端接口规范建议)

```json
{
  "success": true,
  "data": {},
  "errorMessage": "error message"
}
```

ProTable ProList 等定义的接口 [与网络请求库配置使用 - ProComponents (ant.design)](https://procomponents.ant.design/components#与网络请求库配置使用)

ProTable，ProList 使用了新的数据结构，如果你使用了我们约定的参数使用起来会非常简单。

```typescript
const msg: {
  data: T[];
  page: number;
  success: boolean;
  total: number;
} = {
  data: [],
  page: 1,
  success: true,
  total: 0,
};
```

### husky commit msg hook

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

### 目录结构

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

#### 页面代码结构推荐

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

#### 自己的实践

- 全局公用的 api 放在/src/services 下，公用的接口定义在/src/services/typings.d.ts
- 非公用的，还是就近放在页面组件内。类型定义放在 pages/Xxx/data.d.ts，后端服务放在 pages/Xxx/service.ts。如果所有的类型定义都放在全局的 services/typings.d.ts，回导致该文件长而乱
