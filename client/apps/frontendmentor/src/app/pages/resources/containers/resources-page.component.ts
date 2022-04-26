import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  identifyResourceSummary,
  ResourceSummary,
  ResourceGroup,
  ResourceType,
} from '../../../shared';
import { ResourcesFacade } from '../state';

@Component({
  selector: 'lbk-resources-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./resources-page.component.html`,
})
export class ResourcesPageComponent implements OnInit {
  resourceSummaries$!: Observable<ResourceSummary[]>;
  identifyResourceSummary = identifyResourceSummary;

  groups!: ResourceGroup[];
  types!: ResourceType[];

  constructor(private readonly _resourcesFacade: ResourcesFacade) {}

  ngOnInit(): void {
    this.groups = Object.values(ResourceGroup);
    this.types = Object.values(ResourceType);

    this.resourceSummaries$ = this._resourcesFacade.resourceSummaries$;

    this._resourcesFacade.loadAllResources();
  }
}
