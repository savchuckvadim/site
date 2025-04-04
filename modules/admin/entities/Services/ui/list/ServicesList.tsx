'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { SModel } from '@/modules/services/db/supabase/model';
import { AddImageEntityMenu, Card } from '@/modules/admin/shared';

import { useAppDispatch, useAppSelector } from '@/modules/app';
import { Project } from '../../../Project/type/project-type';
import { serviceActions } from '../../model/ServiceSlice';
import { getServices } from '../../lib/helper';


const uploadUrl = '/api/upload/services';
const baseUrl = '/api/services';

export default function ServicesList() {
    // const [images, setImages] = useState<Project[]>([]);
    // const [caption, setCaption] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState(0);
    const [file, setFile] = useState<File | null | string>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [editId, setEditId] = useState<number | null>(null);

    const dispatch = useAppDispatch()
    const setFetched = (projects: Project[]) => dispatch(
        serviceActions.setFetched({ projects })
    )
    const projects = useAppSelector(state => state.service.items)
    const fetchImages = async () => {
        const response = await axios.get(baseUrl);
        const projects = await getServices()
        setFetched(projects);
        setOrder(projects && (projects.length || projects.length == 0) ? projects.length : 0)
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

        await axios.delete(`${baseUrl}/${id}`, { data: { id } });
        fetchImages();
    };

    const handleEdit = (project: Project) => {
      
        setEditId(project.id);
        setTitle(project.title);
        setDescription(project.description);
        setOrder(project.order_number);
        setFile(project.url);
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
        if (file instanceof File) {
            formData.append('file', file);
        } else if (typeof file === 'string') {
            formData.append('url', file);  // Отправляем старый URL
        }

        try {
            await axios.put(`${uploadUrl}/${editId}`, formData);
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
        <div className="w-7xl p-4 mt-10">
            {!isLoading ? <>
                <AddImageEntityMenu
                    name='Services'
                    title={title}
                    description={description}
                    order={order}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setOrder={setOrder}
                    setFile={setFile}
                    file={file}

                    editId={editId}
                    handleUpdate={handleUpdate}
                    handleSubmit={handleSubmit}
                />

                <div className="flex flex-wrap gap-4 justify-center w-full">
                    {projects && projects.length && [...projects]
                        .sort((a, b) => a.order_number - b.order_number)
                        .map((project) => (

                            <Card
                                key={project.id}
                                id={project.id}
                                url={project.url}
                                title={project.title}
                                description={project.description}
                                model={SModel.SERVICES}
                                childrenModel={'details'}
                                onDelete={handleDelete}
                                onEdit={() => handleEdit(project)}
                            />


                        ))}
                </div>
            </>
                : <div className="text-center">Загрузка...</div>}
        </div>
    );
}
