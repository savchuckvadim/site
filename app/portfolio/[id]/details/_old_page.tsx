'use server';

import { PortfolioPage } from "@/modules/pages/portfolio";



export default async function Portfolio() {
  

  return (
    <div className="relative flex flex-col items-center justify-start min-w-screen min-h-screen">
      <PortfolioPage  />
    </div>

  );
}
