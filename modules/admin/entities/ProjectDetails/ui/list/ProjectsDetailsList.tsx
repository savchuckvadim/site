'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { SModel } from '@/modules/services/db/supabase/model';
import { AddImageEntityMenu, Card } from '@/modules/admin/shared';
import { useAppDispatch, useAppSelector } from '@/modules/app';

import { Project } from '../../../Project/type/project-type';
// import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import { getProjects } from '../../../Project/lib/helper';
import { fetchProjects } from '../../../Project/model/ProjectThunk';





export default function ProjectsDetailsList() {
    const dispatch = useAppDispatch();

    const params = useParams() as { id: string };

    const projectId = Number(params['id']);

    const [images, setImages] = useState<Project[]>([]);

    const [title, setTitle] = useState('');

    // const [baseUrl, setBaseUrl] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [editId, setEditId] = useState<number | null>(null);

    const [project, setProject] = useState<any>(null);

    const projectsState = useAppSelector((state) => state.project);
    console.log(projectsState)
    const projects = useAppSelector((state) => state.project.items);

    // 📝 Асинхронная функция загрузки проектов
    const loadProjects = async () => {
        try {
            if (!projects || projects.length === 0) {
                await dispatch(fetchProjects());
            }
            const foundProject = projects.find((p) => p.id === projectId);
            if (foundProject) {
                setProject(foundProject);
            }
        } catch (error) {
            console.error('Ошибка при загрузке проектов:', error);
        }

    };




    const baseUrl = `/api/project/${projectId}/${SModel.PROJECT_DETAILS}`
    const uploadUrl = `/api/upload/project/${projectId}/${SModel.PROJECT_DETAILS}`;

    const fetchDetails = async () => {
        if (!baseUrl) return;
        const response = await axios.get(baseUrl);

        const imgs = response.data

        setImages(imgs);
        setOrder(imgs ? imgs.length : 0)
    };

    // fetchDetails();

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
            await fetchDetails()

        } catch (error) {

            alert('Ошибка при добавлении');
        }
        setIsLoading(false)

    };

    const handleDelete = async (id: number) => {
        await axios.delete(baseUrl, { data: { id } });
        fetchDetails();
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
            await fetchDetails();
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
        let isMounted = true;

        async function initializeData() {
            if (isMounted) {
                await loadProjects();
                await fetchDetails();
            }
        }

        initializeData();

        return () => {
            isMounted = false;
        };
    }, [projectId]);
    useEffect(() => {
        let isMounted = true;

        async function initializeData() {
            if (isMounted && !project) {
                await loadProjects();
            }
        }

        initializeData();

        return () => {
            isMounted = false;
        };
    }, [projects]);

    return (
        <div className="p-4 mt-10">
            {!isLoading && project ? <>

                <AddImageEntityMenu
                    name={`Детали проекта ${project?.title}`}
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
                    {images && images.length && images
                        .sort((a, b) => a.order_number - b.order_number)
                        .map((image) => (
                            <Card
                                key={image.id}
                                id={image.id}
                                url={image.url}
                                title={image.title}
                                description={image.description}
                                model={SModel.PROJECTS}
                                childrenModel={'details'}
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
