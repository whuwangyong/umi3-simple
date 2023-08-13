import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Button, Card, Col, Row, Statistic, Result, Space, Badge } from 'antd';

const Dashboard: React.FC = () => {
  return (
    <GridContent>
      <>
        <Row gutter={8}>
          <Col span={6}>
            <Card title="Kafka集群状态" bordered={false}>
              <Space direction="vertical">
                <Badge status="error" text="Error" />
                <Badge status="processing" text="Processing" />
              </Space>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="主题数量" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="消费者组数量" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="作业实例数量" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Dashboard;
