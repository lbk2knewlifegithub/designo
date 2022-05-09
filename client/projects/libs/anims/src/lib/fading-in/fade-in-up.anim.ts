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

export interface IFadeInUpAnimationOptions extends AnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const DEFAULT_FADE_IN_UP_ANIMATION_OPTIONS: IFadeInUpAnimationOptions = {
  ...DEFAULT_ANIMATION_OPTIONS,
  translate: '100%',
};

/**
 * - Fade In Up
 * @param options
 */
export function fadeInUp(
  options?: IFadeInUpAnimationOptions
): AnimationTriggerMetadata {
  options = { ...options, ...DEFAULT_FADE_IN_UP_ANIMATION_OPTIONS };
  const { anchor, delay, duration, easing, translate } = options;

  return trigger(anchor || 'fadeInUp', [
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
                  transform: 'translate3d(0, {{translate}}, 0)',
                  easing: 'ease',
                  offset: 0,
                }),
                style({
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0)',
                  easing: 'ease',
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
          translate,
          easing,
        },
      }
    ),
  ]);
}
