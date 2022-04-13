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
 * - Zoom In Down
 * @param options
 */
export function zoomInDown(
  options?: AnimationOptions
): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing } = options;
  return trigger(anchor || 'zoomInDown', [
    transition(
      ':enter',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(
          /**
           *  - Animations
           */
          animation([
            animate(
              '{{duration}}ms {{delay}}ms',
              keyframes([
                style({
                  visibility: 'visible',
                  opacity: 0,
                  transform:
                    'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)',
                  easing: 'ease',
                  offset: 0,
                }),
                style({
                  opacity: 1,
                  transform:
                    'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
                  easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                  offset: 0.6,
                }),
                style({
                  opacity: 1,
                  transform: 'scale3d(1, 1, 1) translate3d(0, 0, 0)',
                  easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
                  offset: 1,
                }),
              ])
            ),
          ]),
          options
        ),
      ],
      // Params
      {
        params: {
          delay,
          duration,
          easing,
        },
      }
    ),
  ]);
}
