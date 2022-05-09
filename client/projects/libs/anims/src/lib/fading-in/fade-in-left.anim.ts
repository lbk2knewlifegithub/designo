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

export interface IFadeInLeftAnimationOptions extends AnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const DEFAULT_FADE_IN_LEFT_ANIMATION_OPTIONS: IFadeInLeftAnimationOptions = {
  ...DEFAULT_ANIMATION_OPTIONS,
  translate: '100%',
};

/**
 * - Fade In Left
 * @param options
 */
export function fadeInLeft(
  options?: IFadeInLeftAnimationOptions
): AnimationTriggerMetadata {
  options = { ...DEFAULT_FADE_IN_LEFT_ANIMATION_OPTIONS, ...options };
  const { anchor, delay, duration, easing, translate } = options;

  return trigger(anchor || 'fadeInLeft', [
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
                  transform: 'translate3d(-{{translate}}, 0, 0)',
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
