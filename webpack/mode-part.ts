import {Configuration, ContextReplacementPlugin} from 'webpack';
import * as CopyPlugin from 'copy-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/**
 * Часть настроек, зависящих от режима сборки.
 */
export const modePart = (mode: 'none' | 'development' | 'production'): Configuration => {
    const isDev = mode === 'development';

    const isSourceMaps = false;

    return {
        mode,
        /**
         * Сорс-мапы для дева максимально полные для удобной отладки.
         * https://webpack.js.org/configuration/devtool/#devtool
         */
        devtool: isSourceMaps ? 'source-map' : undefined,
        module: {
            /**
             * Массив Правил {@link https://webpack.js.org/configuration/module/#rule}, которые сопоставляются с запросами при создании модулей.
             * Эти правила могут изменять способ создания модуля. Они могут применять загрузчики к модулю или изменять синтаксический анализатор.
             * https://webpack.js.org/configuration/module/#modulerules
             */
            rules: [
                {
                    test: /\.[tj]sx?$/,
                    use: [
                        {
                            /**
                             * thread-loader необходимо располагать перед другими загрузчиками.
                             * Все последующие загрузчики будут запущены в отдельных node.js процессах.
                             * Необходимо использовать только для "тяжелых" loader'ов.
                             * https://webpack.js.org/loaders/thread-loader/#getting-started
                             */
                            loader: 'thread-loader',
                            options: {
                                /** Дополнительные параметры для node.js */
                                workerNodeArgs: ['--max-old-space-size=4096'],
                                /**
                                 * Наименование потока.
                                 * Может использоваться для создания различных потоков с другими идентичными опциями.
                                 */
                                name: 'typescript-work-pool',
                                /**
                                 * Тайм-аут для завершения рабочих процессов в режиме ожидания. По умолчанию 500.
                                 * Так как мы используем thread-loader в watch-режиме, poolTimeout должен быть Infinity, чтобы процессы не убивались.
                                 * https://github.com/TypeStrong/ts-loader#happypackmode
                                 */
                                poolTimeout: isDev ? Infinity : 500,
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                /**
                                 * loaderContext._module недоступно в отдельном потоке, хоть у нас и не happyPack,
                                 * но ситуация с thread-loader не изменилась, свойство все еще нужно.
                                 * https://github.com/TypeStrong/ts-loader#happypackmode
                                 */
                                happyPackMode: true,
                                compilerOptions: {
                                    /**
                                     * Для удобного дебага ts-файлов этот параметр необходимо включить.
                                     * https://github.com/TypeStrong/ts-loader#devtool--sourcemaps
                                     */
                                    sourceMap: isSourceMaps,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        /**
                         * Вообще дока рекомендует в dev-сборке использовать style-loader, но для
                         * идентичности с prod-сборкой используем MiniCssExtractPlugin.loader.
                         * https://webpack.js.org/plugins/mini-css-extract-plugin/#recommended
                         */
                        MiniCssExtractPlugin.loader,
                        {
                            /**
                             * Загрузчик css-loader интерпретирует @import и url() как import/require() и разрешает их.
                             * И еще прочие плюшки.
                             * https://github.com/webpack-contrib/css-loader
                             */
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    /**
                                     * Конфигурируем нейминг css-классов, добавляя хэш для исключения пересечения нейминга.
                                     * https://github.com/webpack-contrib/css-loader#localidentname
                                     */
                                    localIdentName: '[local]__[hash:base64:5]',
                                },
                            },
                        },
                        /**
                         * Компилирует Less в CSS. Source map-ы включены для dev-режима.
                         * https://github.com/webpack-contrib/less-loader
                         */
                        'less-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    /**
                     * Здесь нельзя добавлять [hash] для классов, ибо под это правило попадут
                     * и стили из сторонних либ, например, antd, и они не применятся.
                     */
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    /**
                     * Просто кладем все картинки в папку статики.
                     * https://webpack.js.org/guides/asset-management/#global-assets
                     */
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/[name][ext]',
                    },
                },
                {
                    /**
                     * Просто кладем все доки в папку статики.
                     * https://webpack.js.org/guides/asset-management/#global-assets
                     */
                    test: /\.(pdf|txt|docx?)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/[name][ext]',
                    },
                },
            ],
        },
        optimization: {
            minimize: !isDev,
            minimizer: [new TerserPlugin()],
            splitChunks: {
                automaticNameDelimiter: '-',
            },
        },
        plugins: [
            /**
             * Это плагин для webpack, который упрощает создание HTML-файлов для обслуживания bundle-ов.
             * https://github.com/jantimon/html-webpack-plugin
             */
            new HTMLWebpackPlugin({
                /**
                 * Путь-префикс, по которому грузятся теги script и link.
                 *
                 * Эта опция нам необходима, чтобы даже находясь, например, по роуту: http:example.com/ics/some-route,
                 * js и css грузились по этому урлу:
                 *      http://example.com/static/js/bundle.js.
                 * Если опция будет дефолтная, то js и css попытаются загрузиться по урлу:
                 *      http://example.com/ics/some-route/static/js/bundle.js
                 */
                publicPath: '/',
                /** Относительный или абсолютный путь к шаблону. */
                template: 'assets/frontend/index.html',
                /** Добавляет иконку в итоговый HTML. */
                favicon: 'assets/frontend/favicon.ico',
            }),
            /**
             * Этот плагин извлекает CSS в отдельные файлы. Он создает файл CSS для каждого файла JS (у нас только 1 bundle.js),
             * который содержит CSS. Поддерживает загрузку CSS и source map по необходимости.
             */
            new MiniCssExtractPlugin({
                /**
                 * Этот параметр определяет имя каждого выходного файла CSS, по умолчанию [name].css.
                 * https://webpack.js.org/plugins/mini-css-extract-plugin/#filename
                 *
                 * [contenthash] добавляем для долгосрочного кеширования:
                 * https://webpack.js.org/plugins/mini-css-extract-plugin/#long-term-caching
                 */
                filename: 'static/css/[name]_[contenthash].css',
            }),
            /**
             * Плагин для Webpack, который запускает проверку типов TypeScript в отдельном процессе.
             * https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
             */
            new ForkTsCheckerWebpackPlugin({
                /**
                 * Опции необходимые для работы с thread-loader.
                 * https://github.com/TypeStrong/ts-loader#happypackmode
                 */
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                },
            }),
            /**
             * Плагин, копирующий файлы.
             */

            ...(isDev ?
                [new CopyPlugin({
                /** Для dev-сборки подтягиваем файлы моков (аватарки и т.д.). */
                    patterns: [{
                        from: 'api_mock/mockFiles',
                        to: 'static/mockFiles'
                    }],
                })] 
                :
                []),
            /** Оставляем только русскую локаль в moment.js. */
            new ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
        ],
    };
};
