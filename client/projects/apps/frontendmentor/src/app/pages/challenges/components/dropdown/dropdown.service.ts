import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DropdownService {
  private _shownSortBy = new BehaviorSubject(false);
  /**
   * - Shown Sort By
   */
  get shownSortBy() {
    return this._shownSortBy.value;
  }

  set shownSortBy(value: boolean) {
    this._shownSortBy.next(value);
  }
  shownSortBy$ = this._shownSortBy.asObservable();

  /**
   * - Shown Filter By
   */
  private _shownFilterBy = new BehaviorSubject(false);

  get shownFilterBy() {
    return this._shownFilterBy.value;
  }

  set shownFilterBy(value: boolean) {
    this._shownFilterBy.next(value);
  }
  shownFilterBy$ = this._shownFilterBy.asObservable();

  close() {
    this.shownSortBy = false;
    this.shownFilterBy = false;
  }

  /**
   * - Toggle Sort By
   */
  toggleSortBy() {
    this.shownSortBy = !this.shownSortBy;
    if (this.shownFilterBy) {
      this.shownFilterBy = false;
    }
  }

  /**
   * - Toggle Filter By
   */
  toggleFilterBy() {
    this.shownFilterBy = !this.shownFilterBy;
    if (this.shownSortBy) {
      this.shownSortBy = false;
    }
  }
}
