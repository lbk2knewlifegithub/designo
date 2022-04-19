import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-category-name',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-large py-8  bg-black  md:py-24">
      <h1 class="text-white text-center text-2xl font-bold uppercase md:text-4xl">
        {{ name }}
      </h1>
    </section>
  `,
})
export class CategoryNameComponent {
  @Input() name!: string;
}
