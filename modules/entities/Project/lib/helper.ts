import axios from "axios";
import { Project } from "../type/project-type";

export const getProjects = async (): Promise<Project[]> => {
    const baseUrl = '/api/projects';
    const response = await axios.get(baseUrl);
    const projects = response.data as Project[]

    return projects;
}

export const loadImagesFromStorage = () => {
    try {
      const storedImages = localStorage.getItem('projects');
      if (storedImages) {
        return JSON.parse(storedImages);
      }
      return [];
    } catch (error) {
      return [];
    }
  };
  
  export const saveImagesToStorage = (projects: Project[]) => {
    try {
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Ошибка сохранения projects в localStorage:', error);
    }
  };