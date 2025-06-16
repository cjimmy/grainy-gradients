module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: { ssr: false },
  },
  transpilePackages: ['antd', 'rc-util', '@ant-design/icons', 'rc-picker'],
};
