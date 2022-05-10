import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { Unsubscriber } from '@lbk/comps';
import { fromEvent } from 'rxjs';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective extends Unsubscriber implements OnInit {
  @Output() clickOutside = new EventEmitter<void>();
  @Input() skip?: string[];

  constructor(
    private readonly _el: ElementRef,
    private readonly _zone: NgZone
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.appendSub = fromEvent(window, 'click').subscribe((event) => {
      this._zone.runOutsideAngular(() => {
        event = event as PointerEvent;
        const target = event.target as HTMLElement;

        if (this.skip)
          for (const s of this.skip) {
            if (target.closest(s)) return;
          }

        if (this._el.nativeElement.contains(target)) return;

        this._zone.run(() => {
          event.stopPropagation();
          this.clickOutside.emit();
        });
      });
    });
  }
}

@NgModule({
  exports: [ClickOutsideDirective],
  declarations: [ClickOutsideDirective],
})
export class ClickOutsideModule {}
