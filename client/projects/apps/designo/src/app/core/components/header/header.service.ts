import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private readonly _shown = new BehaviorSubject(false);
  get shown() {
    return this._shown.getValue();
  }
  set shown(shown: boolean) {
    this._shown.next(shown);
  }

  shown$ = this._shown.asObservable();

  toggle() {
    this._shown.next(!this.shown);
  }
}
