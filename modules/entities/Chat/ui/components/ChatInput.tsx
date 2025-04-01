import { useState, useRef, useEffect } from "react";
import { ArrowUp, CirclePlus, Forward, ForwardIcon, PencilLine, Send, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ChatInput({ onSend, setInput }: {
    onSend: (message: string) => void
    setInput: (message: string) => void
}

) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "40px"; // Минимальная высота
            const maxHeight = 7 * 24; // 6 строк * ~24px (высота строки)
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;
            textareaRef.current.style.overflowY = textareaRef.current.scrollHeight > maxHeight ? "auto" : "hidden";
        }
    }, [message]);

    const handleSend = () => {
        if (!message.trim()) return;
        onSend(message);
        setMessage("");
    };

    return (
        <Card className="w-full flex items-end justify-between border border-gray-300 rounded-3xl bg-white p-3">
            {/* Контейнер с бордером */}
            <div className="max-w-[95%] flex-1 relative p-2">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value)
                        setInput(e.target.value)
                    }}
                    placeholder="Введите сообщение..."
                    className="w-full resize-none overflow-hidden bg-transparent text-gray-900 placeholder-gray-400 px-4 py-2 rounded-xl focus:outline-none"
                    rows={1}
                    style={{ maxHeight: "144px" }} // Ограничение на 6 строк
                />
            </div>

            {/* Кнопка отправки */}
            <div className="grid grid-cols-2 gap-1">

                <button
                    onClick={handleSend}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center justify-center hover:opacity-80 transition"
                >
                    <PencilLine className="w-3 h-3" />
                </button>
                <button
                    onClick={handleSend}
                    className=" bg-black text-white px-4 py-2 rounded-xl flex items-center justify-center hover:opacity-80 transition"
                >
                    {/* <PencilLine className="w-3 h-3" /> */}
                    <CirclePlus className="w-3 h-3" />
                </button>
               
                <button
                    onClick={handleSend}
                    className="bg-black text-white px-4 py-2 rounded-xl flex items-center justify-center hover:opacity-80 transition"
                >
                    <ArrowUp className="w-3 h-3" />
                </button>
            </div>
        </Card>
    );
}
