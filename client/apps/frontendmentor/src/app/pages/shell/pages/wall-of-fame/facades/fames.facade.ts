import { Observable } from 'rxjs';
import { Fame } from '../models';

export interface FamesFacade {
  fames$: Observable<Fame[]>;
  loading$: Observable<boolean | undefined>;
  loaded$: Observable<boolean | undefined>;
  error$: Observable<string | undefined>;
  loadFames: () => void;
}
