import { useContext } from "react";
import { ProjectsContextType } from "../type/project-type";
import { ProjectsContext } from "../provider/ProjectsProvider";
import { useEffect } from 'react';
import { fetchProjectDetails } from '@/modules/entities/Project';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "@/modules/app";


// Хук для доступа к данным проектов
export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};




export const useProjectDetails = (projectId: number) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Получаем данные из хранилища
  const { items, loading, fetched, error } = useAppSelector(state => state.project.details);

  // Ищем проект в списке
  const currentProject = items.find(item => item.id === projectId);

  useEffect(() => {
    // Если проект не найден и данные не загружены - отправляем запрос
    if (!fetched) {
      dispatch(fetchProjectDetails(projectId));
    }
    // Если данные загружены, но проект отсутствует - перенаправляем на 404
    if (fetched && !loading && !currentProject) {
      router.push('/404'); // Переход на страницу 404
    }
  }, [dispatch, fetched, loading, currentProject, projectId, router]);

  return { currentProject, loading, error, fetched };
};
