import {
  animate,
  animation,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

import {
  AnimationOptions,
  DEFAULT_ANIMATION_OPTIONS,
} from './common/anim-options.model';
import { useAnimationIncludingChildren } from './common/use-animation-including-children';

/**
 * - Expand In Enter Animation
 * - WARNING: Element must use overflow:hidden
 * @param options
 */
export function expandIn(options?: AnimationOptions): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing } = options;
  return trigger(anchor || 'expandIn', [
    transition(
      ':enter',
      [
        style({ height: '0' }),
        ...useAnimationIncludingChildren(
          // Animations
          animation([
            animate(
              '{{duration}}ms {{delay}}ms {{easing}}',
              style({ height: '*' })
            ),
          ]),
          options
        ),
      ],
      // Params
      {
        params: { delay, duration, easing },
      }
    ),
  ]);
}
