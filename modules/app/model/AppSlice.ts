import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";



//TYPES
export type AppState = typeof initialState


export type UserRole = "admin" | "user"

const initialState = {

    user: null as User | null,
    isLoading: false as boolean,


}


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {


        setIsLoading: (
            state: AppState,
            action: PayloadAction<{ status: boolean }>
        ) => {
            state.isLoading = action.payload.status

        },

        setUser: (
            state: AppState,
            action: PayloadAction<{ user: User }>
        ) => {
            state.user = action.payload.user;

        }


    },

    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(
    //             portalAPI.endpoints.fetchPortal.matchFulfilled,
    //             (state, { payload }) => {
    //                 if (payload) {
    //                     state.portal = payload;
    //                     state.isFetched = true;
    //                     state.error = '';
    //                 }
    //             }
    //         )
    //         .addMatcher(
    //             portalAPI.endpoints.fetchPortal.matchRejected,
    //             (state, action) => {
    //                 state.isFetched = true;
    //                 state.error = 'ошибка получения portal';
    //             }
    //         );
    // }

});




//utils


export const appReducer = appSlice.reducer;

// Экспорт actions
export const appActions = appSlice.actions;