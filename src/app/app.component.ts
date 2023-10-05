import {Component} from '@angular/core';
import {menuAnimation, routerAnimations} from "./utils/animations";
import {ChildrenOutletContexts, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations, menuAnimation]
})
export class AppComponent {
  constructor(public router: Router, private contexts: ChildrenOutletContexts) {
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
