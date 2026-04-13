import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const syntaxes = process.env.SYNTAXES
  ? process.env.SYNTAXES.split(',').map((item) => item.trim())
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
      'django',
    ]

const assetsPath = process.env.ASSETS_PATH ?? '/'
const apiProxyTarget = process.env.API_PROXY_TARGET || 'https://api.xsnippet.org'
const webBackendProxyTarget = process.env.WEB_BACKEND_PROXY_TARGET || 'https://xsnippet.org'

export default defineConfig(({ mode }) => ({
  base: assetsPath,

  plugins: [react()],

  define: {
    'process.env.API_BASE_URI': JSON.stringify(
      process.env.API_BASE_URI ?? (mode === 'development' ? '/_api' : null),
    ),
    'process.env.RAW_SNIPPET_URI_FORMAT': JSON.stringify(
      process.env.RAW_SNIPPET_URI_FORMAT ??
        (mode === 'development' ? '/_web-backend/snippets/%s/raw' : null),
    ),
    'process.env.RUNTIME_CONF_URI': JSON.stringify(`${assetsPath}conf.json`),
    'process.env.SYNTAXES': JSON.stringify(syntaxes),
  },

  // parse-link-header uses Node.js built-ins (querystring, url). Point them to
  // browser-compatible npm polyfills so they work in the browser bundle.
  resolve: {
    alias: {
      querystring: 'querystring-es3',
      url: 'url',
    },
  },

  server: {
    proxy: {
      '/_api': {
        target: apiProxyTarget,
        rewrite: (path) => path.replace(/^\/_api/, ''),
        changeOrigin: true,
      },
      '/_web-backend': {
        target: webBackendProxyTarget,
        rewrite: (path) => path.replace(/^\/_web-backend/, ''),
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('ace-builds') && id.includes('mode-')) {
            return 'syntaxes'
          }
          if (id.includes('node_modules')) {
            return 'vendors'
          }
        },
      },
    },
  },
}))
