/**
 * 作业实例
 */
export interface JobInstance {
  namespace: string;
  name: string;
  status: string;
  total: number;
  ip?: string;
  startTime: Date;
  lastUpdateTime: Date;
  idleMin: number; // 闲置分钟

  // params: Map<string, string>;
  // endMsgList: EndMessage[];
  position?: number;
  // lag?: number;
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

export enum Namespace {
  NSSP,
  NSOP,
  NSHK,
  NSHG,
  NSBH,
}
