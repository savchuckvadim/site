
export {
    projectReducer,
    projectActions
} from './model/ProjectSlice'

export {
    fetchProjects,
    fetchAllDetails,
    fetchProjectDetails
} from './model/ProjectThunk'

export type {
    Project,
    ProjectDetails
} from './type/project-type'

export { getProjects } from './lib/helper'
export { ProjectsProvider } from './provider/ProjectsProvider'
export { useProjects, useProjectDetails } from './lib/hook'