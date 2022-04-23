import { Invoice, Item, ITEM_KEYS } from '../models';

export type CreateItemDTO = Omit<Item, 'item_id'>;

const CREATE_ITEM_DTO_DEFAULT: CreateItemDTO = {
  name: '',
  price: 1,
  quantity: 1,
};

export const CREATE_ITEM_DTO_KEYS = Object.keys(CREATE_ITEM_DTO_DEFAULT);

export type UpdateItemDTO = Item;

export interface ItemsDTO {
  deleted?: number[];
  added?: CreateItemDTO[];
  updated?: UpdateItemDTO[];
}

export interface UpdateInvoiceDTO extends Omit<Invoice, 'items'> {
  items: ItemsDTO;
}

export class EvaluateItems {
  static evaluate = (
    newItems: (Item | CreateItemDTO)[],
    oldItems: Item[]
  ): ItemsDTO => {
    const evaluatedItems: ItemsDTO = {};

    // Evaluate Items Added

    const added = EvaluateItems.evaluateAdded(newItems);

    if (added.length > 0) {
      evaluatedItems['added'] = added;

      if (oldItems && added.length === oldItems.length) {
        return evaluatedItems;
      }
    }

    // Evaluate Items Delete
    const deleted = EvaluateItems.evaluateDeleted(newItems, oldItems);

    if (deleted.length > 0) {
      evaluatedItems['deleted'] = deleted;

      if (deleted.length === oldItems.length) {
        return evaluatedItems;
      }
    }

    // Evaluate Items Updated
    const updated: UpdateItemDTO[] = EvaluateItems.evaluateUpdated(
      newItems,
      oldItems
    );

    if (updated.length > 0) {
      evaluatedItems['updated'] = updated;
    }

    return evaluatedItems;
  };

  /**
   *  - Evaluate Deleted
   * @param newItems
   * @param oldItems
   * @returns
   */
  static evaluateDeleted(
    newItems: (Item | CreateItemDTO)[],
    oldItems: Item[]
  ): number[] {
    /**
     * - New Items Id
     */
    const newItemsId = newItems
      .filter((it) => Object.keys(it).every((i) => ITEM_KEYS.includes(i)))
      .map((it) => (it as Item).item_id);

    /**
     * - Old Items Id
     */
    const oldItemsId = oldItems.map((it) => it.item_id);

    return oldItemsId.filter((oldId) => !newItemsId.includes(oldId));
  }

  /**
   *  - Evaluate Added
   * @param newItems
   * @param oldItems
   * @returns
   */
  static evaluateAdded(newItems: (Item | CreateItemDTO)[]): CreateItemDTO[] {
    return newItems.filter((it) =>
      Object.keys(it).every((i) => CREATE_ITEM_DTO_KEYS.includes(i))
    );
  }

  /**
   *  - Evaluate Updated
   * @param newItems
   * @param oldItems
   * @returns
   */
  static evaluateUpdated(
    newItems: (Item | CreateItemDTO)[],
    oldItems: Item[]
  ): UpdateItemDTO[] {
    const banana = newItems.filter(
      (it) => !Object.keys(it).every((i) => CREATE_ITEM_DTO_KEYS.includes(i))
    ) as Item[];

    return banana.filter((it) => {
      const tmp = oldItems.find((oldItem) => oldItem.item_id == it.item_id);

      return JSON.stringify(tmp) !== JSON.stringify(it);
    }) as unknown as UpdateItemDTO[];
  }
}
