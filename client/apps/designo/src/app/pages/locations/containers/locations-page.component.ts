import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnSubscribe } from '@lbk/comps';
import { ScrollService } from '@lbk/services';
import { pluck } from 'rxjs';
import { fromData, Location } from '../../../shared';

@Component({
  selector: 'lbk-locations-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="relative md:pb-12 2xl:pb-0">
      <!-- Location List -->
      <lbk-location-list [locations]="locations"></lbk-location-list>
      <!-- end Location List -->
    </main>
  `,
})
export class LocationsPageComponent extends UnSubscribe implements OnInit {
  locations!: Location[];

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _scrollService: ScrollService,
    private readonly _cd: ChangeDetectorRef
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
