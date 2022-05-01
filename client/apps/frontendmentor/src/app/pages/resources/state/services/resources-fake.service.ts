import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from '../../../../shared';
import { ResourcesService } from './resources.service';

@Injectable({ providedIn: 'root' })
export class ResourcesFakeService implements ResourcesService {
  constructor(private readonly _http: HttpClient) {}
  /**
   * - Load All Resources
   */
  getAllResources(): Observable<Resource[]> {
    return this._http.get<Resource[]>('/assets/data/resources.json');
  }
}
