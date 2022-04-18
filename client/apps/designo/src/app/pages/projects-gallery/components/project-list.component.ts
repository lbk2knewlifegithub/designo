import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { identifyProject, Project } from '../../../shared';

@Component({
  selector: 'lbk-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section scrollTo class="container ">
      <ul class="grid gap-10 2xl:grid-cols-3">
        <li
          *ngFor="let project of projects; trackBy: identifyProject"
          class="rounded-2xl overflow-hidden bg-peach-200/10 md:grid md:grid-cols-2 md:max-h-[320px] md:place-content-center lg:max-h-[400px] 2xl:grid-cols-1 2xl:max-h-[478px]"
        >
          <!-- Project Image -->
          <img
            [ngClass]="{ 'order-last 2xl:order-first': reverse }"
            class="object-cover object-center"
            [alt]="project.name"
            [src]="project.image"
          />
          <!-- end Project Image -->

          <a
            routerLink="/"
            class="grid place-content-center duration-300 group py-8 px-[30px] text-center hover:bg-peach-200 md:py-0 2xl:py-8"
          >
            <!-- Project Name -->
            <h3
              class="duration-300 font-medium text-peach-200 text-[20px] tracking-[5px] leading-[26px] uppercase group-hover:text-white"
            >
              {{ project.name }}
            </h3>
            <!-- end Project Name -->

            <!-- Project Description -->
            <span
              class="duration-300 inline-block mt-4 text-sm md:text-base group-hover:text-white"
              >{{ project.description }}</span
            >
            <!-- end Project Description -->
          </a>
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
