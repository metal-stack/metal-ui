import AlertHint from "@/components/ui/alert/AlertHint";
import LoadingScreen from "@/components/ui/loading-screen/loading-screen";
import { useQuery } from "@connectrpc/connect-query";
import {
  Project,
  ProjectService,
} from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { createContext, useContext, useEffect, useState } from "react";

type ProjectContextValue = {
  currentProject: Project | undefined;
  projects: Project[];
  setCurrentProject: (project: Project | undefined) => void;
};

const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined
);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useQuery(ProjectService.method.list);

  const projects = data?.projects ?? [];
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );

  useEffect(() => {
    if (!currentProject && projects.length > 0) {
      setCurrentProject(projects[0]);
    }
  }, [currentProject, projects]);

  if (isLoading && !data) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <AlertHint title="Error loading projects" description={error.message} />
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        projects,
        setCurrentProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject(): ProjectContextValue {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }

  return context;
}
