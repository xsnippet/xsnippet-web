const path = require('path');
const process = require('process');

const webpack = require('webpack');
const merge = require('webpack-merge');
const glob = require('glob');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = () => {
  // Use NODE_ENV environment variable to guess desired built type. Assume
  // production if nothing is passed.
  const isProduction = (process.env.NODE_ENV || 'production') === 'production';
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
      'django'];

  let conf = {
    // Expose source map even for production because XSnippet is an Open Source
    // project and we have no intentions to hide its internals while being able
    // to debug production is pretty valuable.
    devtool: 'source-map',

    devServer: {
      historyApiFallback: true,
    },

    entry: {
      app: [
        path.resolve(__dirname, 'src', 'index.jsx'),

        // Bundle AceEditor's syntaxes along with main application. There are
        // around 150 syntaxes and we, of course, do not want to import all of
        // them from within the application, hence this hack.
        ...glob.sync(path.resolve(
          __dirname,
          'node_modules',
          'brace',
          'mode',
          `@(${syntaxes.join('|')}).js`,
        )),
      ],
    },

    // Use [chunkhash] in order to invalidate browsers cache on new deployments.
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: process.env.ASSET_PATH || '/',
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
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                  minimize: isProduction,

                  // Enable source maps if they are specified in devtool
                  // option. God-Knows-Why css-loader doesn't check devtool
                  // value in order to initialize its sourceMap value, hence
                  // this line.
                  sourceMap: true,
                },
              },
              { loader: 'stylus-loader' },
            ],
          }),
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
    plugins: [
      // Each time we change something, a new version of bundled assets is
      // produced. Since we use hash in filenames in order to invalidate cache
      // on change, we end up having multiple outdated copies in output
      // directory. Let's cleanup it before produce a fresh build.
      new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),

      // Many libraries will key off the process.env.NODE_ENV variable to
      // determine what should be included in the library. For example, when
      // not in production some libraries may add additional logging and
      // testing to make debugging easier. We do not know which default they
      // use, so let's set 'production' explicitly and let user to override
      // this value.
      new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),

      // Generate index.html based on passed template, populating it with
      // produced JavaScript bundles.
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        favicon: path.resolve(__dirname, 'src', 'assets', 'favicon.ico'),
      }),

      // Extract third party libraries into 'vendors' bundle. Unfortunately
      // this splitting can't help us to preserve the same hash for vendors if
      // only application sources are changed due to number of reasons. There
      // are some solution but they don't work foo all cases. So let's do not
      // even try to do so.
      //
      // Further readings:
      //
      //  * https://github.com/webpack/webpack/issues/1315
      //  * https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        minChunks: ({ resource }) => /node_modules/.test(resource),
      }),

      // The loaders pipeline for stylesheets end up with in-memory CSS, so all
      // we need is to persist it on disk. We truncate [contenthash] down to 20
      // characters in order to be consistend with [chunkhash] used for
      // JavaScript bundles.
      new ExtractTextPlugin('[name].[contenthash:20].css'),
    ],

    // Enable importing .js & .jsx files without specifying their extensions.
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };

  if (isProduction) {
    conf = merge(conf, {
      plugins: [
        // Worker is a sort of background linter integrated in AceEditor that
        // can show errors for some syntaxes (e.g. JavaScript or XML). It's
        // pretty heavy (~1Mb) and we have no plans to use it, so we just
        // aggressively strip this code out of build.
        new webpack.IgnorePlugin(/worker/, /brace/),

        // Enable source maps if they are specified in devtool option. By some
        // funny reason UglifyJSPlugin does not check devtool option and won't
        // produce them unless its sourceMap option set to true.
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
      ],
    });
  }

  return conf;
};
