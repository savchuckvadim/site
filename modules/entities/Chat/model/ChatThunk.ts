import { AppDispatch, AppGetState } from "@/modules/app/model/store";
import { aiAPI } from "../../AI";
import { API_METHOD } from "../../AI/api/ai-api";
import { chatActions } from "./ChatSlice";


// export const getAnswer = (message: string) =>
// async (dispatch: AppDispatch, getState: AppGetState) => {

//     
//     const result = await aiAPI.service('', API_METHOD.POST,
//         '',
//         {
//             prompt: message,
//             model: "mistral"
//         })
//     

// }
// let eventSource: EventSource | null = null;
// export const getAnswer = (message: string) =>
//     async (dispatch: AppDispatch, getState: AppGetState) => {
//         try {
//             // dispatch(setLoading(true)); // Устанавливаем статус загрузки

//             //     const eventSource = new EventSource("http://localhost:8000/api/generate");

//             //     eventSource.onmessage = (event) => {
//             //         const data = JSON.parse(event.data); // Парсим JSON
//             //         console.log("🔥 Новый chunk:", data.message);

//             //         // dispatch(addMessage({ role: "assistant", text: data.message })); // Диспатчим новое сообщение
//             //     };

//             //     eventSource.onerror = (error) => {
//             //         console.error("❌ Ошибка потока:", error);
//             //         eventSource.close();

//             //         // Переподключение только если разрыв соединения
//             //         setTimeout(() => {
//             //             console.log("♻️ Переподключаем EventSource...");
//             //             dispatch(getAnswer(message));
//             //         }, 2000);
//             //     };

//             // } catch (error) {
//             //     console.error("Ошибка запроса:", error);
//             //     // dispatch(setError("Ошибка запроса к серверу"));
//             // }

//             if (eventSource) {
//                 console.log("🟡 EventSource уже активен, не создаём новый");
//                 return;
//             }

//             eventSource = new EventSource("http://localhost:8000/api/generate");

//             eventSource.onmessage = (event) => {
//                 if (event.data === "{}") return; // Игнорируем ping-сообщения

//                 try {
//                     const data = JSON.parse(event.data);
//                     console.log("🔥 Новый chunk:", data.message);
//                     // dispatch(addMessage({ role: "assistant", text: data.message }));
//                 } catch (e) {
//                     console.error("❌ Ошибка парсинга JSON:", e);
//                 }
//             };

//             // **Обрабатываем событие завершения потока**
//             eventSource.addEventListener("done", () => {
//                 console.log("✅ Поток завершён");
//                 eventSource?.close();
//                 eventSource = null; // **Очищаем объект**
//             });

//             eventSource.onerror = (error) => {
//                 console.error("❌ Ошибка потока:", error);
//                 eventSource?.close();
//                 eventSource = null; // **Сбрасываем**
//                 //@ts-ignore
//                 if (error?.target?.readyState === EventSource.CLOSED) {
//                     console.log("♻️ Переподключаем EventSource...");
//                     setTimeout(() => dispatch(getAnswer(message)), 2000);
//                 }
//             };
//         } catch (e) {
//             console.error("❌ Ошибка парсинга JSON:", e);
//         }

//     };
export const getAnswer = (message: string) =>
    async (dispatch: AppDispatch, getState: AppGetState) => {
        try {
            // console.log("🟡 Отправляем запрос к серверу...");
            dispatch(
                chatActions.setIsLoading({ status: true })
            )
            const response = await fetch("https://april-online.ru/api/ollama", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "text/event-stream",
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-API-KEY': 'e0336d3b27299e405a344d2475627c5810eab829a4e5c1214e452e20519d5984'
                },
                body: JSON.stringify({ prompt: message, model: "mistral" }),
            });

            if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`);

            const reader = response.body?.getReader();
            if (!reader) throw new Error("Ошибка: response.body отсутствует");

            const decoder = new TextDecoder();
            let buffer = "";
            dispatch(
                chatActions.setIsStreaming({ status: true })
            )
            while (true) {

                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // Разбираем чанки, разбитые по `\n\n`
                let parts = buffer.split("\n\n");
                buffer = parts.pop() || ""; // Оставляем последний незавершенный чанк

                for (let chunk of parts) {
                    chunk = chunk.trim(); // Убираем пробелы и переносы строк

                    if (!chunk.startsWith("data: ")) continue; // Игнорируем посторонние чанки

                    try {
                        const jsonString = chunk.replace("data: ", "").trim();
                        if (!jsonString) continue; // Пропускаем пустые чанки

                        const json = JSON.parse(jsonString);
                        if (json.message) {
                            // console.log("Новый chunk:", json.message);
                            dispatch(
                                chatActions.setCurrentAnswerChunk({ chunk: json.message })
                            )
                        }
                    } catch (e) {
                        // console.error("❌ Ошибка парсинга JSON:", e, chunk);
                    }
                }
            }
            dispatch(
                chatActions.setIsStreaming({ status: false })
            )
            dispatch(
                chatActions.setIsLoading({ status: false })
            )
            console.log("✅ Поток завершён");

        } catch (error) {
            console.error("Ошибка запроса:", error);
        }
    };
