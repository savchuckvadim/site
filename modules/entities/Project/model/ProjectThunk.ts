import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects } from '../lib/helper';
import { RootState } from '@/modules/app';
import { Project } from '../type/project-type';

export const fetchProjects = createAsyncThunk<Project[], void, { state: RootState }>(
    'projects/fetchProjects',
    async (_, { getState }) => {
        const state = getState();
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