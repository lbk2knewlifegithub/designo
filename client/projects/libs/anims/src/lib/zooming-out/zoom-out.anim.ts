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
 * - ZoomOut Animation
 * @param options
 */
export function zoomOut(options?: AnimationOptions): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing } = options;
  return trigger(anchor || 'zoomOut', [
    transition(
      ':leave',
      [
        ...useAnimationIncludingChildren(
          // Animations
          animation(
            group([
              animate(
                '{{duration}}ms {{delay}}ms {{easing}}',
                keyframes([
                  style({
                    opacity: 1,
                    transform: 'scale3d(1, 1, 1)',
                    easing: 'ease',
                    offset: 0,
                  }),
                  style({
                    opacity: 0,
                    transform: 'scale3d(0.3, 0.3, 0.3)',
                    easing: 'ease',
                    offset: 0.5,
                  }),
                  style({ opacity: 0, easing: 'ease', offset: 1 }),
                ])
              ),
              animate(
                '{{duration}}ms {{delay}}ms {{easing}}',
                keyframes([
                  style({
                    transform: 'scale3d(1, 1, 1)',
                    easing: 'ease',
                    offset: 0,
                  }),
                  style({
                    transform: 'scale3d(0.3, 0.3, 0.3)',
                    easing: 'ease',
                    offset: 0.5,
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
