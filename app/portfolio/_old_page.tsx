
// 'use server';
// import { Project } from "@/modules/admin/widgetes/portfolio/ui/Portfolio";
// import { createSupabaseServerClient } from "@/modules/services/db/supabase/model/supabaseServer";
// import FullSlider from "@/modules/shared/slider/ui/FullSlider";

// interface ProjectDetails extends Project {
//   project_details: Project[]
// }
// async function getDetails(parentId: number): Promise<ProjectDetails | null> {
//   try {
//     
//     // const response = await supaAPI.getByRelation(SModel.PROJECT_DETAILS, SModel.PROJECT, parentId);
//     const supabase = await createSupabaseServerClient()
//     const { data, error } = await supabase
//       .from('projects')
//       .select(`
//       *, 
//       project_details(*)
//     `)
//       .eq('id', parentId)
//       .single();  // Получаем один проект вместе с деталями

//     if (error) {
//       console.log('createSupabaseServerClient data')
//       console.log(data)
//       console.log(error)
//     }
//     if (data) {
//       // console.log('createSupabaseServerClient data')
//       // console.log(data)
//       return data
//     }


//     

//     return null;
//   } catch (error) {
//     
//     console.error("Ошибка загрузки изображений:", error);
//     return null;
//   }
// }
// export default async function PortfolioDetails({ params }: { params: Promise<{ id: string }> }) {

//   const { id } = await params;
//   const projectId = Number(id);
//   const data = await getDetails(projectId);
//   console.log('details data')
//   console.log(projectId)

//   console.log(data)
//   if (data) {
//     const orderedImages = data?.project_details.sort((a, b) => a.order_number - b.order_number)

//     return (
//       <div className="relative flex flex-col items-center justify-start min-w-screen min-h-screen">

//         <FullSlider images={orderedImages} withNames={false} oneTitle={data.title} />
//       </div>

//     );
//   }

//   return (
//     <div className="relative flex flex-col items-center justify-start min-w-screen min-h-screen">
//       <h1 className="mt-20">
//         details not found

//       </h1>
//     </div>

//   );
// }

// Серверная функция для статической генерации страницы
// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const response = await axios.get(baseUrl) as { data: Project[] };
//     const images = response.data;

//     return {
//       props: {
//         images,
//       },
//       revalidate: 60, // Обновляем каждые 60 секунд
//     };
//   } catch (error) {
//     console.error('Ошибка загрузки изображений:', error);
//     return {
//       props: {
//         images: [],
//       },
//     };
//   }
// };
