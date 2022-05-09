import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'lbk-three-dot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './three-dot.component.html',
  styleUrls: ['./three-dot.component.scss'],
})
export class ThreeDotComponent {}

@NgModule({
  declarations: [ThreeDotComponent],
  exports: [ThreeDotComponent],
})
export class ThreeDotModule {}
