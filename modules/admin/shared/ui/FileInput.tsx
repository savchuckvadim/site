import { useRef } from "react";
import { Upload } from "lucide-react";

export default function FileInput({ onChange }: { onChange: (file: File | null) => void }) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="relative inline-block">

            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => onChange(e.target.files?.[0] || null)}
                className="hidden"
            />
            <button
                onClick={handleFileClick}
                className="flex items-center justify-center p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
                <Upload className="w-6 h-6 text-gray-600" />
            </button>
            <p className="text-xs mt-1">file</p>

        </div>
    );
}
