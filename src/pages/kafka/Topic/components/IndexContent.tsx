/**
 * 索引查页签下的内容
 */
import React, { useState } from 'react';
import { Card, message } from 'antd';
import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import JsonViewer from '@/components/JsonViewer';
import { indexQuery } from '../service';

const IndexContent: React.FC<{ topic: string | undefined; indices: string[] | undefined }> = ({
  topic,
  indices,
}) => {
  const [jsonObj, setJsonObj] = useState({});

  if (!topic) {
    return (
      <Card bordered={false} bodyStyle={{}}>
        点击左边的topic来查询消息
      </Card>
    );
  }

  if (!indices) {
    return (
      <Card bordered={false} bodyStyle={{}}>
        该主题尚未创建索引，请先在左边栏勾选主题并创建索引
      </Card>
    );
  }

  const indexValueEnum = new Map<number, string>();
  for (let i = 0; i < indices.length; i++) {
    indexValueEnum.set(i, indices[i]);
  }
  const handleSubmit = async (params: any) => {
    const result = await indexQuery(params);
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
        onFinish={async (values) => {
          await handleSubmit(values);
        }}
      >
        <ProFormSelect
          name="indexName"
          label="选择索引"
          fieldProps={{
            style: {
              width: 'auto',
            },
            defaultValue: 0,
          }}
          valueEnum={indexValueEnum}
        />
        <ProFormText
          name="indexValue"
          label="索引值"
          fieldProps={{
            style: {
              width: 'auto',
            },
          }}
        />
      </ProForm>

      <JsonViewer title="查询结果" jsonObj={jsonObj} maxHeight="1080px" />
    </Card>
  );
};

export default IndexContent;
