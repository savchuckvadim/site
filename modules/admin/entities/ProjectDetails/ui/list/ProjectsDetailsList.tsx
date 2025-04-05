'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { SModel } from '@/modules/services/db/supabase/model';
import { AddImageEntityMenu, Card } from '@/modules/admin/shared';
import { useAppDispatch, useAppSelector } from '@/modules/app';

// import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import LoadingScreen from '@/modules/shared/LoadingScreen/ui/LoadingScreen';
import { fetchProjects, Project } from '@/modules/entities/Project';





export default function ProjectsDetailsList() {
    const dispatch = useAppDispatch();

    const params = useParams() as { id: string };

    const projectId = Number(params['id']);

    const [images, setImages] = useState<Project[]>([]);

    const [title, setTitle] = useState('');

    // const [baseUrl, setBaseUrl] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState(0);
    const [file, setFile] = useState<File | null | string>(null);
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




    const baseUrl = `/api/${SModel.PROJECT}/${projectId}/${SModel.PROJECT_DETAILS}`
    const uploadUrl = `/api/upload/project/${projectId}/${SModel.PROJECT_DETAILS}`;
    const uploadUpdateUrl = `/api/upload/${SModel.PROJECT_DETAILS}`;
    const deleteUrl = `/api/${SModel.PROJECT_DETAILS}`

    const fetchDetails = async () => {
        setIsLoading(true)
        if (!baseUrl) return;
        const response = await axios.get(baseUrl);

        const imgs = response.data?.data?.data

        setImages(imgs);
        setOrder(imgs && (imgs.length || imgs.length == 0) ? imgs.length : 0)
        setIsLoading(false)

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
        setIsLoading(true)

        const url = `${deleteUrl}/${id}`
        await axios.delete(url, { data: { id } });
        fetchDetails();
        setIsLoading(false)

    };

    const handleEdit = (detail: Project) => {

        setEditId(detail.id);
        setTitle(detail.title);
        setDescription(detail.description);
        setOrder(detail.order_number);
        setFile(detail.url);
    };

    const handleUpdate = async () => {

        const url = `${uploadUpdateUrl}/${editId}`

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
            await axios.put(url, formData);
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
        <div className="p-4 mt-10  w-full">
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
                    file={editId ? file : null}
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
                : <LoadingScreen />}
        </div>
    );
}
