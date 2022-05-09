import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInUpBig } from '@lbk/anims';
import { Unsubscriber } from '@lbk/comps';
import { ScrollService } from '@lbk/services';
import { pluck } from 'rxjs';
import { fromData, Location } from '../../../shared';

@Component({
  selector: 'lbk-locations-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main @fadeInUpBig class="relative md:pb-12 2xl:pb-0">
      <!-- Location List -->
      <lbk-location-list [locations]="locations"></lbk-location-list>
      <!-- end Location List -->
    </main>
  `,
  animations: [fadeInUpBig()],
})
export class LocationsPageComponent extends Unsubscriber implements OnInit {
  locations!: Location[];

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _scrollService: ScrollService
  ) {
    super();
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.locations = fromData.locations;

    this.appendSub = this._route.queryParams
      .pipe(pluck('name'))
      .subscribe((name) => {
        if (!name) return;
        this._scrollService.scrollToElement(name, { delay: 300 });
      });
  }
}
