import { api } from '@services';

type PhotoT = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};

export const photoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        photos: builder.query<PhotoT[], { _start: number; _limit: number }>({
            query: ({ _start = 0, _limit = 10 }) => ({
                url: 'photos',
                params: {
                    _start,
                    _limit,
                },
            }),
        }),
    }),
});

export const { usePhotosQuery } = photoApi;

export * from './auth.types';
