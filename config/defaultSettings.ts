import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark',
  // 拂晓蓝 #1890ff
  // 酱紫 #722ED1
  // 极客蓝 #2F54EB
  primaryColor: '#1890ff', //
  //
  layout: 'side',
  contentWidth: 'Fluid',
  headerRender: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Inspector',
  pwa: false,
  logo: '/Inspector-color.png',
  iconfontUrl: '',
};

export default Settings;
