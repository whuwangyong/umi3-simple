import { request } from 'umi';
import InspectorResponse from '@/typings';

export async function getKafkaState(): Promise<InspectorResponse> {
  return request('/api/kafka/state');
}

export async function getBigTopics(): Promise<InspectorResponse> {
  return request('/api/kafka/bigTopics');
}

export async function getLag(): Promise<InspectorResponse> {
  return request('/api/kafka/lag');
}

export async function getFailedJob(): Promise<InspectorResponse> {
  return request('/api/jobs/failed');
}
