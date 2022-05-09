import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-flip-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './flip-loading.component.html',
  styleUrls: ['./flip-loading.component.scss'],
})
export class FlipLoadingComponent {}

@NgModule({
  declarations: [FlipLoadingComponent],
  exports: [FlipLoadingComponent],
})
export class FlipLoadingModule {}
