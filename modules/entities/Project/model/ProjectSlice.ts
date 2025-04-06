import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project, ProjectDetails } from "../type/project-type";
import { fetchAllDetails, fetchProjectDetails, fetchProjects } from "./ProjectThunk";



//TYPES
export type ProjectsState = typeof initialState



const initialState = {

    items: [


    ] as Project[],
    details:
    {
        items: [


        ] as ProjectDetails[],

        loading: false as boolean,
        fetched: false as boolean,
        error: undefined as string | undefined,
    },

    loading: false as boolean,
    fetched: false as boolean,
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
            state.fetched = true
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
                state.fetched = true
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.fetched = true
            })


            .addCase(fetchAllDetails.pending, (state) => {
                state.details.loading = true;
                state.details.error = undefined;
            })
            .addCase(fetchAllDetails.fulfilled, (state, action) => {

                state.details.items = action.payload;
                state.details.loading = false;
                state.details.fetched = true


            })
            .addCase(fetchAllDetails.rejected, (state, action) => {
                state.details.loading = false;
                state.details.error = action.error.message;
                state.details.fetched = true
            })




            .addCase(fetchProjectDetails.pending, (state) => {
                state.details.loading = true;
                state.details.error = undefined;
            })
            .addCase(fetchProjectDetails.fulfilled, (state, action) => {
                if (action.payload) {
                    const isExist = state.details.items.find(item =>
                        item.id === (action.payload as ProjectDetails).id
                    )
                    if (!isExist) {
                        state.details.items.push(action.payload);
                    }
                    state.details.loading = false;

                    state.details.fetched = true
                }

            })
            .addCase(fetchProjectDetails.rejected, (state, action) => {
                state.details.loading = false;
                state.details.error = action.error.message;
                state.details.fetched = true
            });
    },



});




//utils


export const projectReducer = projectSlice.reducer;

// Экспорт actions
export const projectActions = projectSlice.actions;