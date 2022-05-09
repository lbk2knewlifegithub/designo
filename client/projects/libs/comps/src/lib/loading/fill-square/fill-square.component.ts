import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-fill-square',
  templateUrl: './fill-square.component.html',
  styleUrls: ['./fill-square.component.scss'],
})
export class FillSquareComponent {}

@NgModule({
  declarations: [FillSquareComponent],
  exports: [FillSquareComponent],
})
export class FillSquareModule {}
