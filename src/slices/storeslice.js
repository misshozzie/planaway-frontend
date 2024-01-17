import { createSlice } from "@reduxjs/toolkit";
import reduxApis from "../api";

const initialState = {
    loading: false,
    store: [],
    storeDetails: {},
    error: null,
}

const storeSlice = createSlice({
    name: "store",
    initialState: initialState,
    reducers: {},  // You can add any synchronous actions here if needed
    extraReducers: (builder) => {
        // Handles the asynchronous action reduxApis.getAllStore
        builder
            .addCase(reduxApis.getAllStore.pending, (state) => {
                state.loading = true;
            })
            .addCase(reduxApis.getAllStore.fulfilled, (state, action) => {
                state.loading = false;
                state.store = action.payload.data.store;
            })
            .addCase(reduxApis.getAllStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handles the asynchronous action reduxApis.getOneStore
        builder
            .addCase(reduxApis.getOneStore.pending, (state) => {
                state.loading = true;
            })
            .addCase(reduxApis.getOneStore.fulfilled, (state, action) => {
                state.loading = false;
                state.storeDetails = action.payload.data.storeData;
            })
            .addCase(reduxApis.getOneStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default storeSlice.reducer;
