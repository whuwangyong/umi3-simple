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
  Typography,
  List,
  Descriptions,
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
import { InfoCircleOutlined } from '@ant-design/icons';
import { JobInstance } from './data';
import { diagnose, getJobInstance, sendIcc } from './service';
import MyCard from '../Dashboard/components/MyCard';
import { InspectorResponse } from '@/services/inspector/typings';
import TextArea from 'antd/lib/input/TextArea';

const handleIccCmd = async (data: { operation: string; jobInstances: string[] }) => {
  const hide = message.loading('正在发送 ' + data.operation + '指令');
  try {
    hide();
    const result = await sendIcc(data);
    if (result.success) {
      message.success(data.operation + ' 指令发送成功');
      console.log(result.data);
    } else {
      message.error(result.errorMessage);
    }
    return true;
  } catch (error) {
    hide();
    message.error('发送失败请重试！' + error);
    return false;
  }
};

const App = () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<JobInstance>();
  const [selectedRows, setSelectedRows] = useState<JobInstance[]>([]);
  const [showDiagnoseDrawer, setShowDiagnoseDrawer] = useState<boolean>(false);
  const [diagnoseLoading, setDiagnoseLoading] = useState<boolean>(true);
  const [diagnoseResult, setDiagnoseResult] = useState({});

  const columns: ProColumns<JobInstance>[] = [
    {
      title: '实例名',
      dataIndex: 'name',
    },
    {
      title: '命名空间',
      dataIndex: 'namespace',
      hideInTable: true,
      valueEnum: {
        NSSP: '现货',
        NSOP: '期权',
        NSHK: '港股通',
        NSHG: 'H股全流通',
        NSBH: 'B转H',
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        NONE: {
          text: 'NONE',
          status: 'default',
        },
        RUNNGING: {
          text: 'RUNNGING',
          status: 'processing',
        },
        FAILED: {
          text: 'FAILED',
          status: 'error',
        },
        COMPLETED: {
          text: 'COMPLETED',
          status: 'success',
        },
        STOPPED: {
          text: 'STOPPED',
          color: 'cyan',
        },
        PAUSED: {
          text: 'PAUSED',
          status: 'warning',
        },
      },
    },

    {
      title: 'IP',
      dataIndex: 'ip',
      search: false,
    },
    {
      title: '消费进度',
      dataIndex: 'position',
      search: false,
    },
    {
      title: '总实例数',
      dataIndex: 'total',
      search: false,
    },
    { title: '启动时间', dataIndex: 'startTime', valueType: 'dateTime', search: false },
    { title: '上次更新时间', dataIndex: 'lastUpdateTime', valueType: 'dateTime', search: false },
    {
      title: '闲置分钟',
      tooltip: {
        title: '状态是RUNNING，但消费进度持续未更新。原因：1)等结束消息；2)服务调用等返回结果',
        placement: 'bottom',
      },
      dataIndex: 'idleMin',
      sorter: (a, b) => a.idleMin - b.idleMin,
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(record);
              setShowDiagnoseDrawer(true);
            }}
          >
            诊断
          </a>
        );
      },
    },
  ];

  return (
    <GridContent>
      <ProTable<JobInstance>
        actionRef={actionRef}
        rowKey="name"
        columns={columns}
        search={{
          labelWidth: 'auto',
        }}
        request={getJobInstance}
        pagination={{ defaultPageSize: 10, pageSizeOptions: [10, 20, 50, 100] }}
        options={false}
        revalidateOnFocus={false} // 默认true，切换tab后会自动刷新 https://github.com/ant-design/pro-components/issues/5168
        form={{ syncToUrl: true, syncToInitialValues: false }}
        rowSelection={{
          onChange: (_, rows) => {
            setSelectedRows(rows);
          },
        }}
        tableAlertOptionRender={({ onCleanSelected, selectedRowKeys }) => (
          <Space>
            <Button
              type="link"
              onClick={() => {
                onCleanSelected();
              }}
            >
              取消选择
            </Button>
            <Button
              onClick={async () => {
                await handleIccCmd({
                  operation: 'START',
                  jobInstances: selectedRowKeys as [],
                });
              }}
            >
              START
            </Button>
            <Button
              onClick={async () => {
                await handleIccCmd({
                  operation: 'STOP',
                  jobInstances: selectedRowKeys as [],
                });
              }}
            >
              STOP
            </Button>
            <Button
              onClick={async () => {
                await handleIccCmd({
                  operation: 'RESTART',
                  jobInstances: selectedRowKeys as [],
                });
              }}
            >
              RESTART
            </Button>
            <Button
              onClick={async () => {
                await handleIccCmd({
                  operation: 'PAUSE',
                  jobInstances: selectedRowKeys as [],
                });
              }}
            >
              PAUSE
            </Button>
            <Button
              onClick={async () => {
                await handleIccCmd({
                  operation: 'RESUME',
                  jobInstances: selectedRowKeys as [],
                });
              }}
            >
              RESUME
            </Button>

            <Button
              onClick={async () => {
                await handleIccCmd({
                  operation: 'KILL',
                  jobInstances: selectedRowKeys as [],
                });
              }}
            >
              KILL
            </Button>
          </Space>
        )}
      />

      <Drawer
        title={currentRow?.name}
        closable={false}
        placement="left"
        drawerStyle={{ backgroundColor: 'rgb(42,44,44)' }}
        width={'70%'}
        open={showDiagnoseDrawer}
        onClose={() => {
          setShowDiagnoseDrawer(false);
          setDiagnoseResult({});
          setDiagnoseLoading(true);
        }}
        afterOpenChange={async (open) => {
          if (open) {
            const result: InspectorResponse = await diagnose({
              jobInstance: currentRow?.name as string,
            });
            setDiagnoseLoading(false);
            if (result.success) {
              setDiagnoseResult(result.data);
            } else {
              const params = result.data['params'];
              const progress = result.data['progress'];
              const end = result.data['end'];
              const memtable = result['memtable'];
              const log = result.data['log'];
              message.error(result.errorMessage);
            }
          }
        }}
      >
        <GridContent>
          <Row>
            <Col span={24}>
              <MyCard title="运行时参数" loading={diagnoseLoading}>
                <Descriptions column={1} size="small">
                  {diagnoseResult['params'] &&
                    Object.keys(diagnoseResult['params']).map((item, index) => {
                      return (
                        <Descriptions.Item label={item} key={index}>
                          {diagnoseResult['params'][item]}
                        </Descriptions.Item>
                      );
                    })}
                </Descriptions>
              </MyCard>
            </Col>
            <Col span={24}>
              <MyCard title="处理进度" loading={diagnoseLoading}>
                <Descriptions column={1} size="small">
                  {diagnoseResult['progress'] &&
                    Object.keys(diagnoseResult['progress']).map((item, index) => {
                      return (
                        <Descriptions.Item label={item} key={index}>
                          {diagnoseResult['progress'][item]}
                        </Descriptions.Item>
                      );
                    })}
                </Descriptions>
              </MyCard>
            </Col>
            <Col span={24}>
              <MyCard title="结束流" loading={diagnoseLoading}>
                tree node，递归找到最上游
              </MyCard>
            </Col>
            <Col span={24}>
              <MyCard title="内存表" loading={diagnoseLoading}></MyCard>
            </Col>
            <Col span={24}>
              <MyCard title="日志" loading={diagnoseLoading}>
                <TextArea
                  value={diagnoseResult['log']}
                  rows={20}
                  spellCheck={false}
                  style={{ whiteSpace: 'pre-wrap', resize: 'none' }}
                />
              </MyCard>
            </Col>
          </Row>
        </GridContent>
      </Drawer>
    </GridContent>
  );
};

export default App;
