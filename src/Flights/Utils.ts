import {find, includes, sortBy} from 'lodash-es';
import get from 'lodash-es/get';
import {FLIGHTS_FILTER_DICTIONARY} from 'Flights/Const';
import {EFilterFlightType, ESortType} from 'Flights/Enums';
import {IFlight, IFlightPathInfo} from 'Flights/Models';

/**
 * Функция фильтрации всех вариантов полета в зависимости от фильтра по кол-ву пересадок.
 * @param flights - массив полетов, на основе которых формируется карточка
 * @param transferFilter - фильтр по кол-ву пересадок. Если выбрано несколько вариантов пересадок, то смотрим,
 * для какого типа имеется наибольшее число пересадок. Это и будет тем значением, в рамках которого фильтруем.
 */
export const filterFlights = (flights: IFlight[], transferFilter: EFilterFlightType[]): IFlight[] => {
    if (!transferFilter.length || includes(transferFilter, EFilterFlightType.ALL_OPTIONS)) {
        return flights;
    }

    let maxFlightCount = 0;
    transferFilter.forEach((filterType: EFilterFlightType) => {
        const count = find(FLIGHTS_FILTER_DICTIONARY, {id: filterType})?.flightsCount || 0;

        if (count > maxFlightCount) {
            maxFlightCount = count;
        }
    });

    return flights.filter((flight) => {
        if (flight.forwardPath.transfers.length > maxFlightCount) {
            return false;
        }

        if (flight.backPath && flight.backPath.transfers.length > maxFlightCount) {
            return false;
        }

        return true;
    });
};

/**
 * Функция сортировки вариантов полета.
 * @param flights Список вариантов полета.
 * @param sortType Сортировка по самому дешевому билету или самому быстрому рейсу.
 */
export const sortFlights = (flights: IFlight[], sortType: ESortType): IFlight[] => {
    if (sortType === ESortType.SPEED) {
        return sortBy(flights, getAverageFlightDuration);
    } else if (sortType === ESortType.EXPENSIVE) {
        return sortBy(flights, (a) => a.cost);
    }

    return flights;
};

/**
 * Получение среднего времени для рейса "туда" и "обратно", для корректного вывода при сортировке.
 */
function getAverageFlightDuration(flight: IFlight) {
    const forwardDuration: number = flight.forwardPath.duration || 0;
    const backDuration: number = flight.backPath?.duration || 0;

    return backDuration ? (forwardDuration + backDuration) / 2 : forwardDuration;
}

/**
 * Мапа, для формирования текстовки о кол-ве пересадок.
 */
const COUNT_TO_TRANSFERS_MAP_TEXT = {
    1: 'ПРЯМОЙ РЕЙС',
    2: '1 ПЕРЕСАДКА',
    3: '2 ПЕРЕСАДКИ',
    4: '3 ПЕРЕСАДКИ',
};

/**
 * Функция получения текстовки, с кол-вом пересадок.
 * @param path - объект с информацией о пути вперед или обратно.
 */
export const getTransferText = (path: IFlightPathInfo): string => {
    const count = path.transfers.length;

    if (!count) {
        return 'НЕТ ДАННЫХ';
    } else if (count in COUNT_TO_TRANSFERS_MAP_TEXT) {
        return get(COUNT_TO_TRANSFERS_MAP_TEXT, count);
    }

    return `ПЕРЕСАДОК: ${count} `;
};

/**
 * Получение времени из строки "дата + время".
 * @param datetime строчка даты со временем.
 */
export const getTimeFromDate = (datetime: string): string => {
    return datetime.split(' ')[1] || '';
};
