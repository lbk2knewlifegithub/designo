import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { ZippyContentDirective } from './zippy-content.directive';

@Component({
  selector: 'lbk-zippy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>

    <div [@content]="expanded ? 'expand' : 'collapse'" [id]="contentId">
      <ng-template [ngTemplateOutlet]="content.templateRef"></ng-template>
    </div>
  `,
  animations: [
    trigger('content', [
      transition('* <=> *', [animate('300ms')]),
      state(
        'expand',
        style({ height: 'initial', opacity: '100%', pointerEvents: 'auto' })
      ),
      state(
        'collapse',
        style({ height: 0, opacity: 0, pointerEvents: 'none' })
      ),
    ]),
  ],
})
export class ZippyComponent {
  static nextId = 0;

  contentId = `zippy-${++ZippyComponent.nextId}`;
  @Input() expanded = false;

  @ContentChild(ZippyContentDirective) content!: ZippyContentDirective;

  constructor(private readonly _cd: ChangeDetectorRef) {}

  maskForCheck() {
    this._cd.markForCheck();
  }
}
