import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-three-block-move',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './three-block-move.component.html',
  styleUrls: ['./three-block-move.component.scss'],
})
export class ThreeBlockMoveComponent {}

@NgModule({
  declarations: [ThreeBlockMoveComponent],
  exports: [ThreeBlockMoveComponent],
})
export class ThreeBlockMoveModule {}
