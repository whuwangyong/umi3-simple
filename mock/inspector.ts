import { Request, Response } from 'express';
// mock里面要写import from ... './data.d'，否则报错Cannot find module './data' from 'D:/projects/umi3-simple/src/pages/Dashboard'
// 其他模块里面写from './data' 就行。antd pro 的demo里面也是如此
import { Topic, indexStatus, ConsumerGroup } from '../src/pages/kafka/data.d';
import { JobInstance, JobStatus } from '../src/pages/Job/data.d';
import { random } from 'lodash';
import { getRandomString, getRandomDateTime } from '../src/utils/MyUtils';
// mock 里面不能写'@/utils/MyUtils'，要写相对路径
import { parse } from 'url';

//////////////////////////////////////////////////////// Dashboard
function getKafkaState(req: Request, res: Response) {
  res.send({
    success: true,
    data: [
      { id: 1, server: 'Kafka_1:9092', state: 'online' },
      { id: 2, server: 'Kafka_2:9092', state: 'online' },
      { id: 3, server: 'Kafka_3:9092', state: 'offline' },
    ],
  });
}

function getLag(req: Request, res: Response) {
  const items: ConsumerGroup[] = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      name: 'group-' + getRandomString(20),
      topicPartition: 'topicPartition-' + random(0, 10),
      offset: random(1, 1000),
      lag: random(1, 1000000),
    });
  }
  res.send({
    success: true,
    data: items,
  });
}

//////////////////////////////////////////////////////// kafka/Topic

function genTopics(num: number): Topic[] {
  const items: Topic[] = [];
  for (let i = 0; i < num; i++) {
    items.push({
      name: 'topic-' + getRandomString(30),
      partitions: [
        { name: 'topicPartition-0', offset: 10 },
        { name: 'topicPartition-1', offset: 20 },
      ],
      totalOffset: random(1, 10000),
      indexStatus: indexStatus[random(0, 2)],
    });
  }
  return items;
}

function getTopics(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    Topic & {
      sorter: any;
      filter: any;
    };

  let items = topics.slice();

  if (params.name) {
    items = items.filter((data) => data?.name?.includes(params.name || ''));
  }

  res.send({
    success: true,
    data: items,
  });
}

//////////////////////////////////////////////////////// Job
function genJobInstances(num: number): JobInstance[] {
  const items: JobInstance[] = [];
  for (let i = 0; i < num; i++) {
    items.push({
      name: 'jobInstance-' + getRandomString(50),
      status: JobStatus[random(0, 5)],
      total: random(1, 10),
      startTime: getRandomDateTime('2023-1-1', '2023-12-31'),
      lastUpdateTime: getRandomDateTime('2023-1-1', '2023-12-31'),
      params: new Map<string, string>([]),
      endMsgList: [],
      position: random(1, 1000000),
      idleMin: random(1, 300),
    });
  }
  return items;
}

function getJobInstances(req: Request, res: Response) {
  let items = jobInstances.slice();
  res.send({
    success: true,
    data: items,
  });
}

////////////////////////////////////////////////////////

const topics = genTopics(1685);
const jobInstances = genJobInstances(4823);

export default {
  'GET /api/dashboard/kafka-state': getKafkaState,
  'GET /api/dashboard/big-topics': getTopics,
  'GET /api/dashboard/lag': getLag,
  'GET /api/dashboard/failed-jobs': getJobInstances,
  'GET /api/dashboard/idle-jobs': getJobInstances,

  'GET /api/kafka/topics': getTopics,
};
