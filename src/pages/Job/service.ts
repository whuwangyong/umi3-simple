import { request } from 'umi';
import { JobInstance } from './data';
import { InspectorResponse } from '@/services/inspector/typings';

export async function getJobInstance(params: { current?: number; pageSize?: number }) {
  return request<{
    data: JobInstance[];
    total?: number;
    success?: boolean;
  }>('/api/jobs', {
    method: 'GET',
    params: { ...params },
  });
}

export async function sendIcc(data: { operation: string; jobInstances: string[] }) {
  return request<InspectorResponse>('/api/icc', {
    method: 'POST',
    data: data,
  });
}

export async function diagnose(params: { jobInstance: string }) {
  return request<InspectorResponse>('/api/jobs/diagnose', {
    method: 'GET',
    params: params,
  });
}
