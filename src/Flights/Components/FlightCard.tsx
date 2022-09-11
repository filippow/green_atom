import React from 'react';
import appStyles from 'Flights/Components/Styles.less';
import {IFlight, IFlightPathInfo, ITransfer} from 'Flights/Models';
import {getTimeFromDate, getTransferText} from 'Flights/Utils';

/**
 * @param cardInfo Моделька полетов, для формирования карточки с информацией.
 */
interface IProps {
    cardInfo: IFlight;
}

/**
 * Компонент-карточка, с информацией о полетах.
 */
const FlightCard: React.FC<IProps> = ({cardInfo}: IProps) => {
    const renderPath = (path: IFlightPathInfo) => {
        const flightsLength = path.transfers.length;
        const firstFlight = path.transfers[0];
        const lastFlight = path.transfers[path.transfers.length - 1];
        const citiesOfTransfer = path.transfers.map(({cityTo}: ITransfer) => cityTo).slice(0, flightsLength - 1);

        return (
            <div className={appStyles.cardPath}>
                <div>
                    <div className={appStyles.cardPathSecondaryText}>
                        {firstFlight.cityFrom} - {lastFlight.cityTo}
                    </div>
                    <div>
                        {getTimeFromDate(path.startAt)} - {getTimeFromDate(path.endAt)}
                    </div>
                </div>

                <div>
                    <div className={appStyles.cardPathSecondaryText}>В ПУТИ</div>
                    <div>{`${Math.floor(path.duration / 60)}ч ${path.duration % 60}м`}</div>
                </div>
                <div>
                    <div className={appStyles.cardPathSecondaryText}>{getTransferText(path)}</div>
                    <div>{citiesOfTransfer.join(', ')}</div>
                </div>
            </div>
        );
    };
    return (
        <div className={appStyles.pageCard}>
            <div className={appStyles.cardHeader}>
                <div className={appStyles.cardPrice}>{cardInfo.cost} Р</div>
                <div>{cardInfo.company}</div>
            </div>

            {renderPath(cardInfo.forwardPath)}

            <br />

            {cardInfo.backPath && renderPath(cardInfo.backPath)}
        </div>
    );
};

export {FlightCard};
