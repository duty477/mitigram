import {Component, HostListener, OnInit} from '@angular/core';
import {Notification} from "../../models/notification.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {SwiperOptions} from "swiper";
import {LoaderComponent} from "../../partials/loader/loader.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  notifications: Notification[] = [];
  contractors: User[] = [];
  name = 'John';
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    freeMode: true,
    grabCursor: true,
    breakpoints: {
      768: {
        spaceBetween: 50,
        slidesPerView: 'auto',
      }
    }
  };
  windowWidth = window.innerWidth;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
  ) {
  }

  /**
   * Initializes the component when it is first created.
   * Subscribes to the 'contractors' observable from the UserService and updates the contractors array.
   * Subscribes to the 'notifications' observable from the NotificationService and updates the notifications array.
   */
  ngOnInit(): void {
    this.userService.contractors.subscribe((users: User[]) => {
      this.contractors = users;
      LoaderComponent.toggleDisplay(false);
    });
    this.notificationService.notifications.subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }

  /**
   * Listens for the window resize event and updates the windowWidth property.
   */
  @HostListener('window:resize') onResize(): void {
    this.windowWidth = window.innerWidth;
  }
}
