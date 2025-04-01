'use client'
import { ProjectsDetailsList } from "@/modules/admin/entities/ProjectDetails";


export default function AdminProjectDeatils() {

  return (
    // grid-rows-[20px_1fr_20px] 
    <div className="grid items-start justify-items-center min-h-screen p-0 pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
      <ProjectsDetailsList />


    </div>
  );
}
