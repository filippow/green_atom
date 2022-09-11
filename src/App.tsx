import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {SearchTable} from 'Flights/Components/SearchTable';
import appStyles from 'Flights/Components/Styles.less';
import {TransferCountFilter} from 'Flights/Components/TransferCountFilter';
import {IFlight} from 'Flights/Models';
import {Service} from 'Flights/Service';

/**
 * @param store - mobX-state-tree хранилище
 */
interface IProps {
    store: any;
}

const App: React.FC<IProps> = ({store}: IProps) => {
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        store.setLoading(true);
        Service.loadFlightVariations()
            .then((flights: IFlight[]) => {
                store.setFlights(flights);
            })
            .finally(() => {
                store.setLoading(false);
            });
    };

    return (
        <div className={appStyles.appContainer}>
            <TransferCountFilter filterValues={store.transferFilter} onFilterChange={store.setTransferFilter} />
            <SearchTable
                isLoading={store.isLoading}
                flights={store.getFlightsResult()}
                sortValue={store.sort}
                onSortChange={store.setSort}
            />
        </div>
    );
};

export default observer(App);
