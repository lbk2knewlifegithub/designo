import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectsGallery } from '../../../shared';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container bg-peach-200">
      <div class="text-white text-center py-[105px]">
        <!-- Projects Gallery Name -->
        <h1 class="font-medium text-lg md:text-xl">
          {{ projectGallery.name }}
        </h1>
        <!-- end Projects Gallery Name -->

        <!-- Projects Gallery Description -->
        <p class="text-sm mt-6 md:text-base md:mt-8">
          {{ projectGallery.description }}
        </p>
        <!-- end Projects Gallery Description -->
      </div>
    </section>
  `,
})
export class HeroComponent {
  @Input() projectGallery!: ProjectsGallery;
}
