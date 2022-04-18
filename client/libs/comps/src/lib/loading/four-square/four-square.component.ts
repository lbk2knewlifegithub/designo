import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-four-square-rotate-loading',
  templateUrl: './four-square.component.html',
  styleUrls: ['./four-square.component.scss'],
  animations: [
    trigger('loading', [
      transition(':enter', [style({ opacity: 0 }), animate(1000)]),
    ]),
  ],
})
export class FourSquareComponent {
  @Input() loading!: boolean;
}

@NgModule({
  declarations: [FourSquareComponent],
  exports: [FourSquareComponent],
})
export class FourSquareModule {}
