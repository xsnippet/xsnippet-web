const path = require('path')
const process = require('process')

const webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => {
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

  const conf = {
    // Assume we are targeting production environments by default; the value
    // could be overridden via '--mode' CLI argument.
    mode: 'production',

    // Expose source map even for production because XSnippet is an Open Source
    // project and we have no intentions to hide its internals while being able
    // to debug production is pretty valuable.
    devtool: 'source-map',

    devServer: {
      historyApiFallback: true,
    },

    entry: {
      app: path.resolve(__dirname, 'src', 'index.jsx'),
    },

    // Use [chunkhash] in order to invalidate browsers cache on new deployments.
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: assetsPath,
    },

    module: {
      rules: [
        // Transpile ES2015+ down to ES5.
        {
          test: /\.jsx?$/,
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
                minimize: true,

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
          test: /\.(png|svg|jpg|woff|svg|ttf|woff2|eot)$/,
          include: path.resolve(__dirname, 'src'),
          use: ['file-loader'],
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
          // AceEditor's modes (aka syntaxes) are pretty heavy, and since they
          // are not essential, we better download them asynchronously when
          // the app is loaded. First step to accomplish this goal is to
          // create a separate bundle by defining a new cache group.
          syntaxes: {
            test: /[\\/]brace[\\/]mode[\\/]/,
            name: 'syntaxes',
            priority: -5,
          },
        },
      },
    },

    plugins: [
      // Worker is a sort of background linter integrated in AceEditor that
      // can show errors for some syntaxes (e.g. JavaScript or XML). It's
      // pretty heavy (~1Mb) and we have no plans to use it, so we just
      // aggressively strip this code out of build.
      new webpack.IgnorePlugin(/worker/, /brace/),

      // Webpack, when meets dynamic imports with variables, heuristically
      // figures out what needs to be bundle and bundles everything it can
      // reach to. In our case we have a clear understanding which syntaxes
      // we want to distribute within the application, so let's strip
      // everything else out.
      //
      // https://webpack.js.org/api/module-methods/#import-<Paste>
      new webpack.IgnorePlugin(
        new RegExp(`/(?!(?:${syntaxes.join('|')}).js$).*js$`),
        /brace[\\/]mode/
      ),

      // Each time we change something, a new version of bundled assets is
      // produced. Since we use hash in filenames in order to invalidate cache
      // on change, we end up having multiple outdated copies in output
      // directory. Let's cleanup it before produce a fresh build.
      new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),

      // Propagate (and set) environment variables down to the application. We
      // use them to configure application behaviour. Please note, 'null' here
      // means 'unset'.
      new webpack.EnvironmentPlugin({
        API_BASE_URI: null,
        RAW_SNIPPET_URI_FORMAT: null,
        RUNTIME_CONF_URI: `${assetsPath}conf.json`,
        SYNTAXES: syntaxes,
      }),

      // Similar to JavaScript, we use [chunkhash] in order to invalidate
      // browsers cache on new deployments.
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
      }),

      // Generate index.html based on passed template, populating it with
      // produced JavaScript bundles.
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        favicon: path.resolve(__dirname, 'src', 'assets', 'icons', 'favicon.ico'),
      }),
    ],

    // Enable importing .js & .jsx files without specifying their extensions.
    resolve: {
      extensions: ['.js', '.jsx'],
    },

    node: {
      net: 'empty',
    },
  }

  return conf
}
