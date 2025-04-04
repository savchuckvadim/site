import { AppDispatch, AppGetState } from "@/modules/app/model/store";
import { supaAuth } from "@/modules/services/db/supabase/model";
import { User } from "@supabase/supabase-js";

export const appInit = () =>
    async (dispatch: AppDispatch, getState: AppGetState) => {
        const user = await supaAuth.getUser() as User | null;


    };
