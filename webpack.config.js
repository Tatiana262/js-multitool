const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Точка входа
  output: {
    filename: 'bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'dist'), // Папка для скомпилированных файлов
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Обработка файлов с расширением .css
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(mp3|wav|ogg)$/, // Добавляем обработку аудиофайлов
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]', // Куда помещать файлы в dist
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон для HTML
    }),
  ],
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'), // Папка для обслуживания файлов
    },
    hot: true,
    port: 3000
  },
};