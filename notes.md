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

后台定时任务

- 获取所有 topics， /120s
- 获取所有 groups，/120s
- describe 所有 topics
- describe 所有 groups

ComposedFuture

接口 https://ant-design-pro.gitee.io/zh-CN/docs/request#%E5%8F%82%E8%80%83%E5%90%8E%E7%AB%AF%E6%8E%A5%E5%8F%A3%E8%A7%84%E8%8C%83%E5%BB%BA%E8%AE%AE

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
