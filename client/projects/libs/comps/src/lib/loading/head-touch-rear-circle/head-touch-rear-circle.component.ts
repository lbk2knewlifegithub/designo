import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-head-touch-rear-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './head-touch-rear-circle.component.html',
  styleUrls: ['./head-touch-rear-circle.component.scss'],
})
export class HeadTouchRearCircleComponent {}

@NgModule({
  declarations: [HeadTouchRearCircleComponent],
  exports: [HeadTouchRearCircleComponent],
})
export class HeadTouchRearCircleModule {}
