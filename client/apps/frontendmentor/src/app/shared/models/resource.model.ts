import { TechStack } from './challenge.model';

export interface Resource {
  name: string;
  description: string;
  price?: string;
  techStack: TechStack[];
  href: string;
  image: string;
}
