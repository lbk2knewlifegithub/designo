// import { Inject, Injectable } from "@angular/core";
// import { LOCAL_STORAGE_TOKEN } from "@frontend/constants";
// import { CreateInvoiceDto, UpdateInvoiceDto } from "@frontend/dto";
// import { Invoice } from "@lbk/models";
// import * as frontStubs from "@lbk/stubs";
// import { map, Observable, of, tap, throwError } from "rxjs";

// @Injectable({ providedIn: "root" })
// export class InvoicesStorageService implements InvoicesService {
//   private invoicesStorageKey = "invoices";

//   supported(): Observable<boolean> {
//     return this.storage !== null
//       ? of(true)
//       : throwError(() => "Local Storage Not Supported");
//   }

//   constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}

//   getInvoices(): Observable<Invoice[]> {
//     return this.supported().pipe(
//       map((_) => this.storage.getItem(this.invoicesStorageKey)),
//       map((value: string | null) =>
//         value ? JSON.parse(value) : frontStubs.invoicesStub()
//       )
//     );
//   }

//   retrieveInvoice(id: number): Observable<Invoice> {
//     return this.getInvoices().pipe(
//       map((invoices) => invoices.find((invoice) => invoice.id === id)),
//       tap((invoice) => {
//         if (!invoice) throw new Error("Not founded");
//       }),
//       map((invoice) => invoice!)
//     );
//   }

//   deleteInvoice(id: number): Observable<Invoice[]> {
//     return this.getInvoices().pipe(
//       map((invoices) => invoices.filter((invoice) => invoice.id !== id)),
//       tap((invoices) => this.save(invoices))
//     );
//   }

//   maskAsPaid(id: number): Observable<Invoice[]> {
//     return this.getInvoices().pipe(
//       map((invoices) =>
//         invoices.map((invoice) =>
//           invoice.id !== id
//             ? invoice
//             : ({ ...invoice, status: "paid" } as Invoice)
//         )
//       ),
//       tap((invoices) => this.save(invoices))
//     );
//   }

//   updateInvoice(
//     id: number,
//     updateInvoiceDto: UpdateInvoiceDto
//   ): Observable<Invoice[]> {
//     return this.getInvoices().pipe(
//       map((invoices) =>
//         invoices.map((invoice) =>
//           invoice.id !== id
//             ? invoice
//             : ({ ...invoice, ...updateInvoiceDto } as Invoice)
//         )
//       ),
//       tap((invoices) => this.save(invoices))
//     );
//   }
//   private createId(): Observable<number> {
//     // const tmp = ["l", "b", "k", "b", "a", "n"];
//     // let result = "";

//     // while (result.length !== 6) {
//     //   if (Math.random() > 0.5) {
//     //     result += tmp[Math.floor(Math.random() * tmp.length)];
//     //     continue;
//     //   }

//     //   result += Math.floor(Math.random() * 10);
//     // }

//     // return result;
//     return this.getInvoices().pipe(map((invoices) => invoices.length));
//   }

//   createInvoice(createInvoiceDto: CreateInvoiceDto): Observable<Invoice> {
//     return this.getInvoices().pipe(
//       map((invoices) => [
//         { ...createInvoiceDto, id: invoices.length },
//         ...invoices,
//       ]),
//       tap((invoices) => this.save(invoices)),
//       map((invoices) => invoices[0])
//     );
//   }

//   private save(invoices: Invoice[]) {
//     this.storage.setItem(this.invoicesStorageKey, JSON.stringify(invoices));
//   }
// }
