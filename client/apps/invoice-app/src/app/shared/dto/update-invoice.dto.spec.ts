import { Invoice, InvoiceStatus } from '../models';
import { EvaluateItems } from './update-invoice.dto';

describe('Update Invoice DTO', () => {
  let oldInvoice: Invoice;

  beforeEach(() => {
    oldInvoice = {
      invoice_id: 1,
      createdAt: '2021-08-18',
      description: 'Re-branding',
      paymentTerms: 1,
      clientName: 'Jensen Huang',
      clientEmail: 'jensenh@mail.com',
      status: InvoiceStatus.PAID,
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '106 Kendell Street',
        city: 'Sharrington',
        postCode: 'NR24 5WQ',
        country: 'United Kingdom',
      },
      items: [
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
      ],
    };
  });

  describe('Evaluate', () => {
    it('Should return {} when not deleted', () => {
      const newInvoice = {
        ...oldInvoice,
      };

      const itemsDTO = EvaluateItems.evaluate(
        newInvoice.items,
        oldInvoice.items
      );
      expect(itemsDTO.deleted).toBeUndefined();
    });

    it('Should return {deleted: [1, 2, 3]} when all items deleted', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [],
      };

      expect(
        EvaluateItems.evaluate(newInvoice.items, oldInvoice.items)
      ).toMatchObject({
        deleted: [1, 2, 3],
      });
    });

    it('Should return {deleted: [3]} when all item three deleted', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };

      expect(
        EvaluateItems.evaluate(newInvoice.items, oldInvoice.items)
      ).toMatchObject({
        deleted: [3],
      });
    });

    it('Should return {deleted: [1, 2]} when item one, item two deleted', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
          {
            item_id: 3,
            name: 'Brand Guidelines',
            quantity: 1,
            price: 1800.9,
          },
        ],
      };

      expect(
        EvaluateItems.evaluate(newInvoice.items, oldInvoice.items)
      ).toMatchObject({
        deleted: [1, 2],
      });
    });

    it('Should return {} when not added', () => {
      const newInvoice = {
        ...oldInvoice,
      };

      const itemsDTO = EvaluateItems.evaluate(
        newInvoice.items,
        oldInvoice.items
      );
      expect(itemsDTO.added).toBeUndefined();
    });

    it('Should return {added: [new_item]} when new_item is added', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };

      expect(
        EvaluateItems.evaluate(newInvoice.items, oldInvoice.items)
      ).toMatchObject({
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
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };

      expect(
        EvaluateItems.evaluate(newInvoice.items, oldInvoice.items)
      ).toMatchObject({
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
      const newInvoice = {
        ...oldInvoice,
      };

      const itemsDTO = EvaluateItems.evaluate(
        newInvoice.items,
        oldInvoice.items
      );
      expect(itemsDTO.updated).toBeUndefined();
    });

    it('Should return {updated: [update_item1]} when item1 is updated', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };

      expect(
        EvaluateItems.evaluate(newInvoice.items, oldInvoice.items)
      ).toMatchObject({
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
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };

      expect(
        EvaluateItems.evaluate(newInvoice.items, oldInvoice.items)
      ).toMatchObject({
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
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };

      expect(
        EvaluateItems.evaluate(newInvoice.items, oldInvoice.items)
      ).toMatchObject({
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
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };

      expect(
        EvaluateItems.evaluate(newInvoice.items, oldInvoice.items)
      ).toMatchObject({
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
      const newInvoice = {
        ...oldInvoice,
        items: [
          ...oldInvoice.items,
          {
            name: 'new Item',
            quantity: 1,
            price: 1,
          },
        ],
      };
      expect(EvaluateItems.evaluateAdded(newInvoice.items)).toEqual([
        {
          name: 'new Item',
          quantity: 1,
          price: 1,
        },
      ]);
    });

    it('Should return added 2 item added ', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
          ...oldInvoice.items,
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
        ],
      };
      expect(EvaluateItems.evaluateAdded(newInvoice.items)).toEqual([
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
      const newInvoice = {
        ...oldInvoice,
        items: [],
      };
      expect(
        EvaluateItems.evaluateDeleted(newInvoice.items, oldInvoice.items)
      ).toEqual([1, 2, 3]);
    });

    it('Should return [1]', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };
      expect(
        EvaluateItems.evaluateDeleted(newInvoice.items, oldInvoice.items)
      ).toEqual([1]);
    });

    it('Should return [1, 3]', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
          {
            item_id: 2,
            name: 'Brand Guidelines',
            quantity: 1,
            price: 1800.9,
          },
        ],
      };
      expect(
        EvaluateItems.evaluateDeleted(newInvoice.items, oldInvoice.items)
      ).toEqual([1, 3]);
    });

    it('Should return [3]', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };
      expect(
        EvaluateItems.evaluateDeleted(newInvoice.items, oldInvoice.items)
      ).toEqual([3]);
    });
  });

  describe('Updated', () => {
    it('Should return [] when not items updated', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [],
      };
      expect(
        EvaluateItems.evaluateUpdated(newInvoice.items, oldInvoice.items)
      ).toEqual([]);
    });

    it('Should return one when item one updated name ', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
          {
            item_id: 1,
            name: 'Updated',
            quantity: 1,
            price: 1800.9,
          },
        ],
      };
      expect(
        EvaluateItems.evaluateUpdated(newInvoice.items, oldInvoice.items)
      ).toEqual([
        {
          item_id: 1,
          name: 'Updated',
          quantity: 1,
          price: 1800.9,
        },
      ]);
    });

    it('Should return two items when item one updated name,item two price', () => {
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };
      expect(
        EvaluateItems.evaluateUpdated(newInvoice.items, oldInvoice.items)
      ).toEqual([
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
      const newInvoice = {
        ...oldInvoice,
        items: [
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
        ],
      };
      expect(
        EvaluateItems.evaluateUpdated(newInvoice.items, oldInvoice.items)
      ).toEqual([
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
