import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectsGallery } from '../../../shared';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="relative overflow-hidden z-10 container bg-peach-200 md:bg-transparent"
    >
      <div
        class="relative overflow-hidden text-white text-center py-[105px] md:flex md:flex-col md:items-center md:bg-peach-200 md:rounded-lg md:h-[252px] md:py-0 md:justify-center"
      >
        <!-- Projects Gallery Name -->
        <h1 class="font-medium text-lg md:text-2xl">
          {{ projectGallery.name }}
        </h1>
        <!-- end Projects Gallery Name -->

        <!-- Projects Gallery Description -->
        <p class="text-sm mt-6 md:text-base md:mt-8 md:max-w-sm">
          {{ projectGallery.description }}
        </p>
        <!-- end Projects Gallery Description -->

        <!-- Pattern Circle Tablet-->
        <img
          class="hidden absolute top-0 left-1/2 -translate-x-1/2 scale-[190%] md:block"
          src="assets/app-design/desktop/bg-pattern-intro-app.svg"
          alt="Pattern Circle"
        />
        <!-- end Pattern Circle Tablet-->
      </div>

      <!-- Pattern Circle Mobile-->
      <img
        class="absolute top-0 left-1/2 -translate-x-1/2 scale-[300%] md:hidden"
        src="assets/app-design/desktop/bg-pattern-intro-app.svg"
        alt="Pattern Circle"
      />
      <!-- end Pattern Circle Mobile-->
    </section>
  `,
})
export class HeroComponent {
  @Input() projectGallery!: ProjectsGallery;
}
