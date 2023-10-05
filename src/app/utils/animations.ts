import {
  animate,
  AnimationTriggerMetadata,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const fadeInOutAnimation: AnimationTriggerMetadata = trigger('fadeInOut', [
  state('in', style({opacity: 1})),
  transition(':enter', [
    style({opacity: 0, position: 'absolute', top: '0', left: '0', width: '100%'}),
    animate('0.3s ease-in-out', style({opacity: 1, position: 'absolute', top: '0', left: '0', width: '100%'})),
  ]),
  transition(':leave', [
    animate('0.3s ease-in-out', style({opacity: 0, position: 'absolute', top: '0', left: '0', width: '100%'}))
  ]),
]);

export const fadeOutAnimation: AnimationTriggerMetadata = trigger('fadeOut', [
  transition(':leave', [
    animate('0.4s ease-in-out', style({opacity: 0}))
  ])
]);

export const listAnimation: AnimationTriggerMetadata = trigger('list', [
  transition('* => *', [
    query(':enter', [
      style({opacity: 0, transform: 'translateY(-20px)'}),
      stagger(100, [
        animate('0.2s', style({opacity: 1, transform: 'none'}))
      ])
    ], {optional: true})
  ])
]);

///route animations
const resetRoute = [
  style({position: 'relative'}),
  query(
    ':enter, :leave',
    [
      style({
        position: 'fixed', // using absolute makes the scroll get stuck in the previous page's scroll position on the new page
        top: 0, // adjust this if you have a header so it factors in the height and not cause the router outlet to jump as it animates
        left: 0,
        width: '100%',
        opacity: 0,
      }),
    ],
    {optional: true}
  ),
];

// Fade Animation
export const routeFadeAnimation: AnimationTriggerMetadata = trigger('routeFadeAnimation', [
  transition('* => *', [
    ...resetRoute,
    query(':enter', [style({opacity: 0})], {
      optional: true,
    }),
    group([
      query(
        ':leave',
        [style({opacity: 1}), animate('0.3s', style({opacity: 0}))],
        {optional: true}
      ),
      query(
        ':enter',
        [style({opacity: 0}), animate('1s', style({opacity: 1}))],
        {optional: true}
      ),
    ]),
  ]),
]);
