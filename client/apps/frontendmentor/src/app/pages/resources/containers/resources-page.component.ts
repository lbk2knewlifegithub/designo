import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Challenge,
  ResourceGroupName,
  ResourceGroup,
  ResourceTypeName,
} from '../../../shared';
import { ChallengesFacade } from '../../../state';
import { ResourcesFacade } from '../state';

@Component({
  selector: 'lbk-resources-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./resources-page.component.html`,
})
export class ResourcesPageComponent implements OnInit {
  resourcesGroups$!: Observable<ResourceGroup[]>;
  latestChallenges$!: Observable<Challenge[]>;

  groups!: ResourceGroupName[];
  types!: ResourceTypeName[];

  loading$!: Observable<boolean>;

  constructor(
    private readonly _resourcesFacade: ResourcesFacade,
    private readonly _challengesFacade: ChallengesFacade
  ) {}

  ngOnInit(): void {
    this.groups = Object.values(ResourceGroupName);
    this.types = Object.values(ResourceTypeName);

    this.loading$ = this._resourcesFacade.loading$;
    this.resourcesGroups$ = this._resourcesFacade.resourcesGroups$;
    this.latestChallenges$ = this._challengesFacade.challenges$;

    this._resourcesFacade.loadAllResources();
    this._challengesFacade.loadChallenges();
  }
}
