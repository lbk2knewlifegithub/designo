import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthFacade } from '@lbk/state/auth';
import { Observable } from 'rxjs';
import { CoreFacade } from '../../state';

@Component({
  selector: 'lbk-required-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './required-login.component.html',
})
export class RequiredLoginComponent implements OnInit {
  showRequiredLogin$!: Observable<boolean>;

  constructor(
    private readonly _authFacade: AuthFacade,
    private readonly _coreFacade: CoreFacade
  ) {}

  ngOnInit(): void {
    this.showRequiredLogin$ = this._coreFacade.showRequiredLogin$;
  }

  closeRequiredLogin() {
    this._coreFacade.closeRequiredLogin();
  }

  login() {
    this._authFacade.login();
  }

  signup() {
    this._authFacade.signup();
  }
}
