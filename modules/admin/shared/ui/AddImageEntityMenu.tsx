
import { Input, TextArea } from '@/components/ui/input';
import React, { FC, useEffect, useState } from 'react';
import FileInput from './FileInput';
import { Button } from '@/components/ui/button';

interface AddImageEntityMenuProps {
    name: string
    file: File | null | string
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
    file,
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
    const [filePreview, setFilePreview] = useState<File | null>(null);

    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {

        if (filePreview) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(filePreview);
        } else if (file) {
            setPreview(file as string);  // Используем старый URL при редактировании
        } else {
            setPreview(null);
        }
    }, [filePreview, file]);

    const fileSet = (value: File | null) => {

        setFile(value)
        setFilePreview(value)
    }
    return (
        <div className='columns-7xl'>
            <div className='mb-4 mt-8 flex flex-row justify-between items-end w-full'>
                <h1 className="text-2xl font-bold ">{name}</h1>
                <Button onClick={editId ? handleUpdate : handleSubmit} className="h-10">
                    {editId ? "Сохранить" : "Отправить"}
                </Button>
            </div>

            <div className="flex gap-2 mb-4 items-start">
                <div className='flex flex-col w-2/3'>
                    <Input
                        type="text"
                        placeholder="Название"

                        value={title}
                        onChange={(e) => setTitle(e.target.value)}


                    />
                    <TextArea
                        value={description}
                        placeholder="Описание"
                        rows={10}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-2"
                    />
                </div>
                <div className='flex flex-col justify-between w-1/3 gap-2'>
                    <div className='flex flex-row justify-between w-full gap-2'>
                        <div className='flex flex-row justify-start w-2/3 gap-2'>
                            <Input
                                type="number"
                                placeholder="Порядок"

                                value={order}
                                onChange={(e) => setOrder(parseInt(e.target.value))}
                                className="w-20 color-foreground mr-2"

                            />
                            <FileInput onChange={fileSet} />
                        </div>

                    </div>

                    {preview && (
                        <img src={preview} alt="Предпросмотр" className="w-full h-48 object-cover rounded shadow" />
                    )}

                </div>
            </div>
        </div>
    );
}

export default AddImageEntityMenu;