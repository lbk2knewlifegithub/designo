import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AnimationOptions,
  DEFAULT_ANIMATION_OPTIONS,
} from '../common/anim-options.model';

interface ListAnimationsOpstions extends AnimationOptions {
  item?: string;
  staggerDuration?: number;
}

export function listInLeft(options?: ListAnimationsOpstions) {
  options = {
    ...options,
    ...DEFAULT_ANIMATION_OPTIONS,
  };

  const { anchor, item, staggerDuration, delay, easing, duration } = options;
  return trigger(anchor || 'listInLeft', [
    transition(
      ':enter',
      [
        query(
          item || 'listItem',
          [
            style({ opacity: 0, transform: 'translateX(-100px) scale(.9)' }),
            stagger(staggerDuration ?? 100, [
              animate('{{duration}}ms {{delay}}ms {{easing}}'),
            ]),
          ],
          { optional: true }
        ),
      ],
      {
        params: { delay, easing, duration },
      }
    ),
  ]);
}
