import {
  animate,
  animation,
  AnimationTriggerMetadata,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AnimationOptions,
  DEFAULT_ANIMATION_OPTIONS,
  useAnimationIncludingChildren,
} from '../common';

/**
 * - Fade Out
 * @param options
 */
export function fadeOut(options?: AnimationOptions): AnimationTriggerMetadata {
  options = { ...DEFAULT_ANIMATION_OPTIONS, ...options };
  const { anchor, delay, duration, easing } = options;
  return trigger(anchor || 'fadeOut', [
    transition(
      ':leave',
      [
        ...useAnimationIncludingChildren(
          // Animations
          animation([
            animate(
              '{{duration}}ms {{delay}}ms {{easing}}',
              keyframes([
                style({ opacity: 1, easing: 'ease', offset: 0 }),
                style({ opacity: 0, easing: 'ease', offset: 1 }),
              ])
            ),
          ]),
          options
        ),
      ],
      // Params
      {
        params: {
          anchor,
          delay,
          duration,
          easing,
        },
      }
    ),
  ]);
}
