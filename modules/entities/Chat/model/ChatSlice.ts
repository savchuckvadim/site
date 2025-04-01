import { PayloadAction, createSlice } from "@reduxjs/toolkit";



//TYPES
export type ChatState = typeof initialState


export type Role = "assistant" | "user"
export interface Message {
    role: Role
    text: string
}
const initialState = {

    messages: [
        {
            role: "assistant",
            text: "Привет! Какой у тебя вопрос?"
        },

    ] as Message[],
    currentResponse: {
        message: '',
        isLoading: false,
        isStreaming: false,
        isDone: false,
    },
    isFetched: false as boolean,
    error: '',


}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {

        setMessage: (
            state: ChatState,
            action: PayloadAction<{ text: string, role: Role }>
        ) => {
            state.messages.push({
                role: action.payload.role,
                text: action.payload.text
            } as Message)
        },
        setIsLoading: (
            state: ChatState,
            action: PayloadAction<{ status: boolean }>
        ) => {
            state.currentResponse.isLoading = action.payload.status

        },
        setIsStreaming: (
            state: ChatState,
            action: PayloadAction<{ status: boolean }>
        ) => {
            state.currentResponse.isStreaming = action.payload.status
            state.currentResponse.isDone = !action.payload.status
            if (!action.payload.status) {
                state.messages.push({
                    role: "assistant",
                    text: state.currentResponse.message
                } as Message)
                state.currentResponse.message = ''
            }

        },
        setCurrentAnswerChunk: (
            state: ChatState,
            action: PayloadAction<{ chunk: string }>
        ) => {
            state.currentResponse.message += action.payload.chunk

        }


    },

    // extraReducers: (builder) => {
    //     builder
    //         .addMatcher(
    //             portalAPI.endpoints.fetchPortal.matchFulfilled,
    //             (state, { payload }) => {
    //                 if (payload) {
    //                     state.portal = payload;
    //                     state.isFetched = true;
    //                     state.error = '';
    //                 }
    //             }
    //         )
    //         .addMatcher(
    //             portalAPI.endpoints.fetchPortal.matchRejected,
    //             (state, action) => {
    //                 state.isFetched = true;
    //                 state.error = 'ошибка получения portal';
    //             }
    //         );
    // }

});




//utils


export const chatReducer = chatSlice.reducer;

// Экспорт actions
export const chatActions = chatSlice.actions;