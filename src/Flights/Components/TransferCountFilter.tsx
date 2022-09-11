import {includes, without} from 'lodash-es';
import React from 'react';
import appStyles from 'Flights/Components/Styles.less';
import {FLIGHTS_FILTER_DICTIONARY} from 'Flights/Const';
import {EFilterFlightType} from 'Flights/Enums';

/**
 * @param filterValues Массив со значениями фильтра по пересадкам.
 * @param onFilterChange Коллбек функция, вызываемая при смене фильтра по пересадкам.
 */
interface IProps {
    onFilterChange: (selectedOptions: EFilterFlightType[]) => void;
    filterValues: EFilterFlightType[];
}

/**
 * Компонент с фильтром по кол-ву пересадок.
 */
const TransferCountFilter: React.FC<IProps> = ({onFilterChange, filterValues}: IProps) => {
    const handleCheckboxChange = (id: EFilterFlightType) => {
        let newFilterValues: EFilterFlightType[];

        if (includes(filterValues, id)) {
            newFilterValues = without(filterValues, id);
        } else if (id == EFilterFlightType.ALL_OPTIONS) {
            newFilterValues = [EFilterFlightType.ALL_OPTIONS];
        } else {
            newFilterValues = [...filterValues, id];
        }

        onFilterChange(newFilterValues);
    };

    return (
        <div className={appStyles.transferFilter}>
            <div className={`${appStyles.pageCard}`}>
                <div>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
                {FLIGHTS_FILTER_DICTIONARY.map(({id, label}) => {
                    return (
                        <div key={id} className={appStyles.filterItem}>
                            <input type="checkbox" checked={includes(filterValues, id)} onChange={() => handleCheckboxChange(id)} />
                            <span className={appStyles.fillerItemText}>{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export {TransferCountFilter};
