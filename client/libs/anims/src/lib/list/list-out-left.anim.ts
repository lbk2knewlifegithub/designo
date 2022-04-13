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

export function listOutLeft(options?: ListAnimationsOpstions) {
  options = {
    ...options,
    ...DEFAULT_ANIMATION_OPTIONS,
  };

  const { anchor, item, staggerDuration, delay, easing, duration } = options;
  return trigger(anchor || 'listOutLeft', [
    transition(
      ':leave',
      [
        query(
          item || 'listItem',
          [
            style({ position: 'absolute', transform: 'translateX(200px)' }),
            stagger(staggerDuration ?? 100, [
              animate(
                '{{duration}}ms {{delay}}ms {{easing}}',
                style({ opacity: 0, transform: 'translateX(-100%)' })
              ),
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
