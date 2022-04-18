import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnSubscribe } from '@lbk/comps';
import { CLIENT_DESIGNO_URL, CLIENT_PRODUCT_FEEDBACKS_URL } from '@lbk/tokens';
import { pluck } from 'rxjs';

@Component({
  selector: 'lbk-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-header></lbk-header>
    <router-outlet></router-outlet>
    <lbk-footer></lbk-footer>
  `,
})
export class AppComponent extends UnSubscribe implements OnInit {
  constructor(
    @Inject(CLIENT_PRODUCT_FEEDBACKS_URL)
    private readonly _clientProductFeedbacksUrl: string,
    @Inject(CLIENT_DESIGNO_URL)
    private readonly _clientDesignoUrl: string,
    private readonly _route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.appendSub = this._route.queryParams
      .pipe(pluck('project'))
      .subscribe((project) => {
        if (project === 'product-feedbacks')
          return (window.location.href = this._clientProductFeedbacksUrl);
        if (project === 'designo')
          return (window.location.href = this._clientDesignoUrl);
        //  if(project === "audiophile") return  window.location.href = this._clientProductFeedbacksUrl;
        //  if(project === "invoice-app") return  window.location.href = this._clientProductFeedbacksUrl;
        //  if(project === "frontendmentor") return  window.location.href = this._clientProductFeedbacksUrl;
        return;
      });
  }
}
