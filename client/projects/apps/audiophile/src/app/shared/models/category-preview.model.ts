import { Image } from '@lbk/models';

export interface CategoryPreview {
  name: string;
  image: Image;
}

export const identifyCategoryPreview = (
  index: number,
  categoryPreview: CategoryPreview
) => {
  return categoryPreview.name;
};
