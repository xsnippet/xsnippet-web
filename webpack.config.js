const path = require('path')
const process = require('process')

const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_env, argv = {}) => {
  const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const syntaxes = process.env.SYNTAXES
    ? process.env.SYNTAXES.split(',').map(item => item.trim())
    : [
        'text',
        'c_cpp',
        'csharp',
        'golang',
        'java',
        'javascript',
        'php',
        'perl',
        'python',
        'ruby',
        'rust',
        'css',
        'html',
        'objectivec',
        'swift',
        'clojure',
        'lisp',
        'haskell',
        'scala',
        'scheme',
        'actionscript',
        'ada',
        'apache_conf',
        'asciidoc',
        'assembly_x86',
        'batchfile',
        'cobol',
        'coffee',
        'd',
        'dart',
        'diff',
        'dockerfile',
        'dot',
        'ejs',
        'elixir',
        'elm',
        'erlang',
        'fortran',
        'gitignore',
        'glsl',
        'gobstones',
        'graphqlschema',
        'groovy',
        'haml',
        'handlebars',
        'haxe',
        'hjson',
        'ini',
        'jade',
        'json',
        'jsp',
        'jsx',
        'julia',
        'kotlin',
        'latex',
        'less',
        'livescript',
        'lua',
        'makefile',
        'markdown',
        'matlab',
        'mel',
        'mysql',
        'nix',
        'nsis',
        'ocaml',
        'pascal',
        'pgsql',
        'powershell',
        'prolog',
        'protobuf',
        'r',
        'rdoc',
        'rst',
        'sass',
        'scad',
        'scss',
        'sh',
        'sjs',
        'smarty',
        'sql',
        'stylus',
        'svg',
        'tcl',
        'tex',
        'textile',
        'toml',
        'tsx',
        'twig',
        'typescript',
        'vala',
        'vbscript',
        'verilog',
        'vhdl',
        'xml',
        'yaml',
        'django']
  const assetsPath = process.env.ASSETS_PATH == null
    ? '/'
    : process.env.ASSETS_PATH
  const isDevelopment = argv.mode === 'development'
  const apiProxyTarget = process.env.API_PROXY_TARGET || 'https://api.xsnippet.org'
  const webBackendProxyTarget = process.env.WEB_BACKEND_PROXY_TARGET || 'https://xsnippet.org'

  const conf = {
    // Assume we are targeting production environments by default; the value
    // could be overridden via '--mode' CLI argument.
    mode: 'production',

    // Use fast source maps for development and full source maps for production.
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',

    cache: {
      type: 'filesystem',
    },

    target: 'web',

    devServer: {
      historyApiFallback: true,
      proxy: [
        {
          context: ['/_api'],
          target: apiProxyTarget,
          pathRewrite: { '^/_api': '' },
          changeOrigin: true,
        },
        {
          context: ['/_web-backend'],
          target: webBackendProxyTarget,
          pathRewrite: { '^/_web-backend': '' },
          changeOrigin: true,
        },
      ],
    },

    entry: {
      app: path.resolve(__dirname, 'src', 'index.tsx'),
    },

    // Use [chunkhash] in order to invalidate browsers cache on new deployments.
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: assetsPath,
      clean: true,
      assetModuleFilename: '[hash][ext][query]',
    },

    module: {
      rules: [
        // Transpile ES2015+ and ts to ES5.
        {
          test: /\.(t|j)sx?$/,
          include: path.resolve(__dirname, 'src'),
          use: ['babel-loader'],
        },

        // Transpile Stylus down to CSS, resolving url() inside and enabling
        // CSS modules, so CSS classes can't be accessed within JSX sources.
        {
          test: /\.(styl|css)$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                modules: false,

                // Enable source maps if they are specified in devtool
                // option. God-Knows-Why css-loader doesn't check devtool
                // value in order to initialize its sourceMap value, hence
                // this line.
                sourceMap: true,
              },
            },
            { loader: 'stylus-loader' },
          ],
        },

        // Just copy these files to output "As Is", if they are imported from
        // JSX sources or encountered inside CSS.
        {
          test: /\.(woff2?|ttf|eot)$/,
          include: path.resolve(__dirname, 'src'),
          type: 'asset/resource',
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          include: path.resolve(__dirname, 'src'),
          type: 'asset/resource',
        },
      ],
    },

    optimization: {
      // Enable split chunks logic for everything, including entry chunks,
      // because we want vendors to be separated in either case. The key idea
      // here is that vendors are rarely changed; therefore, they are good
      // candidates to be cached on clients.
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10,
          },

          // AceEditor's modes (aka syntaxes) are pretty heavy, and since they
          // are not essential, we better download them asynchronously when
          // the app is loaded. First step to accomplish this goal is to
          // create a separate bundle by defining a new cache group.
          syntaxes: {
            test: /[\\/]ace-builds[\\/]src-noconflict[\\/]mode-/,
            name: 'syntaxes',
            priority: -5,
          },
        },
      },
    },

    plugins: [
      // Some browser dependencies still reference `process`.
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
      }),

      // Worker is a sort of background linter integrated in AceEditor that
      // can show errors for some syntaxes (e.g. JavaScript or XML). It's
      // pretty heavy (~1Mb) and we have no plans to use it, so we just
      // aggressively strip this code out of build.
      new webpack.IgnorePlugin({
        resourceRegExp: /worker-/,
        contextRegExp: /ace-builds[\\/]src-noconflict/,
      }),

      // Restrict Ace mode dynamic import context to configured syntaxes only.
      new webpack.ContextReplacementPlugin(
        /ace-builds[\\/]src-noconflict$/,
        new RegExp(`^\\.\\/mode-(${syntaxes.map(escapeRegExp).join('|')})(?:\\.js)?$`),
      ),

      // Propagate (and set) environment variables down to the application. We
      // use them to configure application behaviour. Please note, 'null' here
      // means 'unset'.
      new webpack.EnvironmentPlugin({
        API_BASE_URI: isDevelopment ? '/_api' : null,
        RAW_SNIPPET_URI_FORMAT: isDevelopment ? '/_web-backend/snippets/%s/raw' : null,
        RUNTIME_CONF_URI: `${assetsPath}conf.json`,
        SYNTAXES: syntaxes,
      }),

      // Similar to JavaScript, we use [chunkhash] in order to invalidate
      // browsers cache on new deployments.
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),

      // Generate index.html based on passed template, populating it with
      // produced JavaScript bundles.
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        favicon: path.resolve(__dirname, 'src', 'assets', 'icons', 'favicon.ico'),
      }),
    ],

    // Enable importing .js & .jsx & .ts & .tsx files without specifying their extensions.
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  }

  return conf
}
