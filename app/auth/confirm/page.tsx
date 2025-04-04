'use client';

import { ConfirmForm } from "@/modules/admin/processes";
import { Suspense } from "react";
export const dynamic = 'force-dynamic';

export default function Confirm() {


  return (
    <div className="flex items-center justify-center h-screen">
       <Suspense fallback={<div>Загрузка...</div>}>
        <ConfirmForm />
      </Suspense>
    </div>
  );
}
