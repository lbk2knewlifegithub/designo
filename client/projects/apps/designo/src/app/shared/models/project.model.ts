export type ProjectName = 'Web Design' | 'App Design' | 'Graphic Design';
export type ProjectSlug = 'web-design' | 'app-design' | 'graphic-design';

export interface ProjectsGallery {
  name: ProjectName;
  slug: ProjectSlug;
  description: string;
  projects: Project[];
}

export interface Project {
  name: string;
  description: string;
  image: string;
}

export const identifyProject = (index: number, project: Project) => {
  return project.name;
};
