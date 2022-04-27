import { Tech } from './challenge.model';

export enum ResourceGroupName {
  LEARNING = 'Learning',
  WORKFLOW = 'Workflow',
  LAUNCHING = 'Launching',
}

export enum ResourceTypeName {
  ONLINE_COURSES = 'Online Courses',
  INTERACTIVE_TUTORIALS = 'Interactive Tutorials',
  PROBLEM_SOLVING = 'Problem Solving',
  READING = 'Reading',
  VIDEOS = 'Videos',
  PODCASTS = 'Podcasts',
  BLOGS_COMMUNITIES = 'Blogs & Communities',
  DEVELOPMENT_TOOLS = 'Development Tools',
  FRAMEWORKS_LIBRARIES = 'Frameworks & Libraries',
  RESOURCES = 'Resources',
  TYPOGRAPHY = 'Typography',
  COLORS = 'Colors',
  MEDIA = 'Media',
  GRAPHICS = 'Graphics',
  INSPIRATION = 'Inspiration',
  UTILITIES = 'Utilities',
  TESTING_ANALYTICS = 'Testing & Analytics',
  DEPLOYMENT = 'Deployment',
  REPORTING = 'Reporting',
}

export interface ResourceGroup {
  name: ResourceGroupName;
  types: ResourceType[];
}

export interface ResourceType {
  name: ResourceTypeName;
  resources: Resource[];
}

export interface Resource {
  resouce_id: number;
  resourceType: ResourceTypeName;
  resourceGroup: ResourceGroupName;
  name: string;
  description: string;
  price?: string;
  techStacks: Tech[];
  href: string;
  image: string;
  isAffiliate?: boolean;
}

export const identifyResource = (index: number, resource: Resource) => {
  return resource.resouce_id;
};

export const identifyResourceGroup = (index: number, group: ResourceGroup) => {
  return group.name;
};

export const identifyResourceType = (index: number, type: ResourceType) => {
  return type.name;
};
