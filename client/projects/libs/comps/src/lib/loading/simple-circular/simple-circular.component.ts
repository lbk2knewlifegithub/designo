import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-simple-circular-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './simple-circular.component.html',
  styleUrls: ['./simple-circular.component.scss'],
})
export class SimpleCircularComponent {}

@NgModule({
  declarations: [SimpleCircularComponent],
  exports: [SimpleCircularComponent],
})
export class SimpleCircularModule {}
