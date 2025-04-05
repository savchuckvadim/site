
export {
    projectReducer,
    projectActions
} from './model/ProjectSlice'

export { fetchProjects } from './model/ProjectThunk'

export type {
    Project
} from './type/project-type'

export {getProjects} from './lib/helper'
export { ProjectsProvider } from './provider/ProjectsProvider'
export { useProjects } from './lib/hook'