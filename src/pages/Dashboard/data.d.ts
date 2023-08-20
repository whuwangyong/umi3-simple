/**
 * 作业实例
 */
export interface JobInstance {
  id: number;
  name: string;
  status: string;
  startTime: Date;
  lastUpdateTime: Date;
  position: number;
  idleMin: number; // 闲置分钟
  lag?: number;
}

/**
 * 大主题
 */
export interface BigTopic {
  id: number; // React需要的key
  name: string;
  partitions: number;
  totalOffsets: number;
}

/**
 *  消费进度
 */
export interface ConsumeOffset {
  id: number;
  groupName: string;
  lag: number;
}
