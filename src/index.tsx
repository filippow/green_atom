import {ConfigProvider} from 'antd';
import locale from 'antd/lib/locale/ru_RU';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import 'antd/dist/antd.min.css';
import {store} from 'Store';

moment.locale('ru'); // Подрубаем русскую локализацию для момента.

ReactDOM.render(
    <ConfigProvider locale={locale}>
        <App store={store} />
    </ConfigProvider>,
    document.getElementById('root')
);
