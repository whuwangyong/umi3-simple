import { request } from 'umi';
import { Topic } from '../data';
import type { ColumnFilterItem, ColumnType, CompareFn, SortOrder } from 'antd/lib/table/interface';
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
