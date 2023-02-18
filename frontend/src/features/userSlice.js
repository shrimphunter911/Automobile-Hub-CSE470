import { createSlice } from "@reduxjs/toolkit";

import appApi from "../services/appApi";

const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.CreateAccount.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.SignIn.matchFulfilled, (_, { payload }) => payload);
    }
});

export default userSlice.reducer;
