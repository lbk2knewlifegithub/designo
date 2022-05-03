import { Observable } from 'rxjs';
import { ResourceGroup } from '@lbk/fm/shared';

export interface ResourcesService {
  /**
   * - Get Resources Group
   */
  getResourcesGroup(): Observable<ResourceGroup[]>;
}
