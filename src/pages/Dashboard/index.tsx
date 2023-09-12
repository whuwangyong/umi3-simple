import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Tooltip, Col, Row, Space, Badge, Divider } from 'antd';
import { EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { getBigTopics, getFailedJob, getKafkaState, getLag } from './service';
import { Link, useRequest } from 'umi';
import MyCard from './components/MyCard';
import {
  BigTopicTable,
  ConsumeOffsetTable,
  FailedJobInstanceTable,
  IdleJobInstanceTable,
} from './components/MyTable';

const leftTableColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 10,
  style: { marginBottom: 0 },
};
const rightTableColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 14,
  style: { marginBottom: 0 },
};

const Dashboard: React.FC = () => {
  const { data: kafkaState, loading: kafkaStateLoading } = useRequest(() => {
    return getKafkaState();
  });
  const { data: bigTopics, loading: bigTopicsLoading } = useRequest(() => {
    return getBigTopics();
  });
  const { data: lag, loading: lagLoading } = useRequest(() => {
    return getLag();
  });
  const { data: failedJobs, loading: failedJobsLoading } = useRequest(() => {
    return getFailedJob();
  });
  const { data: idleJobs, loading: idleJobsLoading } = useRequest(() => {
    return getFailedJob();
  });

  return (
    <GridContent>
      <>
        <Row gutter={12}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <MyCard title="Kafka Broker Servers">
              {!kafkaStateLoading && kafkaState && (
                <Space
                  direction="horizontal"
                  split={<Divider type="vertical" />}
                  align="center"
                  size={'middle'}
                  wrap //自动换行
                >
                  {kafkaState.map((item: { id: number; server: string; state: string }) => (
                    <Badge
                      key={item.id}
                      status={item.state === 'online' ? 'processing' : 'error'}
                      text={item.server}
                    />
                  ))}
                </Space>
              )}
            </MyCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4}>
            <MyCard
              title="主题/分区"
              extra={
                <Tooltip placement="left" title="查看详情">
                  <Link to="/kafka/topic">
                    <EllipsisOutlined />
                  </Link>
                </Tooltip>
              }
            >
              1630/5600
            </MyCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4}>
            <MyCard
              title="消费者组"
              extra={
                <Tooltip placement="left" title="查看详情">
                  <Link to="/kafka/consumer-group">
                    <EllipsisOutlined />
                  </Link>
                </Tooltip>
              }
            >
              4816
            </MyCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4}>
            <MyCard
              title="应用"
              extra={
                <Tooltip placement="left" title="数据来源zookeeper">
                  <InfoCircleOutlined />
                </Tooltip>
              }
            >
              450
            </MyCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4}>
            <MyCard
              title="作业/实例"
              extra={
                <Tooltip placement="left" title="查看详情">
                  <Link to="/job">
                    <EllipsisOutlined />
                  </Link>
                </Tooltip>
              }
            >
              1024/3223
            </MyCard>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...leftTableColResponsiveProps}>
            <MyCard title="大主题 Top-10">
              <BigTopicTable dataSource={bigTopics} loading={bigTopicsLoading} />
            </MyCard>
          </Col>
          <Col {...rightTableColResponsiveProps}>
            <MyCard title="失败的实例">
              <FailedJobInstanceTable dataSource={failedJobs} loading={failedJobsLoading} />
            </MyCard>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...leftTableColResponsiveProps}>
            <MyCard title="消息堆积 Top-10">
              <ConsumeOffsetTable dataSource={lag} loading={lagLoading} />
            </MyCard>
          </Col>
          <Col {...rightTableColResponsiveProps}>
            <MyCard
              title={
                <div>
                  闲置(idle)的实例&nbsp;
                  <Tooltip
                    placement="top"
                    title="状态是RUNNING，但消费进度持续未更新。原因：1)等结束消息；2)服务调用等返回结果"
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                </div>
              }
            >
              <IdleJobInstanceTable dataSource={idleJobs} loading={idleJobsLoading} />
            </MyCard>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Dashboard;
