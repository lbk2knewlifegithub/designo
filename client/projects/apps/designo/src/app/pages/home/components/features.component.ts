import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
interface Feature {
  title: string;
  description: string;
  image: string;
}
@Component({
  selector: 'lbk-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative container">
      <!-- Pattern Leaf -->
      <img
        class="hidden z-[-1] absolute bottom-0 right-0 scale-x-[-1] scale-y-[-1] translate-y-[55%] 2xl:block "
        src="assets/shared/desktop/bg-pattern-leaf.svg"
        alt="Pattern Leaf"
      />
      <!-- end Pattern Leaf -->

      <ul class="grid gap-[80px] md:gap-6 2xl:grid-cols-3 2xl:gap-[30px]">
        <li
          class="flex flex-col items-center text-center gap-12 md:flex-row md:text-left md:gap-12 2xl:flex-col 2xl:text-center"
          *ngFor="let feature of features; trackBy: identifyFeature"
        >
          <!-- Image -->
          <img [src]="feature.image" [alt]="feature.title" />
          <!-- end Image -->

          <div>
            <!-- Title -->
            <h2 class="text-md uppercase ">
              {{ feature.title }}
            </h2>
            <!-- end Title -->

            <!-- Desciption -->
            <p class="text-black mt-8">{{ feature.description }}</p>
            <!-- end Desciption -->
          </div>
        </li>
      </ul>
    </section>
  `,
})
export class FeaturesComponent implements OnInit {
  features!: Feature[];

  ngOnInit() {
    this._initFeatures();
  }

  private _initFeatures() {
    this.features = [
      // Passionate
      {
        title: 'Passionate',
        description:
          'Each project starts with an in-depth brand research to ensure we only create products that serve a purpose. We merge art, design, and technology into exciting new solutions.',
        image: 'assets/home/desktop/illustration-passionate.png',
      },

      // Resourceful
      {
        title: 'Resourceful',
        description:
          'Everything that we do has a strategic purpose. We use an agile approach in all of our projects and value customer collaboration. It guarantees superior results that fulfill our clients??? needs.',
        image: 'assets/home/desktop/illustration-resourceful.png',
      },
      // Friendly
      {
        title: 'Friendly',
        description:
          'We are a group of enthusiastic folks who know how to put people first. Our success depends on our customers, and we strive to give them the best experience a company can provide.',
        image: 'assets/home/desktop/illustration-friendly.png',
      },
    ];
  }

  identifyFeature(index: number, feature: Feature) {
    return feature.title;
  }
}
