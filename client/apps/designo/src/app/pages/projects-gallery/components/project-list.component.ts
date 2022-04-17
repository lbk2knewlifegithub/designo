import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project, identifyProject } from '../../../shared';

@Component({
  selector: 'lbk-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container ">
      <ul class="grid gap-10 2xl:grid-cols-3">
        <li
          *ngFor="let project of projects; trackBy: identifyProject"
          class="rounded-2xl overflow-hidden md:grid md:grid-cols-2 md:max-h-[310px] md:place-content-center 2xl:grid-cols-1 2xl:max-h-[478px]"
        >
          <!-- Project Image -->
          <img
            [ngClass]="{ 'order-last 2xl:order-first': reverse }"
            [src]="project.image"
            [alt]="project.name"
          />
          <!-- end Project Image -->

          <div class="py-8 px-[30px] text-center bg-peach-200/10 ">
            <!-- Project Name -->
            <h3
              class="font-medium text-peach-200 text-[20px] tracking-[5px] leading-[26px] uppercase"
            >
              {{ project.name }}
            </h3>
            <!-- end Project Name -->

            <!-- Project Description -->
            <span class="inline-block mt-4 text-sm md:text-base">{{
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
  @Input() reverse?: boolean;

  identifyProject = identifyProject;
}
