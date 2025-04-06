export type Project = {
    id: number;
    url: string;
    title: string;
    description: string;
    order_number: number;
};

export type ProjectsContextType = {
  projects: Project[];
  loading: boolean;
  error?: string;
  isFetched: boolean;
};

export interface ProjectDetails extends Project {
  project_details: Project[]
}