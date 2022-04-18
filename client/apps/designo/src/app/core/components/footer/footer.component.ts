import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lbk-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./footer.component.html`,
})
export class FooterComponent {
  constructor(private readonly _router: Router) {}

  get isContactPage() {
    return this._router.url.startsWith('/contact');
  }
}
