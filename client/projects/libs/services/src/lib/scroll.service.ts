import { Injectable } from '@angular/core';

interface ScrollOptions {
  delay?: number;
  behavior?: ScrollBehavior;
}

@Injectable({ providedIn: 'root' })
export class ScrollService {
  defaultOptions: ScrollOptions = {
    delay: 0,
    behavior: 'smooth',
  };

  /**
   * - Scroll To Bottom
   * @param options
   */
  scrollToBottom(options?: Partial<ScrollOptions>) {
    options = { ...this.defaultOptions, ...options };
    const { delay } = options;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, delay);
  }

  /**
   * - Scroll To Top
   * @param options
   */
  scrollToTop(options?: Partial<ScrollOptions>) {
    options = { ...this.defaultOptions, ...options };
    const { delay, behavior } = options;
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior });
    }, delay);
  }

  /**
   * - Scroll To Element
   * @param id
   * @param options
   */
  scrollToElement(id: string, options?: Partial<ScrollOptions>) {
    options = { ...this.defaultOptions, ...options };
    const { delay, behavior } = options;
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior });
    }, delay);
  }
}
