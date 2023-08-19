import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Tooltip, Card, Col, Row, Statistic, Result, Space, Badge, Divider } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import { getBigTopics, getFailedJob, getKafkaState, getLag } from './service';
import { Link, useRequest } from 'umi';
import MyCard from './components/MyCard';
import { BigTopicTable, ConsumeOffsetTable, FailedJobInstanceTable } from './components/MyTable';

const tableColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 12,
  style: { marginBottom: 0 },
};

const Dashboard: React.FC = () => {
  const { data: kafkaState, loading: kafkaStateLoading } = useRequest(() => {
    return getKafkaState();
  });
  const { data: bigTopics } = useRequest(() => {
    return getBigTopics();
  });
  const { data: lag } = useRequest(() => {
    return getLag();
  });
  const { data: failedJobs } = useRequest(() => {
    return getFailedJob();
  });

  return (
    <GridContent>
      <>
        <Row gutter={12}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <MyCard title="Kafka Broker Servers">
              {!kafkaStateLoading && kafkaState && (
                <Space
                  direction="horizontal"
                  split={<Divider type="vertical" />}
                  align="center"
                  size={'middle'}
                  wrap //自动换行
                >
                  {kafkaState.map((item) => (
                    <Badge
                      status={item.state === 'online' ? 'processing' : 'error'}
                      text={item.server}
                    />
                  ))}
                </Space>
              )}
            </MyCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={4}>
            <MyCard
              title="主题/分区"
              extra={
                <Tooltip placement="bottom" title="查看详情">
                  <Link to="/welcome">
                    <EllipsisOutlined />
                  </Link>
                </Tooltip>
              }
            >
              1630/5600
            </MyCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={4}>
            <MyCard
              title="消费者组"
              extra={
                <Tooltip placement="bottom" title="查看详情">
                  <Link to="/welcome">
                    <EllipsisOutlined />
                  </Link>
                </Tooltip>
              }
            >
              4816
            </MyCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={4}>
            <MyCard
              title="作业/实例"
              extra={
                <Tooltip placement="bottom" title="查看详情">
                  <Link to="/welcome">
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
          <Col {...tableColResponsiveProps}>
            <MyCard title="大主题 Top-10">
              <BigTopicTable dataSource={bigTopics} />
            </MyCard>
          </Col>
          <Col {...tableColResponsiveProps}>
            <MyCard title="消息堆积 Top-10">
              <ConsumeOffsetTable dataSource={lag} />
            </MyCard>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <MyCard title="失败的实例">
              <FailedJobInstanceTable dataSource={failedJobs} />
            </MyCard>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <MyCard title="闲置(idle)的实例">
              <FailedJobInstanceTable dataSource={failedJobs} />
            </MyCard>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Dashboard;
