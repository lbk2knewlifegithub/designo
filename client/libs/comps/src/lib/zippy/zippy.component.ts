import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ZippyContentDirective } from './zippy-content.directive';

@Component({
  selector: 'lbk-zippy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>

    <div [@content]="expanded ? 'expand' : 'collapse'" [id]="zippyId">
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

  zippyId = `zippy-${++ZippyComponent.nextId}`;
  @Input() expanded = false;
  @Output() expand = new EventEmitter<ZippyComponent>();

  @ContentChild(ZippyContentDirective) content!: ZippyContentDirective;

  constructor(private readonly _cd: ChangeDetectorRef) {}

  detectChanges() {
    this._cd.detectChanges();
  }

  close() {
    this.expanded = false;
    this.detectChanges();
  }

  toggle() {
    this.expanded = !this.expanded;
    this.detectChanges();

    if (this.expanded) {
      this.expand.emit(this);
    }
  }
}
