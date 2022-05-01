import { Observable } from 'rxjs';
import { Dashboard } from '../models';

/**
 * - Dashboard Service
 */
export interface DashboardService {
  /**
   * - Get Dashboard
   */
  getDashboard(): Observable<Dashboard>;
}
