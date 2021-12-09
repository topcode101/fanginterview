/** @type {import('next').NextConfig} */
// const withSass = require("@zeit/next-sass");
// const withLess = require("@zeit/next-less");
// const withCSS = require("@zeit/next-css");
// const isProd = process.env.NODE_ENV === "production";

// // fix: prevents error when .less files are required by node
// if (typeof require !== "undefined") {
//   require.extensions[".less"] = (file) => {};
// }
module.exports = {
  reactStrictMode: true,
}
// module.exports = withCSS({
//   cssModules: true,
//   cssLoaderOptions: {
//     importLoaders: 1,
//     localIdentName: "[local]___[hash:base64:5]",
//   },
//   ...withLess(
//     withSass({
//       lessLoaderOptions: {
//         javascriptEnabled: true,
//       },
//     })
//   ),
// });
// module.exports = withAntdLess({
//   // optional
//   modifyVars: { '@primary-color': '#04f' },
//   // optional
//   lessVarsFilePath: './src/styles/variables.less',
//   // optional
//   lessVarsFilePathAppendToEndOfContent: false,
//   // optional https://github.com/webpack-contrib/css-loader#object
//   cssLoaderOptions: {},

//   // Other Config Here...

//   webpack(config) {
//     return config;
//   },

//   // ONLY for Next.js 10, if you use Next.js 11, delete this block
//   future: {
//     webpack5: true,
//   },
// })