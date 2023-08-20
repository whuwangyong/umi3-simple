import { Request, Response } from 'express';
// mock里面要写import from ... './data.d'，否则报错Cannot find module './data' from 'D:/projects/umi3-simple/src/pages/Dashboard'
// 其他模块里面写from './data' 就行。antd pro 的demo里面也是如此
import { BigTopic, ConsumeOffset, JobInstance } from './data.d';
import { random } from 'lodash';
import { getRandomString, getRandomDateTime } from '../../utils/MyUtils';
// mock 里面不能写'@/utils/MyUtils'，要写相对路径

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

function getBigTopics(req: Request, res: Response) {
  const items: BigTopic[] = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      id: i + 1,
      name: 'topic-' + getRandomString(30),
      partitions: random(1, 10),
      totalOffsets: random(1, 10000),
    });
  }
  res.send({
    success: true,
    data: items,
  });
}

function getLag(req: Request, res: Response) {
  const items: ConsumeOffset[] = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      id: i + 1,
      groupName: 'group-' + getRandomString(20),
      lag: random(1, 1000000),
    });
  }
  res.send({
    success: true,
    data: items,
  });
}

function getFailedJobs(req: Request, res: Response) {
  const items: JobInstance[] = [];
  for (let i = 0; i < 2000; i++) {
    items.push({
      id: i + 1,
      name: 'jobInstance-' + getRandomString(50),
      status: 'FAILED',
      startTime: getRandomDateTime('2023-1-1', '2023-12-31'),
      lastUpdateTime: getRandomDateTime('2023-1-1', '2023-12-31'),
      position: random(1, 1000000),
      idleMin: random(1, 300),
    });
  }
  res.send({
    success: true,
    data: items,
  });
}

export default {
  'GET /api/kafka/state': getKafkaState,
  'GET /api/kafka/bigTopics': getBigTopics,
  'GET /api/kafka/lag': getLag,
  'GET /api/job/failed': getFailedJobs,
  'GET /api/job/idle': getFailedJobs,
};
