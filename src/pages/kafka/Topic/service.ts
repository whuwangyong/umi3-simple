import { request } from 'umi';
import { Topic } from '../data';
import type { ColumnFilterItem, ColumnType, CompareFn, SortOrder } from 'antd/lib/table/interface';

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
