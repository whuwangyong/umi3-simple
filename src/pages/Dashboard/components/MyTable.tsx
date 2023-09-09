import type { ColumnsType } from 'antd/lib/table';
import { Table, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { formatBigNumber } from '@/utils/MyUtils';
import { Partition, Topic, ConsumerGroup } from '@/pages/kafka/data';
import { JobInstance } from '@/pages/Job/data';
import { Link } from 'umi';

const bigTopicColumns: ColumnsType<Topic> = [
  {
    title: '主题名',
    dataIndex: 'name',
    render: (text: React.ReactNode) => <Link to={`/kafka/topic?name=${text}`}>{text}</Link>,
  },
  {
    title: '分区数',
    dataIndex: 'partitions',
    render: (partitions: Partition[]) => partitions.length,
  },
  {
    title: '总偏移量',
    dataIndex: 'totalOffset',
    render: (text) => formatBigNumber(text),
  },
];

const consumeOffsetColumns: ColumnsType<ConsumerGroup> = [
  {
    title: '消费者组名称',
    dataIndex: 'name',
    render: (text: React.ReactNode) => (
      <Link to={`/kafka/consumer-group?name=${text}`}>{text}</Link>
    ),
  },
  {
    title: (
      <div>
        Lag&nbsp;
        <Tooltip placement="top" title="lag = 最大偏移量 - 当前消费偏移量">
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'lag',
    render: (text) => formatBigNumber(text),
  },
];

const failedJobInstanceColumns: ColumnsType<JobInstance> = [
  {
    title: '实例名',
    dataIndex: 'name',
    render: (text: React.ReactNode) => <a href="#">{text}</a>,
  },
  {
    title: '消费进度',
    dataIndex: 'position',
    render: (text) => formatBigNumber(text),
  },
  {
    title: '启动时间',
    dataIndex: 'startTime',
    render: (text) => moment(text).format('MM-DD HH:mm:ss'),
  },
  {
    title: '结束时间',
    dataIndex: 'lastUpdateTime',
    render: (text) => moment(text).format('MM-DD HH:mm:ss'),
  },
];

const idleJobInstanceColumns: ColumnsType<JobInstance> = [
  {
    title: '实例名',
    dataIndex: 'name',
    render: (text: React.ReactNode) => <a href="#">{text}</a>,
  },
  {
    title: '消费进度',
    dataIndex: 'position',

    render: (text) => formatBigNumber(text),
  },
  {
    title: '启动时间',
    dataIndex: 'startTime',

    render: (text) => moment(text).format('MM-DD HH:mm:ss'),
  },
  {
    title: '上次更新时间',
    dataIndex: 'lastUpdateTime',

    render: (text) => moment(text).format('MM-DD HH:mm:ss'),
  },
  {
    title: '闲置分钟',
    dataIndex: 'idleMin',
  },
];

const MyTable = (props: any) => (
  <Table
    {...props}
    size="middle" // 紧凑布局 middle small
    pagination={{
      style: { marginBottom: 0 },
      pageSize: 5,
    }}
    // rowKey={(record, index) => index} // React需要的key
    rowKey={(record) => record.name} // React需要的key
  />
);

export const BigTopicTable = (props: any) => {
  return <MyTable {...props} columns={bigTopicColumns} />;
};

export const ConsumeOffsetTable = (props: any) => {
  return <MyTable {...props} columns={consumeOffsetColumns} />;
};

export const FailedJobInstanceTable = (props: any) => {
  return <MyTable {...props} columns={failedJobInstanceColumns} />;
};

export const IdleJobInstanceTable = (props: any) => {
  return <MyTable {...props} columns={idleJobInstanceColumns} />;
};
