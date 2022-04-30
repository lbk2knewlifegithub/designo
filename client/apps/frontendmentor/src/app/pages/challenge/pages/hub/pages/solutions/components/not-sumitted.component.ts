import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { UnlockSolutionComponent } from './unlock-solution.component';

@Component({
  selector: 'lbk-not-sumitted',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="relative flex flex-col items-center container py-32 overflow-hidden lg:py-40"
    >
      <img
        class="z-[-1] absolute -right-[2%] -translate-y-[30%] h-full md:-translate-y-[10%] md:right-[10%] lg:hidden"
        src="/assets/images/shared/bg-pattern.svg"
        alt="Pattern"
      />
      <!-- end Bg Pattern Mobile -->

      <!-- Bg Pattern Desktop One -->
      <img
        class="hidden z-[-1] absolute left-[20%] -translate-x-1/2 h-full lg:block"
        src="/assets/images/shared/bg-pattern-1.svg"
        alt="Pattern"
      />
      <!-- end Bg Pattern Desktop One -->

      <!-- Bg Pattern Desktop Two -->
      <img
        class="hidden z-[-1] absolute -right-[5%] -translate-y-[30%] h-full md:-translate-y-[10%] lg:block"
        src="/assets/images/shared/bg-pattern-2.svg"
        alt="Pattern"
      />
      <!-- end Bg Pattern Desktop Two -->

      <div>
        <img
          src="assets/images/shared/icon-lock-screen.svg"
          alt="Lock Screen Icon"
        />
      </div>

      <div class="max-w-[600px] text-center mt-4">
        <h1 class=" text-3xl font-bold text-primary">
          You haven't submitted your solution yet
        </h1>
        <p class="mt-4 text-sm leading-6">
          Submit your solution to unlock the community solutions for this
          challenge. If you want to see the solutions early, you can spend 50
          points of your Mentor Score.
        </p>
      </div>

      <!-- Unlock Solution Button -->
      <button
        (click)="showUnlockSolution()"
        class="mt-8 italic font-bold btn btn-error px-10"
      >
        UNLOCK SOLUTIONS
      </button>
      <!-- end Unlock Solution Button -->
    </section>
  `,
})
export class NotSumittedComponent {
  constructor(private readonly _dialogService: DialogService) {}
  /**
   * - Show Unlock Solution
   */
  showUnlockSolution() {
    this._dialogService.open(UnlockSolutionComponent);
  }
}
