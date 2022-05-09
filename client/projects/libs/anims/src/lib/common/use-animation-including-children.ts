import {
  animateChild,
  AnimationReferenceMetadata,
  group,
  query,
  useAnimation,
} from '@angular/animations';
import { AnimationOptions } from './anim-options.model';

/**
 * - Use Animation Including Children
 * @param animation
 * @param options
 */
export function useAnimationIncludingChildren(
  animation: AnimationReferenceMetadata,
  options?: AnimationOptions
) {
  return [
    ...(options && options.animateChildren === 'before'
      ? [query('@*', animateChild(), { optional: true })]
      : []),
    group([
      useAnimation(animation),
      ...(!options ||
      !options.animateChildren ||
      options.animateChildren === 'together'
        ? [query('@*', animateChild(), { optional: true })]
        : []),
    ]),
    ...(options && options.animateChildren === 'after'
      ? [query('@*', animateChild(), { optional: true })]
      : []),
  ];
}
