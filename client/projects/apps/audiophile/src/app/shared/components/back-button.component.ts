import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { NavigationService } from '@lbk/services';

@Component({
  selector: 'lbk-back',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="onBack()" class=" text-gray-500 font-medium">
      Go back
    </button>
  `,
})
export class BackComponent {
  constructor(private readonly _navigationService: NavigationService) {}

  onBack() {
    this._navigationService.back();
  }
}

@NgModule({
  exports: [BackComponent],
  declarations: [BackComponent],
})
export class GoBackModule {}
