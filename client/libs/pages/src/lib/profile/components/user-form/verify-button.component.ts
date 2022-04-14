import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UnSubscribe } from '@lbk/comps';
import { interval, map, Observable, take } from 'rxjs';

type seconds = number;

@Component({
  selector: 'lbk-verify-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="verify()"
      type="button"
      aria-label="Verify Button"
      class="btn btn-primary min-h-[44px] min-w-[100px]"
    >
      <span *ngIf="completed; else timer">Verify</span>
      <ng-template #timer>
        {{ count$ | async }}
      </ng-template>
    </button>
  `,
})
export class VerifyButtonComponent
  extends UnSubscribe
  implements OnInit, OnDestroy
{
  @Input() throttleTime: seconds = 120;

  interval = 1_000;

  count$!: Observable<string>;

  completed = true;

  constructor(private readonly _cd: ChangeDetectorRef) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    const tmp = localStorage.getItem('throttleTime');
    const olThrottleTime: number = tmp ? parseInt(tmp, 10) : 0;

    if (olThrottleTime) {
      this.throttleTime = olThrottleTime;
      this.verify();
    }
  }

  verify() {
    if (!this.completed) return;

    this.completed = false;

    this.count$ = interval(this.interval).pipe(
      take(this.throttleTime),
      map((num) => {
        const tmp = this.throttleTime - num;
        localStorage.setItem('throttleTime', tmp + '');
        return `${tmp}s`;
      })
    );

    this.appendSub = this.count$.subscribe({
      complete: () => {
        this.completed = true;
        localStorage.removeItem('throttleTime');
        this._cd.detectChanges();
      },
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
