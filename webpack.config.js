// @ts-check

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const mode = process.env.NODE_ENV || 'development';

export default {
  mode,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // вставить CSS на страницу
            loader: 'style-loader',
          },
          {
            // переводит CSS в модули CommonJS
            loader: 'css-loader',
          },
          {
            // Выполнить действия postcss
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` требуется для postcss 8.x;
              // если Вы используете postcss 7.x пропустите ключ
              postcssOptions: {
                // плагины postcss, можно экспортировать в postcss.config.js
                plugins() {
                  return [require('autoprefixer')];
                },
              },
            },
          },
          {
            // компилирует Sass в CSS
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
