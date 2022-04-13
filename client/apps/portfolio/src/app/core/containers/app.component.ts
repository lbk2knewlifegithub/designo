import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Message } from '@lbk/api-interfaces';

@Component({
  selector: 'lbk-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <h1>Portfolio</h1>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  // hello$ = this.http.get<Message>('/api/hello');
  // constructor(private http: HttpClient) {}
}
