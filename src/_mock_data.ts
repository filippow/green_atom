import {IFlight} from 'Flights/Models';

export const transfersVariations: IFlight[] = [
    {
        id: 1,
        cost: 13400,
        company: 's7',
        forwardPath: {
            startAt: '21.09 10:45',
            endAt: '22.09 08:00',
            duration: 1275,
            transfers: [
                {
                    cityFrom: 'MOW',
                    cityTo: 'HKG',
                    duration: 645,
                },
                {
                    cityFrom: 'HKG',
                    cityTo: 'JNB',
                    duration: 420,
                },
                {
                    cityFrom: 'JNB',
                    cityTo: 'HKT',
                    duration: 210,
                },
            ],
        },
        backPath: {
            startAt: '22.09 10:00',
            endAt: '23.09 23:00',
            duration: 810,
            transfers: [
                {
                    cityFrom: 'HKT',
                    cityTo: 'MOW',
                    duration: 810,
                },
            ],
        },
    },
    {
        id: 2,
        cost: 57400,
        company: 'aeroflot',
        forwardPath: {
            startAt: '21.09 00:30',
            endAt: '21.09 10:00',
            duration: 510,
            transfers: [
                {
                    cityFrom: 'MOW',
                    cityTo: 'HKT',
                    duration: 510,
                },
            ],
        },
        backPath: {
            startAt: '22.09 10:00',
            endAt: '23.09 23:00',
            duration: 720,
            transfers: [
                {
                    cityFrom: 'HKT',
                    cityTo: 'MOW',
                    duration: 720,
                },
            ],
        },
    },
    {
        id: 3,
        cost: 123500,
        company: 'ural-airlines',
        forwardPath: {
            startAt: '21.09 01:00',
            endAt: '22.09 00:00',
            duration: 1380,
            transfers: [
                {
                    cityFrom: 'MOW',
                    cityTo: 'HKT',
                    duration: 480,
                },
                {
                    cityFrom: 'HKT',
                    cityTo: 'GMB',
                    duration: 240,
                },
                {
                    cityFrom: 'GMB',
                    cityTo: 'BDR',
                    duration: 420,
                },
                {
                    cityFrom: 'BDR',
                    cityTo: 'HKT',
                    duration: 240,
                },
            ],
        },
        backPath: {
            startAt: '22.09 10:00',
            endAt: '23.09 23:00',
            duration: 810,
            transfers: [
                {
                    cityFrom: 'HKT',
                    cityTo: 'MOW',
                    duration: 810,
                },
            ],
        },
    },
];