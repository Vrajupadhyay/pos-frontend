import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pos.app',
  appName: 'pos-app',
  webDir: 'build',
  "server": {
    "url": "https://pos-frontend-murex.vercel.app",
    "cleartext": true
  }
};

export default config;
