import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { CLIENT_PRODUCT_FEEDBACKS_URL } from '@lbk/tokens';
// import { HttpClient } from '@angular/common/http';
// import { Message } from '@lbk/api-interfaces';

@Component({
  selector: 'lbk-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <!-- <h1>Portfolio</h1> -->
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(CLIENT_PRODUCT_FEEDBACKS_URL)
    private readonly _clientProductFeedbacksUrl: string
  ) {}

  ngOnInit(): void {
    window.location.href = this._clientProductFeedbacksUrl;
  }
  // hello$ = this.http.get<Message>('/api/hello');
  // constructor(private http: HttpClient) {}
}
