
import { Input, TextArea } from '@/components/ui/input';
import React, { FC } from 'react';
import FileInput from './FileInput';
import { Button } from '@/components/ui/button';

interface AddImageEntityMenuProps {
    name: string
    title: string
    description: string
    order: number
    setTitle: (value: string) => void
    setDescription: (value: string) => void
    setOrder: (value: number) => void
    setFile: (value: File | null) => void
    editId: number | null
    handleUpdate: () => void
    handleSubmit: () => void


}
const AddImageEntityMenu: FC<AddImageEntityMenuProps> = ({
    name,
    title,
    description,
    order,
    setTitle,
    setDescription,
    setOrder,
    setFile,
    editId,
    handleUpdate,
    handleSubmit
}) => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">{name}</h1>
            <div className="flex gap-4 mb-4 items-start">
                <Input
                    type="text"
                    placeholder="Название"

                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-2"

                />
                <TextArea
                    value={description}
                    placeholder="Описание"
                    rows={10}
                    onChange={(e) => setDescription(e.target.value)}
                    className="flex-2 border p-1"
                />
                <Input
                    type="number"
                    placeholder="Порядок"

                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value))}
                    className="w-20"

                />
                <FileInput onChange={setFile} />

                <Button onClick={editId ? handleUpdate : handleSubmit} className="h-10">
                    {editId ? "Сохранить" : "Добавить"}
                </Button>
            </div>
        </>
    );
}

export default AddImageEntityMenu;