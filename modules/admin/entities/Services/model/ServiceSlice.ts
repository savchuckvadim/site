import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProjects } from "./ServiceThunk";
import { Project } from "../../Project/type/project-type";



//TYPES
export type ServiceState = typeof initialState



const initialState = {

    items: [


    ] as Project[],
    loading: false as boolean,
    error: undefined as string | undefined,


}


const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {

        setFetched: (
            state: ServiceState,
            action: PayloadAction<{ projects: Project[] }>
        ) => {
            state.items = action.payload.projects
        },



    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },



});




//utils


export const serviceReducer = serviceSlice.reducer;

// Экспорт actions
export const serviceActions = serviceSlice.actions;