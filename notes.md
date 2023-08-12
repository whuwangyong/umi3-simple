- dashboard
  - 卡片
    - kafka集群状态
    - 主题数量 1600个【跳转到Kafka-topics】
    - 消费者组数量 2500个【跳转到Kafka-groups】
    - 作业实例数量  3800个【跳转到jobs】
  - 面板
    - 大主题（消息多的主题）top，按totalOffset排序
    - 消费进度lag top【跳转到Kafka-groups】
    - 消费速率 top
    - 失败的作业列表【跳转到jobs】
    - idle作业列表，按闲置时间排序（当前未干活，在等数据）
- Jobs【跳转到topics、groups、Memtable、ICC、日志】
  - 列表
  - 数据流图
  - 未结束原因
- Kafka（有些列是后台线程异步定期更新的，页面展示的数据并不是最新的，刷新按钮放哪里？）
  - topics，展示名字、分区数、totalOffset，【增删改查；批量创建、删除；点击某个topic可以查看里面的消息】
  - groups，展示消费者组
  - index，
- Memtable【列表形式展示该实例内的内存表，便捷的增删改查】
- ICC





后台定时任务

- 获取所有topics， /120s
- 获取所有groups，/120s
- describe所有topics
- describe所有groups

ComposedFuture