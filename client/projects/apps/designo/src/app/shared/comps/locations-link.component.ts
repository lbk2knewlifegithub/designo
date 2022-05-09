import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from '@lbk/comps';
import { SlugPipeModule } from '@lbk/pipes';

interface Location {
  name: string;
  image: string;
}

@Component({
  selector: 'lbk-locations-link',
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

      <ul class="grid gap-12 md:gap-14 2xl:grid-cols-3">
        <li
          class="flex flex-col items-center"
          *ngFor="let location of locations; trackBy: identifyLocation"
        >
          <!-- Location Image -->
          <lbk-image
            [singleImage]="location.image"
            [alt]="location.name"
          ></lbk-image>
          <!-- end Location Image -->

          <!-- Location Name -->
          <h2
            class="font-medium text-black text-[20px] leading-[26px] tracking-[5px] uppercase mt-12"
          >
            {{ location.name }}
          </h2>
          <!-- end Location Name -->

          <!-- See Location Button -->
          <a
            [routerLink]="['/locations']"
            [queryParams]="{ name: location.name | slug }"
            class="btn btn-primary mt-8"
            >SEE LOCATION</a
          >
          <!-- end See Location Button -->
        </li>
      </ul>
    </section>
  `,
})
export class LocationsLinkComponent implements OnInit {
  locations!: Location[];

  ngOnInit(): void {
    this._initLocations();
  }

  private _initLocations() {
    this.locations = [
      {
        name: 'Canada',
        image: 'assets/shared/desktop/illustration-canada.svg',
      },
      {
        name: 'Australia',
        image: 'assets/shared/desktop/illustration-australia.svg',
      },
      {
        name: 'United Kingdom',
        image: 'assets/shared/desktop/illustration-united-kingdom.svg',
      },
    ];
  }

  identifyLocation(index: number, location: Location) {
    return location.name;
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components from Lib
    ImageModule,
    // Shared Pipe from Lib
    SlugPipeModule,
  ],
  exports: [LocationsLinkComponent],
  declarations: [LocationsLinkComponent],
})
export class LocationsLinkModule {}
