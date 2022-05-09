import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Roadmap } from '../models';
import { HomeFacade } from '../state/home.facade';

@Component({
  selector: 'lbk-roadmap-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-xl block bg-white p-6 md:h-full">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h3>Roadmap</h3>
        <a class="link" routerLink="/roadmap">View</a>
      </div>
      <!-- end Header -->

      <!-- Status List -->
      <ul class="mt-6 space-y-2">
        <li
          class="flex items-center justify-between"
          *ngFor="
            let roadmap of roadmapSummary$ | async;
            trackBy: identifyRoadmap
          "
        >
          <div class="flex items-center gap-4">
            <!-- Ball -->
            <span class="w-2 h-2 rounded-full bg-{{ roadmap.color }}"></span>
            <!-- end Ball -->

            <!-- Status Name -->
            <span class="text-neutral capitalize">
              {{ roadmap.status }}
            </span>
            <!-- end Status Name -->
          </div>

          <!-- Status Amount -->
          <span class="text-neutral font-bold">
            {{ roadmap.numberOfFeedbacks }}
          </span>
          <!-- end Status Amount -->
        </li>
      </ul>
      <!-- end Status List -->
    </div>
  `,
})
export class RoadMapSummaryComponent implements OnInit {
  roadmapSummary$!: Observable<Roadmap[]>;

  constructor(public readonly _facade: HomeFacade) {}

  identifyRoadmap(index: number, roadmap: Roadmap) {
    return roadmap.status;
  }

  ngOnInit(): void {
    this.roadmapSummary$ = this._facade.roadmapSummary$;
  }
}
