import { Observable } from 'rxjs';
import { Fame, FameTime } from '../models';

export interface FamesService {
  /**
   * - Get Fames By Fame Time
   * @param time
   */
  getFames(time: FameTime): Observable<Fame[]>;
}
