/**
 * 作业实例
 */
export interface JobInstance {
  name: string;
  status: string;
  total: number;
  startTime: Date;
  lastUpdateTime: Date;
  params: Map<string, string>;
  endMsgList: EndMessage[];

  position?: number;
  idleMin?: number; // 闲置分钟
  lag?: number;
}

/**
 * 结束消息
 */
export interface EndMessage {
  jobName: string;
  jobInstanceName: string;
  totalInstance: number;
  offset: number;
}

export enum JobStatus {
  RUNNGING,
  FAILED,
  COMPLETED,
  PAUSED,
  STOPPED,
  NONE,
}
