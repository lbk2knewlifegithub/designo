import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscriber } from '@lbk/comps';
import {
  CLIENT_AUDIOPHILE_URL,
  CLIENT_DESIGNO_URL,
  CLIENT_PRODUCT_FEEDBACKS_URL,
} from '@lbk/tokens';
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
export class AppComponent extends Unsubscriber implements OnInit {
  constructor(
    @Inject(CLIENT_PRODUCT_FEEDBACKS_URL)
    private readonly _clientProductFeedbacksUrl: string,
    @Inject(CLIENT_DESIGNO_URL)
    private readonly _clientDesignoUrl: string,
    @Inject(CLIENT_AUDIOPHILE_URL)
    private readonly _clientAudiophileUrl: string,
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
        if (project === 'audiophile')
          return (window.location.href = this._clientAudiophileUrl);
        //  if(project === "invoice-app") return  window.location.href = this._clientProductFeedbacksUrl;
        //  if(project === "frontendmentor") return  window.location.href = this._clientProductFeedbacksUrl;
        return;
      });
  }
}
