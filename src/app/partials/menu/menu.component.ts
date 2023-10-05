import {Component} from '@angular/core';
import {MenuItem} from "../../utils/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      text: 'Dashboard',
      url: '/dashboard',
      icon: 'assets/svg/dashboard.svg',
    },
    {
      text: 'Address book',
      url: '/address-book',
      icon: 'assets/svg/address-book.svg',
    },
    {
      text: 'Invitations',
      url: '/invitations',
      icon: 'assets/svg/invitations.svg',
    },
    {
      text: 'Settings',
      url: '/settings',
      icon: 'assets/svg/settings.svg',
    }
  ];

  constructor(public router: Router) {
  }
}
