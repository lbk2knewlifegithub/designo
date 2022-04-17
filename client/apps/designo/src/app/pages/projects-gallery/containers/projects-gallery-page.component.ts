import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck } from 'rxjs';
import { ProjectsGallery } from '../../../shared';

@Component({
  selector: 'lbk-projects-gallery-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="md:pb-20 2xl:pb-0">
      <!-- Hero -->
      <lbk-hero [projectGallery]="(projectGallery$ | async)!"></lbk-hero>
      <!-- end Hero -->

      <!-- Project List -->
      <lbk-project-list
        [projects]="(projectGallery$ | async)!.projects"
        [reverse]="(projectGallery$ | async)!.slug === 'graphic-design'"
        class="block mt-[96px] 2xl:mt-[160px]"
      ></lbk-project-list>

      <!-- end Project List -->

      <!-- Project Links -->
      <lbk-project-links
        [skip]="(projectGallery$ | async)!.slug"
        class="block mt-[96px] 2xl:mt-[160px]"
      ></lbk-project-links>
      <!-- end Project Links -->
    </main>
  `,
})
export class ProjectsGalleryPageComponent implements OnInit {
  projectGallery$!: Observable<ProjectsGallery>;

  constructor(private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectGallery$ = this._route.data.pipe(
      pluck('gallery')
    ) as Observable<ProjectsGallery>;
  }
}
