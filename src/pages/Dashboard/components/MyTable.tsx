import type { ColumnsType } from 'antd/lib/table';
import { Table, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { formatBigNumber } from '@/utils/MyUtils';

export interface BigTopicDataItem {
  index: number; // React需要的key
  name: string;
  partitions: number;
  totalOffsets: number;
}

const bigTopicColumns: ColumnsType<BigTopicDataItem> = [
  {
    title: '主题名',
    dataIndex: 'name',
    render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '分区数',
    dataIndex: 'partitions',
  },
  {
    title: '总偏移量',
    dataIndex: 'totalOffsets',
    render: (text) => formatBigNumber(text),
  },
];

export interface ConsumeOffsetDataItem {
  index: number;
  groupName: string;
  lag: number;
}

const consumeOffsetColumns: ColumnsType<ConsumeOffsetDataItem> = [
  {
    title: '消费者组名称',
    dataIndex: 'groupName',
    render: (text: React.ReactNode) => <a href="#">{text}</a>,
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

export interface JobInstanceDataItem {
  index: number;
  name: string;
  status: string;
  startTime: Date;
  lastUpdateTime: Date;
  position: number;
}

const failedJobInstanceColumns: ColumnsType<JobInstanceDataItem> = [
  {
    title: '实例名',
    dataIndex: 'name',
    render: (text: React.ReactNode) => <a href="#">{text}</a>,
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
  {
    title: '消费进度',
    dataIndex: 'position',
    render: (text) => formatBigNumber(text),
  },
];

// export const BigTopicTable = ({ dataSource }: { dataSource: BigTopicDataItem[] }) => {
//   return <Table columns={bigTopicColumns} dataSource={dataSource} />;
// };

const MyTable = (props: any) => (
  <Table
    {...props}
    size="small" // 紧凑布局 middle small
    pagination={{
      style: { marginBottom: 0 },
      pageSize: 5,
    }}
    rowKey={(record, index) => index} // React需要的key
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
