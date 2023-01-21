import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	fullyParallel: true,
	webServer: {
		command: 'yarn build && yarn test:prepare',
		port: 4153
	},
	use: {
		headless: true
	},
	testDir: 'tests'
};

export default config;
