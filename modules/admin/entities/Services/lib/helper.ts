import { Project } from "@/modules/entities/Project";
import axios from "axios";


export const getServices = async (): Promise<Project[]> => {
    const baseUrl = '/api/services';
    const response = await axios.get(baseUrl);
    const services = response.data as Project[]

    return services;
}