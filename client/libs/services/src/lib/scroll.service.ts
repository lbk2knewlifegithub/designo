import { Injectable } from '@angular/core';

interface ScrollOptions {
  delay?: number;
  behavior?: ScrollBehavior;
}

@Injectable({ providedIn: 'root' })
export class ScrollService {
  defaultOptions: ScrollOptions = {
    delay: 200,
    behavior: 'smooth',
  };

  scrollToBottom(options?: Partial<ScrollOptions>) {
    options = { ...this.defaultOptions, ...options };
    const { delay } = options;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, delay);
  }

  scrollToElement(id: string, options?: Partial<ScrollOptions>) {
    options = { ...this.defaultOptions, ...options };
    const { delay, behavior } = options;
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior });
    }, delay);
  }
}
