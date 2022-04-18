import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Coordinate } from '../../../shared';

@Component({
  selector: 'lbk-google-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <google-map [options]="options"></google-map> `,
})
export class GoogleMapComponent implements OnInit {
  options!: google.maps.MapOptions;
  @Input() coor!: Coordinate;

  ngOnInit(): void {
    this.options = {
      center: { ...this.coor },
      zoom: 12,
    };
  }
}
