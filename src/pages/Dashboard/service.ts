import { request } from 'umi';
import { InspectorResponse } from '@/services/inspector/typings';

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
  return request('/api/job/failed');
}

export async function getIdleJob(): Promise<InspectorResponse> {
  return request('/api/job/idle');
}
