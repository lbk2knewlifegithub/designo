import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

/**
 *  1. Inject the service into app.component.ts so that it tracks history throughout the application
 * 
 * export class AppComponent implements AfterViewInit {
*
 * constructor(private navigationService: NavigationService) {
 * }
 * ...
*
2. Then update the (click) function wherever you want to use this. Using the original example:
@Component({
  // component's declarations here
})
class SomeComponent {

  constructor(private navigationService: NavigationService) 
  {}

  backClicked() {
    this.navigationService.back();
  }
}
 */
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private MAX_HISTORY_LEN = 10; // prevent history from growing indefinitely
  private history: string[] = [];
  private excludes = ['/login', '/signup'];

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
        if (this.history.length > this.MAX_HISTORY_LEN) {
          this.history.shift();
        }
      }
    });
  }

  back(): void {
    const url = this.history.pop();
    if (!url) {
      this.router.navigateByUrl('/');
      return;
    }

    const lastHistory = this.history[this.history.length - 1];
    if (lastHistory && this.excludes.find((u) => lastHistory.startsWith(u))) {
      this.router.navigateByUrl('/');
      return;
    }

    this.location.back();
  }
}
