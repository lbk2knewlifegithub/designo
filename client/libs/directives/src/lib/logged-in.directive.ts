import { CommonModule } from '@angular/common';
import {
  Directive,
  Input,
  NgModule,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthFacade } from '@lbk/auth';
import { Unsubscriber } from '@lbk/comps';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[loggedIn]',
})
export class LoggedInDirective extends Unsubscriber implements OnInit {
  @Input() loggedIn?: boolean;
  @Input('loggedInSkip') skip?: boolean;

  constructor(
    private readonly _template: TemplateRef<unknown>,
    private readonly _container: ViewContainerRef,
    private readonly _authFacade: AuthFacade
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    if (this.skip) {
      this._container.createEmbeddedView(this._template);
      return;
    }

    this.appendSub = this._authFacade.loggedIn$.subscribe((loggedIn) => {
      if (this.loggedIn)
        return loggedIn
          ? this._container.createEmbeddedView(this._template)
          : this._container.clear();

      return !loggedIn
        ? this._container.createEmbeddedView(this._template)
        : this._container.clear();
    });
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [LoggedInDirective],
  declarations: [LoggedInDirective],
})
export class LoggedInDirectiveModule {}
