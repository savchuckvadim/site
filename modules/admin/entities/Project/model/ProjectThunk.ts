import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects } from '../lib/helper';

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
        const projects = await getProjects();

        return projects;
    }
);