import { Image } from './image.model';

export interface Link {
  href: string;
  name: string;
  image?: Image;
}

export const identifyLink = (index: number, link: Link) => {
  return link.name;
};
