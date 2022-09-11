import {EFilterFlightType, ESortType} from 'Flights/Enums';

/**
 * Справочник вариантов фильтрации полетов по пересадкам.
 * Число flightCount является фильтрующим параметром и означает максимально число перелетов,
 * которые подходят под фильтр.
 *
 * При выборе нескольких значений в рамках фильтра, актуальным будет тот, у которого большее число.
 */
export const FLIGHTS_FILTER_DICTIONARY = [
    {
        id: EFilterFlightType.ALL_OPTIONS,
        label: 'Все',
        flightsCount: 999999,
    },
    {
        id: EFilterFlightType.WITHOUT_TRANSFER,
        label: 'Без пересадок',
        flightsCount: 1,
    },
    {
        id: EFilterFlightType.ONE_TRANSFER,
        label: '1 пересадка',
        flightsCount: 2,
    },
    {
        id: EFilterFlightType.TWO_TRANSFERS,
        label: '2 пересадка',
        flightsCount: 3,
    },
    {
        id: EFilterFlightType.THREE_TRANSFERS,
        label: '3 пересадка',
        flightsCount: 4,
    },
];

export const SORT_BUTTONS_DICT = [
    {
        id: ESortType.EXPENSIVE,
        label: 'САМЫЙ ДЕШЕВЫЙ',
    },
    {
        id: ESortType.SPEED,
        label: 'САМЫЙ БЫСТРЫЙ',
    },
];
