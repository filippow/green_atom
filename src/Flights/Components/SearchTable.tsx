import React from 'react';
import {FlightCard} from 'Flights/Components/FlightCard';
import appStyles from 'Flights/Components/Styles.less';
import {SORT_BUTTONS_DICT} from 'Flights/Const';
import {ESortType} from 'Flights/Enums';
import {IFlight} from 'Flights/Models';

/**
 * @param sortValue Примененное значение сортировки.
 * @param onSortChange Коллбек функция при изменении сортировки.
 * @param flights Список полетов для формирования карточек.
 * @param isLoading Флаг загрузки списка вариантов полетов.
 */
interface IProps {
    sortValue: ESortType;
    onSortChange: (sort: ESortType) => void;
    flights: IFlight[];
    isLoading: boolean;
}

/**
 * Компонент для отображения кнопок сортировки и списка вариантов полетов.
 */
const SearchTable: React.FC<IProps> = ({sortValue, onSortChange, flights, isLoading}: IProps) => {
    const renderSortButtons = () => {
        return SORT_BUTTONS_DICT.map(({id, label}) => {
            return (
                <button
                    key={id}
                    className={`${appStyles.sortButton} ${sortValue === id ? appStyles.sortButtonActive : ''}`}
                    onClick={() => onSortChange(id)}
                >
                    {label}
                </button>
            );
        });
    };
    return (
        <div className={appStyles.searchTable}>
            {isLoading ? (
                <div>Загружаю...</div>
            ) : (
                <>
                    <div className={appStyles.sortButtonsContainer}>{renderSortButtons()}</div>
                    {flights.map((item) => (
                        <FlightCard key={item.id} cardInfo={item} />
                    ))}
                </>
            )}
        </div>
    );
};

export {SearchTable};
