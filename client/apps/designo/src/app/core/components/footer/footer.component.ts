import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'lbk-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./footer.component.html`,
})
export class FooterComponent implements OnInit {
  isNotContactPage$!: Observable<boolean>;
  constructor(private readonly _router: Router) {}
  ngOnInit(): void {
    this.isNotContactPage$ = this._router.events.pipe(
      map((event) => {
        if (event instanceof NavigationEnd) {
          return !event.url.startsWith('/contact');
        }
        return false;
      })
    );
  }
}
