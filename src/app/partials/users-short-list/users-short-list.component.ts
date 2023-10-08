import {Component, HostListener, Input} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-users-short-list',
  templateUrl: './users-short-list.component.html',
  styleUrls: ['./users-short-list.component.scss']
})
export class UsersShortListComponent {
  @Input() contractors: User[] = [];
  windowWidth = window.innerWidth;

  /**
   * Listens for the window resize event and updates the 'windowWidth' property with the current window inner width.
   */
  @HostListener('window:resize') onResize(): void {
    this.windowWidth = window.innerWidth;
  }
}
