import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../models';
import { DashboardService } from './dashboard.service';

/**
 * - Dashboard Impl Service
 */
@Injectable({ providedIn: 'root' })
export class DashboardImplService implements DashboardService {
  constructor(private readonly _http: HttpClient) {}

  /**
   * - Get Dashboard
   * @returns
   */
  getDashboard(): Observable<Dashboard> {
    throw new Error('Method not implemented.');
  }
}
