import {
  animate,
  animateChild,
  group,
  keyframes,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import * as kf from './keyframes';

const optional = { optional: true };

export const ROUTE_CUBE_ANIMATION = trigger('routeAnimations', [
  transition('* <=> *', [
    style({
      position: 'relative',
      perspective: '1000px',
    }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
        }),
      ],
      optional
    ),
    query(
      ':enter',
      [
        style({
          opacity: 0,
        }),
      ],
      optional
    ),
    group([
      query(':leave', [animate('1s ease-in', keyframes(kf.cubeOut))], optional),
      query(':enter', [animate('1s ease-out', keyframes(kf.cubeIn))], optional),
    ]),
  ]),
]);

export const CAROUSEL_ROUTE_ANIMATION = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ left: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),
]);

export const FADE_IN_UP_ROUTE_ANIMATION = trigger('routeAnimations', [
  transition('* <=> *', [
    group([
      query(
        ':leave',
        [
          animate(
            '300ms ease-out',
            style({ opacity: '0%', transform: 'translateY(100px)' })
          ),
        ],
        {
          optional: true,
        }
      ),
      query(
        ':enter',
        [
          animate(
            '300ms ease-out',
            style({ opacity: '100%', transform: 'translateY(0)' })
          ),
        ],
        {
          optional: true,
        }
      ),
    ]),
  ]),
]);
