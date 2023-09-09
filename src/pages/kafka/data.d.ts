import { EndMessage } from '../Job/data.d';

/**
 * 分区
 */
export interface Partition {
  name: string;
  offset: number;
  leader?: string;
  replicas?: string[];
  isr?: string[];
}
/**
 * 主题
 */
export interface Topic {
  name: string;
  partitions: Partition[];
  totalOffset: number;
  indexStatus?: string;
  indices?: string[];
  updateTime: Date;
}

/**
 * 新建主题
 */
export interface NewTopic {
  name: string;
  partitions: number;
  replicas: number;
}

export enum IndexStatus {
  none,
  ok,
  error,
}

/**
 *  消费者组
 */
export interface ConsumerGroup {
  name: string;
  topicPartition: string;
  offset: number;
  lag: number;
  updateTime: Date;
}

export interface TopicTablePagination {
  total: number;
  pageSize: number;
  current: number;
}

/**
 * 索引详情
 */
export interface IndexDetail {
  topic: string;
  status: string;
  bizMsgTotal: number;
  bizMsgPerPartition: { [partition: number]: [count: number] }; // 每个分区上有多少业务消息
  bizMsgType: { [className: string]: [count: number] }; // 每种类型的消息有多少
  endMsgcount: number;
  endMsgList: EndMessage[];
}
