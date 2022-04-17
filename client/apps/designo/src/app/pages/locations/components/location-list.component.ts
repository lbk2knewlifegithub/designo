import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { identifyLocation, Location } from '../../../shared';

@Component({
  selector: 'lbk-location-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <ul class="grid gap-10 2xl:gap-8">
        <ng-container
          *ngFor="
            let location of locations;
            trackBy: identifyLocation;
            index as i
          "
        >
          <li
            class="flex flex-col max-w-full overflow-hidden md:gap-8 md:container 2xl:flex-row 2xl:gap-5"
          >
            <!-- Google Map -->
            <lbk-google-map
              [class.order-last]="i !== 1"
              class="2xl:grow"
            ></lbk-google-map>
            <!-- end Google Map -->

            <div
              class="py-[80px] bg-peach-200/10 container text-center md:rounded-xl md:text-left md:pl-[75px] md:py-[88px] 2xl:pl-[95px]"
            >
              <!-- Location -->
              <h2 class="text-peach-200 font-medium text-lg md:text-xl">
                {{ location.location }}
              </h2>
              <!-- end Location -->

              <div class="flex flex-col gap-6 mt-6 md:flex-row md:gap-[100px]">
                <span class="grid">
                  <!-- Office  -->
                  <strong>{{ location.office }}</strong>
                  <!-- end Office  -->

                  <!-- Address  -->
                  <span [innerHtml]="location.address"></span>
                  <!-- end Address  -->
                </span>

                <!-- Contact -->
                <span class="grid">
                  <strong> Contact </strong>
                  <span> P : {{ location.phone }} </span>
                  <span> M : {{ location.email }} </span>
                </span>
                <!-- end Contact -->
              </div>
            </div>
          </li>
        </ng-container>
      </ul>
    </section>
  `,
})
export class LocationListComponent {
  @Input()
  locations!: Location[];
  identifyLocation = identifyLocation;
}
