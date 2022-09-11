import {getSnapshot, types} from 'mobx-state-tree';
import {EFilterFlightType, ESortType} from 'Flights/Enums';
import {IFlight} from 'Flights/Models';
import {filterFlights, sortFlights} from 'Flights/Utils';

const Transfer = types.model('Transfer', {
    cityFrom: types.string,
    cityTo: types.string,
    duration: types.integer,
});

const FlightPath = types.model('FlightPath', {
    startAt: types.string,
    endAt: types.string,
    duration: types.integer,
    transfers: types.array(Transfer),
});

const Flight = types.model('Flight', {
    id: types.integer,
    cost: types.integer,
    company: types.string,
    forwardPath: FlightPath,
    backPath: FlightPath,
});

const RootStore = types
    .model({
        isLoading: types.boolean,
        flights: types.array(Flight),
        sort: types.string,
        transferFilter: types.array(types.string),
    })
    .views((self) => {
        return {
            getFlightsResult(): IFlight[] {
                const snapshot = getSnapshot(self);
                // @ts-ignore
                const restFlights = filterFlights(snapshot.flights, snapshot.transferFilter);

                // @ts-ignore
                return sortFlights(restFlights, snapshot.sort);
            },
        };
    })
    .actions((self) => ({
        setFlights(flights: IFlight[]) {
            self.flights = flights.map((flight) => Flight.create(flight));
        },
        setLoading(value: boolean) {
            self.isLoading = value;
        },
        setSort(newSort: ESortType) {
            self.sort = newSort;
        },
        setTransferFilter(newFilter: EFilterFlightType[]) {
            self.transferFilter = newFilter;
        },
    }));

export const store = RootStore.create({
    isLoading: false,
    flights: [],
    sort: ESortType.EXPENSIVE,
    transferFilter: [],
});
