import type { StorybookConfig } from '@storybook/vue3-vite'
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // TODO エラーが出るため一旦無効
    // https://github.com/hirotaka/storybook-addon-nuxt/issues/24
    // 'storybook-addon-nuxt'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}
export default config
