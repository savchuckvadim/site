import { Button } from "@/components/ui/button";
import { Card as CCard, CardContent } from "@/components/ui/card";
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
        // <div className="relative bg-white rounded-lg shadow-md overflow-hidden p-4 w-full max-w-xs">
        <CCard className="bg-background text-foreground shadow-md w-full max-w-md flex flex-col min-h-[300px] max-h-[500px]">
            <CardContent>
                <div className="relative rounded-lg  overflow-hidden p-4 w-full">
                    <div className="relative overflow-hidden flex-shrink-0">

                        <img src={url} alt={title} className="w-full h-48 object-cover rounded" />
                    </div>
                    <div className="p-2  overflow-hidden min-h-[150px] max-h-[400px]">
                        <Link href={itemDetailUrl} className="text-blue-500 underline">

                            <h3 className="text-lg font-semibold mb-1">{title}</h3>
                        </Link>
                        <p className="text-foreground max-h-48 overflow-y-auto break-words">{description}</p>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button variant="default" size="sm" onClick={() => onEdit(id)}>✏️</Button>
                        <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>🗑️</Button>
                    </div>
                </div>
            </CardContent>
        </CCard>
        // </div>
    );

}

{/* <CCard className="bg-background text-foreground shadow-md w-full max-w-xs flex flex-col h-[400px]">
    <CardContent className="flex flex-col flex-1 p-0">
        <div className="relative overflow-hidden flex-shrink-0">
            <img
                src={url}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(id)}>✏️</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>🗑️</Button>
            </div>
        </div>

        <div className="p-4 flex flex-col flex-1 overflow-hidden">
            <Link href={itemDetailUrl} className="text-blue-500 underline">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
            </Link>
            <p className="text-foreground overflow-auto break-words flex-1">{description}</p>
        </div>
    </CardContent>
</CCard> */}
