import { createSlice } from "@reduxjs/toolkit";

import appApi from "../services/appApi";

const initialState = [];

export const carSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
});

export default carSlice.reducer;
