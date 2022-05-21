import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  webServer: {
    command: "npm start",
    port: 3000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:3000/",
    browserName: "chromium",
  },
  globalSetup: "./globalSetup.ts",
  globalTeardown: "./globalTeardown.ts",
};

export default config;
