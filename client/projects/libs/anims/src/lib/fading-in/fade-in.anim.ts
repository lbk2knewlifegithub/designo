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
 * - Fade In
 * @param options
 */
export function fadeIn(options?: AnimationOptions): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing } = options;
  return trigger(anchor || 'fadeIn', [
    transition(
      ':enter',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(
          // Animations
          animation([
            animate(
              '{{duration}}ms {{delay}}ms {{easing}}',
              keyframes([
                style({
                  visibility: 'visible',
                  opacity: 0,
                  easing: 'ease',
                  offset: 0,
                }),
                style({ opacity: 1, easing: 'ease', offset: 1 }),
              ])
            ),
          ]),
          options
        ),
      ],
      // Params
      { params: { anchor, delay, duration, easing } }
    ),
  ]);
}
