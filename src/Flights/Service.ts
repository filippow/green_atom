import {IFlight} from 'Flights/Models';
import {transfersVariations} from '_mock_data';

/**
 * Сервис для выполнения запросов к бекенду.
 * В данном случае лишь имитируем подобное взаимодействие.
 */
export class Service {
    static loadFlightVariations = (): Promise<IFlight[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(transfersVariations);
            }, 1000);
        });
    };
}
