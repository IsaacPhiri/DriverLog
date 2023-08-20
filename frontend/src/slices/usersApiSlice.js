import { apiSlice } from './apiSlice';
const USERS_URL = '/api/auth';
const REGISTER_DRIVER_URL = '/api/drivers';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signin-driver`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${REGISTER_DRIVER_URL}/signup-driver`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
    })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;