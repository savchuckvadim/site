'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, TextArea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageCard } from "./components/ImageCard";
import FileInput from '../../../shared/ui/FileInput';

export type Project = {
  id: number;
  url: string;
  title: string;
  description: string;
  order_number: number;
};

const uploadUrl = '/api/upload/projects';
const baseUrl = '/api/projects';

export default function Portfolio() {
  const [images, setImages] = useState<Project[]>([]);
  // const [caption, setCaption] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [editId, setEditId] = useState<number | null>(null);

  const fetchImages = async () => {
    const response = await axios.get(baseUrl);
    const imgs = response.data
    setImages(imgs);
    setOrder(imgs ? imgs.length : 0)
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    if (!file) return;
    setIsLoading(true)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('order', order.toString());

    try {
      await axios.post(uploadUrl, formData);
      // alert('Проект добавлен');
      await fetchImages()

    } catch (error) {

      alert('Ошибка при добавлении');
    }
    setIsLoading(false)

  };

  const handleDelete = async (id: number) => {
    await axios.delete(baseUrl, { data: { id } });
    fetchImages();
  };

  const handleEdit = (project: Project) => {
    setEditId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setOrder(project.order_number);
    setFile(null);
  };

  const handleUpdate = async () => {
    if (!editId) return;
    if (isLoading) return;
    setIsLoading(true)
    const formData = new FormData();
    formData.append('id', editId.toString());
    formData.append('title', title);
    formData.append('description', description);
    formData.append('order', order.toString());
    if (file) formData.append('file', file);

    try {
      await axios.put(uploadUrl, formData);
      await fetchImages();
      setEditId(null);
      setTitle('');
      setDescription('');
      setOrder(0);
      setFile(null);
      alert('Проект обновлен');
    } catch (error) {
      alert('Ошибка при обновлении');
    }
    setIsLoading(false)
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-4 mt-10">
      {!isLoading ? <>
        <h1 className="text-2xl font-bold mb-4">Галерея портфолио</h1>
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
        <div className="flex flex-wrap gap-4 justify-center">
          {images && images.length && images
            .sort((a, b) => a.order_number - b.order_number)
            .map((image) => (
              <ImageCard
                key={image.id}
                id={image.id}
                url={image.url}
                title={image.title}
                description={image.description}
                onDelete={handleDelete}
                onEdit={() => handleEdit(image)}
              />
            ))}
        </div>
      </>
        : <div className="text-center">Загрузка...</div>}
    </div>
  );
}
