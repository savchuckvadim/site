import axios from "axios";
import { Project } from "../type/project-type";

export const getProjects = async (): Promise<Project[]> => {
    const baseUrl = '/api/projects';
    const response = await axios.get(baseUrl);
    const projects = response.data as Project[]

    return projects;
}