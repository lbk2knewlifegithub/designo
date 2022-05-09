import { Solution } from '@lbk/fm/shared';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-report',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll">
      <div class="bg-primary text-white py-8 px-6 rounded-lg sm:py-12">
        <div class="flex flex-col items-center">
          <i class="fa-solid fa-clipboard-list text-2xl"></i>

          <h4 class="font-bold text-center mt-3">REPORT</h4>
        </div>

        <ul class="mt-6 sm:flex sm:justify-center sm:text-cener sm:gap-32">
          <li
            class="flex items-center justify-between py-3 sm:flex-col sm:gap-2"
          >
            <span class="text-sm sm:text-center sm:order-last">
              ACCESSIBILITY <br />
              ISSUES
            </span>
            <strong class="text-4xl"> 26 </strong>
          </li>

          <li
            class="flex items-center justify-between py-3 border-t sm:border-0 sm:flex-col sm:gap-2"
          >
            <span class="text-sm sm:text-center sm:order-last">
              HTML <br />
              ISSUES
            </span>
            <strong class="text-4xl">26</strong>
          </li>
        </ul>

        <!-- View Report Button -->
        <div class="flex justify-center mt-4 sm:mt-8">
          <a
            [routerLink]="['/report', solution.solution_id]"
            class="btn btn-white px-12 font-bold"
            >VIEW REPORT</a
          >
        </div>
        <!-- end View Report Button -->
      </div>
    </section>
  `,
})
export class ReportComponent {
  @Input() solution!: Solution;
}
