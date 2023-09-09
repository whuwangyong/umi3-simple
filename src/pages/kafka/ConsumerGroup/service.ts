import { request } from 'umi';
import { ConsumerGroup } from '../data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getConsumerGroups(
  params: { current?: number; pageSize?: number },
  sort: Record<string, SortOrder>,
  filter: Record<string, string | number | null>,
) {
  return request<{
    data: ConsumerGroup[];
    total?: number;
    success?: boolean;
  }>('/api/kafka/consumer-groups', {
    method: 'GET',
    params: { ...params },
  });
}
