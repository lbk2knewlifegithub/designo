import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Fame } from '../models';
import { FameTime } from './../models/fame.model';
import { FamesService } from './fames.service';

@Injectable({ providedIn: 'root' })
export class FamesFakeService implements FamesService {
  constructor(private readonly _http: HttpClient) {}

  getFames(time: FameTime): Observable<Fame[]> {
    return this._http
      .get<Fame[]>(`assets/data/fames-${time}.json`)
      .pipe(delay(3000), shareReplay(1));
  }
}
