import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.SHIVANI',
  appName: 'UserApp',
  webDir: 'www',
  bundledWebRuntime: false,
  "server": {
    androidScheme: "http",
    cleartext: true,
    "allowNavigation": [
      "http://fransalonapp-env-1.eba-mv3mavpj.ap-northeast-1.elasticbeanstalk.com",
      "http://demo0884554.mockable.io/hello",
      "http://demo0884554.mockable.io/data",
      " http://demo0884554.mockable.io/img"
    ]
  },
  "android": {
    "allowMixedContent": true
  }
};

export default config;
