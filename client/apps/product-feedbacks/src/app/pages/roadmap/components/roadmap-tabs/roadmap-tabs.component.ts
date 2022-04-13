import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { UnSubscribe } from '@lbk/comps';
import { FeedbackStatus, FeedbackSummary } from '@lbk/models';
import { FeedbacksFacade } from '@lbk/state/feedbacks';
import { combineLatest, fromEvent, map, Observable } from 'rxjs';
import { take, throttleTime } from 'rxjs/operators';
import { RoadmapFacade } from '../../state';

@Component({
  selector: 'lbk-roadmap-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './roadmap-tabs.component.html',
  styleUrls: ['./roadmap-tabs.component.scss'],
})
export class RoadmapTabsComponent
  extends UnSubscribe
  implements OnInit, AfterViewInit
{
  line$!: Observable<{ transform: string; width: string }>;

  @ViewChildren('tabs') tabsRef!: QueryList<ElementRef<HTMLElement>>;

  summaries$!: Observable<FeedbackSummary[]>;

  constructor(
    private readonly _facade: RoadmapFacade,
    private readonly _feedbacksFacade: FeedbacksFacade,
    private readonly _cd: ChangeDetectorRef
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.summaries$ = this._feedbacksFacade.summaries$;

    this.appendSub = fromEvent(window, 'resize')
      .pipe(throttleTime(500))
      .subscribe(() => this._cd.detectChanges());
  }

  setFilter(status: FeedbackStatus) {
    this._facade.setFilter(status);
  }

  identifyStatus(index: number, status: FeedbackSummary) {
    return status.status;
  }

  ngAfterViewInit(): void {
    this.line$ = combineLatest([this.summaries$, this._facade.filter$]).pipe(
      map(([statuses, filter]) => {
        const index = statuses.findIndex((s) => s.status === filter);
        const tab = this.tabsRef.get(index);
        if (!tab) {
          return {
            transform: 'translateX(0)',
            width: '0',
          };
        }

        const x = tab.nativeElement.getBoundingClientRect().x;
        const clientWidth = tab.nativeElement.clientWidth;
        return { width: `${clientWidth}px`, transform: `translateX(${x}px)` };
      })
    );

    // Manually trigger change detection to update the line position
    this.line$.pipe(take(1)).subscribe(() => this._cd.detectChanges());
  }
}
