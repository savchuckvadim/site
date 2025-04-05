'use client';

import React, { createContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/modules/app';
import { fetchProjects } from '@/modules/entities/Project';
import { ProjectsContextType } from '@/modules/entities/Project/type/project-type';



export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.project.items);
  const loading = useAppSelector((state) => state.project.loading);
  const error = useAppSelector((state) => state.project.error);
  const isFetched = useAppSelector((state) => state.project.fetched);

  useEffect(() => {
    // Если проекты еще не загружены, запускаем загрузку
    if (!isFetched) {
      dispatch(fetchProjects())
    }
  }, [dispatch, isFetched]);

  const value = {
    projects,
    loading,
    error,
    isFetched
  };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};


