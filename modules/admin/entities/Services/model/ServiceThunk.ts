import { createAsyncThunk } from '@reduxjs/toolkit';
import { getServices } from '../lib/helper';


export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { getState }) => {
        const state: any = getState();
        const existingProjects = state.project.items;

        // Если проекты уже есть, возвращаем их
        if (existingProjects && existingProjects.length) {
            return existingProjects;
        }

        // Если проектов нет, делаем запрос
        const projects = await getServices();

        return projects;
    }
);