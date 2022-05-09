import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-empty-feedbacks-roadmap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white rounded-lg mt-6">
      <div
        class="max-w-lg mx-auto flex flex-col items-center p-6  md:pb-20 md:pt-28"
      >
        <!-- Illustration Empty -->
        <img
          src="assets/suggestions/illustration-empty.svg"
          alt="Empty Illustration"
        />
        <!-- end Illustration Empty -->

        <h3 class="mt-10 text-center">There is no feedback yet</h3>

        <!-- Add Feedback -->
        <a
          routerLink="/create-feedback"
          class="btn btn-accent mt-6  flex !items-center gap-2 px-3 md:mt-10"
        >
          <!-- Plus Icon -->
          <i class="fa fa-plus text-sm font-bold"></i>
          <!-- end Plus Icon -->

          <!--      Text-->
          Add Feedback
          <!--      end Text-->
        </a>
        <!-- end Add Feedback -->
      </div>
    </div>
  `,
})
export class EmptyFeedbacksRoadmapComponent {}
