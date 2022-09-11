export enum EFilterFlightType {
    /** Все варианты пересадок */
    ALL_OPTIONS = 'ALL_OPTIONS',
    /** Без пересадок*/
    WITHOUT_TRANSFER = 'WITHOUT_TRANSFER',
    /** С одной пересадкой*/
    ONE_TRANSFER = 'ONE_TRANSFER',
    /** С двумя пересадками*/
    TWO_TRANSFERS = 'TWO_TRANSFERS',
    /** С тремя пересадками */
    THREE_TRANSFERS = 'THREE_TRANSFERS',
}

/**
 * Варианты сортировки предлагаемых полетов.
 */
export enum ESortType {
    /** Сортировка по самому дешевому билету */
    EXPENSIVE = 'EXPENSIVE',
    /** Сортировка по самому быстрому маршруту */
    SPEED = 'SPEED',
}
