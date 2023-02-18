import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: (builder) => ({
        CreateAccount: builder.mutation({
            query: (user) => ({
                url: "/users/CreateAccount",
                method: "POST",
                body: user,
            }),
        }),

        SignIn: builder.mutation({
            query: (user) => ({
                url: "/users/SignIn",
                method: "POST",
                body: user,
            }),
        }),
        AddCar: builder.mutation({
            query: (car) => ({
                url: "/cars",
                body: car,
                method: "POST",
            }),
        }),

        RemoveCar: builder.mutation({
            query: ({ car_id, user_id }) => ({
                url: `/cars/${car_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),

        UpdateCar: builder.mutation({
            query: (car) => ({
                url: `/cars/${car.id}`,
                body: car,
                method: "PATCH",
            }),
        }),
    }),
});

export const {
    useCreateAccountMutation,
    useSignInMutation,
    useAddCarMutation,
    useRemoveCarMutation,
    useUpdateCarMutation,
} = appApi;

export default appApi;
