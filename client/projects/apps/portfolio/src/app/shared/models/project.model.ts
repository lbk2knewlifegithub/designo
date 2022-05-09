export interface Project {
  name: string;
  image: string;
  href: string;
  description: string;
}

export const identifyProject = (index: number, project: Project) => {
  return project.name;
};
