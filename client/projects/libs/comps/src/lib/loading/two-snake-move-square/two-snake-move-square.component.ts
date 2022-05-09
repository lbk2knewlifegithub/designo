import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'lbk-two-snake-move-square',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './two-snake-move-square.component.html',
  styleUrls: ['./two-snake-move-square.component.scss'],
})
export class TwoSnakeMoveSquareComponent {}

@NgModule({
  declarations: [TwoSnakeMoveSquareComponent],
  exports: [TwoSnakeMoveSquareComponent],
})
export class TwoSnakeMoveSquareModule {}
