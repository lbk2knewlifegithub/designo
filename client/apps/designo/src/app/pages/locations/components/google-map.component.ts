import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbk-google-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <google-map [options]="options"></google-map> `,
})
export class GoogleMapComponent implements OnInit {
  options!: google.maps.MapOptions;
  ngOnInit(): void {
    this.options = {
      center: { lat: 40, lng: -20 },
      zoom: 4,
    };
  }
}
