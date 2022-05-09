import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '../../../shared';

@Component({
  selector: 'lbk-project-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <img [src]="project.image" [alt]="project.image" />
      <a
        [href]="project.href"
        class="block text-3xl  font-bold mt-8 text-center hover:underline"
        >{{ project.name }}</a
      >
      <!-- Description -->
      <!-- <p class="mt-2">{{ project.description }}</p> -->
      <!-- end Description -->
    </div>
  `,
})
export class ProjectPreviewComponent {
  @Input() project!: Project;
}
