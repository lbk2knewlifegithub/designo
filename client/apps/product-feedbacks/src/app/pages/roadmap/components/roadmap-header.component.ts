import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-roadmap-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="container bg-neutral-200 md:bg-transparent md:mt-14">
      <nav
        class="py-6 flex justify-between items-center md:bg-neutral-200 md:px-8 md:py-6 md:rounded-xl"
      >
        <div>
          <div class="grid justify-items-center">
            <!--            Go Back Button-->
            <a
              routerLink="/"
              class="text-white inline-flex gap-4 text-xs font-bold"
            >
              <!--      Arrow Left-->
              <i class="fa fa-angle-left text-xs"></i>
              <!--      end Arrow Left-->
              Go back
            </a>
            <!--            end Go Back Button-->

            <!--            Title-->
            <h3 class="text-white mt-1 md:text-xl">Roadmap</h3>
            <!--            end Title-->
          </div>
        </div>

        <div>
          <!--        Add Feedback-->
          <lbk-create-feedback-button></lbk-create-feedback-button>
          <!--        end Add Feedback-->
        </div>
      </nav>
    </header>
  `,
})
export class RoadMapHeaderComponent {}
