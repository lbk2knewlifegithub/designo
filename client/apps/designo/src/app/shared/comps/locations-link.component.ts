import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';

interface Location {
  name: string;
  image: string;
}

@Component({
  selector: 'lbk-locations-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <ul class="grid gap-12 md:gap-14 2xl:grid-cols-3">
        <li
          class="flex flex-col items-center"
          *ngFor="let location of locations; trackBy: identifyLocation"
        >
          <!-- Location Image -->
          <img [src]="location.image" [alt]="location.name" />
          <!-- end Location Image -->

          <!-- Location Name -->
          <h2
            class="font-medium text-black text-[20px] leading-[26px] tracking-[5px] uppercase mt-12"
          >
            {{ location.name }}
          </h2>
          <!-- end Location Name -->

          <!-- See Location Button -->
          <button class="btn btn-primary mt-8">SEE LOCATION</button>
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
  imports: [CommonModule],
  exports: [LocationsLinkComponent],
  declarations: [LocationsLinkComponent],
})
export class LocationsLinkModule {}
