import { Observable } from 'rxjs';
import { Resource } from '../../../../shared';

export interface ResourcesService {
  /**
   * - Get All Resources
   */
  getAllResources(): Observable<Resource[]>;
}
