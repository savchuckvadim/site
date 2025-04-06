import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllDetails, getProjectDetails, getProjects } from '../lib/helper';
import { RootState } from '@/modules/app';
import { Project, ProjectDetails } from '../type/project-type';

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

export const fetchAllDetails = createAsyncThunk<ProjectDetails[], void, { state: RootState }>(
    'projects/fetchAllDetails',
    async (_, { getState }) => {
        const state = getState();
        const existingProjects = state.project.details.items;

        // Если проекты уже есть, возвращаем их
        if (existingProjects && existingProjects.length) {
            return existingProjects;
        }

        // Если проектов нет, делаем запрос
        const details = await getAllDetails() as Promise<ProjectDetails[]> | null;

        if (!details) {
            return [];  // Возвращаем пустой массив вместо null
        }
        return details;
    }
);


export const fetchProjectDetails = createAsyncThunk<ProjectDetails | null, number, { state: RootState }>(
    'projects/fetchProjectDetails',
    async (id, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const isLoading = state.project.details.loading
            if (!isLoading) {
                // Если проектов нет, делаем запрос
                const details = await getProjectDetails(id) as Promise<ProjectDetails> | null;

                if (!details) {
                    return rejectWithValue(id + ' details of project not found');
                }
                return details;
            }
            return null
        } catch (error: unknown) {
            return rejectWithValue(error || 'Ошибка получения данных проекта');
        }
    }
);