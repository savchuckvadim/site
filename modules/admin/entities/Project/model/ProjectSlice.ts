import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project } from "../type/project-type";
import { fetchProjects } from "./ProjectThunk";



//TYPES
export type ProjectsState = typeof initialState



const initialState = {

    items: [


    ] as Project[],
    loading: false as boolean,
    error: undefined as string | undefined,


}


const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {

        setFetched: (
            state: ProjectsState,
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


export const projectReducer = projectSlice.reducer;

// Экспорт actions
export const projectActions = projectSlice.actions;