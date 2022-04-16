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
    <section class="container">
      <ul class="grid gap-[80px]">
        <li
          class="flex flex-col items-center text-center"
          *ngFor="let feature of features; trackBy: identifyFeature"
        >
          <!-- Image -->
          <img class="block" [src]="feature.image" [alt]="feature.title" />
          <!-- end Image -->

          <!-- Title -->
          <h2 class="text-md uppercase mt-12">
            {{ feature.title }}
          </h2>
          <!-- end Title -->

          <!-- Desciption -->
          <p class="text-black mt-8">{{ feature.description }}</p>
          <!-- end Desciption -->
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
          'Everything that we do has a strategic purpose. We use an agile approach in all of our projects and value customer collaboration. It guarantees superior results that fulfill our clients’ needs.',
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
