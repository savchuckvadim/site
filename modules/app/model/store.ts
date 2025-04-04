import { projectReducer } from '@/modules/admin/entities/Project';
import { serviceReducer } from '@/modules/admin/entities/Services';
import { chatReducer } from '@/modules/entities/Chat';
import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';


export const listenerMiddleware = createListenerMiddleware();






const rootReducer = combineReducers({
    chat: chatReducer,
    project: projectReducer,
    service: serviceReducer


});



export const setupStore = () => {

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .prepend(listenerMiddleware.middleware) // Добавление listener middleware в начало цепочки
        // .concat(chatAPI.middleware)



    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppGetState = AppStore['getState'];

export const store = setupStore();
//@ts-ignore
// window.store = store;



// listenerMiddleware.startListening({
//     actionCreator: portalActions.setPortal,
//     effect: async (action, listenerApi) => {
//         const portal = action.payload.portal
//         const { dispatch } = listenerApi;
//         // dispatch(getInitSale(action.payload.portal, null));
//         // dispatch(updateLoggingForPortal(action.payload));
//         // dispatch(
//         //     setInitEventCompany(
//         //         portal
//         //     )
//         // )
//     },
// });
