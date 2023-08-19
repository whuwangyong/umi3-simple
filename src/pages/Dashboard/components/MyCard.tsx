import { Card, CardProps } from 'antd';

// 样式参考Statistic组件
const cardTitleStyle = {
  color: 'rgba(0, 0, 0, 0.45)',
  fontSize: '14px',
};

const cardBodyStyle = {
  fontSize: '20px',
  // fontWeight: 'bold',
  lineHeight: 1.0,
};

function MyCard(props: CardProps) {
  return (
    <Card
      {...props}
      headStyle={cardTitleStyle}
      bodyStyle={cardBodyStyle}
      bordered={false}
      style={{ marginBottom: 12 }}
      size="small" // 紧凑布局
    />
  );
}

export default MyCard;
