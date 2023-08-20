/**
 * 后端响应定义
 */
export interface InspectorResponse {
  success: boolean;
  data: any;
  errorMessage: string;
}

/**
 * 作业实例
 */
export interface JobInstance {
  index: number;
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
  index: number; // React需要的key
  name: string;
  partitions: number;
  totalOffsets: number;
}

/**
 *  消费进度
 */
export interface ConsumeOffset {
  index: number;
  groupName: string;
  lag: number;
}
