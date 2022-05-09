import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceGroup } from '../../../../shared';
import { ResourcesService } from './resources.service';

@Injectable({ providedIn: 'root' })
export class ResourcesFakeService implements ResourcesService {
  constructor(private readonly _http: HttpClient) {}
  /**
   * - Load iResources Groups
   */
  getResourcesGroup(): Observable<ResourceGroup[]> {
    return this._http.get<ResourceGroup[]>('/assets/data/resources.json');
  }
}
