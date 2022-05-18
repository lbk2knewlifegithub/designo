import { Solution } from '@lbk/fm/shared';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-questions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container pt-20">
      <div class="relative bg-secondary-50 p-6 pt-14 max-w-[736px] mx-auto">
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center text-4xl text-white w-16 h-16 bg-primary rounded-full"
        >
          <i class="fa-solid fa-question"></i>
        </div>

        <h4 class="font-bold tracking-widest text-center">
          LE BINH KHANG'S QUESTIONS FOR COMMUNITY
        </h4>

        <!-- Questions Content-->
        <p class="mt-4">{{ solution.questions }}</p>
        <!-- end Questions Content-->
      </div>

      <div class="mt-16 max-w-[736px] mx-auto md:mt-20 ">
        <h4
          class="font-bold tracking-widest text-center text-sm md:text-base md:font-black"
        >
          COMMUNITY FEEDBACK
        </h4>

        <h5 class="font-bold mt-8 md:mt-14">
          Leave some feedback on this solution*
        </h5>

        <div class="text-sm text-secondary mt-2">
          <p>
            Please focus on giving high-quality, helpful feedback and answering
            any questions lbk2knewlifegithub might have. Here are some key
            points to consider:
          </p>
          <ul class="mt-2 list-inside list-disc pl-2">
            <li>Does the solution include semantic HTML?</li>
            <li>Is it accessible, and what improvements could be made?</li>
            <li>Does the layout look good on a range of screen sizes?</li>
            <li>Is the code well-structured, readable, and reusable?</li>
            <li>
              You can read our community guidelines if you're unsure what to
              post.
            </li>
          </ul>
        </div>

        <lbk-add-comment-input class="mt-2"></lbk-add-comment-input>
      </div>
    </section>
  `,
})
export class QuestionsComponent {
  @Input() solution!: Solution;
}
