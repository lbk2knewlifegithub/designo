import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project, identifyProject } from '../../../shared';

@Component({
  selector: 'lbk-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container mt-[96px]">
      <ul scrollTo class="grid gap-10">
        <li
          class="rounded-xl overflow-hidden "
          *ngFor="let project of projects; trackBy: identifyProject"
        >
          <!-- Project Image -->
          <img [src]="project.image" [alt]="project.name" />
          <!-- end Project Image -->

          <div class="py-8 px-[30px] text-center bg-peach-200/10">
            <!-- Project Name -->
            <h3
              class="font-medium text-peach-200 text-[20px] tracking-[5px] leading-[26px] uppercase"
            >
              {{ project.name }}
            </h3>
            <!-- end Project Name -->

            <!-- Project Description -->
            <span class="inline-block mt-4 text-sm">{{
              project.description
            }}</span>
            <!-- end Project Description -->
          </div>
        </li>
      </ul>
    </section>
  `,
})
export class ProjectListComponent {
  @Input() projects!: Project[];
  identifyProject = identifyProject;
}
