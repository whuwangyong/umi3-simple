import React, { useState, useRef } from 'react';
import { request } from 'umi';
import {
  Tooltip,
  Col,
  Row,
  Card,
  Pagination,
  Table,
  Button,
  Drawer,
  message,
  Space,
  Divider,
  Input,
} from 'antd';
import { GridContent, FooterToolbar } from '@ant-design/pro-layout';
import {
  ProForm,
  ProTable,
  PageContainer,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProColumns,
  ActionType,
  ProCard,
  ProFormSelect,
} from '@ant-design/pro-components';
import { ConsumerGroup } from '../data';
import { getConsumerGroups } from './service';

const columns: ProColumns<ConsumerGroup>[] = [
  {
    title: '消费者组名称',
    dataIndex: 'name',
  },
  {
    title: '消费的主题分区',
    dataIndex: 'topicPartition',
  },
  { title: '消费进度', dataIndex: 'offset', search: false, sorter: (a, b) => a.offset - b.offset },
  { title: 'lag', dataIndex: 'lag', search: false, sorter: (a, b) => a.lag - b.lag },
  { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime', search: false },
];

const App = () => {
  return (
    <GridContent>
      <ProTable<ConsumerGroup>
        rowKey="name"
        columns={columns}
        search={{
          labelWidth: 'auto',
        }}
        request={getConsumerGroups}
        pagination={{ defaultPageSize: 10, pageSizeOptions: [10, 20, 50, 100] }}
        options={false}
        revalidateOnFocus={false} // 默认true，切换tab后会自动刷新 https://github.com/ant-design/pro-components/issues/5168
        form={{ syncToUrl: true, syncToInitialValues: false }}
      />
    </GridContent>
  );
};

export default App;
