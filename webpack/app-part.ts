import * as path from 'path';
import {Configuration} from 'webpack';

/**
 * Настройки приложения, не зависящие от режима сборки dev/prod.
 */
export const appPart = (_mode: 'none' | 'development' | 'production'): Configuration => {
    return {
        /**
         * entry указывает, какой модуль webpack следует использовать, чтобы начать построение своего внутреннего графика зависимостей.
         * https://webpack.js.org/concepts/#entry
         */
        entry: path.posix.resolve('src/index.tsx'),
        /**
         * Свойство output содержит набор параметров, указывающих webpack, как и где он должен выводить пакеты, ресурсы
         * и все остальное, что связывается или загружается с помощью webpack.
         */
        output: {
            /** Путь, где куда создается бандл. */
            path: path.posix.resolve('out'),
            /**
             * Параметр, определяющий имя и путь каждого выходного пакета (в нашем случае он один).
             * Для одного entry-point'a имя может быть статичным.
             * https://webpack.js.org/configuration/output/#outputfilename
             */
            filename: 'static/js/bundle.js',
            /**
             * Очищает out-папку перед созданием бандла.
             * https://webpack.js.org/configuration/output/#outputclean
             */
            clean: true,
        },
        /**
         * Эти опции изменяют способ разрешения модулей (читай файлов и папок).
         */
        resolve: {
            /**
             * Webpack попытается разрешить расширения в указанном порядке. Если несколько файлов имеют одно и то же имя,
             * но разные расширения webpack разрешит тот, у которого расширение стоит левее в массиве, а остальные пропустит.
             * Именно это позволяет разработчикам отключать расширения при импорте.
             *
             * Почему сначала резолвим ts и tsx: https://github.com/webpack/webpack/issues/2404
             *
             * https://webpack.js.org/configuration/resolve/#resolveextensions
             */
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            /**
             * Указывает webpack'у, в каких директориях следует искать при разрешении модулей.
             *
             * Благодаря этой настройке мы можем писать:
             * import someFn from 'lodash' (потому что он находится в node_modules) и
             * import {Component} from 'Modules/SomeModule/Component (потому что он находится в src)
             *
             * https://webpack.js.org/configuration/resolve/#resolvemodules
             */
            modules: ['node_modules', 'src'],
        },
    };
};
