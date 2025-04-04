'use server';
// import Chat from "@/modules/entities/Chat/ui/Chat";
import { Project } from "@/modules/admin/widgetes/portfolio/ui/Portfolio";
import { supaAPI } from "@/modules/services";
import { SModel } from "@/modules/services/db/supabase/model";
import { HeroSlider } from "@/modules/shared";

async function getImages(): Promise<Project[]> {
  try {
    const response = await supaAPI.getAll(SModel.PROJECTS);
    if (response) {
      const result = response as Project[];
      return result;
    }
    return [];
  } catch (error) {
    console.error("Ошибка загрузки изображений:", error);
    return [];
  }
}
export default async function Portfolio() {
  const images = await getImages();
  const orderedImages = images.sort((a, b) => a.order_number - b.order_number)

  return (
    <div className="relative flex flex-col items-center justify-start min-w-screen min-h-screen">
      <HeroSlider images={orderedImages} />
    </div>

  );
}

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
