import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
} from 'rxjs/operators';

export enum Breakpoint {
  '2xl' = '(min-width: 1440px)',
  'xl' = '(min-width: 1280px)',
  'lg' = '(min-width: 1024px)',
  'md' = '(min-width: 768px)',
  'sm' = '(min-width: 640px)',
  'xs' = '(min-width: 0px)',
}

const QUERY: Map<string, string> = new Map([
  ['2xl', '(min-width: 1440px)'],
  ['xl', '(min-width: 1280px)'],
  ['lg', '(min-width: 1024px)'],
  ['md', '(min-width: 768px)'],
  ['sm', '(min-width: 640px)'],
  ['xs', '(min-width: 0px)'],
]);

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private _size$: Observable<string>;

  constructor() {
    this._size$ = fromEvent(window, 'resize').pipe(
      startWith(this._getScreenSize()),
      map(() => this._getScreenSize()),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  public get size$(): Observable<string> {
    return this._size$;
  }

  private _getScreenSize(): string {
    const [[newSize = 'never']] = Array.from(QUERY.entries()).filter(
      ([, mediaQuery]) => window.matchMedia(mediaQuery).matches
    );
    return newSize;
  }
}
