import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SplashScreenService {
  constructor() {
    const splashScreen = document.getElementById(
      'splash-screen'
    ) as HTMLElement;
    splashScreen.classList.add('slide-out-top');
    splashScreen.addEventListener('transitionend', () => {
      splashScreen.remove();
    });
  }
}
