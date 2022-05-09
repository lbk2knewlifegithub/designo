import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-loading-wavy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading-wavy.component.html',
  styleUrls: ['./loading-wavy.component.scss'],
})
export class LoadingWavyComponent {}

@NgModule({
  declarations: [LoadingWavyComponent],
  exports: [LoadingWavyComponent],
})
export class LoadingWavyModule {}
