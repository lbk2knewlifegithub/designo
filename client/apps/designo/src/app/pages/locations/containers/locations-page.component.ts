import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromData, Location } from '../../../shared';

@Component({
  selector: 'lbk-locations-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="relative md:pb-12">
      <!-- Location List -->
      <lbk-location-list [locations]="locations"></lbk-location-list>
      <!-- end Location List -->
    </main>
  `,
})
export class LocationsPageComponent implements OnInit {
  locations!: Location[];

  ngOnInit(): void {
    this.locations = fromData.locations;
  }
}
