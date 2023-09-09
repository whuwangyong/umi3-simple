import { request } from 'umi';
import { NewTopic, Topic } from '../data';
import type { SortOrder } from 'antd/lib/table/interface';
import { InspectorResponse } from '@/services/inspector/typings';

export async function getTopics(
  params: { current?: number; pageSize?: number },
  // options?: { [key: string]: any },
  sort: Record<string, SortOrder>,
  filter: Record<string, string | number | null>,
) {
  // console.log(params);
  // console.log(sort); // sort['name']: 'ascend'
  // console.log(filter); // filter['indexStatus']: ['ok', 'error']
  return request<{
    data: Topic[];
    total?: number;
    success?: boolean;
  }>('/api/kafka/topics', {
    method: 'GET',
    params: { ...params },
    // ...(options || {}),
  });
}

export async function createTopic(topics: NewTopic) {
  return request<InspectorResponse>('/api/kafka/topics', {
    method: 'POST',
    data: topics,
  });
}

export async function deleteTopic(topics?: string[]) {
  return request<InspectorResponse>('/api/kafka/topics', {
    method: 'DELETE',
    data: topics,
  });
}

export async function getIndexDetail(params: any) {}

export async function pocQuery(params: {
  topic: string;
  partition: number;
  offset: number;
  count: number;
}): Promise<InspectorResponse> {
  console.log(params);
  return request('/api/kafka/msg-query/poc', {
    method: 'GET',
    params: { ...params },
  });
}

export async function indexQuery(params: {
  indexName: string;
  indexValue: string;
}): Promise<InspectorResponse> {
  console.log(params);
  return request('/api/kafka/msg-query/index', {
    method: 'GET',
    params: { ...params },
  });
}

export async function createIndex(topics: string[]) {
  return request<InspectorResponse>('/api/kafka/indices', {
    method: 'POST',
    data: topics,
  });
}
