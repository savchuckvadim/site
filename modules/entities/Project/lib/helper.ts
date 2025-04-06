import axios from "axios";
import { Project, ProjectDetails } from "../type/project-type";
import { supabase } from "@/modules/services/db/supabase/model";

export const getProjects = async (): Promise<Project[]> => {
  const baseUrl = '/api/projects';
  const response = await axios.get(baseUrl);
  const projects = response.data as Project[]

  return projects;
}
export const getAllDetails = async (): Promise<ProjectDetails[] | null> => {

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *, 
      project_details(*)
    `)


  if (error) {
    console.log('ProjectDetails data')
    console.log(data)
    console.log(error)
  }
  if (data) {
    console.log('ProjectDetails data')
    console.log(data)
    const result = data as ProjectDetails[]
    return result
  }

  return null;
}

export const getProjectDetails = async (projectId: number) => {
  // : Promise<ProjectDetails[]>
  // const baseUrl = '/api/projects';
  // const response = await axios.get(baseUrl);
  // const projects = response.data as Project[]

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *, 
      project_details(*)
    `)
    .eq('id', projectId)
    .single();  // Получаем один проект вместе с деталями

  if (error) {
    console.log('ProjectDetails data')
    console.log(data)
    console.log(error)
  }
  if (data) {
    console.log('ProjectDetails data')
    console.log(data)
    // const result = data
    return data
  }

  // return null;
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