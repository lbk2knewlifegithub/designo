import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE_TOKEN } from '@lbk/tokens';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeKey = 'darkTheme';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  /**
   * - Get Theme
   */
  getTheme(): Observable<boolean> {
    return this.supported().pipe(
      map(() => this.storage.getItem(this.themeKey)),
      map((value: string | null) => (value ? JSON.parse(value) : false))
    );
  }

  /**
   * - To Dark Theme
   */
  toDarkTheme() {
    this.storage.setItem(this.themeKey, 'true');
    if (document.body.classList.contains('dark')) return;
    document.body.classList.add('dark');
  }

  /**
   * - To Light Theme
   */
  toLightTheme() {
    this.storage.setItem(this.themeKey, 'false');
    if (!document.body.classList.contains('dark')) return;
    document.body.classList.remove('dark');
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}
}
