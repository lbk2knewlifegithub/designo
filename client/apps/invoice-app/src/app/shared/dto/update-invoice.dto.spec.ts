import { Item } from '../models';
import { EvaluateItems } from './update-invoice.dto';

describe('Update Invoice DTO', () => {
  let oldItems: Item[];

  beforeEach(() => {
    oldItems = [
      {
        item_id: 1,
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.9,
      },
      {
        item_id: 2,
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.9,
      },
      {
        item_id: 3,
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.9,
      },
    ];
  });

  describe('Evaluate', () => {
    it('Should return {} when not deleted, updated, added', () => {
      const itemsDTO = EvaluateItems.evaluate(oldItems, oldItems);
      expect(itemsDTO.deleted).toBeUndefined();
    });

    it.only('Should return {} when not deleted, updated, added', () => {
      const newItems = [
        {
          item_id: '',
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
      ];

      const itemsDTO = EvaluateItems.evaluate(newItems, []);
      console.log(itemsDTO);
      expect(itemsDTO.deleted).toBeUndefined();
    });

    it('Should return {deleted: [1, 2, 3]} when all items deleted', () => {
      expect(EvaluateItems.evaluate([], oldItems)).toMatchObject({
        deleted: [1, 2, 3],
      });
    });

    it('Should return {deleted: [3]} when all item three deleted', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          item_id: 2,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
      ];

      expect(EvaluateItems.evaluate(newItems, oldItems)).toMatchObject({
        deleted: [3],
      });
    });

    it('Should return {deleted: [1, 2]} when item one, item two deleted', () => {
      const newItems = [
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
      ];

      expect(EvaluateItems.evaluate(newItems, oldItems)).toMatchObject({
        deleted: [1, 2],
      });
    });

    it('Should return {} when not added', () => {
      const itemsDTO = EvaluateItems.evaluate(oldItems, oldItems);

      expect(itemsDTO.added).toBeUndefined();
    });

    it('Should return {added: [new_item]} when new_item is added', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },

        {
          item_id: 2,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          name: 'NEW ITEM',
          quantity: 22,
          price: 1800.9,
        },
      ];

      expect(EvaluateItems.evaluate(newItems, oldItems)).toMatchObject({
        added: [
          {
            name: 'NEW ITEM',
            quantity: 22,
            price: 1800.9,
          },
        ],
      });
    });

    it('Should return {added: [new_item, another_new_item]} when new_item, another_item is added', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },

        {
          item_id: 2,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          name: 'NEW ITEM',
          quantity: 22,
          price: 1800.9,
        },
        {
          name: 'ANOTHER NEW ITEM',
          quantity: 8888,
          price: 999,
        },
      ];

      expect(EvaluateItems.evaluate(newItems, oldItems)).toMatchObject({
        added: [
          {
            name: 'NEW ITEM',
            quantity: 22,
            price: 1800.9,
          },
          {
            name: 'ANOTHER NEW ITEM',
            quantity: 8888,
            price: 999,
          },
        ],
      });
    });

    it('Should return {} when not updated', () => {
      const itemsDTO = EvaluateItems.evaluate(oldItems, oldItems);
      expect(itemsDTO.updated).toBeUndefined();
    });

    it('Should return {updated: [update_item1]} when item1 is updated', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'UPDATED NAME',
          quantity: 1,
          price: 1800.9,
        },
        {
          item_id: 2,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
      ];

      expect(EvaluateItems.evaluate(newItems, oldItems)).toMatchObject({
        updated: [
          {
            item_id: 1,
            name: 'UPDATED NAME',
            quantity: 1,
            price: 1800.9,
          },
        ],
      });
    });

    it('Should return {updated: [update_item1, update_item_2]} when item1, item2 is updated', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'UPDATED NAME 1',
          quantity: 33333,
          price: 1800.9,
        },
        {
          item_id: 2,
          name: 'UPDATED NAME 2',
          quantity: 1,
          price: 9999,
        },
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
      ];

      expect(EvaluateItems.evaluate(newItems, oldItems)).toMatchObject({
        updated: [
          {
            item_id: 1,
            name: 'UPDATED NAME 1',
            quantity: 33333,
            price: 1800.9,
          },
          {
            item_id: 2,
            name: 'UPDATED NAME 2',
            quantity: 1,
            price: 9999,
          },
        ],
      });
    });

    it('Should return {added: [added1, added2], updated: [update_item1, update_item_2]} when item1, item2 is updated, and added item4, item5', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'UPDATED NAME 1',
          quantity: 33333,
          price: 1800.9,
        },
        {
          item_id: 2,
          name: 'UPDATED NAME 2',
          quantity: 1,
          price: 9999,
        },
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          name: 'NEW ITEM 4',
          quantity: 1,
          price: 1800.9,
        },
        {
          name: 'NEW ITEM 5',
          quantity: 1,
          price: 1800.9,
        },
      ];

      expect(EvaluateItems.evaluate(newItems, oldItems)).toMatchObject({
        added: [
          {
            name: 'NEW ITEM 4',
            quantity: 1,
            price: 1800.9,
          },
          {
            name: 'NEW ITEM 5',
            quantity: 1,
            price: 1800.9,
          },
        ],

        updated: [
          {
            item_id: 1,
            name: 'UPDATED NAME 1',
            quantity: 33333,
            price: 1800.9,
          },
          {
            item_id: 2,
            name: 'UPDATED NAME 2',
            quantity: 1,
            price: 9999,
          },
        ],
      });
    });

    it('Should return {added: [added1]} when ', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'UPDATED NAME 1',
          quantity: 33333,
          price: 1800.9,
        },
        {
          item_id: 2,
          name: 'UPDATED NAME 2',
          quantity: 1,
          price: 9999,
        },
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          name: 'NEW ITEM 4',
          quantity: 1,
          price: 1800.9,
        },
        {
          name: 'NEW ITEM 5',
          quantity: 1,
          price: 1800.9,
        },
      ];

      expect(EvaluateItems.evaluate(newItems, oldItems)).toMatchObject({
        added: [
          {
            name: 'NEW ITEM 4',
            quantity: 1,
            price: 1800.9,
          },
          {
            name: 'NEW ITEM 5',
            quantity: 1,
            price: 1800.9,
          },
        ],

        updated: [
          {
            item_id: 1,
            name: 'UPDATED NAME 1',
            quantity: 33333,
            price: 1800.9,
          },
          {
            item_id: 2,
            name: 'UPDATED NAME 2',
            quantity: 1,
            price: 9999,
          },
        ],
      });
    });

    it('Should return {deleted:[1, 2] added: [added1, added2], updated: [update_item1]} ', () => {
      const newItems = [
        {
          item_id: 3,
          name: 'UPDATED ITEM 3',
          quantity: 1,
          price: 1800.9,
        },

        {
          name: 'NEW ITEM 4',
          quantity: 1,
          price: 1800.9,
        },
        {
          name: 'NEW ITEM 5',
          quantity: 1,
          price: 1800.9,
        },
      ];

      expect(EvaluateItems.evaluate(newItems, oldItems)).toMatchObject({
        deleted: [1, 2],
        added: [
          {
            name: 'NEW ITEM 4',
            quantity: 1,
            price: 1800.9,
          },
          {
            name: 'NEW ITEM 5',
            quantity: 1,
            price: 1800.9,
          },
        ],
        updated: [
          {
            item_id: 3,
            name: 'UPDATED ITEM 3',
            quantity: 1,
            price: 1800.9,
          },
        ],
      });
    });
  });

  describe('Added', () => {
    it('Should return added 1 item added ', () => {
      const newItems = [
        {
          name: 'new Item',
          quantity: 1,
          price: 1,
        },
      ];

      expect(EvaluateItems.evaluateAdded(newItems)).toEqual([
        {
          name: 'new Item',
          quantity: 1,
          price: 1,
        },
      ]);
    });

    it('Should return added 2 item added ', () => {
      const newItems = [
        {
          name: 'new Item',
          quantity: 1,
          price: 1,
        },
        {
          name: 'new Item2',
          quantity: 1,
          price: 1,
        },
      ];
      expect(EvaluateItems.evaluateAdded(newItems)).toEqual([
        {
          name: 'new Item',
          quantity: 1,
          price: 1,
        },
        {
          name: 'new Item2',
          quantity: 1,
          price: 1,
        },
      ]);
    });
  });

  describe('Deleted', () => {
    it('Should return [1, 2, 3]', () => {
      expect(EvaluateItems.evaluateDeleted([], oldItems)).toEqual([1, 2, 3]);
    });

    it('Should return [1]', () => {
      const newItems = [
        {
          item_id: 2,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
      ];
      expect(EvaluateItems.evaluateDeleted(newItems, oldItems)).toEqual([1]);
    });

    it('Should return [1, 3]', () => {
      const newItems = [
        {
          item_id: 2,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
      ];
      expect(EvaluateItems.evaluateDeleted(newItems, oldItems)).toEqual([1, 3]);
    });

    it('Should return [3]', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
        {
          item_id: 2,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
        },
      ];

      expect(EvaluateItems.evaluateDeleted(newItems, oldItems)).toEqual([3]);
    });
  });

  describe('Updated', () => {
    it('Should return [] when not items updated', () => {
      expect(EvaluateItems.evaluateUpdated([], oldItems)).toEqual([]);
    });

    it('Should return one when item one updated name ', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'Updated',
          quantity: 1,
          price: 1800.9,
        },
      ];
      expect(EvaluateItems.evaluateUpdated(newItems, oldItems)).toEqual([
        {
          item_id: 1,
          name: 'Updated',
          quantity: 1,
          price: 1800.9,
        },
      ]);
    });

    it('Should return two items when item one updated name,item two price', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'Updated Name',
          quantity: 1,
          price: 1800.9,
        },

        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 33232,
        },
      ];
      expect(EvaluateItems.evaluateUpdated(newItems, oldItems)).toEqual([
        {
          item_id: 1,
          name: 'Updated Name',
          quantity: 1,
          price: 1800.9,
        },

        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 33232,
        },
      ]);
    });

    it('Should return three items when item one updated name,item two price, item three update quantity', () => {
      const newItems = [
        {
          item_id: 1,
          name: 'Updated Name',
          quantity: 1,
          price: 1800.9,
        },

        {
          item_id: 2,
          name: 'Brand Guidelines',
          quantity: 9999999,
          price: 33232,
        },
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 9999999,
        },
      ];
      expect(EvaluateItems.evaluateUpdated(newItems, oldItems)).toEqual([
        {
          item_id: 1,
          name: 'Updated Name',
          quantity: 1,
          price: 1800.9,
        },

        {
          item_id: 2,
          name: 'Brand Guidelines',
          quantity: 9999999,
          price: 33232,
        },
        {
          item_id: 3,
          name: 'Brand Guidelines',
          quantity: 1,
          price: 9999999,
        },
      ]);
    });
  });
});
