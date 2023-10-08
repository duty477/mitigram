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

export const menuAnimation: AnimationTriggerMetadata = trigger('menuAnimation', [
  transition(':enter', [
    style({opacity: 0}),
    animate('0.6s ease-in-out', style({opacity: 1})),
  ]),
  transition(':leave', [
    animate('0.2s ease-in-out', style({opacity: 0}))
  ]),
]);

export const fadeOutAnimation: AnimationTriggerMetadata = trigger('fadeOut', [
  transition(':leave', [
    animate('0.4s ease-in-out', style({opacity: 0}))
  ])
]);

export const slideInOutAnimation: AnimationTriggerMetadata = trigger('slideInOut', [
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate('0.3s ease-in-out', style({transform: 'translateX(0)'})),
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)'}),
    animate('0.3s ease-in-out', style({transform: 'translateX(-100%)'}))
  ]),
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
export const routerAnimations: AnimationTriggerMetadata = trigger('routeAnimations', [
  transition('Home => *', [
    query(':enter, :leave',
      style({position: 'fixed', width: '100%'}),
      {optional: true}),
    group([
      query(':enter', [
        style({opacity: 0, transform: 'translateX(100px)'}),
        animate('0.6s ease-in-out',
          style({opacity: 1, transform: 'translateY(0)'}))
      ], {optional: true}),
      query(':leave', [
        style({opacity: 1}),
        animate('0.2s ease-in-out',
          style({opacity: 0}))
      ], {optional: true}),
    ])
  ]),
  transition('* => Home', [
    query(':enter, :leave',
      style({position: 'fixed', width: '100%'}),
      {optional: true}),
    group([
      query(':enter', [
        style({opacity: 0}),
        animate('0.6s ease-in-out',
          style({opacity: 1}))
      ], {optional: true}),
      query(':leave', [
        style({opacity: 1}),
        animate('0.2s ease-in-out',
          style({opacity: 0}))
      ], {optional: true}),
    ])
  ]),
  transition('* => *', [
    query(':enter, :leave',
      style({position: 'fixed', width: '100%'}),
      {optional: true}),
    group([
      query(':enter', [
        style({opacity: 0, transform: 'translateX(100px)'}),
        animate('0.4s ease-in-out',
          style({opacity: 1, transform: 'translateX(0)'}))
      ], {optional: true}),
      query(':leave', [
        style({opacity: 1, transform: 'translateX(0)'}),
        animate('0.3s ease-in-out',
          style({opacity: 0, transform: 'translateX(-100px)'}))
      ], {optional: true}),
    ])
  ]),
]);
