import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Tags } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import { DashboardFacade } from '../facade';

@Component({
  selector: 'lbk-my-tags',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll">
      <div class="bg-white rounded-lg border p-6 lg:py-8">
        <h1 class="font-medium text-3xl">My Tags</h1>

        <form class="mt-3 flex flex-col gap-1 sm:flex-row sm:gap-2 sm:mt-5">
          <select class="w-full" placeholder="Select..">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>

          <!-- Follow Button -->
          <button
            class="btn btn-error italic font-bold w-full py-2 sm:w-auto sm:px-12 lg:text-base"
          >
            FOLLOW
          </button>
          <!-- end Follow Button -->
        </form>

        <ul
          class="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mt-4"
        >
          <li
            *ngFor="let i of [1, 2, 3, 4, 5, 5, 6, 6]"
            class="min-w-[220px] flex justify-between items-center p-2 rounded-lg border"
          >
            <button class="text-primary">#angular</button>

            <i class="fa-solid fa-xmark"></i>
          </li>
        </ul>
      </div>
    </section>
  `,
})
export class MyTagsComponent implements OnInit {
  tags$!: Observable<Tags[]>;
  constructor(private readonly _dashboardFacade: DashboardFacade) {}

  ngOnInit() {
    this.tags$ = this._dashboardFacade.tags$;
  }
}
