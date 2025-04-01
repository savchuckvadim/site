import { ProjectsList } from "@/modules/admin/entities/Project";


export default function AdminProjects() {
  return (

    // grid-rows-[20px_1fr_20px] 
    <div className="grid items-start justify-items-center min-h-screen p-0 pb-20 gap-16 bg-background  font-[family-name:var(--font-geist-sans)]">
      <ProjectsList />

    </div>
  );
}
