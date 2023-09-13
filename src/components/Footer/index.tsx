import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = '蚂蚁集团体验技术部出品';
  const currentYear = new Date().getFullYear();
  return (
    <>
      {/* <p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.45)' }}>
        lala
      </p> */}
      <DefaultFooter
        copyright={`${currentYear} ${defaultMessage}`}
        links={[
          {
            key: 'lucky',
            title: '感恩小天使王宝拉，不哭不闹伴我编码',
            href: '#',
            blankTarget: false,
          },
        ]}
      />
    </>
  );
};
export default Footer;
