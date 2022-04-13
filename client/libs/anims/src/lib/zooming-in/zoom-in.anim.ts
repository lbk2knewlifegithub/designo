import {
  animate,
  animation,
  AnimationTriggerMetadata,
  group,
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
 * - Zoom In Animation
 * @param options
 */
export function zoomIn(options?: AnimationOptions): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing } = options;

  return trigger(anchor || 'zoomIn', [
    transition(
      ':enter',
      [
        style({ visibility: 'hidden' }),
        ...useAnimationIncludingChildren(
          // Animations
          animation(
            group([
              animate(
                '{{duration}}ms {{delay}}ms {{easing}}',
                keyframes([
                  style({ opacity: 0, easing: 'ease', offset: 0 }),
                  style({ opacity: 1, easing: 'ease', offset: 0.5 }),
                  style({ opacity: 1, easing: 'ease', offset: 1 }),
                ])
              ),
              animate(
                '{{duration}}ms {{delay}}ms {{easing}}',
                keyframes([
                  style({
                    visibility: 'visible',
                    transform: 'scale3d(0.3, 0.3, 0.3)',
                    easing: 'ease',
                    offset: 0,
                  }),
                  style({
                    transform: 'scale3d(1, 1, 1)',
                    easing: 'ease',
                    offset: 1,
                  }),
                ])
              ),
            ])
          ),
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
