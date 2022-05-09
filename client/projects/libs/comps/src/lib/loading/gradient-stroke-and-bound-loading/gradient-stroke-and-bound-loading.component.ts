import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-gradient-stroke-and-bound-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gradient-stroke-and-bound-loading.component.html',
  styleUrls: ['./gradient-stroke-and-bound-loading.component.scss'],
})
export class GradientStrokeAndBoundLoadingComponent {}

@NgModule({
  declarations: [GradientStrokeAndBoundLoadingComponent],
  exports: [GradientStrokeAndBoundLoadingComponent],
})
export class GradientStrokeAndBoundLoadingModule {}
