import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '@lbk/services';

@Component({
  selector: 'lbk-go-back',
  template: `
    <button (click)="goBack()" class="btn btn-icon text-neutral">
      <!--      Arrow Left-->
      <img src="assets/shared/icon-arrow-left.svg" alt="Arrow Left" />
      <!--      end Arrow Left-->

      Go back
    </button>
  `,
  styles: [
    `
      :host {
        @apply inline-block;
      }
    `,
  ],
})
export class GobackComponent {
  constructor(private readonly _navigationService: NavigationService) {}
  goBack() {
    this._navigationService.back();
  }
}

@NgModule({
  imports: [RouterModule],
  exports: [GobackComponent],
  declarations: [GobackComponent],
})
export class GobackModule {}
