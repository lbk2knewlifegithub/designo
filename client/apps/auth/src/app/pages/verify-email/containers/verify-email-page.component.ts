import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { zoomIn } from '@lbk/anims';
import { Observable } from 'rxjs';
import { VerifyEmailFacade } from '../state';

@Component({
  selector: 'lbk-verify-email-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container grid place-items-center md:h-screen">
      <ng-container *ngIf="!(error$ | async)!; else verifyError">
        <lbk-verifying *ngIf="loading$ | async; else verified"></lbk-verifying>

        <ng-template #verified>
          <lbk-verifed @zoomIn></lbk-verifed>
        </ng-template>
      </ng-container>

      <ng-template #verifyError>
        <lbk-verify-error></lbk-verify-error>
      </ng-template>
    </main>
  `,
  animations: [zoomIn()],
})
export class VerifyEmailPageComponent implements OnInit {
  loading$!: Observable<boolean>;
  error$!: Observable<string>;

  constructor(private readonly _verifyEmailFacade: VerifyEmailFacade) {}

  ngOnInit(): void {
    this.loading$ = this._verifyEmailFacade.loading$;
    this.error$ = this._verifyEmailFacade.error$;
  }
}
