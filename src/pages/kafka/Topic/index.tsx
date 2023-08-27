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
import { PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Topic, Partition, TopicTablePagination, NewTopic } from '../data';
import { getTopics } from './service';
import PocContent from './components/PocContent';
import IndexContent from './components/IndexContent';

const handleAdd = async (fields: NewTopic) => {
  console.log('add topic:', fields.name);
  const hide = message.loading('正在添加');

  try {
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const columns: ProColumns<Topic>[] = [
  {
    title: '主题名称',
    dataIndex: 'name',
    // defaultSortOrder: 'ascend',
    sorter: (a, b) => a.name.localeCompare(b.name),
    filterSearch: true,
    onFilter: (value, record) =>
      record.name.toLocaleLowerCase().includes(value.toString().toLowerCase()),
  },
  {
    title: '分区数',
    dataIndex: 'partitions',
    renderText: (partitions: Partition[]) => partitions.length,
    search: false,
  },
  {
    title: '总偏移量',
    dataIndex: 'totalOffset',
    search: false,
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.totalOffset - b.totalOffset,
  },
  {
    title: '索引状态',
    dataIndex: 'indexStatus',
    valueEnum: {
      none: {
        text: '无',
        status: 'Default',
      },
      ok: {
        text: '运行中',
        status: 'Processing',
      },
      error: {
        text: '异常',
        status: 'Error',
      },
    },
    search: false,
    filters: true, // 自动使用 valueEnum 生成
    onFilter: true, // true，使用ProTable自带的筛选
  },
];

const App: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 左边栏
  const [createTopicModalVisible, handleModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Topic>();
  const [selectedRowsState, setSelectedRows] = useState<Topic[]>([]);

  // 右边栏

  return (
    <GridContent>
      <Row gutter={12}>
        <Col xs={24} sm={24} md={24} lg={24} xl={10} style={{ marginBottom: 12 }}>
          <ProTable<Topic>
            rowKey="name"
            columns={columns}
            search={{
              labelWidth: 80,
            }}
            request={getTopics}
            pagination={{ defaultPageSize: 20, pageSizeOptions: [10, 20, 50, 100] }}
            options={{
              density: false,
              setting: {
                draggable: false,
              },
            }}
            revalidateOnFocus={false} // 默认true，切换tab后会自动刷新 https://github.com/ant-design/pro-components/issues/5168
            form={{ syncToUrl: true, syncToInitialValues: false }}
            toolBarRender={() => [
              <Tooltip title="新建">
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    handleModalVisible(true);
                  }}
                />
              </Tooltip>,
              <Tooltip title="上传json文件以批量创建">
                <Button
                  type="text"
                  icon={<UploadOutlined />}
                  onClick={() => {
                    console.log('current selected:', selectedRowsState);
                  }}
                />
              </Tooltip>,
              <Tooltip placement="top" title="删除所有">
                <Button type="text" danger={true} icon={<DeleteOutlined />} onClick={() => {}} />
              </Tooltip>,
            ]}
            rowSelection={{
              onChange: (_, selectedRows) => {
                setSelectedRows(selectedRows);
              },
            }}
            tableAlertOptionRender={({ onCleanSelected }) => (
              <Space size={'small'}>
                <Button
                  onClick={() => {
                    onCleanSelected();
                  }}
                >
                  取消选择
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    onCleanSelected();
                  }}
                >
                  创建索引
                </Button>
                <Button
                  danger={true}
                  onClick={() => {
                    onCleanSelected();
                  }}
                >
                  删除索引
                </Button>
                <Button
                  danger={true}
                  onClick={() => {
                    onCleanSelected();
                  }}
                >
                  删除主题
                </Button>
              </Space>
            )}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  setCurrentRow(record);
                }, // 点击行，行首的多选框是不算的哦，符合逻辑，antd真叼
              };
            }}
          />

          <ModalForm
            title="新建主题"
            width="400px"
            visible={createTopicModalVisible}
            onVisibleChange={handleModalVisible}
            onFinish={async (value) => {
              const success = await handleAdd(value as NewTopic);
              if (success) {
                handleModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            modalProps={{ bodyStyle: { marginBottom: 0 } }}
          >
            <Space direction="vertical">
              <ProFormText
                label="主题名称"
                rules={[
                  {
                    required: true,
                    message: '名称为必填项',
                  },
                ]}
                width="md"
                name="name"
                fieldProps={{ style: { marginBottom: 0 } }}
              />
              <ProFormDigit
                label="分区数"
                name="partitions"
                fieldProps={{ precision: 0, defaultValue: 1, min: 1 }}
              />
              <ProFormDigit
                label="副本数"
                name="replicas"
                fieldProps={{ precision: 0, defaultValue: 1, min: 1 }}
              />
            </Space>
          </ModalForm>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={14}>
          <ProCard
            title={'消息查询' + (currentRow ? ' - ' + currentRow?.name : '')}
            tabs={{
              type: 'line',
              tabBarStyle: { paddingLeft: 8 },
              items: [
                {
                  key: 'poc',
                  label: <Tooltip title="Partition, Offset, Count">POC三元组查询</Tooltip>,
                  children: (
                    <PocContent
                      topic={currentRow?.name}
                      partitions={currentRow?.partitions.length || 1}
                    />
                  ),
                },
                {
                  key: 'index',
                  label: '索引查询',
                  children: <IndexContent />,
                },
              ],
            }}
          />
        </Col>
      </Row>
    </GridContent>
  );
};

export default App;
