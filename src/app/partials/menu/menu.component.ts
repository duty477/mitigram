import {Component, ElementRef, HostListener} from '@angular/core';
import {MenuItem} from "../../utils/interfaces";
import {Router} from "@angular/router";
import {slideInOutAnimation} from "../../utils/animations";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [slideInOutAnimation]
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
  showMenu = window.innerWidth > 1024;
  windowWidth: number = window.innerWidth;

  constructor(public router: Router, private elementRef: ElementRef) {
  }

  /**
   * Toggles the visibility of the menu by changing the value of 'showMenu'.
   */
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  /**
   * Hides the menu if the window width is less than or equal to 1024 pixels and 'showMenu' is true.
   */
  hideMenu(): void {
    if (this.windowWidth <= 1024 && this.showMenu) {
      this.showMenu = false;
    }
  }

  /**
   * Listens for the window resize event and updates 'windowWidth' and 'showMenu' accordingly.
   */
  @HostListener('window:resize') onResize(): void {
    this.windowWidth = window.innerWidth;
    this.showMenu = window.innerWidth > 1024;
  }

  /**
   * Listens for clicks on the document and hides the menu if the click occurs outside the component's element.
   * @param {any} targetElement - The target element that was clicked.
   */
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      if (this.windowWidth <= 1024 && this.showMenu) {
        this.showMenu = false;
      }
    }
  }
}
