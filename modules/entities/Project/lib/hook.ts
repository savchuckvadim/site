import { useContext } from "react";
import { ProjectsContextType } from "../type/project-type";
import { ProjectsContext } from "../provider/ProjectsProvider";

// Хук для доступа к данным проектов
export const useProjects = (): ProjectsContextType => {
    const context = useContext(ProjectsContext);
    if (!context) {
      throw new Error('useProjects must be used within a ProjectsProvider');
    }
    return context;
  };