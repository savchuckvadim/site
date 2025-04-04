import axios from "axios";
import { Project } from "../../Project/type/project-type";


export const getServices = async (): Promise<Project[]> => {
    const baseUrl = '/api/services';
    const response = await axios.get(baseUrl);
    const services = response.data as Project[]

    return services;
}