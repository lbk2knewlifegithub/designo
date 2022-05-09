import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';
import { Dashboard } from '../models';
import { DashboardService } from './dashboard.service';

/**
 * - Dashboard Fake Service
 */
@Injectable({ providedIn: 'root' })
export class DashboardFakeService implements DashboardService {
  constructor(private readonly _http: HttpClient) {}

  /**
   * - Get Dashboard
   * @returns
   */
  getDashboard(): Observable<Dashboard> {
    return this._http
      .get<Dashboard>('/assets/data/dashboard.json')
      .pipe(delay(1000), shareReplay(1));
  }
}
