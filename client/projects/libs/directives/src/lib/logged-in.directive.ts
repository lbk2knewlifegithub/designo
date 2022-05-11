import { CommonModule } from '@angular/common';
import {
  Directive,
  Input,
  NgModule,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserFacade } from '@lbk/user';
import { Unsubscriber } from '@lbk/comps';
import { distinctUntilChanged } from 'rxjs';

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
    private readonly _userFacade: UserFacade
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._container.createEmbeddedView(this._template);
    // if (this.skip) {
    //   this._container.createEmbeddedView(this._template);
    //   return;
    // }

    // this.appendSub = this._userFacade.loggedIn$
    //   .pipe(distinctUntilChanged())
    //   .subscribe((loggedIn) => {

    //     this.loggedIn && loggedIn
    //       ? this._container.createEmbeddedView(this._template)
    //       : this._container.clear();
    //   });
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [LoggedInDirective],
  declarations: [LoggedInDirective],
})
export class LoggedInDirectiveModule {}
