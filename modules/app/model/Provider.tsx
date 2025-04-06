"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import AppInitializer from "./AppInitializer";
import { ProjectsProvider } from "@/modules/entities/Project";


export function Providers({ children }: { children: React.ReactNode }) {

  return <Provider store={store}>
    <AppInitializer>
      <ProjectsProvider>
        {children}
      </ProjectsProvider>
    </AppInitializer>
  </Provider>;
}
