/**
 * POC三元组查询标签页下的内容
 */
import React, { useState } from 'react';
import { Card, message } from 'antd';
import { ProForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import JsonViewer from '@/components/JsonViewer';
import { pocQuery } from '../service';

const PocContent: React.FC<{ topic: string | undefined; partitions: number }> = ({
  topic,
  partitions,
}) => {
  const [jsonObj, setJsonObj] = useState({});
  const initialValues = { topic: { topic }, partition: 0, offset: 0, count: 1 };

  const partitionValueEnum = new Map<number, string>();
  for (let p = 0; p < partitions; p++) {
    partitionValueEnum.set(p, '分区' + p);
  }
  partitionValueEnum.set(-1, '所有分区');
  if (topic) {
    const handleSubmit = async (params: any) => {
      const result = await pocQuery(params);
      if (result.success) {
        setJsonObj(result.data);
      } else {
        message.error(result.errorMessage);
        setJsonObj({ error: result.errorMessage });
      }
    };
    return (
      <Card bordered={false} bodyStyle={{}}>
        <ProForm
          layout="inline"
          // 修改提交按钮和重置按钮的顺序
          submitter={{ render: (props, dom) => [...dom] }}
          initialValues={initialValues}
          onFinish={async (values) => {
            values['topic'] = topic;
            await handleSubmit(values);
          }}
        >
          <ProFormSelect
            name="partition"
            label="分区"
            fieldProps={{
              style: {
                width: 100,
              },
              defaultValue: 0,
            }}
            valueEnum={partitionValueEnum}
          />
          <ProFormDigit
            name="offset"
            label="偏移量"
            fieldProps={{
              style: {
                width: 120,
              },
              defaultValue: 0,
            }}
          />
          <ProFormDigit
            name="count"
            label="数量"
            fieldProps={{
              style: {
                width: 120,
              },
              defaultValue: 1,
              min: 1,
            }}
          />
        </ProForm>

        <JsonViewer title="查询结果" jsonObj={jsonObj} maxHeight="1080px" />
      </Card>
    );
  } else {
    return (
      <Card bordered={false} bodyStyle={{}}>
        点击左边的topic来查询消息
      </Card>
    );
  }
};

export default PocContent;
