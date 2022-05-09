import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { NavigationService } from '@lbk/services';

@Component({
  selector: 'lbk-go-back',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="back()"
      aria-label="GoBack"
      class="flex items-center gap-6 group hover:opacity-60"
    >
      <span
        class="fas fa-angle-left duration-500 text-primary-900 group-hover:-translate-x-1"
      ></span>
      <span class="font-black">Go back</span>
    </button>
  `,
})
export class GoBackComponent {
  constructor(private readonly _navigationService: NavigationService) {}

  back() {
    this._navigationService.back();
  }
}

@NgModule({
  exports: [GoBackComponent],
  declarations: [GoBackComponent],
})
export class GoBackModule {}
