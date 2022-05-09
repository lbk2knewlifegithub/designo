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
 * - Collapse On Leave Animation
 * - WARNING: Element must use overflow:hidden
 * @param options
 */
export function collapseOut(
  options?: AnimationOptions
): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing } = options;
  return trigger(anchor || 'collapseOut', [
    transition(
      ':leave',
      [
        ...useAnimationIncludingChildren(
          // Animations
          animation([
            animate(
              '{{duration}}ms {{delay}}ms {{easing}}',
              style({ height: 0 })
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
