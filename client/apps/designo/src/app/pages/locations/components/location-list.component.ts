import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { identifyLocation, Location } from '../../../shared';

@Component({
  selector: 'lbk-location-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <ul class="grid gap-10">
        <ng-container
          *ngFor="let location of locations; trackBy: identifyLocation"
        >
          <li class="max-w-full overflow-hidden">
            <!-- Google Map -->
            <lbk-google-map class=""></lbk-google-map>
            <!-- end Google Map -->

            <div class="py-[80px] bg-peach-200/10 container text-center">
              <!-- Location -->
              <h2 class="text-peach-200 font-medium text-lg">
                {{ location.location }}
              </h2>
              <!-- end Location -->

              <div class="space-y-6 mt-6">
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
