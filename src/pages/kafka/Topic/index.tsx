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
  Modal,
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
import { createIndex, createTopic, deleteTopic, getTopics } from './service';
import PocContent from './components/PocContent';
import IndexContent from './components/IndexContent';

const handleAdd = async (fields: NewTopic) => {
  const hide = message.loading('正在创建');
  try {
    hide();
    const result = await createTopic(fields);
    if (result.success) {
      message.success('创建成功');
    } else {
      message.error(result.errorMessage);
    }
    return true;
  } catch (error) {
    hide();
    message.error('创建失败请重试！' + error);
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
  const [createTopicModalVisible, setCreateTopicModalVisible] = useState<boolean>(false);
  const [deleteAllTopicModalVisible, setDeleteAllTopicModalVisible] = useState<boolean>(false);
  const [deleteTopicModalVisible, setDeleteTopicModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Topic>();
  const [selectedRows, setSelectedRows] = useState<Topic[]>([]);
  const createTopicModalInitialValues = { partitions: 1, replicas: 1 };

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
            pagination={{ defaultPageSize: 10, pageSizeOptions: [10, 20, 50, 100] }}
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
                    setCreateTopicModalVisible(true);
                  }}
                />
              </Tooltip>,
              <Tooltip title="上传json文件以批量创建">
                <Button
                  type="text"
                  icon={<UploadOutlined />}
                  onClick={() => {
                    console.log('current selected:', selectedRows);
                  }}
                  disabled={true}
                />
              </Tooltip>,
              <Tooltip placement="top" title="删除所有">
                <Button
                  type="text"
                  danger={true}
                  icon={<DeleteOutlined />}
                  onClick={() => setDeleteAllTopicModalVisible(true)}
                />
              </Tooltip>,
            ]}
            rowSelection={{
              onChange: (_, rows) => {
                setSelectedRows(rows);
              },
            }}
            tableAlertOptionRender={({ onCleanSelected, selectedRowKeys }) => (
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
                  onClick={async () => {
                    if (selectedRowKeys.length > 0) {
                      const res = await createIndex(selectedRowKeys as string[]);
                      if (res.success) {
                        message.success('任务已提交');
                        if (actionRef.current) {
                          actionRef.current.reload();
                        }
                      }
                    }
                  }}
                >
                  创建索引
                </Button>
                <Button
                  disabled={true}
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
                    if (selectedRowKeys.length > 0) {
                      setDeleteTopicModalVisible(true);
                    } else {
                      message.warning('未选中主题');
                    }
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
            actionRef={actionRef}
          />
          <Modal
            title="删除全部主题"
            open={deleteAllTopicModalVisible}
            onOk={async () => {
              await deleteTopic();
              setDeleteAllTopicModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
            onCancel={() => {
              setDeleteAllTopicModalVisible(false);
            }}
            okButtonProps={{ danger: true }}
          >
            <p>你确定？这是全部主题哦</p>
            <p>你确定？这是全部主题哦</p>
            <p>你确定？这是全部主题哦</p>
          </Modal>

          <Modal
            title="删除选中的主题"
            open={deleteTopicModalVisible}
            onOk={async () => {
              const topicNames: string[] = selectedRows.map((row) => row.name);
              await deleteTopic(topicNames);
              setDeleteTopicModalVisible(false);
              setSelectedRows([]);
              if (actionRef.current) {
                actionRef.current.reload();
                actionRef.current.clearSelected?.();
              }
            }}
            onCancel={() => {
              setDeleteTopicModalVisible(false);
            }}
            okButtonProps={{ danger: true }}
          >
            <p>你确定？</p>
          </Modal>

          <ModalForm
            title="新建主题"
            width="400px"
            initialValues={createTopicModalInitialValues}
            visible={createTopicModalVisible}
            onVisibleChange={setCreateTopicModalVisible}
            onFinish={async (value) => {
              const success = await handleAdd(value as NewTopic);
              if (success) {
                setCreateTopicModalVisible(false);
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
                  children: <IndexContent topic={currentRow?.name} indices={currentRow?.indices} />,
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
