/**
 * Модель данных для отображения карточки перелета.
 *
 * @param id Идентификатор модельки.
 * @param cost Стоимость билета(ов)
 * @param company Компания, осуществляющая предлагаемый рейс.
 * @param forwardPath Модель маршрута и информации о полете в город назначения.
 * @param Модель маршрута и информации о полете обратно.
 */
export interface IFlight {
    id: number;
    cost: number;
    company: string;
    forwardPath: IFlightPathInfo;
    backPath?: IFlightPathInfo;
}

/**
 * Модель с информацией о полете.
 *
 * @param startAt Дата и время начала полета.
 * @param endAt Дата и время окончания полета.
 * @param duration Время между прилетом из точки отправления, до конечного города назначения.
 * @param transfers Список перелетов в рамках маршрута.
 */
export interface IFlightPathInfo {
    startAt: string;
    endAt: string;
    duration: number;
    transfers: ITransfer[];
}

/**
 * Моделька перелета. Может являться частью пути вперед или назад.
 * Если в рамках пути из начала до конца имеется всего лишь один элемент массива, значит рейс был прямой.
 *
 * @param cityFrom Город начала перелета.
 * @param cityTo Город окончания перелета.
 * @param duration Продолжительность перелета.
 */
export interface ITransfer {
    cityFrom: string;
    cityTo: string;
    duration: number;
}
