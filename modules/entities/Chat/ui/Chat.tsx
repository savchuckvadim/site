"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { MessageCircle, Send, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ChatInput from "./components/ChatInput";
import { useAppDispatch, useAppSelector } from "@/modules/app";
import { getAnswer } from "../model/ChatThunk";
import Answer from "./components/Answer/Answer";
import { chatActions } from "../model/ChatSlice";

export default function Chat() {

    const dispatch = useAppDispatch()


    const messages = useAppSelector(state => state.chat.messages)
    const setMessage = (message: string) => dispatch(
        chatActions.setMessage({
            role: "user",
            text: message
        })
    )
    const [input, setInput] = useState("");
    const [feedback, setFeedback] = useState("excellent");

    const sendMessage = () => {

        if (!input.trim()) return;
        setMessage(input)
        dispatch(
            getAnswer(input)
        )
        // setMessages((prev) => [
        //     ...prev,
        //     { role: "user", text: input, feedback },
        //     { role: "assistant", text: "Спасибо за вопрос! Вот ответ: ..." },
        // ]);

        setInput("");
    };
    const currentAnswer = useAppSelector(state => state.chat.currentResponse.message)
    const isLoading = useAppSelector(state => state.chat.currentResponse.isLoading)

    return (
        <div className="relative w-full max-w-4xl mx-auto p-6 space-y-4 flex flex-col">
            <div className=" bg-white flex-1 overflow-hidden flex flex-col">
                <CardContent className="p-4 flex-1 overflow-y-auto space-y-3">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`relative max-w-xxl px-4 py-2 rounded-lg text-white ${msg.role === "user" ? "bg-blue-500" : "bg-gray-700"}`}>
                                {msg.text}

                                {/* Кнопка лайка (сверху справа) */}
                                {msg.role === "assistant" && (
                                    <button
                                        onClick={() => console.log("Liked message", index)}
                                        className="absolute -bottom-2 -right-2 bg-white text-gray-500 p-1 rounded-full shadow-md hover:bg-gray-200 transition"
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    {
                        (currentAnswer || isLoading)
                            ? <Answer />
                            : <></>}
                </CardContent>
            </div>

            {/* Фиксируем инпут внизу */}

            <ChatInput onSend={sendMessage} setInput={setInput} />

            {/* </div> */}
        </div>
    );
}