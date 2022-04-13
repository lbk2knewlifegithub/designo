import { CommonModule } from '@angular/common';
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgModule } from '@angular/core';

class HideAfterContext {
  // $implicit = 1000;
  get $implicit() {
    return this.hideAfter;
  }

  counter = 0;

  private _hideAfter = 0;
  set hideAfter(time: number) {
    this._hideAfter = time;
    this.counter = this._hideAfter;
  }

  get hideAfter() {
    return this._hideAfter;
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hideAfter]',
})
export class HideAfterDirective implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('hideAfterElse') placeholder?: TemplateRef<HideAfterContext>;

  private _delay!: number;
  @Input('hideAfter') set delay(delay: number | null) {
    this._delay = delay ?? 0;
    this._context.hideAfter = this._delay / 1_000;
  }
  get delay(): number {
    return this._delay;
  }

  private readonly _context = new HideAfterContext();

  static ngTemplateContextGuard(
    dir: HideAfterDirective,
    ctx: unknown
  ): ctx is HideAfterContext {
    return true;
  }

  constructor(
    private readonly _template: TemplateRef<HideAfterContext>,
    private readonly _container: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this._container.createEmbeddedView(this._template, this._context);

    const interval = setInterval(() => {
      this._context.counter--;
    }, 1_000);

    setTimeout(() => {
      this._container.clear();

      if (this.placeholder)
        this._container.createEmbeddedView(this.placeholder, this._context);

      clearInterval(interval);
    }, this.delay);
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [HideAfterDirective],
  declarations: [HideAfterDirective],
})
export class HideAfterModule {}
