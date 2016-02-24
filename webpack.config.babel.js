import webpack from 'webpack';
import ToJSONPlugin from 'webpack-to-json-plugin';

const DEV_PORT = 8087;
const isProduction = process.env.NODE_ENV === 'production';
const devOrigin = `http://localhost:${DEV_PORT}/`;
const PublicPath = isProduction ? 'https://s3.amazonaws.com/webpack-app.com/' : devOrigin;

const plugins = [
  new webpack.NoErrorsPlugin(),
  new ToJSONPlugin({from: 'manifest.js', to: 'manifest.json'}),
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
  })
];

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  plugins.push(new webpack.optimize.DedupePlugin());
}

const config = {
  devtool: (isProduction ? null : 'cheap-module-source-map'),
  context: __dirname + '/app'
};

config.entry = {
  index: './index.js'
};

config.resolve = {
  alias: {
    app: __dirname + '/app'
  }
};

config.output = {
  filename: '[name].js',
  path: __dirname + '/dist',
  publicPath: PublicPath
};

config.module = {
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-1'],
      }
    }
  ]
};

config.plugins = plugins;

export default config;

