/**
 * 格式化展示json，包含一个带title的Divider和ReactJson组件
 * 后期可以提供编辑能力
 */
import { Divider, InputNumber, Space, Typography } from 'antd';
import { useState } from 'react';
import ReactJson from 'react-json-view';

const JsonViewer = ({ title = '执行结果', jsonObj }: { title?: string; jsonObj: Object }) => {
  const [collapse, setCollapse] = useState<number>(2);

  return (
    <>
      <Divider orientation="left" orientationMargin={0}>
        <Space direction="horizontal">
          {/* 把这些东西放在Space里面，以便对齐 */}
          {title}
          <Divider type="vertical" />
          <InputNumber
            addonBefore="展开级别"
            min={0}
            defaultValue={2}
            controls={true}
            onChange={(value) => {
              setCollapse(value ?? 0);
            }}
            style={{ width: 150 }}
          />
        </Space>
      </Divider>
      <ReactJson
        style={{ lineHeight: 1.0, fontFamily: 'Consolas' }}
        src={jsonObj}
        theme="monokai"
        iconStyle="square"
        name={false}
        enableClipboard={false}
        indentWidth={2}
        collapsed={collapse}
        displayDataTypes={false}
      />
    </>
  );
};

export default JsonViewer;
