import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-liquid-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './liquid-circle.component.html',
  styleUrls: ['./liquid-circle.component.scss'],
})
export class LiquidCircleComponent {}

@NgModule({
  declarations: [LiquidCircleComponent],
  exports: [LiquidCircleComponent],
})
export class LiquidCircleModule {}
