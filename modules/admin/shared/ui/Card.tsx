import { Button } from "@/components/ui/button";
import { SModel } from "@/modules/services/db/supabase/model";
import Link from "next/link";

export function Card({ id, url, title, description, model, childrenModel, onDelete, onEdit }: {
    id: number;
    url: string;
    title: string;
    description: string;
    model: SModel
    childrenModel: SModel | 'details'
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}) {
    let itemDetailUrl = `/admin/${model}/${id}`
    if (childrenModel) {
        itemDetailUrl += `/${childrenModel}`
    }

    return (
        <div className="relative bg-white rounded-lg shadow-md overflow-hidden p-4 w-full max-w-xs">
            <img src={url} alt={title} className="w-full h-48 object-cover rounded" />
            <div className="p-2">
                <Link href={itemDetailUrl} className="text-blue-500 underline">

                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                </Link>
                <p className="text-gray-600 max-h-48 overflow-y-auto break-words">{description}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(id)}>✏️</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>🗑️</Button>
            </div>
        </div>
    );

}
