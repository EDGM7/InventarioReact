const path = require('path');

module.exports = {
  // Configuración de entrada y salida
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // Configuración de módulos
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  // Configuración de resolución de módulos
  resolve: {
    extensions: ['.js']

  }
};