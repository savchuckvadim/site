import { Project } from "@/modules/admin/widgetes/portfolio/ui/Portfolio";
import HomePage from "@/modules/pages/home/ui/Home";
import { supaAPI } from "@/modules/services";
import { SModel } from "@/modules/services/db/supabase/model";


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

export default async function Home() {
  const images = await getImages();
  const orderedImages = images.sort((a, b) => a.order_number - b.order_number)
  return (


    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    <div className="relative flex flex-col items-center justify-start min-w-screen min-h-screen">

      {/* <Hero image={orderedImages[0]} />
       */}
      <HomePage url={orderedImages[0]?.url} projects={orderedImages} />
    </div>
    //   </main>

    // </div>
  );
}
