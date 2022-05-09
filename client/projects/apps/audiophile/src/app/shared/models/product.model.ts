import { Image } from '@lbk/models';

export interface Gallery {
  first: Image;
  second: Image;
  third: Image;
}

export interface OtherProduct {
  slug: string;
  name: string;
  image: Image;
}

export interface Include {
  quantity: number;
  item: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  image: Image;
  category: string;
  categoryImage: Image;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: Include[];
  gallery: Gallery;
  others: OtherProduct[];
}
