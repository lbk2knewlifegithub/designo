import { Component, OnInit } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'lbk-confirm-delete-account-dialog',
  template: `
    <h1 class="font-bold text-xl">One last check! 😅</h1>
    <p class="mt-6">Are you sure you want to do this?</p>

    <p class="mt-6">
      This will permanently delete all of your data and cannot be undone.
    </p>

    <button
      (click)="deleteAccount()"
      class="btn btn-error btn-icon font-bold text-white italic mt-8 px-10"
    >
      YES, DELETE MY ACCOUNT
      <i class="animate-spin fa-solid fa-circle-radiation text-xl ml-4"></i>
    </button>
  `,
  styles: [
    `
      :host {
        @apply pt-10 pb-8 flex flex-col items-center;
      }
    `,
  ],
})
export class ConfirmDeleteAccountDialog {
  constructor(private readonly _ref: DialogRef) {}

  deleteAccount() {
    this._ref.close(true);
  }
}
