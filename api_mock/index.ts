import * as cookieParser from 'cookie-parser';
import {NextFunction, Request, Response} from 'express';
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const pause = require('connect-pause');
const path = require('path');
const PROXY_CONFIG = require('./proxyConfig');
const proxyTarget = PROXY_CONFIG.proxyTarget;

export const ACCESS_TOKEN_KEY = 'mock_auth_token';

app.use(express.static(path.resolve(__dirname, PROXY_CONFIG.bundleDirectory)));

app.use((param: any, res: any, next: NextFunction) => {
    // Необходимо для скачивания через прокси-сервер.
    if (param.url.startsWith('/media')) {
        return next();
    }
    // Проверка на то, что самый первый запрос может быть с любого роута для получения html файла
    if (param.method === 'GET' && param.headers['sec-fetch-dest'] === 'document') {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        res.sendFile(path.resolve(__dirname, PROXY_CONFIG.bundleDirectory) + '/index.html');
    }
    next();
});

// Добавляем небольшую задержку
app.use(pause(PROXY_CONFIG.delay));

if (PROXY_CONFIG.mockEnable) {
    // Разбираем json запроса
    app.use(bodyParser.json({limit: '50mb'}));

    // Разбираем тело запроса
    app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
}
// Разбираем печеньки
app.use(cookieParser('secret_phrase'));

if (PROXY_CONFIG.mockEnable) {
    createMockBackend();
} else {
    // Если у нас реальное взаимодействие с сервером
    createProxyToRealServer();
}

/**
 *
 */
function createMockBackend() {
    // Пробегаемся по всем кастомным роутам и соответствующим им файлам

    PROXY_CONFIG.mockRoutes.forEach(({pattern, scriptPath}: {pattern: string; scriptPath: string}) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const script = require(path.join(__dirname, '/requests' + scriptPath));

        if (script && script.response) {
            app.all(pattern, (req: Request, res: Response) => {
                console.log(`Mock request url: ${req.url} `);
                script.response(req, res);
            });
        } else {
            console.error('Файл по указанному пути не существует или не имеет экспортированного метода response');
        }
    });
}

/**
 * Создание прокси-миддлвэра для апи в продакшене.
 */
function createProxyToRealServer() {
    const proxy = require('express-http-proxy');
    const proxyMiddleware = proxy(proxyTarget, {
        proxyReqOptDecorator: function(proxyReqOpts: any, _srcReq: any) {
            /**
             * Отключаем проверку самоподписанных сертификатов.
             */
            proxyReqOpts.rejectUnauthorized = false;
            console.log(`proxy request: ${proxyReqOpts.path} to ${proxyTarget}`);

            return proxyReqOpts;
        },
    });

    app.use('/', proxyMiddleware);
}

// App running...
server.listen(PROXY_CONFIG.port, () => {
    console.log(
        `Сервер запущен на порту: '${PROXY_CONFIG.port} '\n' 'Приложение доступно по адресу: http://localhost:${PROXY_CONFIG.port}`
    );
});
