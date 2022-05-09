import { Item } from './item.model';

export interface Cart {
  items: { [key: string]: Item };
}
