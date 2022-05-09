import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface Testimonial {
  description: string;
  image: string;
  name: string;
  job: string;
}

@Component({
  selector: 'lbk-testimonial',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="container max-w-[510px] mx-auto lg:max-w-[680px] xl:max-w-[840px]"
    >
      <p
        class="text-center text-opacity-50 relative italic leading-6 md:text-lg"
      >
        <!-- Description -->
        "{{ testimonial.description }}"
        <!-- end Description -->

        <!-- Illustration Quotes -->
        <img
          class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src="assets/images/shared/pattern-quotes.svg"
        />
        <!-- end Illustration Quotes -->
      </p>

      <div class="grid place-items-center mt-6">
        <!-- Image Profile -->
        <img
          class="rounded-full w-14 h-14"
          [src]="testimonial.image"
          [alt]="testimonial.name"
        />
        <!-- end Image Profile -->

        <!-- Name -->
        <h3 class="text-primary font-bold tracking-widest uppercase mt-3">
          {{ testimonial.name }}
        </h3>
        <!-- end Name -->

        <!-- Jobs -->
        <span class="text-xs mt-1 lg:text-sm">{{ testimonial.job }}</span>
        <!-- end Jobs -->
      </div>
    </section>
  `,
})
export class TestimonialComponent {
  @Input() testimonial!: Testimonial;
}
