import { request } from 'umi';
import { InspectorResponse } from '@/services/inspector/typings';

export async function getKafkaState(): Promise<InspectorResponse> {
  return request('/api/dashboard/kafka-state');
}

export async function getBigTopics(): Promise<InspectorResponse> {
  return request('/api/dashboard/big-topics');
}

export async function getLag(): Promise<InspectorResponse> {
  return request('/api/dashboard/lag');
}

export async function getFailedJob(): Promise<InspectorResponse> {
  return request('/api/dashboard/failed-jobs');
}

export async function getIdleJob(): Promise<InspectorResponse> {
  return request('/api/dashboard/idle-jobs');
}
