import { Component } from '@angular/core';
import {routeFadeAnimation} from "./utils/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeFadeAnimation]
})
export class AppComponent {
  constructor(public router: Router) {
  }

}
