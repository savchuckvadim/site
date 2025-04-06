import { AppDispatch, AppGetState } from "@/modules/app/model/store";
import { fetchAllDetails } from "@/modules/entities/Project";


export const appInit = () =>
    async (dispatch: AppDispatch, getState: AppGetState) => {
        // const user = await supaAuth.getUser() as User | null;
        const state = getState()
        const isDetailsFetched = state.project.details.fetched
        if (!isDetailsFetched) {
            dispatch(
                fetchAllDetails()
            )
        }


    };
