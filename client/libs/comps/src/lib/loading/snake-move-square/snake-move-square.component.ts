import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-snake-move-square',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './snake-move-square.component.html',
  styleUrls: ['./snake-move-square.component.scss'],
})
export class SnakeMoveSquareComponent {}

@NgModule({
  declarations: [SnakeMoveSquareComponent],
  exports: [SnakeMoveSquareComponent],
})
export class SnakeMoveSquareModule {}
