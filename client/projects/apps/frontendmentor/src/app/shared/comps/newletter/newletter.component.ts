import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-newletter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './newletter.component.html',
})
export class NewLetterComponent {}

@NgModule({
  exports: [NewLetterComponent],
  declarations: [NewLetterComponent],
})
export class NewLetterModule {}
