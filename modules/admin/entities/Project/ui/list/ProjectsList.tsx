'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { SModel } from '@/modules/services/db/supabase/model';
import { AddImageEntityMenu, Card } from '@/modules/admin/shared';
import { Project } from '../../type/project-type';
import { useAppDispatch, useAppSelector } from '@/modules/app';
import { projectActions } from '../../model/ProjectSlice';
import { getProjects } from '../../lib/helper';


const uploadUrl = '/api/upload/projects';
const baseUrl = '/api/projects';

export default function ProjectsList() {
    // const [images, setImages] = useState<Project[]>([]);
    // const [caption, setCaption] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [editId, setEditId] = useState<number | null>(null);
    const dispatch = useAppDispatch()
    const setFetched = (projects: Project[]) => dispatch(
        projectActions.setFetched({ projects })
    )
    const projects = useAppSelector(state => state.project.items)
    const fetchImages = async () => {
        const response = await axios.get(baseUrl);
        const projects = await getProjects()
        setFetched(projects);
        setOrder(projects ? projects.length : 0)
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
        <div className="w-full p-4 mt-10">
            {!isLoading ? <>
                <AddImageEntityMenu
                    name='Проекты'
                    title={title}
                    description={description}
                    order={order}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setOrder={setOrder}
                    setFile={setFile}
                    editId={editId}
                    handleUpdate={handleUpdate}
                    handleSubmit={handleSubmit}
                />

                <div className="flex flex-wrap gap-4 justify-center">
                    {projects && projects.length && [...projects]
                        .sort((a, b) => a.order_number - b.order_number)
                        .map((project) => (
                            <Card
                                key={project.id}
                                id={project.id}
                                url={project.url}
                                title={project.title}
                                description={project.description}
                                model={SModel.PROJECTS}
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
